import * as React from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

type TableDensity = 'default' | 'dense';

export type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
  density?: TableDensity;
};

export function Table({ className, ...props }: TableProps) {
  return (
    <table
      className={cn(
        'w-full border-collapse bg-surface',
        textStyles.bodySm,
        'table-auto',
        'text-black',
        'border border-border',

        className,
      )}
      {...props}
    />
  );
}

export type TableWrapProps = React.HTMLAttributes<HTMLDivElement> & {
  scroll?: boolean;
};

export function TableWrap({
  className,
  scroll = true,
  ...props
}: TableWrapProps) {
  return (
    <div
      className={cn(scroll && 'w-full overflow-x-auto', 'my-3', className)}
      {...props}
    />
  );
}

/**
 * Renders a table header group (<thead>) element with the provided classes and attributes.
 *
 * @returns The rendered `<thead>` element with the given `className` and any forwarded HTML attributes.
 */
export function THead({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn(className)} {...props} />;
}

export const TBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(function TBody({ className, ...props }, ref) {
  return <tbody ref={ref} className={cn(className)} {...props} />;
});

/**
 * Renders a table row (<tr>) that applies a hover background and merges any provided classes.
 *
 * @returns The <tr> element with the `hover:bg-muted` class combined with `className`; all other props are forwarded to the element.
 */
export function Tr({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('hover:bg-muted', className)} {...props} />;
}

type ThProps = React.ThHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right';
  density?: TableDensity;
};

export function Th({
  className,
  align = 'left',
  density = 'default',
  ...props
}: ThProps) {
  return (
    <th
      className={cn(
        'border border-border',
        density === 'dense' ? 'px-2 py-2' : 'px-3 py-2.5',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        'whitespace-normal break-words',
        className,
      )}
      {...props}
    />
  );
}

type TdProps = React.TdHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right';
  density?: TableDensity;
  /** 레거시처럼 기본은 nowrap(데스크탑), 모바일에서만 wrap */
  nowrap?: boolean;
};

export function Td({ className, nowrap = false, ...props }: TdProps) {
  return (
    <td
      className={cn(
        'border border-border px-3 py-2 align-top ',
        nowrap ? 'whitespace-nowrap' : 'whitespace-normal break-words',
        className,
      )}
      {...props}
    />
  );
}

export function TableContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        '[&_p]:m-0 [&_p]:leading-[1.4]',
        '[&_p]:break-words [&_p]:whitespace-normal',
        className,
      )}
      {...props}
    />
  );
}