from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings
from typing import List, Literal, Optional

from .schemas import Medicine
from .crud import search_medicines, get_medicine_by_id

class Settings(BaseSettings):
    ENV: Literal["local", "dev", "prod"] = "local"
    FRONTEND_URL: Optional[str] = None          
    ALLOW_ORIGIN_REGEX: Optional[str] = r"https://.*\.vercel\.app$"  
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

SearchType = Literal["product", "ingredient", "all"]

class SearchResponse(BaseModel):
    items: List[Medicine]
    page: int = Field(1, ge=1)
    limit: int = Field(20, ge=1, le=100)
    total: Optional[int] = Field(0, ge=0)
    has_next: bool = False

@app.get("/healthz")
def healthz():
    return {"ok": True, "env": settings.ENV}

@app.get("/version")
def version():
    return {"version": app.version}

@app.get("/api/medicines/search", response_model=SearchResponse)
def api_search_meta(
    q: str = Query(..., min_length=2),
    type: SearchType = Query("product"),
    limit: int = Query(20, ge=1, le=100),
    page: int = Query(1, ge=1),
):
    offset = (page - 1) * limit

    rows = search_medicines(q, type=type, limit=limit + 1, offset=offset)
    has_next = len(rows) > limit
    items = rows[:limit]

    return SearchResponse(
        items=items,
        page=page,
        limit=limit,
        total=None,          
        has_next=has_next,
    )

@app.get("/api/medicines", response_model=List[Medicine])
def api_search_legacy(
    q: str = Query(..., min_length=2),
    type: SearchType = Query("product"),
    limit: int = Query(20, ge=1, le=100),
    page: int = Query(1, ge=1),
):
    items = search_medicines(q, type=type, limit=limit, offset=(page - 1) * limit)
    return items

@app.get("/api/medicines/{external_id}", response_model=Medicine)
def api_detail(external_id: int):
    item = get_medicine_by_id(external_id)
    if not item:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return item
