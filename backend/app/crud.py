from .database import supabase
import re
from difflib import SequenceMatcher

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

def norm_tokens(text: str) -> set[str]:
    if not text:
        return set()
    # 괄호/구분자 → 공백
    t = re.sub(r'[\(\)\[\]\{\}]', ' ', text)
    t = re.sub(r'[-_/+·∙,;]', ' ', t)
    t = re.sub(r'\s+', ' ', t).strip().lower()
    toks = {w for w in t.split(' ') if w}
    # 의미 약한 토큰 제거(필요시 조정)
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
    # 약 성분 토큰 통합(영/한 모두)
    med_tokens = set()
    for part in re.split(r'[,\s/]+', ko):
        med_tokens |= norm_tokens(part)
    for part in en.split(','):
        med_tokens |= norm_tokens(part)

    print("✅ 약 성분 토큰:", med_tokens)
    if not med_tokens:
        print("❗ 주성분 없음")
        med["dur"] = {"interactions": [], "age": [], "pregnancy": []}
        return med

    # --- 병용금기(행 토큰화 + 교집합) ---
    interactions_resp = supabase.table("dur_interactions").select("*").execute()
    all_rows = interactions_resp.data or []
    print("📦 dur_interactions 총 행 수:", len(all_rows))

    dur_comb = []
    debug_samples = 0
    for row in all_rows:
        s1 = row.get("유효성분1", "") or row.get("substance1", "") or ""
        s2 = row.get("유효성분2", "") or row.get("substance2", "") or ""
        row_tokens = norm_tokens(s1) | norm_tokens(s2)

        if med_tokens & row_tokens:
            dur_comb.append(row)
        elif debug_samples < 3:
            # 매칭 안 된 샘플 디버깅(유사도 큰 토큰도 힌트)
            sim_hints = []
            for mt in med_tokens:
                for rt in row_tokens:
                    if max(len(mt), len(rt)) >= 6:
                        r = SequenceMatcher(None, mt, rt).ratio()
                        if r >= 0.8:
                            sim_hints.append((mt, rt, round(r, 2)))
            print("🧐 미매칭 샘플:",
                  {"row_tokens": sorted(list(row_tokens))[:8],
                   "similarity_hints": sim_hints[:5]})
            debug_samples += 1

    # --- 연령금기 ---
    age_resp = supabase.table("dur_age_limits").select("*").execute()
    dur_age = []
    for row in (age_resp.data or []):
        if med_tokens & norm_tokens(row.get("성분명", "") or row.get("substance", "") or ""):
            dur_age.append(row)

    # --- 임부금기 ---
    preg_resp = supabase.table("dur_pregnancy_warnings").select("*").execute()
    dur_preg = []
    for row in (preg_resp.data or []):
        if med_tokens & norm_tokens(row.get("성분명", "") or row.get("substance", "") or ""):
            dur_preg.append(row)

    med["dur"] = {"interactions": dur_comb, "age": dur_age, "pregnancy": dur_preg}

    print("🔍 병용금기 개수:", len(dur_comb))
    print("🔍 연령금기 개수:", len(dur_age))
    print("🔍 임부금기 개수:", len(dur_preg))
    return med

