import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import type { Medicine } from '../types/medicine';
import SearchBar from '@/components/SearchBar';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { searchMedicines } from '@/api/searchMedicine';

export default function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [q, setQ] = useState<string>('');
  const [params] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const query = params.get('query') || '';

  const [medicines, setMedicines] = useState<Medicine[]>(
    (location.state as { result?: Medicine[] })?.result || [],
  );

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setMedicines([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await searchMedicines(query, 1, 20);
        setMedicines(result);
      } catch (e) {
        console.error('검색 실패', e);
        setMedicines([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  const handleSearch = async () => {
    if (q.trim().length < 2) return;
    navigate(`/search?query=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full mt-5">
        <h1
          onClick={() => navigate('/')}
          className="text-3xl md:text-4xl font-bold mb-6 cursor-pointer hover:text-green-600 transition-colors"
        >
          약 정보 검색 사이트
        </h1>

        <SearchBar
          id="medicine-search-bar"
          value={q}
          onChange={(v: string) => setQ(v)}
          onSearch={handleSearch}
          placeholder="약 이름을 입력하세요 (최소 2글자)"
        />
      </div>

      <div className="p-15">
        <h2 className="text-center text-xl mb-5">
          통합검색 : {query} (으)로 검색한 결과입니다.
        </h2>
        <h3 className="text-lg font-bold text-green-600 mb-4">
          검색결과 리스트 ( {medicines.length}개 )
        </h3>
        {loading ? (
          <Spinner />
        ) : medicines.length === 0 ? (
          <div className="text-center text-gray-500 mt-30">
            검색 결과가 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border">제품명</th>
                  <th className="p-2 border">주성분</th>
                  <th className="p-2 border">효능</th>
                  <th className="p-2 border">회사명</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr
                    key={med.번호}
                    onClick={() => navigate(`/medicines/${med.번호}`)}
                    className="hover:bg-green-100 cursor-pointer"
                  >
                    <td className="p-2 border font-medium">{med.제품명}</td>
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
          </div>
        )}
      </div>
    </>
  );
}
