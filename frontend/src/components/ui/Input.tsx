import * as React from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export default function Input({ className, hasError, ...props }: InputProps) {
  return (
    <input
      className={cn(
        textStyles.body,
        'w-full rounded-md px-3 py-2',
        'bg-bg text-fg placeholder:text-muted-fg',
        'border border-border',
        'focus:outline-none focus:ring-2 focus:ring-primary-200',
        'disabled:opacity-50 disabled:pointer-events-none',
        hasError && 'border-danger focus:ring-danger',
        className,
      )}
      {...props}
    />
  );
}
