import * as React from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { StepTheme } from './types';
import { MdArrowDownward, MdCheckCircle } from 'react-icons/md';
import { Card } from '@/components/ui/Card';

export function FlowWrap({ children }: React.PropsWithChildren) {
  const items = React.Children.toArray(children);
  if (items.length <= 1) return <div className="space-y-8">{children}</div>;

  const normalBlocks = items.slice(0, -1);
  const finalBlock = items[items.length - 1];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {normalBlocks}
      </div>
      <ConvergeMarker className="my-6 md:my-8" />
      {finalBlock}
    </div>
  );
}

function ConvergeMarker({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-muted-fg/40',
        className,
      )}
    >
      <div className="h-6 w-px bg-border/60" />
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-surface shadow-sm text-muted-fg z-10">
        <MdArrowDownward size={20} />
      </div>
      <div className="h-6 w-px bg-border/60" />
    </div>
  );
}

export function FlowBlock({
  title,
  children,
}: React.PropsWithChildren<{ title: string }>) {
  return (
    <section className="flex flex-col h-full">
      {/* h-full for grid stretch */}
      <h3 className={cn(textStyles.titleMd, 'text-fg flex-shrink-0')}>
        {title}
      </h3>
      <Card variant="outlined" padding="lg" className="mt-3 flex-1 shadow-sm">
        {children}
      </Card>
    </section>
  );
}

export function FinalBlock({
  title,
  theme,
  children,
}: React.PropsWithChildren<{ title: string; theme: StepTheme }>) {
  return (
    <section className="relative mx-auto max-w-2xl">
      <div className="flex flex-col items-center mb-1">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-sm mb-2',
            theme.chip,
            theme.chipText,
            theme.border,
          )}
        >
          <MdCheckCircle size={14} />
          Final Check
        </span>
        <h3 className={cn(textStyles.titleLg, 'text-fg text-center')}>
          {title}
        </h3>
      </div>

      <Card
        variant="default"
        padding="none"
        className={cn('mt-4 overflow-hidden border-2 shadow-md', theme.border)}
      >
        <div className={cn('h-2 w-full', theme.headerBg)} />
        <div className="p-6 md:p-8">{children}</div>
      </Card>
    </section>
  );
}
