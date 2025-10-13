export interface DURInteraction {
  id?: number;
  ingredient_1?: string;
  ingredient_2?: string;
  remarks?: string;
  approval_info?: string;
}

export interface DURAgeLimit {
  id?: number;
  ingredient_name?: string;
  age_criteria?: string;
  dosage_form?: string;
  approval_info?: string;
}

export interface DURPregnancyWarning {
  id?: number;
  ingredient_name?: string;
  pregnancy_risk_grade?: string;
  approval_info?: string;
}

export interface DurData {
  interactions: DURInteraction[];
  age: DURAgeLimit[];
  pregnancy: DURPregnancyWarning[];
}
