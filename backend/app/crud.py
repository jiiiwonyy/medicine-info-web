from .database import get_connection
from typing import Optional, Tuple
from psycopg2.extras import RealDictCursor


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


# ✅ DUR 정보까지 포함한 상세 조회 (공백무시 + 대소문자무시)
def get_medicine_by_id(external_id: int):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    # 1️⃣ 기본 약 정보
    cur.execute("SELECT * FROM medicine WHERE id = %s", (external_id,))
    medicine = cur.fetchone()

    if not medicine:
        cur.close()
        conn.close()
        return None

    main_ingredient = medicine.get("main_ingredient_eng")
    if not main_ingredient:
        medicine["dur"] = {"interactions": [], "age": [], "pregnancy": []}
        cur.close()
        conn.close()
        return medicine

    # 2️⃣ DUR 데이터 조회 (공백 무시 + 대소문자 무시)
    # 병용금기
    cur.execute(
        """
        SELECT * FROM dur_interaction
        WHERE 
            REPLACE(LOWER(ingredient_1), ' ', '') = REPLACE(LOWER(%s), ' ', '')
            OR
            REPLACE(LOWER(ingredient_2), ' ', '') = REPLACE(LOWER(%s), ' ', '')
        """,
        (main_ingredient, main_ingredient),
    )
    interactions = cur.fetchall()

    # 연령금기
    cur.execute(
        """
        SELECT * FROM dur_age
        WHERE 
            REPLACE(LOWER(ingredient_name), ' ', '') = REPLACE(LOWER(%s), ' ', '')
        """,
        (main_ingredient,),
    )
    age = cur.fetchall()

    # 임부금기
    cur.execute(
        """
        SELECT * FROM dur_pregnancy
        WHERE 
            REPLACE(LOWER(ingredient_name), ' ', '') = REPLACE(LOWER(%s), ' ', '')
        """,
        (main_ingredient,),
    )
    pregnancy = cur.fetchall()

    # 3️⃣ 병합 (Pydantic DURInfo 구조 맞추기)
    medicine["dur"] = {
        "interactions": interactions or [],
        "age": age or [],
        "pregnancy": pregnancy or [],
    }

    cur.close()
    conn.close()
    return medicine
