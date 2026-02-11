import * as React from 'react';
import { cn } from '@/shared/cn';

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
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-fg',
      className,
    )}
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
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          'data-[state=active]:bg-surface data-[state=active]:text-fg data-[state=active]:shadow-sm',
          'hover:text-fg',
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
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
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
