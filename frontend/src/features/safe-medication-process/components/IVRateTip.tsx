import * as React from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { Card } from '@/components/ui/Card';

function Frac({ num, den }: { num: React.ReactNode; den: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center leading-none align-middle mx-1">
      <span
        className={cn(
          textStyles.bodySm,
          'border-b border-current px-0.5 pb-0.5 font-medium',
        )}
      >
        {num}
      </span>
      <span className={cn(textStyles.bodySm, 'px-0.5 pt-0.5 font-medium')}>
        {den}
      </span>
    </span>
  );
}

function UnitTable({ rows }: { rows: [string, string, string?, string?][] }) {
  const cols = rows[0].length;
  return (
    <div className="overflow-x-auto">
      <div
        className="inline-grid gap-0 border border-border rounded-xl overflow-hidden text-center"
        style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}
      >
        {/* 분자 행 */}
        {rows[0].map((cell, i) => (
          <div
            key={`n-${i}`}
            className={cn(
              textStyles.bodySm,
              'px-4 py-2 border-b border-border/60 font-medium text-fg bg-surface',
              i < cols - 1 && 'border-r border-border/60',
            )}
          >
            {cell}
          </div>
        ))}
        {/* 분모 행 */}
        {rows[1].map((cell, i) => (
          <div
            key={`d-${i}`}
            className={cn(
              textStyles.bodySm,
              'px-4 py-2 font-medium text-muted-fg bg-bg',
              i < cols - 1 && 'border-r border-border/60',
            )}
          >
            {cell ?? ''}
          </div>
        ))}
      </div>
    </div>
  );
}

