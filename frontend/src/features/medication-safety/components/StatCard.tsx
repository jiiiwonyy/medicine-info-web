import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function StatCard({
  title,
  value,
  note,
  accentColor = 'bg-primary', // 기본값
}: {
  title: string;
  value: string;
  note?: string;
  accentColor?: string;
}) {
  return (
    <Card
      variant="outlined"
      padding="lg"
      className="relative overflow-hidden shadow-sm"
    >
      <div className={cn('absolute left-0 top-0 h-full w-1', accentColor)} />

      <div className="pt-2">
        <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>{title}</div>

        <div className={cn(textStyles.titleMd, 'mt-2 text-fg')}>{value}</div>

        {note ? (
          <div className={cn(textStyles.bodyMd, 'text-muted-fg mt-1')}>
            {note}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
