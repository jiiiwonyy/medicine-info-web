import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function SectionTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="w-1 h-8 bg-primary" />
      <h3 className={textStyles.titleLg}>{children}</h3>
    </div>
  );
}
