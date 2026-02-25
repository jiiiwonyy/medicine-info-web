import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function SectionHeading({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h4
      className={cn(
        textStyles.headingLg,
        'mb-4 border-l-4 border-primary pl-3 text-fg',
        className,
      )}
    >
      {children}
    </h4>
  );
}
