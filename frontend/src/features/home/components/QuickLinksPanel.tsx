import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { QuickLinkItem } from '@/features/home/data/homeData';

export default function QuickLinksPanel({ items }: { items: QuickLinkItem[] }) {
  return (
    <div className="flex flex-col gap-6">
      <Card variant="outlined" padding="lg" className="shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          {items.map((card) => (
            <button
              key={card.title}
              className={cn(
                'group flex flex-col items-start gap-3 p-4',
                'bg-muted rounded-xl border border-transparent hover:border-primary-200 hover:bg-primary-50 transition-all text-left h-full',
              )}
              type="button"
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110',
                  card.color,
                )}
              >
                {card.icon}
              </div>

              <div>
                <h3
                  className={cn(
                    textStyles.titleSm,
                    'text-fg group-hover:text-primary transition-colors',
                  )}
                >
                  {card.title}
                </h3>
                <p className={cn(textStyles.bodyMd, 'text-muted-fg mt-1')}>
                  {card.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
