import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function StatCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note?: string;
}) {
  return (
    <Card variant="outlined" padding="lg" className="shadow-sm">
      <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>{title}</div>
      <div className={cn(textStyles.titleLg, 'mt-2 text-fg')}>{value}</div>
      {note ? (
        <div className={cn(textStyles.bodyMd, 'text-muted-fg mt-1')}>
          {note}
        </div>
      ) : null}
    </Card>
  );
}
