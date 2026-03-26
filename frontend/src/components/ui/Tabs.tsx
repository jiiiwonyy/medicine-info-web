import * as React from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  baseId: string;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined,
);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      value: controlledValue,
      defaultValue,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const baseId = React.useId();
    const [uncontrolledValue, setUncontrolledValue] =
      React.useState(defaultValue);
    const value = controlledValue ?? uncontrolledValue ?? '';

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        if (controlledValue === undefined) {
          setUncontrolledValue(newValue);
        }
        onValueChange?.(newValue);
      },
      [controlledValue, onValueChange],
    );

    return (
      <TabsContext.Provider
        value={{ value, onValueChange: handleValueChange, baseId }}
      >
        <div ref={ref} className={cn('w-full', className)} {...props} />
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="tablist"
    className={cn('flex w-full gap-2 mb-4', className)}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, onClick, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error('TabsTrigger must be used within a Tabs component');
    }

    const isActive = context.value === value;
    const triggerId = `${context.baseId}-tab-${value}`;
    const panelId = `${context.baseId}-panel-${value}`;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={triggerId}
        aria-controls={panelId}
        aria-selected={isActive}
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(
          textStyles.bodyLg,
          'inline-flex items-center justify-center gap-1.5 whitespace-nowrap border px-4 py-3',
          'transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:pointer-events-none cursor-pointer',
          'border-border bg-muted text-fg hover:border-primary hover:text-primary hover:bg-primary-50',
          'data-[state=active]:border-primary data-[state=active]:bg-primary-50 data-[state=active]:text-primary data-[state=active]:font-semibold',
          className,
        )}
        onClick={(e) => {
          context.onValueChange(value);
          onClick?.(e);
        }}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error('TabsContent must be used within a Tabs component');
    }

    if (context.value !== value) {
      return null;
    }

    const triggerId = `${context.baseId}-tab-${value}`;
    const panelId = `${context.baseId}-panel-${value}`;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={triggerId}
        className={cn(
          'mt-2 animate-fade-in-up focus-visible:outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
