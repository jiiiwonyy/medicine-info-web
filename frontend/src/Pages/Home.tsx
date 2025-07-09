import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMedicines } from '../api/searchMedicine';
import SearchBar from '../components/SearchBar';
import MedicineCard from '../components/MedicineCard';
import type { Medicine } from '../types/medicine';

export default function Home() {
  const [q, setQ] = useState<string>(''); // 검색어
  const [page, setPage] = useState<number>(1); // 페이지

  const {
    data: medicines,
    isLoading,
    isError,
    error,
  } = useQuery<Medicine[], Error>({
    queryKey: ['medicines', q, page],
    queryFn: () => searchMedicines(q, page, 20),
    enabled: q.length >= 2, // 이제 여기 에러 안 납니다!
  });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <SearchBar
        value={q}
        onChange={(v: string) => {
          setQ(v);
          setPage(1);
        }}
        placeholder="약 이름을 입력하세요 (최소 2글자)"
      />

      {isLoading && <p>🔄 검색 중…</p>}
      {isError && <p className="text-red-600">❗ 오류: {error?.message}</p>}

      <div className="mt-4 space-y-2">
        {medicines?.map((med: Medicine) => (
          <MedicineCard key={med.번호} medicine={med} />
        ))}
      </div>

      {/* 페이징 컨트롤 */}
      {medicines?.length === 20 && (
        <div className="mt-4 flex justify-between">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            이전
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
