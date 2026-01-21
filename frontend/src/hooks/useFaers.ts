import { useQuery } from '@tanstack/react-query';
import { getFaersSummary, getFaersTimeseries } from '@/api/fda';

export type RoleFilter =
  | 'all'
  | 'suspect'
  | 'ps'
  | 'ss'
  | 'c'
  | 'i'
  | 'dn'
  | 'raw_all';

export function useFaersSummaryQuery(params: {
  drug: string;
  enabled?: boolean;
  role_filter?: RoleFilter;
  year_from?: number;
  year_to?: number;
}) {
  const {
    drug,
    enabled = true,
    role_filter = 'all',
    year_from,
    year_to,
  } = params;

  const canFetch = enabled && !!drug?.trim();

  return useQuery({
    queryKey: ['faers', 'summary', drug, role_filter, year_from ?? null, year_to ?? null],
    queryFn: () =>
      getFaersSummary({
        drug,
        role_filter,
        year_from,
        year_to,
      }),
    enabled: canFetch,
    staleTime: 1000 * 60 * 10,
  });
}

export function useFaersTimeseriesQuery(params: {
  drug: string;
  enabled?: boolean;
  top?: number;
  role_filter?: RoleFilter;
  year_from?: number;
  year_to?: number;
}) {
  const {
    drug,
    enabled = true,
    top = 5,
    role_filter = 'all',
    year_from,
    year_to,
  } = params;

  const canFetch = enabled && !!drug?.trim();

  return useQuery({
    queryKey: ['faers', 'timeseries', drug, top, role_filter, year_from ?? null, year_to ?? null],
    queryFn: () =>
      getFaersTimeseries({
        drug,
        top,
        role_filter,
        year_from,
        year_to,
      }),
    enabled: canFetch,
    staleTime: 1000 * 60 * 10,
  });
}
