export type SafetyLetterFile = {
  size: number;
  s3_key: string;
  original_name: string;
};

export type SafetyLetter = {
  id: number;
  title: string;
  summary: string | null;
  department: string | null;
  notice_date: string | null; // "YYYY-MM-DD"
  files: SafetyLetterFile[] | null;
};

export type SafetyLetterListResponse = {
  total: number;
  items: SafetyLetter[];
};
