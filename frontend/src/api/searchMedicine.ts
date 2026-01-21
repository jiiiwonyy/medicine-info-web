import api from '@/api/axiosInstance';
import type { Medicine } from '../types/medicine';

export interface SearchResponse {
  items: Medicine[];
  limit: number;
  last_id?: number;
  has_next: boolean;
  total: number;
}

export const searchMedicines = async (
  q: string,
  limit: number = 20,
  lastId?: number,
): Promise<SearchResponse> => {
  const params: Record<string, any> = { limit, last_id: lastId };

  if (q && q.trim() !== '') {
    params.q = q.trim();
  }

  const res = await api.get<SearchResponse>('/medicines', { params });
  return res.data;
};

export async function getMedicineById(id: number): Promise<Medicine> {
  const res = await api.get<Medicine>(`/medicines/${id}`);
  return res.data;
}
