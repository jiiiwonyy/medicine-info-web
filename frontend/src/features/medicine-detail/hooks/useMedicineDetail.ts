import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMedicineById } from '@/api/searchMedicine';
import type { Medicine } from '@/types/medicine';
import { scrollToId } from '@/hooks/useScrollSpy';
import type { DetailTab, TabKey } from '@/features/medicine-detail/types';

const HEADER_OFFSET = 72;

export function useMedicineDetail(idParam?: string) {
  const numericId = Number(idParam);

  const [activeTab, setActiveTab] = useState<TabKey>('effect');

  const {
    data: med,
    isLoading,
    isError,
    error,
  } = useQuery<Medicine, Error>({
    queryKey: ['medicine', numericId],
    queryFn: () => getMedicineById(numericId),
    enabled: !!numericId,
  });

  const dur = med?.dur ?? { interactions: [], age: [], pregnancy: [] };

  const tabs = useMemo<DetailTab[]>(
    () => [
      { value: 'effect', label: '효능·효과', id: 'effect' },
      { value: 'usage', label: '용법·용량', id: 'usage' },
      { value: 'caution', label: '사용상의 주의사항', id: 'caution' },
    ],
    [],
  );

  const onTabClick = (tab: Pick<DetailTab, 'id' | 'value'>) => {
    setActiveTab(tab.value);
    scrollToId(tab.id, HEADER_OFFSET);
  };

  return {
    numericId,
    med,
    dur,
    tabs,
    activeTab,
    setActiveTab,
    onTabClick,
    isLoading,
    isError,
    error,
  };
}
