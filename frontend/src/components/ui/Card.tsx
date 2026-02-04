import * as React from 'react';

type CardVariant = 'default' | 'outlined' | 'elevated' | 'muted' | 'primary'; // ⭐ 추가

type CardPadding = 'none' | 'sm' | 'md' | 'lg';

const variantStyles: Record<CardVariant, string> = {
  // 기본 표면
  default: 'bg-surface',

  // 표준 섹션
  outlined: 'bg-surface border border-border',

  // 살짝 띄운 카드
  elevated: 'bg-surface shadow-[var(--shadow-sm)]',

  // 회색 톤 섹션
  muted: 'bg-muted border border-border',

  // ⭐ 연한 파랑 강조 섹션 (DUR 강조/마무리용)
  primary: 'bg-primary-100 border border-primary-200',
};

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className = '', variant = 'default', padding = 'md', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={[
        'rounded-[var(--radius-lg)]',
        variantStyles[variant],
        paddingStyles[padding],
        className,
      ].join(' ')}
      {...props}
    />
  );
});
