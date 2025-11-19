from fastapi import APIRouter, UploadFile, Form, Header, HTTPException
from pydantic import BaseModel
import secrets
import os

from ..crud import insert_xml_detail, update_json_parsed

admin_router = APIRouter(prefix="/admin")

SESSIONS = {}  # {token: True}

def get_admin_password():
    """항상 .env에서 최신 값을 읽어오도록 한다"""
    return os.getenv("ADMIN_PASSWORD")

# ----------------------------
# 1) 관리자 로그인
# ----------------------------
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


# ----------------------------
# 2) XML 업로드
# ----------------------------
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
