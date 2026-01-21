import api from '@/api/axiosInstance';

export type FaersSummaryResponse = {
  query: string;
  role_only_suspect: boolean;
  year_from: number | null;
  year_to: number | null;
  matched_isr_count: number;
  yearly_total: { year: number; count: number }[];
  top_pts: { pt: string; total: number }[];
};

export type FaersTimeseriesResponse = {
  query: string;
  top: number;
  role_only_suspect: boolean;
  year_from: number | null;
  year_to: number | null;
  years: number[];
  series: { pt: string; data: { year: number; count: number }[] }[];
  rows: { year: number; pt: string; count: number }[];
};

export async function getFaersSummary(params: {
  q: string;
  role_only_suspect?: boolean;
  year_from?: number;
  year_to?: number;
}) {
  const res = await api.get<FaersSummaryResponse>('/faers/summary', { params });
  return res.data;
}

export async function getFaersTimeseries(params: {
  q: string;
  top?: number;
  role_only_suspect?: boolean;
  year_from?: number;
  year_to?: number;
}) {
  const res = await api.get<FaersTimeseriesResponse>('/faers/timeseries', { params });
  return res.data;
}
