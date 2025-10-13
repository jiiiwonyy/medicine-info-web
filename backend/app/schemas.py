from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class DURInfo(BaseModel):
    interactions: List[Dict[str, Any]] = []
    age: List[Dict[str, Any]] = []
    pregnancy: List[Dict[str, Any]] = []

class Medicine(BaseModel):
    id: int
    item_code: Optional[int] = None
    product_name: Optional[str] = None
    category: Optional[str] = None
    order_no: Optional[int] = None
    product_name_eng: Optional[str] = None
    company_name: Optional[str] = None
    company_name_eng: Optional[str] = None
    approval_date: Optional[str] = None
    product_type: Optional[str] = None
    seq_no: Optional[int] = None
    approval_no: Optional[str] = None
    cancel_status: Optional[str] = None
    cancel_date: Optional[str] = None
    main_ingredient: Optional[str] = None
    additive: Optional[str] = None
    classification: Optional[str] = None
    prescription_type: Optional[str] = None
    formulation_type: Optional[str] = None
    approval_or_report: Optional[str] = None
    manufacture_or_import: Optional[str] = None
    narcotic_class: Optional[str] = None
    shape: Optional[str] = None
    color: Optional[str] = None
    dosage_form: Optional[str] = None
    new_drug_flag: Optional[str] = None
    standard_code: Optional[str] = None
    atc_code: Optional[str] = None
    e_drug_info: Optional[str] = None
    import_country: Optional[str] = None
    main_ingredient_eng: Optional[str] = None
    raw_material: Optional[str] = None
    efficacy: Optional[str] = None
    dosage_and_administration: Optional[str] = None
    precautions: Optional[str] = None
    dur: Optional[DURInfo] = None

    class Config:
        from_attributes = True
