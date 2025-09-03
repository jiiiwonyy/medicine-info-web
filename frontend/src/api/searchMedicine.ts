import axios from 'axios';
import type { Medicine } from '../types/medicine';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export const searchMedicines = (
  q: string,
  type: 'product' | 'ingredient' = 'product',
  limit: number = 20,
) =>
  api
    .get<Medicine[]>('/api/medicines', {
      params: { q, type, limit },
    })
    .then((res) => res.data);

export async function getMedicineById(id: number): Promise<Medicine> {
  const res = await api.get<Medicine>(`/api/medicines/${id}`);
  return res.data;
}
