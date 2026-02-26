import { Card } from '@/components/ui/Card';
import Callout from '@/components/ui/Callout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SectionHeader from '@/features/error-reduction-strategy/components/SectionHeader';
import BulletList from '@/features/error-reduction-strategy/components/BulletList';
import { SBAR_ITEMS } from '@/features/error-reduction-strategy/data/sbarData';
import { IPASS_BLOCKS } from '@/features/error-reduction-strategy/data/ipassData';

export default function CommunicationSection() {
  return (
    <div className="flex flex-col gap-10">
      {/* 4대 원칙 */}
      <section className="space-y-4">
        <Callout variant="info" icon="💡">
          <p className={cn(textStyles.bodyMd, 'font-semibold leading-relaxed')}>
            오류 감소를 위해 효과적인 의사소통이 중요합니다.
          </p>
          <p className={cn(textStyles.bodyMd, 'mt-1 leading-relaxed')}>
            의사소통은{' '}
            <span className="font-semibold">
              완결성, 명확성, 간결성, 적시성
            </span>
            이 있어야 합니다.
          </p>
        </Callout>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { title: '완결성', desc: '관련된 모든 정보를 전달', icon: '📦' },
            {
              title: '명확성',
              desc: '쉽게 이해할 수 있는 형태로 정보를 전달',
              icon: '🔍',
            },
            {
              title: '간결성',
              desc: '꼭 필요한 정보만 간결하게 전달',
              icon: '✂️',
            },
            {
              title: '적시성',
              desc: '요구된 정보를 적절한 시간 내에 공급하고 진위를 확인',
              icon: '⏱️',
            },
          ].map(({ title, desc, icon }) => (
            <Card
              key={title}
              variant="outlined"
              padding="md"
              className="shadow-sm text-center space-y-2"
            >
              <div className="text-2xl">{icon}</div>
              <p className={cn(textStyles.titleSm)}>{title}</p>
              <p
                className={cn(
                  textStyles.bodyMd,
                  'text-muted-fg leading-relaxed',
                )}
              >
                {desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* 1. SBAR */}
      <section className="space-y-4">
        <SectionHeader number={1} title="SBAR" />
        <p className={cn(textStyles.bodyMd, 'text-muted-fg')}>
          팀 구성원들이 상호간에 효과적인 의사소통을 하기 위한 프레임워크
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SBAR_ITEMS.map(({ letter, word, label, question, color, badge }) => (
            <div
              key={letter + word}
              className={cn('rounded-xl border p-4 flex flex-col gap-2', color)}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    textStyles.titleSm,
                    'flex items-center justify-center w-8 h-8 rounded-lg',
                    badge,
                  )}
                >
                  {letter}
                </span>
                <span className={cn(textStyles.titleSm)}>{label} </span>
                <span className={cn(textStyles.bodyMd)}>{word}</span>
              </div>
              <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>
                {question}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Call-out */}
      <section className="space-y-4">
        <SectionHeader number={2} title="콜아웃 (Call-out)" />
        <Card variant="outlined" padding="lg" className="shadow-sm">
          <p className={cn(textStyles.bodyMd, 'font-semibold mb-2')}>
            중요한 정보를 전달할 때 사용하는 방법
          </p>
          <BulletList
            items={[
              '응급 상황에서 전체 팀 구성원에게 동시에 정보를 전달',
              '팀 구성원이 다음 단계를 예측하는 것을 도움',
            ]}
          />
        </Card>
      </section>

      {/* 3. Check-Back */}
      <section className="space-y-4">
        <SectionHeader number={3} title="재확인 (Check-Back)" />
        <Card variant="outlined" padding="lg" className="shadow-sm">
          <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
            발신자가 전달한 정보를 수신자가 올바르게 이해할 수 있도록 하는 데
            사용되는{' '}
            <span className="font-semibold text-primary-700">
              폐쇄 루프 커뮤니케이션 전략
            </span>
          </p>
        </Card>
      </section>

      {/* 4. I-PASS */}
      <section className="space-y-4">
        <SectionHeader number={4} title="인수인계 방법: I-PASS" />
        <p className={cn(textStyles.bodyMd, 'text-muted-fg')}>
          환자 치료 전환 상황에서 권한 및 책임과 함께 정보를 전달하기 위한
          표준화된 방법
        </p>

        <Callout variant="info" icon="📋">
          <p className={cn(textStyles.bodyMd, 'font-semibold mb-1')}>
            적절한 인수인계에는 다음이 포함:
          </p>
          <ul className="space-y-1">
            {[
              '책임과 권한의 이양',
              '정보의 명확성',
              '구두로 정보 전달',
              '수신자의 확인',
              '질문 및 검토 기회 제공',
            ].map((item, i) => (
              <li key={i} className={cn(textStyles.bodyMd, 'flex gap-2')}>
                <span>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Callout>

        {/* I-PASS 세로 타임라인 */}
        <div className="flex flex-col">
          {IPASS_BLOCKS.map((block, idx, arr) => {
            const isLast = idx === arr.length - 1;
            return (
              <div key={block.key} className="flex gap-4">
                {/* 왼쪽: 배지 + 연결선 */}
                <div className="flex flex-col items-center shrink-0 w-10">
                  <span
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-full font-extrabold text-lg text-white shrink-0',
                      block.badgeBg,
                    )}
                  >
                    {block.letter}
                  </span>
                  {!isLast && (
                    <div className={cn('w-0.5 flex-1 my-1', block.lineColor)} />
                  )}
                </div>

                {/* 오른쪽: 내용 */}
                <div className={cn('flex-1', isLast ? 'pb-0' : 'pb-8')}>
                  <div className="pt-1.5 mb-3">
                    <p className={cn(textStyles.titleSm)}>{block.titleKo}</p>
                    <p className={cn(textStyles.bodySm, 'text-muted-fg')}>
                      {block.titleEn}
                    </p>
                  </div>

                  <ul
                    className={cn(
                      'rounded-xl border p-3 space-y-2',
                      block.accentBg,
                      block.accentBorder,
                    )}
                  >
                    {block.items.map((it) => (
                      <li key={it.ko} className="flex gap-2">
                        <span
                          className={cn(
                            'mt-[3px] shrink-0 font-bold',
                            block.accentText,
                          )}
                        >
                          ›
                        </span>
                        <div>
                          <p
                            className={cn(
                              textStyles.bodyMd,
                              'font-medium text-fg leading-snug',
                            )}
                          >
                            {it.ko}
                          </p>
                          <p
                            className={cn(
                              textStyles.captionMd,
                              'text-muted-fg',
                            )}
                          >
                            {it.en}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
