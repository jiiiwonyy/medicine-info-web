from .database import supabase

def search_medicines(q: str, limit: int = 20, offset: int = 0):
    resp = (
        supabase
        .table("medicines")
        .select("*")
        .ilike("제품명", f"%{q}%")
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
