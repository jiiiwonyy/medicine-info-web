import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/shared/cn';
import SectionTitle from '@/components/ui/SectionTitle';
import ItemTitle from '@/components/ui/ItemTitle';
import type { LawLinkItem } from '@/features/law-info/types';

export default function LawGrid({ laws }: { laws: LawLinkItem[] }) {
  return (
    <section>
      <SectionTitle className="mt-10 mb-4">
        📚 주요 보건의료 관련 법률 바로가기
      </SectionTitle>

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
            <ItemTitle className="text-primary-700 mb-3">
              {law.title}
            </ItemTitle>

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
