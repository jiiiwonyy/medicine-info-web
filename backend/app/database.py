import psycopg2
from psycopg2.extras import RealDictCursor
from pydantic_settings import BaseSettings
from typing import Literal, Optional

class Settings(BaseSettings):
    ENV: Literal["local", "dev", "prod"] = "local"

    # ✅ CORS / 기타 환경용
    FRONTEND_URL: Optional[str] = None
    ALLOW_ORIGIN_REGEX: Optional[str] = None

    # ✅ PostgreSQL 연결용
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str

    # ✅ (만약 DATABASE_URL을 직접 쓰는 경우 대비)
    DATABASE_URL: Optional[str] = None

    class Config:
        env_file = ".env"
        extra = "ignore"  # ✅ 추가 환경변수가 있어도 무시하도록 설정

settings = Settings()

def get_connection():
    try:
        conn = psycopg2.connect(
            host=settings.DB_HOST,
            port=settings.DB_PORT,
            dbname=settings.DB_NAME,
            user=settings.DB_USER,
            password=settings.DB_PASSWORD,
            cursor_factory=RealDictCursor,
        )
        return conn
    except Exception as e:
        print("❌ 데이터베이스 연결 실패:", e)
        raise
