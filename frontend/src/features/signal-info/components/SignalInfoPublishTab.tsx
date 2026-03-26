import Spinner from '@/components/Spinner';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import Button from '@/components/ui/Button';
import SubTitle from '@/components/ui/SubTitle';
import Input from '@/components/ui/Input';
import SignalInfoCard from '@/features/signal-info/components/SignalInfoCard';
import type { SignalInfoItem } from '@/features/signal-info/types';

type DisplayItem = SignalInfoItem & { docNo: string | null; mainTitle: string };

export default function SignalInfoPublishTab({
  total,
  qInput,
  setQInput,
  isLoading,
  isError,
  actionError,
  onSearch,
  displayItems,
  hasMore,
  loadMore,
  isFetchingMore,
  onView,
  onDownload,
}: {
  total: number;
  qInput: string;
  setQInput: (v: string) => void;
  isLoading: boolean;
  isError: boolean;
  actionError: string | null;
  onSearch: (e: React.FormEvent) => void;
  displayItems: DisplayItem[];
  hasMore: boolean;
  loadMore: () => void;
  isFetchingMore: boolean;
  onView: (signalId: number) => Promise<void>;
  onDownload: (signalId: number) => Promise<void>;
}) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <SubTitle>최근 발행 현황</SubTitle>
        <p className={cn(textStyles.bodySm, 'text-muted-fg')}>
          총 <span className="font-semibold">{total}</span>건
        </p>
      </div>

      <form onSubmit={onSearch} className="flex gap-2 mb-4">
        <Input
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
          placeholder="제목 검색 (예: KSC, KSPC, 성분명 등)"
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          검색
        </Button>
      </form>

      {isError && (
        <div className={cn(textStyles.bodySm, 'text-danger-700 mb-4')}>
          목록을 불러오지 못했습니다.
        </div>
      )}
      {actionError && (
        <div className={cn(textStyles.bodySm, 'text-danger-700 mb-4')}>
          {actionError}
        </div>
      )}

      <div className="space-y-3 mb-4">
        {isLoading ? (
          <Spinner />
        ) : displayItems.length === 0 ? (
          <div className="p-6 text-center text-muted-fg border border-dashed border-border rounded-2xl">
            검색 결과가 없어요.
          </div>
        ) : (
          displayItems.map((it) => (
            <SignalInfoCard
              key={it.id}
              item={it}
              mainTitle={it.mainTitle}
              onView={onView}
              onDownload={onDownload}
            />
          ))
        )}
      </div>

      <div className="flex justify-center">
        {hasMore ? (
          <Button type="button" onClick={loadMore} disabled={isFetchingMore}>
            {isFetchingMore ? <Spinner /> : '더 보기'}
          </Button>
        ) : (
          <p className={cn(textStyles.bodySm, 'text-muted-fg')}>
            마지막 항목이에요.
          </p>
        )}
      </div>
    </>
  );
}
