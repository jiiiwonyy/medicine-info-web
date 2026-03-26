import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function ItemTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h5 className={cn(textStyles.titleSm, className)}>
      {children}
    </h5>
  );
}
