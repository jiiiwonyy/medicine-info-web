# app/main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from .crud import search_medicines, list_medicines, get_medicine_by_id
from .schemas import Medicine

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
    "http://127.0.0.1:5174",
    "https://medisafenurse.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
def healthz():
    return {"ok": True}

@app.get("/api/medicines")
def api_search_medicines(
    q: Optional[str] = Query(None, min_length=2),
    limit: int = Query(20, ge=1, le=100),
    last_id: Optional[int] = Query(None),
):
    if q:
        rows, total = search_medicines(q, limit, last_id)
    else:
        rows, total = list_medicines(limit, last_id)

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

@app.get("/api/medicines/{external_id}")
def api_detail(external_id: int):
    item = get_medicine_by_id(external_id)
    if not item:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return item
