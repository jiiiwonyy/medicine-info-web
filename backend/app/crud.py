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


def get_medicine_by_id(external_id: int):
    resp = (
        supabase
        .table("medicines")
        .select("*")
        .eq("번호", external_id)
        .single()
        .execute()
    )
    return resp.data
