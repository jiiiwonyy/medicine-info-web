import { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchSignalInfos,
  fetchSignalInfoDownloadUrl,
  fetchSignalInfoViewUrl,
} from '@/features/signal-info/api/signalInfo';
import type { SignalInfoItem } from '@/features/signal-info/types';
import { extractDocNo, trimDocNo } from '@/features/signal-info/utils';
import type { SignalInfoTabKey } from '@/features/signal-info/types';

const LIMIT = 20;

export function useSignalInfos() {
  const [activeTab, setActiveTab] = useState<SignalInfoTabKey>('info');

  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');

  const [actionError, setActionError] = useState<string | null>(null);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['signalInfos', q],
    queryFn: ({ pageParam }) =>
      fetchSignalInfos({
        limit: LIMIT,
        offset: pageParam as number,
        q: q || undefined,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce(
        (sum, p) => sum + (p.items?.length ?? 0),
        0,
      );
      return loaded < (lastPage.total ?? 0) ? loaded : undefined;
    },
    initialPageParam: 0,
    enabled: activeTab === 'publish',
    staleTime: 1000 * 60 * 5,
  });

  const items: SignalInfoItem[] = useMemo(
    () => data?.pages.flatMap((p) => p.items ?? []) ?? [],
    [data],
  );
  const total = data?.pages[0]?.total ?? 0;

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const nextQ = qInput.trim();
    setActionError(null);

    if (!nextQ) return;

    if (nextQ === q) {
      void refetch();
      return;
    }

    setQ(nextQ);
  };

  const onView = async (signalId: number) => {
    setActionError(null);
    try {
      const { url } = await fetchSignalInfoViewUrl({ signalId });
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e: unknown) {
      setActionError(e instanceof Error ? e.message : '원문을 열 수 없어요.');
    }
  };

  const onDownload = async (signalId: number) => {
    setActionError(null);
    try {
      const { url } = await fetchSignalInfoDownloadUrl({ signalId });
      window.location.href = url;
    } catch (e: unknown) {
      setActionError(
        e instanceof Error ? e.message : '다운로드를 시작할 수 없어요.',
      );
    }
  };

  const displayItems = useMemo(
    () =>
      items.map((it) => ({
        ...it,
        docNo: extractDocNo(it.title),
        mainTitle: trimDocNo(it.title),
      })),
    [items],
  );

  return {
    LIMIT,

    activeTab,
    setActiveTab,

    qInput,
    setQInput,
    q,

    items,
    displayItems,
    total,

    isLoading,
    isError,
    actionError,
    hasMore: hasNextPage ?? false,
    isFetchingMore: isFetchingNextPage,

    loadMore: fetchNextPage,
    onSearch,
    onView,
    onDownload,
  };
}
