import { useEffect, useMemo, useState } from 'react';
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

  const [q, setQ] = useState('');
  const [items, setItems] = useState<SignalInfoItem[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const hasMore = offset < total;

  const loadFirst = async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = await fetchSignalInfos({
        limit: LIMIT,
        offset: 0,
        q: q.trim() || undefined,
      });
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
      setOffset((data.items ?? []).length);
    } catch (e: any) {
      setErr(e?.message ?? '목록을 불러오지 못했어요.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setErr(null);
    try {
      const data = await fetchSignalInfos({
        limit: LIMIT,
        offset,
        q: q.trim() || undefined,
      });
      setItems((prev) => [...prev, ...(data.items ?? [])]);
      setTotal(data.total ?? 0);
      setOffset((prev) => prev + (data.items ?? []).length);
    } catch (e: any) {
      setErr(e?.message ?? '더 보기를 불러오지 못했어요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab !== 'publish') return;
    if (items.length > 0 || loading) return;
    loadFirst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadFirst();
  };

  const onView = async (signalId: number) => {
    try {
      setErr(null);
      const { url } = await fetchSignalInfoViewUrl({ signalId });
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e: any) {
      setErr(e?.message ?? '원문을 열 수 없어요.');
    }
  };

  const onDownload = async (signalId: number) => {
    try {
      setErr(null);
      const { url } = await fetchSignalInfoDownloadUrl({ signalId });
      window.location.href = url;
    } catch (e: any) {
      setErr(e?.message ?? '다운로드를 시작할 수 없어요.');
    }
  };

  const displayItems = useMemo(() => {
    return items.map((it) => ({
      ...it,
      docNo: extractDocNo(it.title),
      mainTitle: trimDocNo(it.title),
    }));
  }, [items]);

  return {
    LIMIT,

    activeTab,
    setActiveTab,

    q,
    setQ,

    items,
    displayItems,
    total,
    offset,
    loading,
    err,
    hasMore,

    loadMore,
    onSearch,
    onView,
    onDownload,
  };
}
