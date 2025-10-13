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


def get_medicine_by_id(external_id: int):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM medicine WHERE id = %s", (external_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    return row
