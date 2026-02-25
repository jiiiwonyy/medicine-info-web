import api from '@/api/axiosInstance';
import type { SignalInfoListResponse } from '@/types/signalInfo';

export async function fetchSignalInfos(params: {
  limit?: number;
  offset?: number;
  q?: string;
}): Promise<SignalInfoListResponse> {
  const res = await api.get<SignalInfoListResponse>('/signal-infos', { params });
  return res.data;
}

export async function fetchSignalInfoViewUrl(args: {
  signalId: number;
}): Promise<{ url: string }> {
  const res = await api.get<{ url: string }>(`/signal-infos/${args.signalId}/view`);
  return res.data;
}

export async function fetchSignalInfoDownloadUrl(args: {
  signalId: number;
}): Promise<{ url: string }> {
  const res = await api.get<{ url: string }>(
    `/signal-infos/${args.signalId}/download`,
  );
  return res.data;
}
