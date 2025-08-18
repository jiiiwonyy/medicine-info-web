import axios from 'axios';
import type { Medicine } from '../types/medicine';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

/**
 * @param q 검색어 (최소 2글자)
 * @param page 페이지 번호 (1-based)
 * @param limit 한 페이지당 가져올 개수
 */
export const searchMedicines = (
  q: string,
  page: number = 1,
  limit: number = 20,
  type: 'product' | 'ingredient' = 'product',
) =>
  api
    .get<Medicine[]>('/api/medicines', {
      params: { q, page, limit, type },
    })
    .then((res) => res.data);

export async function getMedicineById(id: number): Promise<Medicine> {
  const res = await api.get<Medicine>(`/api/medicines/${id}`);
  return res.data;
}
