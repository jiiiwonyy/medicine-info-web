import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Medicine } from '../types/medicine';
import { useEffect, useRef } from 'react';
import Spinner from '@/components/Spinner';
import { searchMedicines } from '@/api/searchMedicine';
import type { SearchResponse } from '@/api/searchMedicine';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import PageLayout from '@/components/PageLayout';

export default function SearchResult() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const rawQuery = params.get('query') || '';
  const query = rawQuery.trim();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery<SearchResponse>({
    queryKey: ['medicines', debouncedQuery],
    queryFn: ({ pageParam }) =>
      searchMedicines(debouncedQuery, 20, pageParam as number | undefined),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.has_next ? lastPage.last_id : undefined,
    enabled: debouncedQuery === '' || debouncedQuery.length >= 2,
    staleTime: 5000,
  });

  const medicines: Medicine[] = data
    ? data.pages.flatMap((page) => page.items)
    : [];

  const total = data?.pages[0]?.total ?? 0;

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <PageLayout>
      <h2 className="text-center text-xl mb-5">
        {query ? (
          <>
            통합검색 : <span className="font-semibold">{rawQuery}</span> (으)로
            검색한 결과입니다.
          </>
        ) : (
          '전체 의약품 목록'
        )}
      </h2>

      <h3 className="text-lg font-bold text-sky-600 mb-4">
        {query ? '검색결과 리스트' : '등록된 의약품 목록'} ( {total}개 )
      </h3>

      {(isFetching && medicines.length === 0) || error ? (
        <div className="flex justify-center my-10">
          <Spinner />
        </div>
      ) : (
        <div
          className={`overflow-x-auto border rounded ${
            medicines.length === 0
              ? 'min-h-[100px] flex items-center justify-center'
              : ''
          }`}
        >
          {medicines.length === 0 ? (
            <div className="text-gray-500 text-center p-4">
              검색 결과가 없습니다.
            </div>
          ) : (
            <table className="min-w-full table-fixed border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left h-[48px]">
                  <th className="p-2 border w-[200px]">제품명</th>
                  <th className="p-2 border w-[180px]">제품영문명</th>
                  <th className="p-2 border w-[200px]">주성분</th>
                  <th className="p-2 border w-[250px]">효능</th>
                  <th className="p-2 border w-[150px]">회사명</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((med) => (
                  <tr
                    key={med.id}
                    onClick={() => navigate(`/medicines/${med.id}`)}
                    className="hover:bg-sky-100 cursor-pointer h-[72px]"
                  >
                    <td className="p-2 border w-[200px] max-w-[200px] truncate">
                      {med.product_name}
                    </td>
                    <td className="p-2 border w-[180px] max-w-[180px] truncate">
                      {med.product_name_eng}
                    </td>
                    <td className="p-2 border w-[200px] max-w-[200px] truncate">
                      {med.main_ingredient}
                    </td>
                    <td
                      className="p-2 border w-[250px] max-w-[250px] h-[72px] overflow-hidden"
                      title={med.efficacy}
                    >
                      <div className="line-clamp-3">{med.efficacy || '-'}</div>
                    </td>
                    <td className="p-2 border w-[150px] max-w-[150px] truncate">
                      {med.company_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      <div ref={loadMoreRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="flex justify-center my-4">
          <Spinner />
        </div>
      )}
    </PageLayout>
  );
}
