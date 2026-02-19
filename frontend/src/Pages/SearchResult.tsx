import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Medicine } from '../types/medicine';
import { useEffect, useMemo, useRef, useCallback } from 'react';
import Spinner from '@/components/Spinner';
import { searchMedicines } from '@/api/searchMedicine';
import type { SearchResponse } from '@/api/searchMedicine';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from '@/hooks/useDebounce';
import PageLayout from '@/components/PageLayout';
import { textStyles } from '@/styles/typography';
import { cn } from '@/shared/cn';
import {
  TableWrap,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
} from '@/components/ui/Table';

type Column = {
  key: keyof Medicine;
  label: string;
  width: string;
  maxWidth: string;
  clamp?: boolean;
  title?: boolean;
};

const COLUMNS: Column[] = [
  {
    key: 'product_name',
    label: '제품명',
    width: 'w-[200px]',
    maxWidth: 'max-w-[200px]',
    clamp: true,
  },
  {
    key: 'product_name_eng',
    label: '제품영문명',
    width: 'w-[180px]',
    maxWidth: 'max-w-[180px]',
    clamp: true,
  },
  {
    key: 'main_ingredient',
    label: '주성분',
    width: 'w-[200px]',
    maxWidth: 'max-w-[200px]',
    clamp: true,
  },
  {
    key: 'efficacy',
    label: '효능',
    width: 'w-[250px]',
    maxWidth: 'max-w-[250px]',
    clamp: true,
    title: true,
  },
  {
    key: 'company_name',
    label: '회사명',
    width: 'w-[150px]',
    maxWidth: 'max-w-[150px]',
  },
];

function CellText({ value }: { value: unknown }) {
  return (
    <div className="line-clamp-3 whitespace-normal break-words">
      {String(value ?? '-') || '-'}
    </div>
  );
}

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

  const medicines: Medicine[] = useMemo(
    () => (data ? data.pages.flatMap((page) => page.items) : []),
    [data],
  );

  const total = data?.pages[0]?.total ?? 0;
  const empty = medicines.length === 0;

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const target = loadMoreRef.current;
    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        {query ? '검색결과 리스트' : '등록된 의약품 목록'} ( {total}개 )
      </h2>

      {(isFetching && empty) || error ? (
        <div className="flex justify-center my-10">
          <Spinner />
        </div>
      ) : (
        <TableWrap
          className={cn(
            'rounded-[var(--radius-lg)] border-2 border-border bg-surface',
            empty && 'min-h-[100px] flex items-center justify-center',
          )}
        >
          {empty ? (
            <div className="text-muted-fg text-center p-4">
              검색 결과가 없습니다.
            </div>
          ) : (
            <Table className="table-fixed border-0">
              <THead>
                <Tr className="bg-primary-100 h-[48px]">
                  {COLUMNS.map((c) => (
                    <Th key={c.key} className={cn(c.width, c.maxWidth)}>
                      {c.label}
                    </Th>
                  ))}
                </Tr>
              </THead>

              <TBody>
                {medicines.map((med) => (
                  <Tr
                    key={med.id}
                    onClick={() => goDetail(med.id)}
                    className="cursor-pointer h-[72px] hover:bg-primary-50"
                  >
                    {COLUMNS.map((c) => {
                      const value = (med as any)[c.key] ?? '-';

                      return (
                        <Td
                          key={c.key}
                          className={cn(
                            c.width,
                            c.maxWidth,
                            c.key === 'efficacy' && 'h-[72px] overflow-hidden',
                          )}
                          nowrap={c.key !== 'efficacy'}
                          title={c.title ? String(value) : undefined}
                        >
                          {c.clamp ? <CellText value={value} /> : String(value)}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </TBody>
            </Table>
          )}
        </TableWrap>
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
