import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { WhoArea } from '@/features/medication-safety/types';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';

export default function WhoAreaSection({ areas }: { areas: WhoArea[] }) {
  return (
    <section className="space-y-4">
      <SectionNumberHeader
        number={2}
        title="투약오류 예방을 위한 3가지 영역 (WHO)"
      />

      <Card variant="outlined" padding="lg" className="shadow-sm space-y-6">
        <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
          세계보건기구(WHO)는 투약오류(MEs)를 예방하고 환자를 약물 위해로부터
          보호하기 위해 다음의{' '}
          <span className="font-semibold">세 가지 영역</span>을 우선적으로 다룰
          것을 권고합니다.
        </p>

        <div className="flex flex-col gap-4">
          {areas.map((a) => (
            <div
              key={a.key}
              className="rounded-xl border border-border bg-muted p-5"
            >
              <div className={cn(textStyles.headingLg, 'mb-2 text-fg')}>
                {a.title}
              </div>
              <p
                className={cn(
                  textStyles.bodyMd,
                  'mb-3 text-muted-fg leading-relaxed',
                )}
              >
                {a.subtitle}
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {a.bullets.map((b) => (
                  <li key={b} className={cn(textStyles.bodyMd, 'text-fg')}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
