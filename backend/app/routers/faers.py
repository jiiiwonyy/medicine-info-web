from fastapi import APIRouter, Query, HTTPException
from psycopg2.extras import RealDictCursor
from typing import Optional, List, Dict, Any

from ..database import get_connection

router = APIRouter(prefix="/api/faers", tags=["FAERS"])


def _validate_top(top: int) -> int:
    if top < 1:
        return 1
    if top > 10:
        return 10
    return top


@router.get("/summary")
def faers_summary(
    q: str = Query(..., min_length=1, description="약물명(부분일치). SD_FAERS_DRUG.DRUGNAME에서 검색"),
    role_only_suspect: bool = Query(True, description="True면 ROLE_COD in ('PS','SS')만 사용"),
    year_from: Optional[int] = Query(None, ge=1900, le=2100),
    year_to: Optional[int] = Query(None, ge=1900, le=2100),
):
    """
    - drugname으로 ISR 매칭
    - DEMO(FDA_DT) 기반으로 연도별 총 보고 건수(레코드 기준, isr+pt 조합)
    - 전체 기간 Top PT (총합 기준) 목록 제공
    """
    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    role_filter_sql = ""
    if role_only_suspect:
        role_filter_sql = "AND d2.role_cod IN ('PS','SS')"

    year_filter_sql = ""
    params: Dict[str, Any] = {"q": q}

    # 연도 필터는 FDA_DT로 계산한 year에 적용
    if year_from is not None:
        year_filter_sql += " AND EXTRACT(YEAR FROM to_date(d.fda_dt::text, 'YYYYMMDD'))::int >= %(year_from)s"
        params["year_from"] = year_from
    if year_to is not None:
        year_filter_sql += " AND EXTRACT(YEAR FROM to_date(d.fda_dt::text, 'YYYYMMDD'))::int <= %(year_to)s"
        params["year_to"] = year_to

    # 1) 매칭된 ISR 개수
    isr_count_sql = f"""
        SELECT COUNT(DISTINCT d2.isr) AS matched_isr_count
        FROM sd_faers_drug d2
        WHERE d2.drugname ILIKE '%%' || %(q)s || '%%'
        {role_filter_sql}
    """

    # 2) 연도별 총 보고 건수 (isr+pt 레코드 카운트 기준)
    yearly_total_sql = f"""
        WITH matched_isr AS (
          SELECT DISTINCT d2.isr
          FROM sd_faers_drug d2
          WHERE d2.drugname ILIKE '%%' || %(q)s || '%%'
          {role_filter_sql}
        )
        SELECT
          EXTRACT(YEAR FROM to_date(d.fda_dt::text, 'YYYYMMDD'))::int AS year,
          COUNT(*) AS count
        FROM matched_isr m
        JOIN sd_faers_demo d ON d.isr = m.isr
        JOIN sd_faers_reac r ON r.isr = m.isr
        WHERE d.fda_dt IS NOT NULL
        {year_filter_sql}
        GROUP BY year
        ORDER BY year;
    """

    # 3) Top PT (전체 기간 합계 기준)
    top_pt_sql = f"""
        WITH matched_isr AS (
          SELECT DISTINCT d2.isr
          FROM sd_faers_drug d2
          WHERE d2.drugname ILIKE '%%' || %(q)s || '%%'
          {role_filter_sql}
        )
        SELECT
          r.pt AS pt,
          COUNT(*) AS total
        FROM matched_isr m
        JOIN sd_faers_demo d ON d.isr = m.isr
        JOIN sd_faers_reac r ON r.isr = m.isr
        WHERE d.fda_dt IS NOT NULL
        {year_filter_sql}
        GROUP BY r.pt
        ORDER BY total DESC
        LIMIT 10;
    """

    try:
        cur.execute(isr_count_sql, params)
        isr_count_row = cur.fetchone() or {"matched_isr_count": 0}

        cur.execute(yearly_total_sql, params)
        yearly_total = cur.fetchall()

        cur.execute(top_pt_sql, params)
        top_pts = cur.fetchall()

        return {
            "query": q,
            "role_only_suspect": role_only_suspect,
            "year_from": year_from,
            "year_to": year_to,
            "matched_isr_count": int(isr_count_row["matched_isr_count"]),
            "yearly_total": [{"year": int(r["year"]), "count": int(r["count"])} for r in yearly_total],
            "top_pts": [{"pt": r["pt"], "total": int(r["total"])} for r in top_pts],
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FAERS summary query failed: {str(e)}")
    finally:
        cur.close()
        conn.close()


@router.get("/timeseries")
def faers_timeseries(
    q: str = Query(..., min_length=1),
    top: int = Query(5, ge=1, le=10, description="상위 PT 개수 (1~10)"),
    role_only_suspect: bool = Query(True),
    year_from: Optional[int] = Query(None, ge=1900, le=2100),
    year_to: Optional[int] = Query(None, ge=1900, le=2100),
):
    """
    - Top N PT를 전체 기간 합계 기준으로 선정
    - 그 PT들에 대해 연도별 count 반환 (그래프용)
    """
    top = _validate_top(top)

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    role_filter_sql = ""
    if role_only_suspect:
        role_filter_sql = "AND d2.role_cod IN ('PS','SS')"

    year_filter_sql = ""
    params: Dict[str, Any] = {"q": q, "top": top}

    if year_from is not None:
        year_filter_sql += " AND EXTRACT(YEAR FROM to_date(d.fda_dt::text, 'YYYYMMDD'))::int >= %(year_from)s"
        params["year_from"] = year_from
    if year_to is not None:
        year_filter_sql += " AND EXTRACT(YEAR FROM to_date(d.fda_dt::text, 'YYYYMMDD'))::int <= %(year_to)s"
        params["year_to"] = year_to

    sql = f"""
        WITH matched_isr AS (
          SELECT DISTINCT d2.isr
          FROM sd_faers_drug d2
          WHERE d2.drugname ILIKE '%%' || %(q)s || '%%'
          {role_filter_sql}
        ),
        base AS (
          SELECT
            EXTRACT(YEAR FROM to_date(d.fda_dt::text, 'YYYYMMDD'))::int AS year,
            r.pt AS pt,
            COUNT(*) AS cnt
          FROM matched_isr m
          JOIN sd_faers_demo d ON d.isr = m.isr
          JOIN sd_faers_reac r ON r.isr = m.isr
          WHERE d.fda_dt IS NOT NULL
          {year_filter_sql}
          GROUP BY year, r.pt
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

    try:
        cur.execute(sql, params)
        rows = cur.fetchall()

        # years 배열 + series 형태로도 같이 제공
        years = sorted({int(r["year"]) for r in rows})
        pts = []
        for r in rows:
            if r["pt"] not in pts:
                pts.append(r["pt"])

        # (year, pt) -> count
        lookup = {(int(r["year"]), r["pt"]): int(r["cnt"]) for r in rows}

        series = []
        for pt in pts:
            data = []
            for y in years:
                data.append({"year": y, "count": lookup.get((y, pt), 0)})
            series.append({"pt": pt, "data": data})

        return {
            "query": q,
            "top": top,
            "role_only_suspect": role_only_suspect,
            "year_from": year_from,
            "year_to": year_to,
            "years": years,
            "series": series,
            "rows": [{"year": int(r["year"]), "pt": r["pt"], "count": int(r["cnt"])} for r in rows],
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"FAERS timeseries query failed: {str(e)}")
    finally:
        cur.close()
        conn.close()
