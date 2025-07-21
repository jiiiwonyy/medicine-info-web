import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
import { searchMedicines } from '@/api/searchMedicine';
import Spinner from '@/components/Spinner';
import type { Medicine } from '@/types/medicine';

export default function Home() {
  const [q, setQ] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (q.trim().length < 2) return;
    setLoading(true);
    try {
      const result: Medicine[] = await searchMedicines(q, 1, 20);
      navigate(`/search?query=${encodeURIComponent(q)}`, { state: { result } });
    } catch (e) {
      console.error('검색 실패', e);
      alert('검색 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
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
      {loading && <Spinner />}
    </div>
  );
}
