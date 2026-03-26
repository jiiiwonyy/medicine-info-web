import * as React from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SubTitle from '@/components/ui/SubTitle';

export function SectionTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <SubTitle className={cn('text-fg', className)}>{children}</SubTitle>
  );
}

export function InfoList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className={cn(textStyles.bodyMd, 'list-disc pl-5 space-y-1 text-fg')}>
      {items.map((t, i) => (
        <li key={i} className="leading-relaxed whitespace-pre-wrap">
          {t}
        </li>
      ))}
    </ul>
  );
}
