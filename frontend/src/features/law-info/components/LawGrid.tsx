import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { LawLinkItem } from '@/features/law-info/types';

export default function LawGrid({ laws }: { laws: LawLinkItem[] }) {
  return (
    <section>
      <h3 className={cn(textStyles.titleMd, 'text-primary-700 mt-10 mb-4')}>
        📚 주요 보건의료 관련 법률 바로가기
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {laws.map((law) => (
          <Card
            key={law.title}
            variant="outlined"
            padding="md"
            className={cn(
              'transition hover:shadow-[var(--shadow-sm)] hover:-translate-y-0.5',
            )}
          >
            <h4 className={cn(textStyles.titleSm, 'text-primary-700 mb-3')}>
              {law.title}
            </h4>

            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm" variant="primary">
                <a href={law.link} target="_blank" rel="noopener noreferrer">
                  🔗 법령 바로가기
                </a>
              </Button>

              <Button asChild size="sm" variant="secondary">
                <a
                  href={law.threeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📖 삼단비교법 보기
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
