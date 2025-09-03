import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Medicine } from '../types/medicine';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { searchMedicines } from '@/api/searchMedicine';
import type { AxiosError } from 'axios';

export default function SearchResult() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const rawQuery = params.get('query') || '';
  const query = rawQuery.trim();

  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query.length < 2) {
      setMedicines([]);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      const [byProduct, byIngredient] = await Promise.allSettled([
        searchMedicines(query, 'product', 20),
        searchMedicines(query, 'ingredient', 20),
      ]);

      if (cancelled) return;

      const productList =
        byProduct.status === 'fulfilled' ? byProduct.value : [];
      const ingredientList =
        byIngredient.status === 'fulfilled' ? byIngredient.value : [];

      const mergedMap = new Map<number, Medicine>();
      for (const item of [...productList, ...ingredientList]) {
        mergedMap.set(item.id, item);
      }
      const merged = Array.from(mergedMap.values());

      const q = query.toLowerCase();
      const score = (m: Medicine) => {
        const name = (m.제품명 || '').toLowerCase();
        const eng = (m.제품영문명 || '').toLowerCase();
        const ing = (m.주성분 || '').toLowerCase();
        const eff = (m.효능효과 || '').toLowerCase();
        let s = 0;
        if (name.startsWith(q)) s += 6;
        if (name.includes(q)) s += 3;
        if (eng.includes(q)) s += 2;
        if (ing.includes(q)) s += 2;
        if (eff.includes(q)) s += 1;
        return s;
      };
      merged.sort((a, b) => score(b) - score(a));

      setMedicines(merged);
      if (merged.length === 0) setError('검색 결과가 없습니다.');
    })()
      .catch((err) => {
        if (cancelled) return;
        const axiosErr = err as AxiosError;
        const status = axiosErr.response?.status;
        if (status === 404) setError('검색 결과가 없습니다.');
        else setError('검색 중 오류가 발생했습니다.');
        setMedicines([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="p-6">
      <h2 className="text-center text-xl mb-5">
        통합검색 : <span className="font-semibold">{rawQuery}</span> (으)로
        검색한 결과입니다.
      </h2>
      <h3 className="text-lg font-bold text-sky-600 mb-4">
        검색결과 리스트 ( {medicines.length}개 )
      </h3>

      {loading ? (
        <div className="flex justify-center my-10">
          <Spinner />
        </div>
      ) : (
        <div className="overflow-x-auto border rounded min-h-[100px] flex items-center justify-center">
          {medicines.length === 0 && error ? (
            <div className="text-gray-500 text-center p-4">
              검색 결과가 없습니다.
            </div>
          ) : (
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">제품명</th>
                  <th className="p-2 border">제품영문명</th>
                  <th className="p-2 border">주성분</th>
                  <th className="p-2 border">효능</th>
                  <th className="p-2 border">회사명</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr
                    key={med.id}
                    onClick={() => navigate(`/medicines/${med.id}`)}
                    className="hover:bg-sky-100 cursor-pointer"
                  >
                    <td className="p-2 border font-medium">{med.제품명}</td>
                    <td className="p-2 border">{med.제품영문명}</td>
                    <td className="p-2 border">{med.주성분}</td>
                    <td className="p-2 border">
                      {med.효능효과
                        ? med.효능효과.length > 30
                          ? med.효능효과.slice(0, 30) + '…'
                          : med.효능효과
                        : '-'}
                    </td>
                    <td className="p-2 border">{med.업체명}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
