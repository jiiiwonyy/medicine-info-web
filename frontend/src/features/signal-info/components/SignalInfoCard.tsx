import type { SignalInfoItem } from '@/types/signalInfo';
import Button from '@/components/ui/Button';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function SignalInfoCard({
  item,
  mainTitle,
  onView,
  onDownload,
}: {
  item: SignalInfoItem;
  mainTitle: string;
  onView: (signalId: number) => Promise<void>;
  onDownload: (signalId: number) => Promise<void>;
}) {
  return (
    <div className="border border-gray-300 rounded-2xl bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={cn(textStyles.headingMd, 'leading-snug break-words')}>
            {mainTitle}
          </p>

          {item.created_at && (
            <p className={cn(textStyles.bodySm, 'text-muted-fg mt-1')}>
              등록: {new Date(item.created_at).toLocaleDateString()}
            </p>
          )}
        </div>

        <div className="flex shrink-0 gap-2">
          <Button type="button" size="sm" onClick={() => onView(item.id)}>
            보기
          </Button>
          <Button
            type="button"
            onClick={() => onDownload(item.id)}
            variant="secondary"
            size="sm"
          >
            다운로드
          </Button>
        </div>
      </div>
    </div>
  );
}
