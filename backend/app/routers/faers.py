from fastapi import APIRouter, Query, HTTPException
from psycopg2.extras import RealDictCursor
from typing import Optional, List, Dict, Any

from ..database import get_connection

router = APIRouter(prefix="/api/faers", tags=["FAERS"])


def _validate_top(top: int) -> int:
    return max(1, min(10, top))


def build_role_filter_sql(role_filter: str) -> str:
    """
    role_filter:
      - all: PS,SS,I,C (DN 제외)
      - suspect: PS,SS
      - ps / ss / c / i / dn
      - raw_all: 전부 포함 (DN 포함)
    """
    role_filter = (role_filter or "all").lower()

    if role_filter == "all":
        return "AND d2.\"ROLE_COD\" IN ('PS','SS','I','C')"
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


def build_year_filter_sql(
    params: Dict[str, Any],
    year_from: Optional[int],
    year_to: Optional[int],
) -> str:
    sql = ""
    if year_from is not None:
        sql += """
          AND EXTRACT(
            YEAR FROM to_date(d."FDA_DT"::text, 'YYYYMMDD')
          )::int >= %(year_from)s
        """
        params["year_from"] = year_from

    if year_to is not None:
        sql += """
          AND EXTRACT(
            YEAR FROM to_date(d."FDA_DT"::text, 'YYYYMMDD')
          )::int <= %(year_to)s
        """
        params["year_to"] = year_to

    return sql


@router.get("/summary")
def faers_summary(
    q: str = Query(..., min_length=1),
    role_filter: str = Query(
        "all",
        description="all|suspect|ps|ss|c|i|dn|raw_all"
    ),
    year_from: Optional[int] = Query(None, ge=1900, le=2100),
    year_to: Optional[int] = Query(None, ge=1900, le=2100),
):
    params: Dict[str, Any] = {"q": q}
    role_sql = build_role_filter_sql(role_filter)
    year_sql = build_year_filter_sql(params, year_from, year_to)

    # FDA_DT 안전 가드 (8자리 숫자만)
    date_guard = """
      AND d."FDA_DT" IS NOT NULL
      AND d."FDA_DT"::text ~ '^[0-9]{8}$'
    """

    isr_count_sql = f"""
        SELECT COUNT(DISTINCT d2."ISR") AS matched_isr_count
        FROM "SD_FAERS_DRUG" d2
        WHERE d2."DRUGNAME" ILIKE '%%' || %(q)s || '%%'
        {role_sql}
    """

    yearly_total_sql = f"""
        WITH matched_isr AS (
          SELECT DISTINCT d2."ISR"
          FROM "SD_FAERS_DRUG" d2
          WHERE d2."DRUGNAME" ILIKE '%%' || %(q)s || '%%'
          {role_sql}
        )
        SELECT
          EXTRACT(
            YEAR FROM to_date(d."FDA_DT"::text, 'YYYYMMDD')
          )::int AS year,
          COUNT(*) AS count
        FROM matched_isr m
        JOIN "SD_FAERS_DEMO" d ON d."ISR" = m."ISR"
        JOIN "SD_FAERS_REAC" r ON r."isr" = m."ISR"
        WHERE 1=1
          {date_guard}
          {year_sql}
        GROUP BY year
        ORDER BY year;
    """

    top_pt_sql = f"""
        WITH matched_isr AS (
          SELECT DISTINCT d2."ISR"
          FROM "SD_FAERS_DRUG" d2
          WHERE d2."DRUGNAME" ILIKE '%%' || %(q)s || '%%'
          {role_sql}
        )
        SELECT
          r."pt" AS pt,
          COUNT(*) AS total
        FROM matched_isr m
        JOIN "SD_FAERS_DEMO" d ON d."ISR" = m."ISR"
        JOIN "SD_FAERS_REAC" r ON r."isr" = m."ISR"
        WHERE 1=1
          {date_guard}
          {year_sql}
        GROUP BY r."pt"
        ORDER BY total DESC
        LIMIT 10;
    """

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cur.execute(isr_count_sql, params)
        isr_count = cur.fetchone()["matched_isr_count"]

        cur.execute(yearly_total_sql, params)
        yearly_total = cur.fetchall()

        cur.execute(top_pt_sql, params)
        top_pts = cur.fetchall()

        return {
            "query": q,
            "role_filter": role_filter,
            "year_from": year_from,
            "year_to": year_to,
            "matched_isr_count": int(isr_count),
            "yearly_total": [
                {"year": int(r["year"]), "count": int(r["count"])}
                for r in yearly_total
            ],
            "top_pts": [
                {"pt": r["pt"], "total": int(r["total"])}
                for r in top_pts
            ],
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"FAERS summary failed: {str(e)}"
        )
    finally:
        cur.close()
        conn.close()


@router.get("/timeseries")
def faers_timeseries(
    q: str = Query(..., min_length=1),
    top: int = Query(5, ge=1, le=10),
    role_filter: str = Query("all"),
    year_from: Optional[int] = Query(None, ge=1900, le=2100),
    year_to: Optional[int] = Query(None, ge=1900, le=2100),
):
    top = _validate_top(top)

    params: Dict[str, Any] = {"q": q, "top": top}
    role_sql = build_role_filter_sql(role_filter)
    year_sql = build_year_filter_sql(params, year_from, year_to)

    date_guard = """
      AND d."FDA_DT" IS NOT NULL
      AND d."FDA_DT"::text ~ '^[0-9]{8}$'
    """

    sql = f"""
        WITH matched_isr AS (
          SELECT DISTINCT d2."ISR"
          FROM "SD_FAERS_DRUG" d2
          WHERE d2."DRUGNAME" ILIKE '%%' || %(q)s || '%%'
          {role_sql}
        ),
        base AS (
          SELECT
            EXTRACT(
              YEAR FROM to_date(d."FDA_DT"::text, 'YYYYMMDD')
            )::int AS year,
            r."pt" AS pt,
            COUNT(*) AS cnt
          FROM matched_isr m
          JOIN "SD_FAERS_DEMO" d ON d."ISR" = m."ISR"
          JOIN "SD_FAERS_REAC" r ON r."isr" = m."ISR"
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

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        cur.execute(sql, params)
        rows = cur.fetchall()

        years = sorted({int(r["year"]) for r in rows})
        pts = []
        for r in rows:
            if r["pt"] not in pts:
                pts.append(r["pt"])

        lookup = {(int(r["year"]), r["pt"]): int(r["cnt"]) for r in rows}

        series = []
        for pt in pts:
            data = [{"year": y, "count": lookup.get((y, pt), 0)} for y in years]
            series.append({"pt": pt, "data": data})

        return {
            "query": q,
            "top": top,
            "role_filter": role_filter,
            "year_from": year_from,
            "year_to": year_to,
            "years": years,
            "series": series,
            "rows": [
                {"year": int(r["year"]), "pt": r["pt"], "count": int(r["cnt"])}
                for r in rows
            ],
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"FAERS timeseries failed: {str(e)}"
        )
    finally:
        cur.close()
        conn.close()
