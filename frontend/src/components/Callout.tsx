// components/Callout.tsx
import { useMemo } from 'react';
import type { ReactNode } from 'react';

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

const variantStyles: Record<Variant, string> = {
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  note: 'border-slate-200 bg-slate-50 text-slate-900',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  danger: 'border-rose-200 bg-rose-50 text-rose-900',
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

export default function Callout({
  title,
  children,
  variant = 'info',
  dense = false,
  icon,
  roleOverride,
  className = '',
}: CalloutProps) {
  const role = roleOverride ?? roleByVariant[variant];
  const spacing = dense ? 'p-3 text-sm' : 'p-4';
  const iconNode = icon ?? defaultIcons[variant];

  const classes = useMemo(
    () => `rounded-xl border ${variantStyles[variant]} ${spacing} ${className}`,
    [variant, spacing, className],
  );

  return (
    <div
      className={classes}
      role={role}
      aria-live={role === 'alert' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        <div className="select-none leading-6">{iconNode}</div>
        <div className="min-w-0">
          {title && <div className="font-semibold mb-1">{title}</div>}
          <div className="leading-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
