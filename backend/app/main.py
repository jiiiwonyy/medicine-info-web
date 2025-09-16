from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings
from typing import List, Literal, Optional
from .database import supabase
from .schemas import Medicine
from .crud import search_medicines, get_medicine_by_id, list_medicines

class Settings(BaseSettings):
    ENV: Literal["local", "dev", "prod"] = "local"
    FRONTEND_URL: Optional[str] = None
    ALLOW_ORIGIN_REGEX: Optional[str] = r"https://.*\.vercel\.app$"
    
    supabase_url: Optional[str] = None
    supabase_service_key: Optional[str] = None

    class Config:
        env_file = ".env"


settings = Settings()

app = FastAPI(
    title="Medicine API",
    version="1.0.0",
    openapi_url="/openapi.json",
    docs_url="/docs",
    redoc_url="/redoc",
)

allow_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173", 
    "http://127.0.0.1:4173",
    "https://medisafenurse.vercel.app",
]
if settings.FRONTEND_URL:
    allow_origins.append(settings.FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_origin_regex=settings.ALLOW_ORIGIN_REGEX, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SearchType = Literal["product", "ingredient"]

class SearchResponse(BaseModel):
    items: List[Medicine]
    limit: int = Field(20, ge=1, le=100)
    last_id: Optional[int] = None
    has_next: bool = False
    total: int = 0

@app.get("/healthz")
def healthz():
    return {"ok": True, "env": settings.ENV}

@app.get("/version")
def version():
    return {"version": app.version}

@app.get("/api/medicines", response_model=SearchResponse)
def api_search_medicines(
    q: Optional[str] = Query(None, min_length=2),
    limit: int = Query(20, ge=1, le=100),
    last_id: Optional[int] = Query(None),
):
    if q and len(q.strip())>=2:
        # 검색
        total_resp = (
            supabase.table("medicines")
            .select("id", count="exact")
            .or_(...)
            .execute()
        )
        total = total_resp.count or 0
        rows = search_medicines(q, limit=limit + 1, last_id=last_id)
    else:
        # 전체 조회
        total_resp = supabase.table("medicines").select("id", count="exact").execute()
        total = total_resp.count or 0
        rows = list_medicines(limit=limit + 1, last_id=last_id)

    has_next = len(rows) > limit
    items = rows[:limit]
    next_last_id = items[-1]["id"] if items else None

    return {
        "items": items,
        "limit": limit,
        "last_id": next_last_id,
        "has_next": has_next,
        "total": total,
    }


@app.get("/api/medicines/{external_id}", response_model=Medicine)
def api_detail(external_id: int):
    item = get_medicine_by_id(external_id)
    if not item:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return item
