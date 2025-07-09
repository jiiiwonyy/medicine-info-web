# app/schemas.py

from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class Medicine(BaseModel):
    번호: int
    품목기준코드: int
    제품명: str
    구분: int
    순서: int
    제품영문명: Optional[str]
    업체명: Optional[str]
    업체영문명: Optional[str]
    허가일: Optional[date]
    품목구분: Optional[str]
    순번_1: Optional[int] = Field(None, alias="순번.1")
    허가번호: Optional[int]
    취소_취하: Optional[str] = Field(None, alias="취소/취하")
    취소_취하일자: Optional[date] = Field(None, alias="취소/취하일자")
    주성분: Optional[str]
    첨가제: Optional[str]
    품목분류: Optional[str]
    전문의약품: Optional[str]
    완제_원료: Optional[str] = Field(None, alias="완제/원료")
    허가_신고: Optional[str] = Field(None, alias="허가/신고")
    제조_수입: Optional[str] = Field(None, alias="제조/수입")
    마약구분: Optional[str]
    모양: Optional[str]
    색상: Optional[str]
    제형: Optional[str]
    장축: Optional[float]
    단축: Optional[float]
    신약구분: Optional[str]
    표준코드명: Optional[str]
    ATC코드: Optional[str]
    묶음의약품정보: Optional[float]
    e은약요: Optional[str]
    수입제조국: Optional[str]
    주성분영문: Optional[str]
    원료: Optional[str]
    효능효과: Optional[str]
    용법용량: Optional[str]
    주의사항: Optional[str]

    class Config:
        allow_population_by_field_name = True
        orm_mode = True
