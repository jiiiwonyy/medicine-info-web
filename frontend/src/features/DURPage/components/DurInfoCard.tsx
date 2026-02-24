import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function DurInfoCard({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <Card
      variant="outlined"
      padding="lg"
      className="border-border hover:shadow-[var(--shadow-md)] transition-shadow"
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-2xl">
          {icon}
        </div>
      </div>

      <h4 className={cn(textStyles.titleSm, 'mt-4')}>{title}</h4>
      <p
        className={cn(textStyles.bodyMd, 'mt-3 text-muted-fg leading-relaxed')}
      >
        {desc}
      </p>
    </Card>
  );
}
