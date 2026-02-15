import * as React from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export function SectionTitle({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <h2 className={cn(textStyles.titleMd, 'text-fg', className)}>{children}</h2>
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
