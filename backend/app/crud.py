from .database import get_connection
from typing import Optional, Tuple
import re

def search_medicines(q: str, limit: int = 20, last_id: Optional[int] = None) -> Tuple[list, int]:
    conn = get_connection()
    cur = conn.cursor()

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

    count_query = """
        SELECT COUNT(*) FROM medicine
        WHERE (
            product_name ILIKE %s OR
            product_name_eng ILIKE %s OR
            main_ingredient ILIKE %s OR
            main_ingredient_eng ILIKE %s
        )
    """
    cur.execute(count_query, [f"%{q}%"] * 4)
    total = cur.fetchone()["count"]

    cur.close()
    conn.close()
    return rows, total


def list_medicines(limit: int = 20, last_id: Optional[int] = None) -> Tuple[list, int]:
    conn = get_connection()
    cur = conn.cursor()

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


# ✅ DUR 정보 병합된 상세 조회
def get_medicine_by_id(external_id: int):
    conn = get_connection()
    cur = conn.cursor()

    # 1️⃣ 기본 약 정보
    cur.execute("SELECT * FROM medicine WHERE id = %s", (external_id,))
    row = cur.fetchone()

    if not row:
        cur.close()
        conn.close()
        return None

    # psycopg2 기본 cursor는 tuple 형태 → dict 형태로 변환 필요
    columns = [desc[0] for desc in cur.description]
    medicine = dict(zip(columns, row))

    main_ingredient = medicine.get("main_ingredient")

    # 2️⃣ DUR 데이터 조회 (main_ingredient 기준)
    # 병용금기
    cur.execute("""
        SELECT * FROM dur_interactions 
        WHERE ingredient_1 = %s OR ingredient_2 = %s
    """, (main_ingredient, main_ingredient))
    dur_interactions = [dict(zip([desc[0] for desc in cur.description], r)) for r in cur.fetchall()]

    # 연령금기
    cur.execute("""
        SELECT * FROM dur_age 
        WHERE ingredient_name = %s
    """, (main_ingredient,))
    dur_age = [dict(zip([desc[0] for desc in cur.description], r)) for r in cur.fetchall()]

    # 임부금기
    cur.execute("""
        SELECT * FROM dur_pregnancy 
        WHERE ingredient_name = %s
    """, (main_ingredient,))
    dur_pregnancy = [dict(zip([desc[0] for desc in cur.description], r)) for r in cur.fetchall()]

    # 3️⃣ 병합
    medicine["dur"] = {
        "interactions": dur_interactions,
        "age": dur_age,
        "pregnancy": dur_pregnancy,
    }

    cur.close()
    conn.close()
    return medicine
