import type { SignalInfoListResponse } from '@/types/signalInfo';

const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchSignalInfos(params: {
  limit?: number;
  offset?: number;
  q?: string;
}): Promise<SignalInfoListResponse> {
  const sp = new URLSearchParams();
  sp.set('limit', String(params.limit ?? 20));
  sp.set('offset', String(params.offset ?? 0));
  if (params.q) sp.set('q', params.q);

  const res = await fetch(`${API_BASE}/api/signal-infos?${sp.toString()}`);
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}

export async function fetchSignalInfoViewUrl(args: {
  signalId: number;
}): Promise<{ url: string }> {
  const res = await fetch(`${API_BASE}/api/signal-infos/${args.signalId}/view`);
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}

export async function fetchSignalInfoDownloadUrl(args: {
  signalId: number;
}): Promise<{ url: string }> {
  const res = await fetch(
    `${API_BASE}/api/signal-infos/${args.signalId}/download`,
  );
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}
