import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function SubTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h4 className={cn(textStyles.titleMd, className)}>
      {children}
    </h4>
  );
}
