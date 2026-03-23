import type { SafetyLetter as SafetyLetterType } from '@/features/safety-letters/types';
import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function SafetyLetterCard({
  item,
  onView,
}: {
  item: SafetyLetterType;
  onView: (letterId: number) => Promise<void>;
}) {
  const files = item.files ?? [];

  return (
    <Card variant="outlined" className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className={cn(textStyles.titleSm, 'break-words')}>
            {item.title}
          </div>
          <div className={cn(textStyles.bodySm, 'mt-1')}>
            {item.notice_date ?? '-'} · {item.department ?? '-'}
          </div>
        </div>
        <div className={cn(textStyles.bodySm, 'shrink-0')}>
          첨부 {files.length}개
        </div>
      </div>

      {item.summary && (
        <p className={cn(textStyles.bodySm, 'mt-3 whitespace-pre-line')}>
          {item.summary}
        </p>
      )}

      <div className="mt-3 space-y-2">
        {files.length === 0 ? (
          <div className={cn(textStyles.bodySm, 'text-muted-fg')}>
            첨부파일 없음
          </div>
        ) : (
          files.map((f, idx) => (
            <button
              type="button"
              key={`${item.id}-${idx}`}
              onClick={() => onView(item.id)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
            >
              <span className={cn(textStyles.bodySm, 'truncate')}>
                {f.original_name}
              </span>
              <span className={cn(textStyles.bodySm, 'shrink-0')}>
                {Math.round((f.size ?? 0) / 1024)} KB · 다운로드
              </span>
            </button>
          ))
        )}
      </div>
    </Card>
  );
}
