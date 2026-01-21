import { useQuery } from '@tanstack/react-query';
import { getFaersSummary, getFaersTimeseries } from '@/api/fda';

export function useFaersSummaryQuery(params: {
  q: string;
  enabled?: boolean;
  role_only_suspect?: boolean;
  year_from?: number;
  year_to?: number;
}) {
  const { enabled = true, ...rest } = params;
  return useQuery({
    queryKey: ['faers', 'summary', rest],
    queryFn: () => getFaersSummary(rest),
    enabled: enabled && !!rest.q?.trim(),
    staleTime: 1000 * 60 * 10,
  });
}

export function useFaersTimeseriesQuery(params: {
  q: string;
  enabled?: boolean;
  top?: number;
  role_only_suspect?: boolean;
  year_from?: number;
  year_to?: number;
}) {
  const { enabled = true, ...rest } = params;
  return useQuery({
    queryKey: ['faers', 'timeseries', rest],
    queryFn: () => getFaersTimeseries(rest),
    enabled: enabled && !!rest.q?.trim(),
    staleTime: 1000 * 60 * 10,
  });
}
