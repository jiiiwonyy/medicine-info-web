import api from '@/api/axiosInstance';

export async function fetchSignalInfoViewUrl(
  signalId: number,
): Promise<{ url: string }> {
  const res = await api.get<{ url: string }>(`/signal-infos/${signalId}/view`);
  return res.data;
}
