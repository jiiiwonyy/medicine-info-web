export type TabKey = 'effect' | 'usage' | 'caution' | 'dur';

export type DetailTab = {
  value: TabKey;
  label: string;
  id: string;
};

export interface SignalInfo {
  id: number;
  title: string;
  pdf_key: string;
  raw_filename: string;
  drug_name: string;
  created_at?: string | null;
}

export interface MedicineDetail {
  signal_infos: SignalInfo[];
}
