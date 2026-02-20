import * as React from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { Slot } from '@radix-ui/react-slot';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  asChild?: boolean;
}

const base = cn(
  'inline-flex items-center justify-center gap-2 rounded transition-colors whitespace-nowrap',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200',
  'disabled:pointer-events-none disabled:opacity-50',
);

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-fg hover:bg-primary-700',
  secondary: 'bg-surface text-fg border border-border hover:bg-muted',
  ghost: 'bg-transparent text-fg hover:bg-muted',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3',
  md: 'h-10 px-4',
};

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
      aria-hidden="true"
    />
  );
}

/**
 * Renders a styled button that supports variants, sizes, a loading state, and an optional Slot wrapper.
 *
 * When `isLoading` is true the component shows a spinner and is considered disabled; when `asChild` is true
 * the provided child element is rendered inside a Radix `Slot` and receives the button styling and forwarded props.
 *
 * @param variant - Visual style of the button (e.g., 'primary', 'secondary', 'ghost')
 * @param size - Button size ('sm' or 'md')
 * @param isLoading - If true, displays a spinner and treats the button as disabled
 * @param disabled - If true, disables the button; combined with `isLoading` to compute the effective disabled state
 * @param asChild - If true, renders the single child inside a `Slot` instead of a native `<button>`
 * @param className - Additional class names merged with the component's base styles
 * @param type - Button `type` attribute (defaults to 'button')
 *
 * @returns A React element: either a native `<button>` with the applied styles and behavior, or the provided child wrapped in a `Slot`.
 */
export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  type = 'button',
  asChild = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  if (asChild) {
    const onlyChild = React.Children.only(children) as React.ReactElement;

    return (
      <Slot
        className={cn(
          base,
          textStyles.uiLg,
          variants[variant],
          sizes[size],
          className,
        )}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        {onlyChild}
      </Slot>
    );
  }

  return (
    <button
      type={type}
      className={cn(
        base,
        textStyles.uiLg,
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </button>
  );
}