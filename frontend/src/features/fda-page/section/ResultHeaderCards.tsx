import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function ResultHeaderCards({
  drug,
  matchedIsrCount,
}: {
  drug: string;
  matchedIsrCount: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card variant="strong" className="w-full">
        <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>선택 약물</div>
        <div className={cn(textStyles.titleSm)}>{drug}</div>
      </Card>

      <Card variant="strong" className="w-full">
        <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>
          매칭 ISR 수
        </div>
        <div className={cn(textStyles.titleSm)}>
          {matchedIsrCount.toLocaleString()}
        </div>
      </Card>
    </div>
  );
}
