import { useState } from 'react';
import type { SignalInfo } from '../types';
import { fetchSignalInfoViewUrl } from '../api/signalInfo';

export function useSignalInfoView() {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleView = async (info: SignalInfo) => {
    setError(null);
    setLoadingId(info.id);
    try {
      const { url } = await fetchSignalInfoViewUrl(info.id);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      setError('PDF를 불러오는데 실패했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  return { loadingId, error, handleView };
}
