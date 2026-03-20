from fastapi import APIRouter, Query, HTTPException
from psycopg2.extras import RealDictCursor
from typing import Optional, List, Dict, Any

from ..database import get_connection

router = APIRouter(prefix="/api/faers", tags=["FAERS"])

REAC_ISR_COL = 'r."isr"' 


def _validate_top(top: int) -> int:
    return max(1, min(10, top))


def build_role_filter_sql(role_filter: str) -> str:
    role_filter = (role_filter or "all").lower()

    if role_filter == "all":
        return "AND d2.\"ROLE_COD\" IN ('PS','SS','I','C')"  # DN 제외
    if role_filter == "suspect":
        return "AND d2.\"ROLE_COD\" IN ('PS','SS')"
    if role_filter == "ps":
        return "AND d2.\"ROLE_COD\" = 'PS'"
    if role_filter == "ss":
        return "AND d2.\"ROLE_COD\" = 'SS'"
    if role_filter == "c":
        return "AND d2.\"ROLE_COD\" = 'C'"
    if role_filter == "i":
        return "AND d2.\"ROLE_COD\" = 'I'"
    if role_filter == "dn":
        return "AND d2.\"ROLE_COD\" = 'DN'"
    if role_filter == "raw_all":
        return ""
    return "AND d2.\"ROLE_COD\" IN ('PS','SS','I','C')"


def build_year_filter_sql(params: Dict[str, Any], year_from: Optional[int], year_to: Optional[int]) -> str:
    sql = ""
    if year_from is not None:
        sql += """
          AND EXTRACT(YEAR FROM to_date(d."FDA_DT"::text, 'YYYYMMDD'))::int >= %(year_from)s
        """
        params["year_from"] = year_from
    if year_to is not None:
        sql += """
          AND EXTRACT(YEAR FROM to_date(d."FDA_DT"::text, 'YYYYMMDD'))::int <= %(year_to)s
        """
        params["year_to"] = year_to
    return sql


def resolve_substance(conn, drug: str) -> str:
    """
    public.faers_drug_dict에서 drug → substance(norm) 반환.
    dict에 없으면 입력값을 그대로 반환.
    """
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cur.execute(
            """
            SELECT drugname_norm
            FROM public.faers_drug_dict
            WHERE drugname_display = lower(trim(%(drug)s))
            LIMIT 1;
            """,
            {"drug": drug},
        )
        row = cur.fetchone()
        return row["drugname_norm"] if row else drug.strip().lower()
    finally:
        cur.close()


