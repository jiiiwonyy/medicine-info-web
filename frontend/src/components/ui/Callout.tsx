import type { ReactNode } from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

type Variant = 'info' | 'warning' | 'success' | 'danger' | 'note';

type CalloutProps = {
  title?: ReactNode;
  children: ReactNode;
  variant?: Variant;
  dense?: boolean;
  icon?: ReactNode;
  roleOverride?: React.AriaRole;
  className?: string;
};

const defaultIcons: Record<Variant, ReactNode> = {
  info: 'ℹ️',
  note: '📝',
  success: '✅',
  warning: '⚠️',
  danger: '⛔',
};

const roleByVariant: Record<Variant, React.AriaRole> = {
  info: 'note',
  note: 'note',
  success: 'status',
  warning: 'alert',
  danger: 'alert',
};

const variantStyles: Record<Variant, string> = {
  info: 'bg-info-50 border-info-200 text-fg',
  note: 'bg-muted border-border text-fg',
  success: 'bg-success-50 border-success-200 text-fg',
  warning: 'bg-warning-50 border-warning-200 text-fg',
  danger: 'bg-danger-50 border-danger-200 text-fg',
};

const iconColorStyles: Record<Variant, string> = {
  info: 'text-primary-700',
  note: 'text-muted-fg',
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
};

export default function Callout({
  title,
  children,
  variant = 'info',
  dense = false,
  icon,
  roleOverride,
  className,
}: CalloutProps) {
  const role = roleOverride ?? roleByVariant[variant];
  const iconNode = icon ?? defaultIcons[variant];

  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border',
        variantStyles[variant],
        dense ? 'p-3 text-sm' : 'p-4',
        className,
      )}
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn('select-none leading-6', iconColorStyles[variant])}
          aria-hidden
        >
          {iconNode}
        </div>

        <div className="min-w-0">
          {title && <div className={cn(textStyles.titleSm)}>{title}</div>}
          <div className={cn(textStyles.bodyMd)}>{children}</div>
        </div>
      </div>
    </div>
  );
}
