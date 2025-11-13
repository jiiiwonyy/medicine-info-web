import re
from difflib import SequenceMatcher
from psycopg2.extras import RealDictCursor
from typing import Optional, Tuple
from .database import get_connection

def search_medicines(q: str, limit: int = 20, last_id: Optional[int] = None) -> Tuple[list, int]:
    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    base_query = """
        SELECT * FROM medicine
        WHERE (
            product_name ILIKE %s OR
            product_name_eng ILIKE %s OR
            main_ingredient ILIKE %s OR
            main_ingredient_eng ILIKE %s
        )
    """
    params = [f"%{q}%"] * 4

    if last_id:
        base_query += " AND id > %s"
        params.append(last_id)

    base_query += " ORDER BY id LIMIT %s"
    params.append(limit + 1)

    cur.execute(base_query, params)
    rows = cur.fetchall()

    cur.execute(
        """
        SELECT COUNT(*) FROM medicine
        WHERE (
            product_name ILIKE %s OR
            product_name_eng ILIKE %s OR
            main_ingredient ILIKE %s OR
            main_ingredient_eng ILIKE %s
        )
        """,
        [f"%{q}%"] * 4,
    )
    total = cur.fetchone()["count"]

    cur.close()
    conn.close()
    return rows, total

def list_medicines(limit: int = 20, last_id: Optional[int] = None) -> Tuple[list, int]:
    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    if last_id:
        cur.execute("SELECT * FROM medicine WHERE id > %s ORDER BY id LIMIT %s", (last_id, limit + 1))
    else:
        cur.execute("SELECT * FROM medicine ORDER BY id LIMIT %s", (limit + 1,))
    rows = cur.fetchall()

    cur.execute("SELECT COUNT(*) FROM medicine")
    total = cur.fetchone()["count"]

    cur.close()
    conn.close()
    return rows, total


def norm_tokens(text: str) -> set[str]:
    if not text:
        return set()
    # 괄호 제거
    t = re.sub(r'[\(\)\[\]\{\}]', ' ', text)
    # 구분자 제거
    t = re.sub(r'[-_/+·∙,;]', ' ', t)
    # 공백 정리 + 소문자화
    t = re.sub(r'\s+', ' ', t).strip().lower()

    toks = {w for w in t.split(' ') if w}

    # 필요 없는 화학 토큰 제거
    stop = {
        'anhydrous', 'hydrate', 'monohydrate', 'dihydrate',
        'sodium', 'potassium', 'calcium', 'hydrochloride',
        'acetate', 'chloride'
    }

    return {w for w in toks if w not in stop}


def get_medicine_by_id(external_id: int):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    # 1) 기본 약 정보
    cur.execute("SELECT * FROM medicine WHERE id = %s", (external_id,))
    medicine = cur.fetchone()
    if not medicine:
        cur.close()
        conn.close()
        return None

    # 약 성분 가져오기
    ko = medicine.get("main_ingredient", "") or ""
    en = medicine.get("main_ingredient_eng", "") or ""

    # 2) 약 성분 토큰화 (한글/영문/복합성분 모두)
    med_tokens = set()
    for part in re.split(r'[,\s/]+', ko):
        med_tokens |= norm_tokens(part)
    for part in re.split(r'[,\s/]+', en):
        med_tokens |= norm_tokens(part)

    if not med_tokens:
        medicine["dur"] = {"interactions": [], "age": [], "pregnancy": []}
        cur.close()
        conn.close()
        return medicine

    # ---------------------------------------------------------
    # 3) DUR: 병용금기 전체 조회 후 Python에서 토큰매칭
    # ---------------------------------------------------------
    cur.execute("SELECT * FROM dur_interaction")
    all_interactions = cur.fetchall() or []

    dur_interactions = []
    for row in all_interactions:
        s1 = row.get("ingredient_1", "") or ""
        s2 = row.get("ingredient_2", "") or ""

        row_tokens = norm_tokens(s1) | norm_tokens(s2)

        # 토큰 교집합 매칭
        if med_tokens & row_tokens:
            dur_interactions.append(row)

    # ---------------------------------------------------------
    # 4) DUR: 연령금기
    # ---------------------------------------------------------
    cur.execute("SELECT * FROM dur_age")
    all_age = cur.fetchall() or []

    dur_age = []
    for row in all_age:
        toks = norm_tokens(row.get("ingredient_name", "") or "")
        if med_tokens & toks:
            dur_age.append(row)

    # ---------------------------------------------------------
    # 5) DUR: 임부금기
    # ---------------------------------------------------------
    cur.execute("SELECT * FROM dur_pregnancy")
    all_preg = cur.fetchall() or []

    dur_preg = []
    for row in all_preg:
        toks = norm_tokens(row.get("ingredient_name", "") or "")
        if med_tokens & toks:
            dur_preg.append(row)

    # ---------------------------------------------------------
    # 6) 결과 병합
    # ---------------------------------------------------------
    medicine["dur"] = {
        "interactions": dur_interactions,
        "age": dur_age,
        "pregnancy": dur_preg,
    }

    cur.close()
    conn.close()
    return medicine
