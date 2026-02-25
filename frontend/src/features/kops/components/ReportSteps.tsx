import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export function Step({
  n,
  title,
  subtitle,
}: {
  n: number;
  title: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 w-full md:w-[240px]">
      <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-fg font-bold rounded-full flex-shrink-0">
        {n}
      </div>
      <div className="mt-2">
        <p className={cn(textStyles.titleSm, 'text-fg')}>{title}</p>
        {subtitle ? (
          <p className={cn(textStyles.bodyMd, 'mt-1 text-muted-fg')}>
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
