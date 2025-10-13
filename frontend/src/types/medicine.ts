export interface Medicine {
  id: number;
  item_code: number;
  product_name: string;
  category?: string;
  order_no?: number;
  product_name_eng?: string;
  company_name?: string;
  company_name_eng?: string;
  approval_date?: string;
  product_type?: string;
  main_ingredient?: string;
  additive?: string;
  classification?: string;
  prescription_type?: string;
  formulation_type?: string;
  approval_or_report?: string;
  manufacture_or_import?: string;
  narcotic_class?: string;
  dosage_form?: string;
  new_drug_flag?: string;
  atc_code?: string;
  import_country?: string;
  main_ingredient_eng?: string;
  raw_material?: string;
  efficacy?: string;
  dosage_and_administration?: string;
  precautions?: string;
  dur?: {
    interactions: any[];
    age: any[];
    pregnancy: any[];
  };
}
