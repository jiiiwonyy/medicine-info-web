import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type {
  RightItem,
  StepTheme,
} from '@/features/safe-medication-process/types';
import Callout from '@/components/ui/Callout';

export function RightCard({ item }: { item: RightItem; theme: StepTheme }) {
  return (
    <div
      className={cn('rounded-xl border border-success p-4 flex flex-col gap-2')}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl leading-none rounded-full bg-success-50 p-3">
          {item.icon}
        </span>
        <span className={cn(textStyles.titleSm, 'text-fg flex-1')}>
          {item.title}
        </span>
      </div>

      <p className={cn(textStyles.bodySm, 'text-muted-fg')}>
        {item.description}
      </p>
      <Callout variant="success" className="mt-2">
        <p className={cn(textStyles.bodySm, 'text-success-700')}>{item.tip}</p>
      </Callout>
    </div>
  );
}
