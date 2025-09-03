from .database import supabase
import re
from difflib import SequenceMatcher

def search_medicines(q: str, type: str = 'product', limit: int = 200):
    if type == 'ingredient':
        filter_expr = f"주성분.ilike.%{q}%,주성분영문.ilike.%{q}%"
    else:
        filter_expr = f"제품명.ilike.%{q}%,제품영문명.ilike.%{q}%"

    resp = (
        supabase.table("medicines")
        .select("*")
        .or_(filter_expr)
        .limit(limit)
        .execute()
    )
    return resp.data


def norm_tokens(text: str) -> set[str]:
    if not text:
        return set()
    t = re.sub(r'[\(\)\[\]\{\}]', ' ', text)
    t = re.sub(r'[-_/+·∙,;]', ' ', t)
    t = re.sub(r'\s+', ' ', t).strip().lower()
    toks = {w for w in t.split(' ') if w}
    stop = {'anhydrous', 'hydrate', 'monohydrate', 'dihydrate',
            'sodium', 'potassium', 'calcium', 'hydrochloride'}
    return {w for w in toks if w not in stop}

def get_medicine_by_id(external_id: int):
    med_resp = (
        supabase.table("medicines")
        .select("*")
        .eq("id", external_id)
        .single()
        .execute()
    )
    med = med_resp.data
    if not med:
        return None

    ko = med.get("주성분", "") or ""
    en = med.get("주성분영문", "") or ""
    med_tokens = set()
    for part in re.split(r'[,\s/]+', ko):
        med_tokens |= norm_tokens(part)
    for part in en.split(','):
        med_tokens |= norm_tokens(part)

    if not med_tokens:
        print("❗ 주성분 없음")
        med["dur"] = {"interactions": [], "age": [], "pregnancy": []}
        return med

    tokens = list(med_tokens)

    interactions_resp = (
        supabase.table("dur_interactions")
        .select("*")
        .or_(",".join([f"유효성분1.ilike.%{t}%" for t in tokens] +
                      [f"유효성분2.ilike.%{t}%" for t in tokens]))
        .execute()
    )
    dur_comb = interactions_resp.data or []

    age_resp = (
        supabase.table("dur_age_limits")
        .select("*")
        .or_(",".join([f"성분명.ilike.%{t}%" for t in tokens]))
        .execute()
    )
    dur_age = age_resp.data or []

    preg_resp = (
        supabase.table("dur_pregnancy_warnings")
        .select("*")
        .or_(",".join([f"성분명.ilike.%{t}%" for t in tokens]))
        .execute()
    )
    dur_preg = preg_resp.data or []

    med["dur"] = {"interactions": dur_comb, "age": dur_age, "pregnancy": dur_preg}
    return med
