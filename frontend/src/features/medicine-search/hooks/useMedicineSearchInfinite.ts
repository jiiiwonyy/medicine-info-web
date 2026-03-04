import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMedicines } from '@/api/searchMedicine';
import type { SearchResponse } from '@/api/searchMedicine';
import type { Medicine } from '@/types/medicine';
import { useDebounce } from '@/hooks/useDebounce';

export function useMedicineSearchInfinite(query: string) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const debouncedQuery = useDebounce(query, 300);

  const qEnabled = debouncedQuery === '' || debouncedQuery.length >= 2;

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
    enabled: qEnabled,
    staleTime: 5000,
  });

  const medicines: Medicine[] = useMemo(
    () => (data ? data.pages.flatMap((page) => page.items) : []),
    [data],
  );

  const total = data?.pages[0]?.total ?? 0;

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

  return {
    debouncedQuery,
    qEnabled,

    medicines,
    total,

    isFetching,
    isFetchingNextPage,
    hasNextPage,
    error,

    loadMoreRef,
  };
}
