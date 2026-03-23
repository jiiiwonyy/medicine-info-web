import { useState } from 'react';
import { fetchSignalInfoViewUrl } from '../api/signalInfo';

export function useSignalInfoView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleView = async (signalId: number) => {
    setError(null);
    setIsLoading(true);
    try {
      const { url } = await fetchSignalInfoViewUrl(signalId);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      setError('PDF를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleView };
}
