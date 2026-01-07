import os
import re
import uuid
import boto3
import unicodedata

from app.database import get_connection

AWS_REGION = os.getenv("AWS_REGION", "ap-northeast-2")
S3_BUCKET = os.getenv("S3_BUCKET_NAME")
S3_PREFIX = (os.getenv("S3_SIGNAL_PREFIX", "signal-info") or "").strip("/")
LOCAL_DIR = os.getenv("LOCAL_SIGNAL_PDF_DIR")  # 로컬 폴더 경로

if not S3_BUCKET:
    raise RuntimeError("S3_BUCKET_NAME env is required")
if not LOCAL_DIR or not os.path.isdir(LOCAL_DIR):
    raise RuntimeError("LOCAL_SIGNAL_PDF_DIR env is required and must be a directory")

s3 = boto3.client("s3", region_name=AWS_REGION)


def normalize_title(filename: str) -> str:
    name = re.sub(r"\.pdf$", "", filename, flags=re.IGNORECASE)
    name = name.replace("_", " ").replace("-", " ")
    name = re.sub(r"\s+", " ", name).strip()
    return name or "실마리정보"


def main():
    pdfs = sorted([f for f in os.listdir(LOCAL_DIR) if f.lower().endswith(".pdf")])
    if not pdfs:
        print("No pdfs found.")
        return

    conn = get_connection()
    cur = conn.cursor()

    for raw in pdfs:
        # ✅ 파일명/제목 먼저 만들기
        raw_norm = unicodedata.normalize("NFC", raw)
        title = normalize_title(raw_norm)
        title_norm = unicodedata.normalize("NFC", title)

        key = f"{S3_PREFIX}/{uuid.uuid4()}.pdf".replace("//", "/")
        path = os.path.join(LOCAL_DIR, raw)  # 실제 파일 경로는 원래 파일명으로 접근

        # S3 업로드
        s3.upload_file(
            Filename=path,
            Bucket=S3_BUCKET,
            Key=key,
            ExtraArgs={"ContentType": "application/pdf"},
        )

        # DB 저장
        cur.execute(
            """
            INSERT INTO signal_info (title, pdf_key, raw_filename)
            VALUES (%s, %s, %s)
            ON CONFLICT (pdf_key) DO NOTHING
            """,
            (title_norm, key, raw_norm),
        )

        print(f"[OK] {raw} -> s3://{S3_BUCKET}/{key}")

    conn.commit()
    cur.close()
    conn.close()
    print("DONE")


if __name__ == "__main__":
    main()
