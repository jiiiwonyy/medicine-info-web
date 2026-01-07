# app/routers/signal_infos.py
from fastapi import APIRouter, Query, HTTPException
from typing import Any, List, Optional
from datetime import datetime
import os
import boto3
import urllib.parse

from app.database import get_connection

router = APIRouter(prefix="/api/signal-infos", tags=["SignalInfos"])


def _get_s3_client():
    region = os.getenv("AWS_REGION", "ap-northeast-2")
    return boto3.client("s3", region_name=region)


def _presigned_url(key: str, filename: str, disposition: str):
    bucket = os.getenv("S3_BUCKET_NAME")
    prefix = (os.getenv("S3_SIGNAL_PREFIX", "signal-info") or "").strip("/")
    expires = int(os.getenv("PRESIGNED_EXPIRES_SECONDS", "300"))

    if not bucket:
        raise HTTPException(status_code=500, detail="S3_BUCKET_NAME is not set")

    if disposition not in ("inline", "attachment"):
        raise HTTPException(status_code=400, detail="Invalid disposition")

    # key가 prefix 없이 저장된 경우 대비
    if prefix and not key.startswith(prefix + "/"):
        key = f"{prefix}/{key.lstrip('/')}"
    key = key.replace("//", "/")

    s3 = _get_s3_client()

    quoted = urllib.parse.quote(filename)
    content_disp = f"{disposition}; filename*=UTF-8''{quoted}"

    return s3.generate_presigned_url(
        ClientMethod="get_object",
        Params={
            "Bucket": bucket,
            "Key": key,
            "ResponseContentDisposition": content_disp,
            "ResponseContentType": "application/pdf",
        },
        ExpiresIn=expires,
    )


@router.get("")
def list_signal_infos(
    limit: int = Query(20, ge=1, le=100),
    offset: int = Query(0, ge=0),
    q: Optional[str] = Query(None, description="title 검색"),
):
    conn = get_connection()
    cur = conn.cursor()

    where = ""
    params: List[Any] = []

    if q:
        where = "WHERE (title ILIKE %s)"
        params.append(f"%{q}%")

    cur.execute(f"SELECT COUNT(*) AS cnt FROM signal_info {where}", params)
    total_row = cur.fetchone()
    total = total_row["cnt"] if total_row else 0

    cur.execute(
        f"""
        SELECT id, title, raw_filename, created_at
        FROM signal_info
        {where}
        ORDER BY created_at DESC, id DESC
        LIMIT %s OFFSET %s
        """,
        params + [limit, offset],
    )
    rows = cur.fetchall()

    items = []
    for r in rows:
        ca = r.get("created_at")
        items.append(
            {
                "id": r.get("id"),
                "title": r.get("title"),
                "raw_filename": r.get("raw_filename"),
                "created_at": ca.isoformat() if isinstance(ca, datetime) and ca else None,
            }
        )

    cur.close()
    conn.close()

    return {"total": total, "items": items}


@router.get("/{signal_id}/view")
def view_signal_info(signal_id: int):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT title, pdf_key, raw_filename FROM signal_info WHERE id = %s",
        (signal_id,),
    )
    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Signal info not found")

    pdf_key = row.get("pdf_key")
    if not pdf_key:
        raise HTTPException(status_code=500, detail="Invalid pdf_key")

    filename = row.get("raw_filename") or f'{row.get("title") or "signal-info"}.pdf'
    if not filename.lower().endswith(".pdf"):
        filename += ".pdf"

    url = _presigned_url(pdf_key, filename, disposition="inline")
    return {"url": url}


@router.get("/{signal_id}/download")
def download_signal_info(signal_id: int):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "SELECT title, pdf_key, raw_filename FROM signal_info WHERE id = %s",
        (signal_id,),
    )
    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        raise HTTPException(status_code=404, detail="Signal info not found")

    pdf_key = row.get("pdf_key")
    if not pdf_key:
        raise HTTPException(status_code=500, detail="Invalid pdf_key")

    filename = row.get("raw_filename") or f'{row.get("title") or "signal-info"}.pdf'
    if not filename.lower().endswith(".pdf"):
        filename += ".pdf"

    url = _presigned_url(pdf_key, filename, disposition="attachment")
    return {"url": url}
