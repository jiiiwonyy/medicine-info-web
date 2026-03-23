import re
from difflib import SequenceMatcher
from psycopg2.extras import RealDictCursor
from typing import Optional, Tuple
from .database import get_connection
from bs4 import BeautifulSoup
import json

def insert_xml_detail(medicine_id: int, category: str, xml_raw: str):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO medicine_detail (medicine_id, category, xml_raw, updated_at)
        VALUES (%s, %s, %s, NOW())
        ON CONFLICT (medicine_id, category)
        DO UPDATE SET 
            xml_raw = EXCLUDED.xml_raw,
            updated_at = NOW();   -- ⭐ 중요!
        """,
        (medicine_id, category, xml_raw)
    )

    conn.commit()
    cur.close()
    conn.close()



def parse_xml_to_json(xml_string: str):
    soup = BeautifulSoup(xml_string, "xml")

    result = []

    sections = soup.find_all("SECTION")
    for sec in sections:
        articles = sec.find_all("ARTICLE")
        for art in articles:
            title = art.get("title", "") or ""
            items = []

            # ----------------------------------------
            # 1) ARTICLE 하위 모든 PARAGRAPH 처리 (recursive=True)
            # ----------------------------------------
            for p in art.find_all("PARAGRAPH"):
                tag_name = (p.get("tagName", "") or "").strip().lower()

                # ---------------------------
                # 1-1) 표 (tagName="table")
                # ---------------------------
                if tag_name == "table":
                    cdata_raw = p.string or ""
                    cdata_raw = cdata_raw.strip()

                    if cdata_raw:
                        table_soup = BeautifulSoup(cdata_raw, "html.parser")

                        # HTML 안에 <table>이 없으면 직접 wrapping
                        table_tag = table_soup.find("table")
                        if not table_tag:
                            tbody = table_soup.find("tbody")
                            if tbody:
                                # 테이블 생성 후 tbody 삽입
                                wrapper = BeautifulSoup("<table></table>", "html.parser")
                                wrapper.table.append(tbody)
                                table_tag = wrapper.table
                            else:
                                # tbody조차 없으면 raw를 그대로 저장(거의 없음)
                                table_tag = table_soup

                        items.append({
                            "type": "table",
                            "html": str(table_tag)
                        })
                    continue

                # ---------------------------
                # 1-2) 일반 텍스트 문단
                # ---------------------------
                if p.string:
                    raw_html = p.string
                else:
                    # CDATA가 아닌 일반 문단
                    raw_html = p.decode_contents()

                # HTML parser로 파싱하여 sup, br, strong 등 유지
                html_soup = BeautifulSoup(raw_html, "html.parser")
                paragraph_html = str(html_soup).strip()

                items.append({
                    "type": "text",
                    "html": paragraph_html
                })

            # ----------------------------------------
            # 2) ARTICLE 내부에 직접 TABLE 태그 존재하는 경우도 처리
            # ----------------------------------------
            for table in art.find_all("TABLE"):
                items.append({
                    "type": "table",
                    "html": str(table)
                })

            # ----------------------------------------
            # 3) ARTICLE 결과 저장
            # ----------------------------------------
            result.append({
                "title": title,
                "items": items
            })

    return result



def update_json_parsed(medicine_id: int):
    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("""
        SELECT category, xml_raw
        FROM medicine_detail
        WHERE medicine_id = %s
    """, (medicine_id,))

    rows = cur.fetchall()

    for row in rows:
        cat = row["category"]
        xml_raw = row["xml_raw"]

        parsed = parse_xml_to_json(xml_raw)

        cur.execute("""
            UPDATE medicine_detail
            SET 
                json_parsed = %s,
                parsed_at = NOW()
            WHERE medicine_id = %s AND category = %s
        """, (json.dumps(parsed, ensure_ascii=False), medicine_id, cat))

    conn.commit()
    cur.close()
    conn.close()

def get_signal_infos_by_medicine(cur, product_name: str, main_ingredient: str | None) -> list:
    conditions: list[str] = []
    params: list[str] = []

    if product_name:
        conditions.append("drug_name ILIKE %s")
        params.append(f"%{product_name}%")

    if main_ingredient:
        conditions.append("drug_name ILIKE %s")
        params.append(f"%{main_ingredient}%")

    if product_name:
        conditions.append("%s ILIKE '%%' || drug_name || '%%'")
        params.append(product_name)

    if main_ingredient:
        conditions.append("%s ILIKE '%%' || drug_name || '%%'")
        params.append(main_ingredient)

    raw_tokens: list[str] = []

    if main_ingredient:
        raw_tokens += re.split(r'[\s,/\-]+', main_ingredient)

    if product_name:
        raw_tokens += re.split(r'[\s,/\-]+', product_name)

    tokens = list({t.strip() for t in raw_tokens if len(t.strip()) >= 3})

    for t in tokens:
        conditions.append("drug_name ILIKE %s")
        params.append(f"%{t}%")

    if not conditions:
        return []

    cur.execute(f"""
        SELECT DISTINCT ON (id) id, title, pdf_key, raw_filename, drug_name, created_at
        FROM signal_info
        WHERE {" OR ".join(conditions)}
        ORDER BY id, created_at DESC
    """, params)

    return cur.fetchall()

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

    # ------------------------------------------------
    # 1) 기본 약 정보 조회
    # ------------------------------------------------
    cur.execute("SELECT * FROM medicine WHERE id = %s", (external_id,))
    medicine = cur.fetchone()
    if not medicine:
        cur.close()
        conn.close()
        return None

    # ------------------------------------------------
    # 2) XML 상세정보 조회
    # ------------------------------------------------
    cur.execute("""
        SELECT category, xml_raw, json_parsed
        FROM medicine_detail
        WHERE medicine_id = %s
    """, (external_id,))
    details = cur.fetchall() or []

    # 기본값은 medicine 테이블의 기존 컬럼
    # medicine["efficacy"]
    # medicine["dosage_and_administration"]
    # medicine["precautions"]

    # ------------------------------------------------
    # 3) XML 있으면 기존 컬럼 덮어쓰기
    # ------------------------------------------------
    for d in details:
        cat = d["category"]
        parsed = d["json_parsed"]

        if parsed:
            # JSON 파싱된 구조가 있는 경우
            if cat == "efficacy":
                medicine["efficacy"] = parsed
            elif cat == "dosage":
                medicine["dosage_and_administration"] = parsed
            elif cat == "warning":
                medicine["precautions"] = parsed

        else:
            # XML만 있고 parsing 안된 경우
            if cat == "efficacy":
                medicine["efficacy_xml_raw"] = d["xml_raw"]
            elif cat == "dosage":
                medicine["dosage_xml_raw"] = d["xml_raw"]
            elif cat == "warning":
                medicine["precautions_xml_raw"] = d["xml_raw"]

    # ------------------------------------------------
    # 4) DUR 로직 그대로 유지
    # ------------------------------------------------
    ko = medicine.get("main_ingredient", "") or ""
    en = medicine.get("main_ingredient_eng", "") or ""

    med_tokens = set()
    for part in re.split(r'[,\s/]+', ko):
        med_tokens |= norm_tokens(part)
    for part in re.split(r'[,\s/]+', en):
        med_tokens |= norm_tokens(part)

    if not med_tokens:
        medicine["dur"] = {"interactions": [], "age": [], "pregnancy": []}
        medicine["signal_infos"] = get_signal_infos_by_medicine(
            cur,
            product_name=medicine.get("product_name", "") or "",
            main_ingredient=medicine.get("main_ingredient"),
        )
        cur.close()
        conn.close()
        return medicine

    # 병용금기
    cur.execute("SELECT * FROM dur_interaction")
    all_interactions = cur.fetchall() or []
    dur_interactions = []
    for row in all_interactions:
        tokens = norm_tokens(row.get("ingredient_1", "")) | norm_tokens(row.get("ingredient_2", ""))
        if med_tokens & tokens:
            dur_interactions.append(row)

    # 연령금기
    cur.execute("SELECT * FROM dur_age")
    all_age = cur.fetchall() or []
    dur_age = []
    for row in all_age:
        toks = norm_tokens(row.get("ingredient_name", "") or "")
        if med_tokens & toks:
            dur_age.append(row)

    # 임부금기
    cur.execute("SELECT * FROM dur_pregnancy")
    all_preg = cur.fetchall() or []
    dur_preg = []
    for row in all_preg:
        toks = norm_tokens(row.get("ingredient_name", "") or "")
        if med_tokens & toks:
            dur_preg.append(row)

    medicine["dur"] = {
        "interactions": dur_interactions,
        "age": dur_age,
        "pregnancy": dur_preg,
    }

    medicine["signal_infos"] = get_signal_infos_by_medicine(
        cur,
        product_name=medicine.get("product_name", "") or "",
        main_ingredient=medicine.get("main_ingredient"),
    )

    cur.close()
    conn.close()
    return medicine

    
