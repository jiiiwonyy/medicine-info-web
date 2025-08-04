from .database import supabase

def search_medicines(q: str, type: str = 'product', limit: int = 20, offset: int = 0):
    if type == 'ingredient':
        filter_expr = f"주성분.ilike.%{q}%,주성분영문.ilike.%{q}%"
    else:
        filter_expr = f"제품명.ilike.%{q}%,제품영문명.ilike.%{q}%"

    resp = (
        supabase
        .table("medicines")
        .select("*")
        .or_(filter_expr)
        .limit(limit)
        .offset(offset)
        .execute()
    )
    return resp.data

def search_medicines(q: str, type: str = 'product', limit: int = 20, offset: int = 0):
    if type == 'ingredient':
        filter_expr = f"주성분.ilike.%{q}%,주성분영문.ilike.%{q}%"
    else:
        filter_expr = f"제품명.ilike.%{q}%,제품영문명.ilike.%{q}%"

    resp = (
        supabase
        .table("medicines")
        .select("*")
        .or_(filter_expr)
        .limit(limit)
        .offset(offset)
        .execute()
    )
    return resp.data


from .database import supabase

def get_medicine_by_id(external_id: int):
    med_resp = (
        supabase
        .table("medicines")
        .select("*")
        .eq("id", external_id)
        .single()
        .execute()
    )
    med = med_resp.data
    if not med:
        return None

    substance_raw = med.get("주성분영문", "")
    if not substance_raw:
        print("❗ 주성분 없음")
        med["dur"] = {}
        return med

    # 주성분 전처리: comma → split → strip + lower
    substances = [s.strip().lower() for s in substance_raw.split(",") if s.strip()]
    # 추가로 각 성분 띄어쓰기 분리까지 해서 전체 token set 생성
    tokens = set()
    for s in substances:
        tokens.update(s.split())  # e.g. "acamprosate calcium" → {"acamprosate", "calcium"}

    print("✅ 주성분 토큰 목록:", tokens)

    # 병용금기
    interactions_resp = (
        supabase.table("dur_interactions")
        .select("*")
        .execute()
    )
    dur_comb = [
        row for row in interactions_resp.data
        if any(
            t in (row.get("유효성분1", "").lower() + " " + row.get("유효성분2", "").lower())
            for t in tokens
        )
    ]

    # 연령금기
    age_resp = (
        supabase.table("dur_age_limits")
        .select("*")
        .execute()
    )
    dur_age = [
        row for row in age_resp.data
        if any(t in row.get("성분명", "").lower() for t in tokens)
    ]

    # 임부금기
    preg_resp = (
        supabase.table("dur_pregnancy_warnings")
        .select("*")
        .execute()
    )
    dur_preg = [
        row for row in preg_resp.data
        if any(t in row.get("성분명", "").lower() for t in tokens)
    ]

    med["dur"] = {
        "interactions": dur_comb,
        "age": dur_age,
        "pregnancy": dur_preg
    }

    print("🔍 병용금기:", dur_comb)
    print("🔍 연령금기:", dur_age)
    print("🔍 임부금기:", dur_preg)

    return med
