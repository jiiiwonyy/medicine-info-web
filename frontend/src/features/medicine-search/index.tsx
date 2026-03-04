import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import Spinner from '@/components/Spinner';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { useMedicineSearchInfinite } from '@/features/medicine-search/hooks/useMedicineSearchInfinite';
import MedicineResultTable from '@/features/medicine-search/components/MedicineResultTable';

export default function MedicineSearchResultPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const rawQuery = params.get('query') || '';
  const query = rawQuery.trim();

  const s = useMedicineSearchInfinite(query);

  const empty = s.medicines.length === 0;

  const goDetail = useCallback(
    (id: number) => navigate(`/medicines/${id}`),
    [navigate],
  );

  return (
    <PageLayout>
      <h2 className={cn(textStyles.titleXl, 'text-center mb-5')}>
        {query ? (
          <>
            통합검색 : <span className={textStyles.titleXl}>{rawQuery}</span>{' '}
            (으)로 검색한 결과입니다.
          </>
        ) : (
          '전체 의약품 목록'
        )}
      </h2>

      <h2 className={cn(textStyles.titleMd, 'text-primary mb-6')}>
        {query ? '검색결과 리스트' : '등록된 의약품 목록'} ( {s.total}개 )
      </h2>

      {(s.isFetching && empty) || s.error ? (
        <div className="flex justify-center my-10">
          <Spinner />
        </div>
      ) : (
        <MedicineResultTable
          medicines={s.medicines}
          empty={empty}
          onRowClick={goDetail}
        />
      )}

      <div ref={s.loadMoreRef} className="h-10" />

      {s.isFetchingNextPage && (
        <div className="flex justify-center my-4">
          <Spinner />
        </div>
      )}
    </PageLayout>
  );
}
