import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { WhoArea } from '@/features/medication-safety/types';

export default function WhoAreaSection({ areas }: { areas: WhoArea[] }) {
  return (
    <section className="space-y-4">
      <div className={cn(textStyles.titleMd, 'flex items-center gap-2')}>
        <span
          className={cn(
            textStyles.uiLg,
            'flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-fg',
          )}
        >
          2
        </span>
        투약오류 예방을 위한 3가지 영역 (WHO)
      </div>

      <Card variant="outlined" padding="lg" className="shadow-sm space-y-6">
        <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
          세계보건기구(WHO)는 투약오류(MEs)를 예방하고 환자를 약물 위해로부터
          보호하기 위해 다음의{' '}
          <span className="font-semibold">세 가지 영역</span>을 우선적으로 다룰
          것을 권고합니다.
        </p>

        <Tabs defaultValue={areas[0]?.key ?? 'highRisk'}>
          <TabsList
            className={cn(
              'h-auto rounded-full bg-transparent p-0 gap-2 flex flex-wrap',
            )}
          >
            {areas.map((a) => (
              <TabsTrigger
                key={a.key}
                value={a.key}
                className={cn(
                  textStyles.bodySm,
                  'rounded-full border px-4 py-2',
                  // 기본 TabsTrigger active 스타일 대신 "pill" 느낌으로 덮어쓰기
                  'data-[state=active]:bg-fg data-[state=active]:text-surface data-[state=active]:shadow-none',
                  'border-border bg-surface text-muted-fg hover:bg-muted',
                )}
              >
                {a.key === 'highRisk' && '고위험 상황'}
                {a.key === 'polypharmacy' && '다약제 복용'}
                {a.key === 'transition' && '치료 전환기'}
              </TabsTrigger>
            ))}
          </TabsList>

          {areas.map((a) => (
            <TabsContent key={a.key} value={a.key} className="mt-4">
              <div className="rounded-xl border border-border bg-muted p-5 animate-in fade-in slide-in-from-top-1 duration-200">
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
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </section>
  );
}
