export type StepKey = 'prescribing' | 'administration' | 'monitoring';

export type StepTheme = {
  border: string;
  headerBg: string;
  headerText: string;
  chip: string;
  chipText: string;
  dot: string;
  focusRing: string;
};

export type StepMeta = {
  key: StepKey;
  title: string;
  badge: string;
  theme: StepTheme;
};
