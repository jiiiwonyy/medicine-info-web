import api from '@/api/axiosInstance';
import type { SafetyLetterListResponse } from '@/types/safetyLetter';

export async function fetchSafetyLetters(params: {
  limit?: number;
  offset?: number;
  q?: string;
}): Promise<SafetyLetterListResponse> {
  const res = await api.get<SafetyLetterListResponse>('/safety-letters', { params });
  return res.data;
}

export async function fetchSafetyLetterDownloadUrl(args: {
  letterId: number;
  fileIndex: number;
}): Promise<{ url: string }> {
  const res = await api.get<{ url: string }>(
    `/safety-letters/${args.letterId}/files/${args.fileIndex}/download`,
  );
  return res.data;
}
