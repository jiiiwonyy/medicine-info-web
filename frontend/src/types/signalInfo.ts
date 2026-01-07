export type SignalInfoItem = {
  id: number;
  title: string;
  raw_filename?: string | null;
  created_at?: string | null;
};

export type SignalInfoListResponse = {
  total: number;
  items: SignalInfoItem[];
};
