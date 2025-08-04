import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Medicine } from '../types/medicine';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { searchMedicines } from '@/api/searchMedicine';
import type { AxiosError } from 'axios';

export default function SearchResult() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const query = params.get('query') || '';
  const type = params.get('type') || 'product';

  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await searchMedicines(
          query,
          1,
          20,
          type as 'product' | 'ingredient',
        );

        setMedicines(result);
        if (result.length === 0) {
          setError('검색 결과가 없습니다.');
        }
      } catch (err) {
        const axiosErr = err as AxiosError;
        const status = axiosErr.response?.status;
        if (status === 404) {
          setError('검색 결과가 없습니다.');
        } else {
          setError('검색 중 오류가 발생했습니다.');
        }
        setMedicines([]);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim().length >= 2) fetchData();
  }, [query, type]);

  return (
    <div className="p-6">
      <h2 className="text-center text-xl mb-5">
        통합검색 : <span className="font-semibold">{query}</span> (으)로 검색한
        결과입니다.
      </h2>
      <h3 className="text-lg font-bold text-green-600 mb-4">
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
                    className="hover:bg-green-100 cursor-pointer"
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
