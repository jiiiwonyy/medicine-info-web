# app/routers/safety_letters.py
from fastapi import APIRouter, Query, HTTPException
from typing import Any, Dict, List, Optional
from datetime import date
import json
import os
import boto3
import urllib.parse

from app.database import get_connection

router = APIRouter(prefix="/api/safety-letters", tags=["SafetyLetters"])

def _ensure_json_obj(v):
    # psycopg2에서 jsonb가 dict/list로 바로 오기도 하고,
    # 문자열로 오는 경우도 있어서 안전하게 처리
    if v is None:
        return []
    if isinstance(v, (list, dict)):
        return v
    if isinstance(v, str):
        try:
            return json.loads(v)
        except Exception:
            return []
    return []

@router.get("")
def list_safety_letters(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    q: Optional[str] = Query(None, description="title/summary 검색"),
):
    conn = get_connection()
    cur = conn.cursor()

    where = ""
    params: List[Any] = []

    if q:
        where = "WHERE (title ILIKE %s OR summary ILIKE %s)"
        params.extend([f"%{q}%", f"%{q}%"])

    # total
    cur.execute(f"SELECT COUNT(*) FROM safety_letter {where}", params)
    total = cur.fetchone()[0]

    # items
    cur.execute(
        f"""
        SELECT id, title, summary, department, notice_date, files
        FROM safety_letter
        {where}
        ORDER BY notice_date DESC NULLS LAST, id DESC
        LIMIT %s OFFSET %s
        """,
        params + [limit, offset],
    )
    rows = cur.fetchall()

    items = []
    for r in rows:
        # cursor_factory=RealDictCursor가 아니라면 tuple로 옴 -> 인덱스 기반
        # id,title,summary,department,notice_date,files 순서
        files = _ensure_json_obj(r[5])
        items.append(
            {
                "id": r[0],
                "title": r[1],
                "summary": r[2],
                "department": r[3],
                "notice_date": r[4].isoformat() if isinstance(r[4], date) and r[4] else None,
                "files": files,
            }
        )

    cur.close()
    conn.close()

    return {"total": total, "items": items}

def _get_s3_client():
    region = os.getenv("AWS_REGION", "ap-northeast-2")
    return boto3.client("s3", region_name=region)

def _presigned_url(key: str, filename: str):
    bucket = os.getenv("S3_BUCKET_NAME")
    prefix = os.getenv("S3_SAFETY_PREFIX", "safety-letters").strip("/")
    expires = int(os.getenv("PRESIGNED_EXPIRES_SECONDS", "300"))

    if not bucket:
        raise HTTPException(status_code=500, detail="S3_BUCKET_NAME is not set")

    # key가 prefix 없이 저장된 경우도 대비해서 보정
    if not key.startswith(prefix + "/"):
        key = f"{prefix}/{key.lstrip('/')}"
    key = key.replace("//", "/")

    s3 = _get_s3_client()

    # 파일명이 한글이면 Content-Disposition에서 깨질 수 있어서 RFC5987 방식으로 넣음
    quoted = urllib.parse.quote(filename)
    content_disp = f"attachment; filename*=UTF-8''{quoted}"

    return s3.generate_presigned_url(
        ClientMethod="get_object",
        Params={
            "Bucket": bucket,
            "Key": key,
            "ResponseContentDisposition": content_disp,
        },
        ExpiresIn=expires,
    )

@router.get("/{letter_id}/files/{file_index}/download")
def download_safety_letter_file(letter_id: int, file_index: int):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT files FROM safety_letter WHERE id = %s", (letter_id,))
    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Safety letter not found")

    files = _ensure_json_obj(row[0])
    if not isinstance(files, list) or len(files) == 0:
        raise HTTPException(status_code=404, detail="No files for this letter")

    if file_index < 0 or file_index >= len(files):
        raise HTTPException(status_code=400, detail="Invalid file index")

    f = files[file_index]
    name = f.get("name")
    key = f.get("key")
    if not name or not key:
        raise HTTPException(status_code=500, detail="Invalid files metadata")

    url = _presigned_url(key=key, filename=name)
    return {"url": url}