import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { CautionSectionItem } from '@/features/home/data/homeData';

function InfoIcon() {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-7 h-7 text-primary-700"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
      />
    </svg>
  );
}

export default function CautionSectionList({
  items,
}: {
  items: CautionSectionItem[];
}) {
  return (
    <div className="border-t border-border pt-6">
      <p
        className={cn(
          textStyles.titleMd,
          'mb-6 text-fg flex items-center gap-2',
        )}
      >
        <InfoIcon />
        상세 주의사항 구분
      </p>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <Card
            key={idx}
            variant="default"
            padding="md"
            className="group hover:bg-muted border-l-4 border-gray-200"
          >
            <h4 className={cn(textStyles.titleSm, 'text-fg mb-1')}>
              {item.title}
            </h4>
            <p
              className={cn(textStyles.bodyMd, 'text-muted-fg leading-relaxed')}
            >
              {item.content}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
