from fastapi import APIRouter, UploadFile, Form, Header, HTTPException, Request
from pydantic import BaseModel
import secrets
import os

from ..database import get_connection
from ..crud import insert_xml_detail, update_json_parsed

from psycopg2.extras import RealDictCursor

admin_router = APIRouter(prefix="/admin")

SESSIONS = {}  # {token: True}


def get_admin_password():
    """항상 .env에서 최신 값을 읽어오도록 한다"""
    return os.getenv("ADMIN_PASSWORD")


# --------------------------------------------------------
# 공통: 관리자 인증
# --------------------------------------------------------
def check_admin(request: Request):
    token = request.headers.get("x-admin-token")
    if not token or token not in SESSIONS:
        raise HTTPException(status_code=401, detail="Unauthorized")


# --------------------------------------------------------
# 1) 관리자 로그인
# --------------------------------------------------------
class LoginRequest(BaseModel):
    password: str


@admin_router.post("/login")
def admin_login(req: LoginRequest):

    expected_pw = get_admin_password()
    print("💡 ADMIN_PASSWORD from env:", expected_pw)
    print("💡 entered:", req.password)

    if req.password != expected_pw:
        return {"success": False}

    token = secrets.token_hex(32)
    SESSIONS[token] = True

    return {"success": True, "token": token}


# --------------------------------------------------------
# 2) XML 업로드
# --------------------------------------------------------
@admin_router.post("/upload-xml")
async def upload_xml(
    medicine_id: int = Form(...),
    category: str = Form(...),
    file: UploadFile = Form(...),
    token: str = Header(None, alias="x-admin-token")
):
    # 세션 토큰 확인
    if token not in SESSIONS:
        raise HTTPException(status_code=401, detail="Unauthorized")

    xml_text = (await file.read()).decode("utf-8")

    # DB Insert
    insert_xml_detail(medicine_id, category, xml_text)

    # JSON 변환
    update_json_parsed(medicine_id)

    return {
        "status": "success",
        "medicine_id": medicine_id,
        "category": category
    }


# --------------------------------------------------------
# 3) 전체 XML 재파싱
# --------------------------------------------------------
@admin_router.post("/reparse-all")
def reparse_all(request: Request):
    check_admin(request)

    conn = get_connection()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    cur.execute("SELECT DISTINCT medicine_id FROM medicine_detail")
    ids = [row["medicine_id"] for row in cur.fetchall()]  # ✔ FIXED

    for mid in ids:
        update_json_parsed(mid)

    cur.close()
    conn.close()

    return {"ok": True, "updated": len(ids)}
