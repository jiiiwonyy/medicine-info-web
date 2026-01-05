import type { SafetyLetterListResponse } from '@/types/safetyLetter';

const API_BASE = import.meta.env.VITE_API_URL;

export async function fetchSafetyLetters(params: {
  limit?: number;
  offset?: number;
  q?: string;
}): Promise<SafetyLetterListResponse> {
  const sp = new URLSearchParams();
  sp.set('limit', String(params.limit ?? 20));
  sp.set('offset', String(params.offset ?? 0));
  if (params.q) sp.set('q', params.q);

  const res = await fetch(`${API_BASE}/api/safety-letters?${sp.toString()}`);
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}

export async function fetchSafetyLetterDownloadUrl(args: {
  letterId: number;
  fileIndex: number;
}): Promise<{ url: string }> {
  const res = await fetch(
    `${API_BASE}/api/safety-letters/${args.letterId}/files/${args.fileIndex}/download`,
  );
  if (!res.ok) throw new Error(`Failed: ${res.status}`);
  return res.json();
}
