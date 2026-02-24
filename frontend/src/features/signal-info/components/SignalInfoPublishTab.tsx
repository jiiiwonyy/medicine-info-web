import Spinner from '@/components/Spinner';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import SignalInfoCard from '@/features/signal-info/components/SignalInfoCard';

export default function SignalInfoPublishTab({
  total,
  q,
  setQ,
  loading,
  err,
  onSearch,
  displayItems,
  hasMore,
  loadMore,
  onView,
  onDownload,
}: {
  total: number;
  q: string;
  setQ: (v: string) => void;
  loading: boolean;
  err: string | null;
  onSearch: (e: React.FormEvent) => Promise<void>;
  displayItems: Array<any>;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  onView: (signalId: number) => Promise<void>;
  onDownload: (signalId: number) => Promise<void>;
}) {
  return (
    <>
      <div className="mb-3 flex items-center justify-between">
        <h3 className={cn(textStyles.titleMd)}>최근 발행 현황</h3>
        <p className={cn(textStyles.bodySm, 'text-muted-fg')}>
          총 <span className="font-semibold">{total}</span>건
        </p>
      </div>

      <form onSubmit={onSearch} className="flex gap-2 mb-4">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="제목 검색 (예: KSC, KSPC, 성분명 등)"
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          검색
        </Button>
      </form>

      {err && (
        <div className="mb-4 border border-red-200 bg-red-50 text-red-700 rounded-lg p-3 text-sm">
          {err}
        </div>
      )}

      <div className="space-y-3 mb-4">
        {displayItems.length === 0 && !loading ? (
          <div className="p-6 text-center text-gray-500 border rounded-2xl bg-gray-50">
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
          <Button type="button" onClick={loadMore} disabled={loading}>
            {loading ? <Spinner /> : '더 보기'}
          </Button>
        ) : (
          <p className="text-sm text-muted-fg">
            {loading ? <Spinner /> : '마지막 항목이에요.'}
          </p>
        )}
      </div>
    </>
  );
}
