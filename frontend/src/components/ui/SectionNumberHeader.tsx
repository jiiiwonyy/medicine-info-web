import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

interface SectionNumberHeaderProps {
  number: number | string;
  title: string;
  className?: string;
}

export default function SectionNumberHeader({
  number,
  title,
  className,
}: SectionNumberHeaderProps) {
  return (
    <h4
      className={cn(textStyles.titleMd, 'flex items-center gap-2', className)}
    >
      <span
        className={cn(
          textStyles.uiLg,
          'flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-fg shrink-0',
        )}
      >
        {number}
      </span>
      {title}
    </h4>
  );
}
