import { cn } from '@/shared/cn';

export default function StatCard({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'bg-surface p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] border border-border',
        className,
      )}
    >
      {children}
    </div>
  );
}
