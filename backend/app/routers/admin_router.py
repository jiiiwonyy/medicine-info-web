from fastapi import APIRouter, UploadFile, Form, Header, HTTPException, Request
from pydantic import BaseModel
import secrets
import os
from ..database import get_connection
from ..crud import insert_xml_detail, update_json_parsed
from psycopg2.extras import RealDictCursor

admin_router = APIRouter(prefix="/admin")

SESSIONS = {}

def get_admin_password():
    return os.getenv("ADMIN_PASSWORD")

def check_admin(request: Request):
    token = request.headers.get("x-admin-token")
    if token not in SESSIONS:
        raise HTTPException(status_code=401, detail="Unauthorized")

# 로그인
class LoginRequest(BaseModel):
    password: str

@admin_router.post("/login")
def admin_login(req: LoginRequest):
    expected_pw = get_admin_password()

    if req.password != expected_pw:
        return {"success": False}

    token = secrets.token_hex(32)
    SESSIONS[token] = True
    return {"success": True, "token": token}


# XML 업로드
@admin_router.post("/upload-xml")
async def upload_xml(
    medicine_id: int = Form(...),
    category: str = Form(...),
    file: UploadFile = Form(...),
    token: str = Header(None, alias="x-admin-token")
):
    if token not in SESSIONS:
        raise HTTPException(status_code=401, detail="Unauthorized")

    xml_text = (await file.read()).decode("utf-8")
    insert_xml_detail(medicine_id, category, xml_text)
    update_json_parsed(medicine_id)

    return {"status": "success"}


# 전체 재파싱
@admin_router.post("/reparse-all")
def reparse_all(request: Request):
    check_admin(request)

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("SELECT DISTINCT medicine_id FROM medicine_detail")
    ids = [row["medicine_id"] for row in cur.fetchall()]

    for mid in ids:
        update_json_parsed(mid)

    cur.close()
    conn.close()

    return {"ok": True, "updated": len(ids)}
