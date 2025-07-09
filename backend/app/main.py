from fastapi import FastAPI, HTTPException, Query
from typing import List
from .schemas import Medicine
from .crud import search_medicines, get_medicine_by_id
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/medicines", response_model=List[Medicine])
def api_search(q: str = Query(..., min_length=2), limit: int = 20, page: int = 1):
    items = search_medicines(q, limit=limit, offset=(page-1)*limit)
    if not items:
        raise HTTPException(status_code=404, detail="No medicines found")
    return items

@app.get("/api/medicines/{external_id}", response_model=Medicine)
def api_detail(external_id: int):
    item = get_medicine_by_id(external_id)
    if not item:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return item