@router.get("/summary")
def faers_summary_selected(
    drug: str = Query(..., min_length=1, description="모달에서 선택한 약물명(표시값)"),
    role_filter: str = Query("all", description="all|suspect|ps|ss|c|i|dn|raw_all"),
    year_from: Optional[int] = Query(None, ge=1900, le=2100),
    year_to: Optional[int] = Query(None, ge=1900, le=2100),
):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        substance = resolve_substance(conn, drug)

        params: Dict[str, Any] = {"substance": substance}
        role_sql = build_role_filter_sql(role_filter).replace('d2."ROLE_COD"', 'd2."ROLE_COD"')
        year_sql = build_year_filter_sql(params, year_from, year_to)

        date_guard = """
          AND d."FDA_DT" IS NOT NULL
          AND d."FDA_DT"::text ~ '^[0-9]{8}$'
        """

        isr_count_sql = f"""
            SELECT COUNT(DISTINCT d2."ISR") AS matched_isr_count
            FROM "FAERS"."standardized_drug" d2
            WHERE d2.substance = %(substance)s
            {role_sql}
        """

        yearly_total_sql = f"""
            WITH matched_isr AS (
              SELECT DISTINCT d2."ISR"
              FROM "FAERS"."standardized_drug" d2
              WHERE d2.substance = %(substance)s
              {role_sql}
            )
            SELECT
              EXTRACT(YEAR FROM to_date(d."FDA_DT"::text, 'YYYYMMDD'))::int AS year,
              COUNT(*) AS count
            FROM matched_isr m
            JOIN "FAERS"."SD_FAERS_DEMO" d ON d."ISR" = m."ISR"
            JOIN "FAERS"."SD_FAERS_REAC" r ON {REAC_ISR_COL} = m."ISR"
            WHERE 1=1
              {date_guard}
              {year_sql}
            GROUP BY year
            ORDER BY year;
        """

        top_pt_sql = f"""
            WITH matched_isr AS (
              SELECT DISTINCT d2."ISR"
              FROM "FAERS"."standardized_drug" d2
              WHERE d2.substance = %(substance)s
              {role_sql}
            )
            SELECT
              r."pt" AS pt,
              COUNT(*) AS total
            FROM matched_isr m
            JOIN "FAERS"."SD_FAERS_DEMO" d ON d."ISR" = m."ISR"
            JOIN "FAERS"."SD_FAERS_REAC" r ON {REAC_ISR_COL} = m."ISR"
            WHERE 1=1
              {date_guard}
              {year_sql}
            GROUP BY r."pt"
            ORDER BY total DESC
            LIMIT 10;
        """

        cur.execute(isr_count_sql, params)
        isr_count = cur.fetchone()["matched_isr_count"]

        cur.execute(yearly_total_sql, params)
        yearly_total = cur.fetchall()

        cur.execute(top_pt_sql, params)
        top_pts = cur.fetchall()

        return {
            "drug": drug,
            "drug_norm": substance,
            "role_filter": role_filter,
            "year_from": year_from,
            "year_to": year_to,
            "matched_isr_count": int(isr_count),
            "yearly_total": [{"year": int(r["year"]), "count": int(r["count"])} for r in yearly_total],
            "top_pts": [{"pt": r["pt"], "total": int(r["total"])} for r in top_pts],
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FAERS summary(selected) failed: {str(e)}")
    finally:
        cur.close()
        conn.close()


@router.get("/timeseries")
def faers_timeseries_selected(
    drug: str = Query(..., min_length=1),
    top: int = Query(5, ge=1, le=10),
    role_filter: str = Query("all"),
    year_from: Optional[int] = Query(None, ge=1900, le=2100),
    year_to: Optional[int] = Query(None, ge=1900, le=2100),
):
    top = _validate_top(top)

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        substance = resolve_substance(conn, drug)

        params: Dict[str, Any] = {"substance": substance, "top": top}
        role_sql = build_role_filter_sql(role_filter)
        year_sql = build_year_filter_sql(params, year_from, year_to)

        date_guard = """
          AND d."FDA_DT" IS NOT NULL
          AND d."FDA_DT"::text ~ '^[0-9]{8}$'
        """

        sql = f"""
            WITH matched_isr AS (
              SELECT DISTINCT d2."ISR"
              FROM "FAERS"."standardized_drug" d2
              WHERE d2.substance = %(substance)s
              {role_sql}
            ),
            base AS (
              SELECT
                EXTRACT(YEAR FROM to_date(d."FDA_DT"::text, 'YYYYMMDD'))::int AS year,
                r."pt" AS pt,
                COUNT(*) AS cnt
              FROM matched_isr m
              JOIN "FAERS"."SD_FAERS_DEMO" d ON d."ISR" = m."ISR"
              JOIN "FAERS"."SD_FAERS_REAC" r ON {REAC_ISR_COL} = m."ISR"
              WHERE 1=1
                {date_guard}
                {year_sql}
              GROUP BY year, r."pt"
            ),
            top_pt AS (
              SELECT pt, SUM(cnt) AS total
              FROM base
              GROUP BY pt
              ORDER BY total DESC
              LIMIT %(top)s
            )
            SELECT b.year, b.pt, b.cnt
            FROM base b
            JOIN top_pt t ON t.pt = b.pt
            ORDER BY b.year, t.total DESC, b.cnt DESC;
        """

        cur.execute(sql, params)
        rows = cur.fetchall()

        years = sorted({int(r["year"]) for r in rows})
        pts: List[str] = []
        for r in rows:
            if r["pt"] not in pts:
                pts.append(r["pt"])

        lookup = {(int(r["year"]), r["pt"]): int(r["cnt"]) for r in rows}

        series = []
        for pt in pts:
            data = [{"year": y, "count": lookup.get((y, pt), 0)} for y in years]
            series.append({"pt": pt, "data": data})

        return {
            "drug": drug,
            "drug_norm": substance,
            "top": top,
            "role_filter": role_filter,
            "year_from": year_from,
            "year_to": year_to,
            "years": years,
            "series": series,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FAERS timeseries(selected) failed: {str(e)}")
    finally:
        cur.close()
        conn.close()


@router.get("/suggest")
def faers_suggest(
    q: str = Query(..., min_length=1, max_length=50, description="약물명 prefix (예: bleo)"),
    limit: int = Query(30, ge=1, le=100),
):
    """
    public.faers_drug_dict에서 prefix 기반 후보 리스트 반환.
    - fast: drugname_norm LIKE 'q%'
    """
    q_norm = q.strip().lower()
    if not q_norm:
        return {"query": q, "items": []}

    sql = """
        SELECT drugname_display, freq
        FROM (
            SELECT DISTINCT ON (drugname_norm)
                drugname_display,
                drugname_norm,
                freq
            FROM public.faers_drug_dict
            WHERE drugname_display LIKE %(prefix)s
            ORDER BY drugname_norm, freq DESC
        ) sub
        ORDER BY freq DESC
        LIMIT %(limit)s;
    """

    params: Dict[str, Any] = {
        "prefix": q_norm + "%",
        "limit": limit,
    }

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cur.execute(sql, params)
        rows = cur.fetchall()
        items: List[str] = [r["drugname_display"] for r in rows]
        return {"query": q, "items": items}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FAERS suggest failed: {str(e)}")
    finally:
        cur.close()
        conn.close()