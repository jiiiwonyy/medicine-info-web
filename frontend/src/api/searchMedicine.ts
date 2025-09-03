import axios from 'axios';
import type { Medicine } from '../types/medicine';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

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
  const res = await api.get<SearchResponse>('/api/medicines', {
    params: { q, limit, last_id: lastId },
  });
  return res.data;
};

export async function getMedicineById(id: number): Promise<Medicine> {
  const res = await api.get<Medicine>(`/api/medicines/${id}`);
  return res.data;
}
