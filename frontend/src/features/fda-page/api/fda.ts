import api from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

/** 백엔드 role_filter와 동일 */
export type RoleFilter =
  | 'all'
  | 'suspect'
  | 'ps'
  | 'ss'
  | 'c'
  | 'i'
  | 'dn'
  | 'raw_all';

export type FaersSummaryResponse = {
  drug: string;
  drug_norm: string;
  role_filter: RoleFilter;
  year_from: number | null;
  year_to: number | null;
  matched_isr_count: number;
  yearly_total: { year: number; count: number }[];
  top_pts: { pt: string; total: number }[];
};

export type FaersTimeseriesResponse = {
  drug: string;
  drug_norm: string;
  top: number;
  role_filter: RoleFilter;
  year_from: number | null;
  year_to: number | null;
  years: number[];
  series: { pt: string; data: { year: number; count: number }[] }[];
  rows?: { year: number; pt: string; count: number }[];
};

export async function getFaersSummary(params: {
  drug: string;
  role_filter?: RoleFilter;
  year_from?: number;
  year_to?: number;
}) {
  const res = await api.get<FaersSummaryResponse>('/faers/summary', { params });
  return res.data;
}

export async function getFaersTimeseries(params: {
  drug: string;
  top?: number;
  role_filter?: RoleFilter;
  year_from?: number;
  year_to?: number;
}) {
  const res = await api.get<FaersTimeseriesResponse>('/faers/timeseries', { params });
  return res.data;
}

export type FaersSuggestResponse = {
  query: string;
  items: string[];
};

export function useFaersSuggestQuery(params: {
  q: string;
  enabled: boolean;
  limit?: number;
}) {
  const { q, enabled, limit = 30 } = params;

  return useQuery({
    queryKey: ['faers', 'suggest', q, limit],
    enabled,
    queryFn: async () => {
      const res = await api.get<FaersSuggestResponse>('/faers/suggest', {
        params: { q, limit },
      });
      return res.data;
    },
    staleTime: 60_000,
  });
}
