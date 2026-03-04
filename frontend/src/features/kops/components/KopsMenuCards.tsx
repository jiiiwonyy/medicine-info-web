import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { MenuCardItem } from '@/features/kops/data/kopsData';

export default function KopsMenuCards({ items }: { items: MenuCardItem[] }) {
  return (
    <div className="mt-10">
      <h2 className={cn(textStyles.titleMd, 'text-fg')}>주요 메뉴</h2>

      <div className="mt-5 grid grid-cols-1 gap-4">
        {items.map(({ emoji, title, desc, href, note }) => (
          <Card
            key={href}
            variant="outlined"
            padding="lg"
            className="border-border"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <h3 className={cn(textStyles.titleSm, 'text-fg')}>
                  <span className="mr-2">{emoji}</span>
                  {title}
                </h3>

                <p
                  className={cn(
                    textStyles.bodyMd,
                    'mt-2 text-muted-fg leading-relaxed',
                  )}
                >
                  {desc}
                </p>

                {note ? (
                  <div className="mt-3 rounded-[var(--radius-md)] border border-border bg-muted px-3 py-2">
                    <p
                      className={cn(
                        textStyles.bodyMd,
                        'text-muted-fg leading-relaxed',
                      )}
                    >
                      {note}
                    </p>
                  </div>
                ) : null}
              </div>

              <Button asChild className="shrink-0">
                <a href={href} target="_blank" rel="noopener noreferrer">
                  🔗 바로가기
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