function QA({ q, children }: React.PropsWithChildren<{ q: React.ReactNode }>) {
  return (
    <div className="space-y-2">
      <p className={cn(textStyles.bodyMd, 'font-semibold text-fg')}>Q. {q}</p>
      <div
        className={cn(
          textStyles.bodyMd,
          'pl-4 border-l-2 border-primary-200 text-fg space-y-1',
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default function IVRateTip() {
  return (
    <section className="space-y-5 mt-8">
      <div className="flex items-center gap-2">
        <span className="text-xl">💡</span>
        <h3 className={cn(textStyles.titleMd, 'text-fg')}>
          수액주입속도 계산 참고
        </h3>
      </div>

      <Card variant="outlined" padding="lg" className="shadow-sm space-y-3">
        <p className={cn(textStyles.titleSm)}>기본 개념</p>
        <ul className="space-y-1.5">
          {[
            <>
              <span className="font-medium">gtt</span> = 한 방울 = 1 drop
            </>,
            <>
              <span className="font-medium">Drop factor</span> = 수액 세트마다
              1ml에 몇 방울인지 다름
            </>,
            <>
              일반 수액 세트:{' '}
              <span className="font-medium">1ml = 20 drop = 20 gtt</span>
            </>,
            <>
              소아용 수액 세트:{' '}
              <span className="font-medium">1ml = 60 drop = 60 gtt</span>{' '}
              (mcgtt)
            </>,
          ].map((item, i) => (
            <li
              key={i}
              className={cn(
                textStyles.bodyMd,
                'flex gap-2 text-fg leading-relaxed items-start',
              )}
            >
              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-fg" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* 3가지 공식 */}
      <Card variant="outlined" padding="lg" className="shadow-sm space-y-4">
        <p className={cn(textStyles.titleSm)}>공식</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              num: '①',
              label: '몇 초에 한 방울?',
              formula: (
                <>
                  <Frac num="60초" den="처방 gtt/min" />= 초/drop
                </>
              ),
            },
            {
              num: '②',
              label: 'gtt/min → ml/hr',
              formula: (
                <>
                  gtt/min <span className="font-bold mx-1">× 3</span> = ml/hr
                </>
              ),
            },
            {
              num: '③',
              label: 'ml/hr → gtt/min',
              formula: (
                <>
                  ml/hr <span className="font-bold mx-1">÷ 3</span> = gtt/min
                </>
              ),
            },
          ].map(({ num, label, formula }) => (
            <div
              key={num}
              className="flex flex-col items-center gap-3 rounded-xl border border-primary-200 bg-primary-50 p-4 text-center"
            >
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={cn(
                    textStyles.titleSm,
                    'flex items-center justify-center w-7 h-7 rounded-full bg-primary-500',
                  )}
                >
                  {num}
                </span>
                <p className={cn(textStyles.titleSm, 'text-fg')}>{label}</p>
              </div>
              <p className={cn(textStyles.bodyMd, 'text-fg')}>{formula}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="outlined" padding="lg" className="shadow-sm space-y-5">
        <QA q="20 gtt/min은 몇 초에 한 방울?">
          <p>
            공식 ① 적용 →<Frac num="60" den="20" />={' '}
            <span className="font-semibold">3초</span>에 한 방울
          </p>
        </QA>

        <QA q="20 gtt/min은 몇 ml/hr?">
          <p>
            공식 ② 적용 → 20 × 3 ={' '}
            <span className="font-semibold">60 ml/hr</span>
          </p>
        </QA>

        <QA q="60 ml/hr는 몇 gtt/min?">
          <p>
            공식 ③ 적용 → 60 ÷ 3 ={' '}
            <span className="font-semibold">20 gtt/min</span>
          </p>
        </QA>

        <QA q="150 ml/hr는 몇 초에 한 방울?">
          <p>공식 ③ → 150 ÷ 3 = 50 gtt/min</p>
          <p>
            공식 ① →<Frac num="60" den="50" />={' '}
            <span className="font-semibold">1.2초</span>에 한 방울
          </p>
        </QA>

        <QA q="120 ml/hr는 몇 초에 한 방울?">
          <p>공식 ③ → 120 ÷ 3 = 40 gtt/min</p>
          <p>
            공식 ① →<Frac num="60" den="40" />={' '}
            <span className="font-semibold">1.5초</span>에 한 방울
          </p>
        </QA>

        <QA q="100 ml/hr는 몇 초에 한 방울?">
          <p>공식 ③ → 100 ÷ 3 ≈ 34 gtt/min</p>
          <p>
            공식 ① →<Frac num="60" den="34" />≈{' '}
            <span className="font-semibold">2초</span>에 한 방울
          </p>
        </QA>

        <QA q="50 ml/hr는 몇 초에 한 방울?">
          <p>공식 ③ → 50 ÷ 3 ≈ 17 gtt/min</p>
          <p>
            공식 ① →<Frac num="60" den="17" />≈{' '}
            <span className="font-semibold">3.6초</span>에 한 방울
          </p>
        </QA>
      </Card>

      {/* 연습 문제 - 단위분석 */}
      <Card variant="outlined" padding="lg" className="shadow-sm space-y-5">
        <QA q="1L를 30분에 걸쳐 인퓨전 펌프로 주입하시오.">
          <p className="text-muted-fg">
            구하려는 값: <span className="font-semibold text-fg">ml/hr</span>
          </p>
          <UnitTable
            rows={[
              ['1 L', '60 min', '1000 ml'],
              ['30 min', '1 hr', '1 L'],
            ]}
          />
          <p>
            =<Frac num="1 × 60 × 1000 ml" den="30 × 1 hr" />={' '}
            <span className="font-semibold">2000 ml/hr</span>
          </p>
        </QA>

        <QA
          q={
            <>
              도부타민 프리믹스 500mg + 5% DW 500ml를{' '}
              <span className="font-semibold">40kg</span> 환자에게{' '}
              <span className="font-semibold">5 mcg/kg/min</span> 속도로 인퓨전
              펌프 start
            </>
          }
        >
          <p className="text-muted-fg">
            구하려는 값: <span className="font-semibold text-fg">ml/hr</span>
          </p>
          <p className="text-muted-fg">
            kg당 5 mcg → 40kg ={' '}
            <span className="text-fg font-medium">200 mcg/min</span>
          </p>
          <UnitTable
            rows={[
              ['200 mcg', '60 min', '1 mg', '500 ml'],
              ['1 min', '1 hr', '1000 mcg', '500 mg'],
            ]}
          />
          <p>
            =<Frac num="200 × 60 × 1 × 500 ml" den="1 × 1 × 1000 × 500 hr" />={' '}
            <span className="font-semibold">12 ml/hr</span>
          </p>
        </QA>
      </Card>
    </section>
  );
}
