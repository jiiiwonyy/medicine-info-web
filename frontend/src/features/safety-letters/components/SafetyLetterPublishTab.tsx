import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Spinner from '@/components/Spinner';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SafetyLetterCard from './SafetyLetterCard';
import type { SafetyLetter as SafetyLetterType } from '@/types/safetyLetter';

export default function SafetyLetterPublishTab({
  qInput,
  setQInput,
  q,
  rangeText,
  items,
  total,
  offset,
  limit,
  isLoading,
  isError,
  onSearch,
  onPrev,
  onNext,
  onDownload,
}: {
  qInput: string;
  setQInput: (v: string) => void;
  q: string;
  rangeText: string;

  items: SafetyLetterType[];
  total: number;
  offset: number;
  limit: number;

  isLoading: boolean;
  isError: boolean;

  onSearch: () => void;
  onPrev: () => void;
  onNext: () => void;
  onDownload: (letterId: number, fileIndex: number) => Promise<void>;
}) {
  return (
    <>
      <div className="flex gap-2 mb-4">
        <Input
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          placeholder="제목/요약에서 검색 (예: 리도카인)"
        />
        <Button onClick={onSearch}>검색</Button>
      </div>

      <div
        className={cn(
          'flex items-center justify-between mb-3',
          textStyles.bodySm,
        )}
      >
        <div>
          검색어: {q ? <span className="font-semibold">{q}</span> : '-'}
        </div>
        <div>{rangeText}</div>
      </div>

      <div className="space-y-3">
        {isLoading && <Spinner />}
        {isError && <div>목록을 불러오지 못했습니다.</div>}

        {!isLoading && items.length === 0 && (
          <div className="text-gray-500 border border-dashed border-gray-300 rounded-lg p-6 text-center">
            검색 결과가 없습니다.
          </div>
        )}

        {items.map((it) => (
          <SafetyLetterCard key={it.id} item={it} onDownload={onDownload} />
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="secondary" disabled={offset === 0} onClick={onPrev}>
          이전
        </Button>
        <Button
          variant="secondary"
          disabled={offset + limit >= total}
          onClick={onNext}
        >
          다음
        </Button>
      </div>
    </>
  );
}
