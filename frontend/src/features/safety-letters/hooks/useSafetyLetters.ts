import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchSafetyLetters,
  fetchSafetyLetterDownloadUrl,
} from '@/features/safety-letters/api/safetyLetters';
import type { SafetyLetterTabKey } from '@/features/safety-letters/types';

export function useSafetyLetters() {
  const [activeTab, setActiveTab] = useState<SafetyLetterTabKey>('info');

  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['safetyLetters', { q, offset, limit }],
    queryFn: () => fetchSafetyLetters({ q, offset, limit }),
    placeholderData: (previousData) => previousData,
    enabled: activeTab === 'publish',
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const rangeText = useMemo(() => {
    if (activeTab !== 'publish') return '';
    if (total === 0) return '0 / 0';
    const start = offset + 1;
    const end = Math.min(offset + limit, total);
    return `${start} - ${end} / ${total}`;
  }, [activeTab, offset, limit, total]);

  const onSearch = () => {
    setOffset(0);
    setQ(qInput.trim());
  };

  const onPrev = () => setOffset((v) => Math.max(0, v - limit));
  const onNext = () => setOffset((v) => v + limit);

  const [viewError, setViewError] = useState<string | null>(null);

  const onView = async (letterId: number) => {
    setViewError(null);
    try {
      const { url } = await fetchSafetyLetterDownloadUrl({
        letterId,
        fileIndex: 0,
      });
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      setViewError('파일을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return {
    activeTab,
    setActiveTab,

    qInput,
    setQInput,
    q,
    offset,
    limit,

    items,
    total,
    rangeText,

    isLoading,
    isError,
    viewError,

    onSearch,
    onPrev,
    onNext,
    onView,
  };
}
