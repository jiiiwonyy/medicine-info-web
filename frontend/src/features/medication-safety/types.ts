export type WhoAreaKey = 'highRisk' | 'polypharmacy' | 'transition';

export type HamCategoryKey =
  | 'electrolytes'
  | 'anticoagulants'
  | 'antineoplastics'
  | 'diabetes'
  | 'immunosuppressants'
  | 'sedatives';

export type HamCategory = {
  key: HamCategoryKey;
  label: string;
  items: string[];
};

export type WhoArea = {
  key: WhoAreaKey;
  title: string;
  subtitle: string;
  bullets: string[];
};
