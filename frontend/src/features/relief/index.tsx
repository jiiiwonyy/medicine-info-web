import * as React from 'react';
import PageLayout from '@/components/PageLayout';
import ReportingMethodsSection from '@/features/relief/components/ReportingMethodsSection';
import ReportItemsSection from '@/features/relief/components/ReportItemSection';
import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function ReliefPage() {
  return (
    <PageLayout title="부작용(이상사례) 보고">
      <div className="space-y-12">
        <section>
          <div className="flex justify-center items-end mb-12 relative h-72">
            <div className="absolute bottom-0 w-72 h-72 bg-gray-100 rounded-full border border-gray-200" />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(16rem-20px)] text-center text-black">
              <p className="font-semibold text-lg">부작용</p>
              <p className="text-sm opacity-90">Side Effect</p>
            </div>

            <div className="absolute bottom-0 w-56 h-56 bg-sky-100 rounded-full border border-gray-200" />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(12rem-20px)] text-center text-black">
              <p className="font-semibold text-base">이상사례</p>
              <p className="text-sm opacity-90">Adverse Event</p>
            </div>

            <div className="absolute bottom-0 w-40 h-40 bg-sky-600 rounded-full border border-gray-200" />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(5rem-20px)] text-center text-white">
              <p className="font-semibold text-sm">약물이상반응</p>
              <p className="text-xs opacity-90">Adverse Drug Reaction</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padding="lg" className="bg-gray-100 border border-gray-200">
              <h4 className={cn(textStyles.titleSm, 'mb-2')}>1. 부작용</h4>
              <p className={cn(textStyles.bodyMd, 'mb-1 text-muted-fg')}>
                Side Effect
              </p>
              <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>
                의약품 등을 정상적인 용량에 따라 투여할 경우 발생하는{' '}
                <strong>모든 의도되지 않은 효과</strong> (유익한 효과 포함)
              </p>
            </Card>

            <div className="bg-sky-100 p-6 rounded-xl border border-sky-100">
              <h4 className={cn(textStyles.titleSm, 'mb-2')}>
                2. 이상사례 (AE)
              </h4>
              <p className={cn(textStyles.bodyMd, 'mb-1 text-muted-fg')}>
                Adverse Event
              </p>
              <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>
                의약품 투여 중 발생한 바람직하지 않은 징후, 증상, 질병.
                <span
                  className={cn(
                    textStyles.bodySm,
                    'block mt-1 text-primary-700',
                  )}
                >
                  *약물과 반드시 인과관계가 입증된 것은 아님
                </span>
              </p>
            </div>

            <div className="bg-sky-600 p-6 rounded-xl text-white shadow-md">
              <h4 className={cn(textStyles.titleSm, 'mb-2')}>
                3. 약물이상반응 (ADR)
              </h4>
              <p className={cn(textStyles.bodyMd, 'mb-1')}>
                Adverse Drug Reaction
              </p>
              <p className="text-white leading-relaxed">
                정상적인 용법에도 불구하고 발생한 해롭고 예기치 못한 반응.
                인과관계가 어느 정도 입증된 경우를 말함.
              </p>
            </div>
          </div>
        </section>
        <section
          className={cn(
            'bg-surface rounded-lg border border-border shadow-sm p-8',
            'border-l-4 border-l-danger',
          )}
        >
          <h2
            className={cn(
              textStyles.titleSm,
              'mb-4 text-danger flex items-center gap-2',
            )}
          >
            ⚠️ 중대한 이상사례·약물이상반응
          </h2>
          <p className={cn(textStyles.bodySm, 'mb-4')}>
            다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
            {[
              '사망을 초래하거나 생명을 위협하는 경우',
              '입원 또는 입원기간의 연장이 필요한 경우',
              '지속적 또는 중대한 불구나 기능저하를 초래하는 경우',
              '선천적 기형 또는 이상을 초래하는 경우',
            ].map((item, index) => (
              <li
                key={index}
                className={cn(textStyles.bodyMd, 'flex items-start text-fg')}
              >
                <span className="mr-2 text-danger">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-8">
          <div>
            <h2
              className={cn(
                textStyles.titleMd,
                'mb-4 text-fg border-b border-border pb-2',
              )}
            >
              의약품 이상사례 보고의 필요성
            </h2>
            <Card variant="outlined">
              <p
                className={cn(
                  textStyles.bodyMd,
                  'leading-relaxed text-fg text-justify',
                )}
              >
                의약품은 시판 전 동물시험에 의한 전임상시험과 사람에 대한
                임상시험을 거쳐 시판 허가를 받게 됩니다. 이러한 임상시험은
                관찰기간이 제한되고, 한정된 연구대상자를 대상으로 하기 때문에
                모든 약물이상반응을 파악하는 것은 불가능합니다.
                <br />
                <br />
                따라서{' '}
                <strong className="text-primary-700">시판 후 약물감시</strong>는
                대단히 중요하며, 의약품 사용시 나타나는 각종 이상사례를
                수집·평가하여 안전대책을 강구함으로써 국민의 안전한 의약품
                사용을 도모할 수 있습니다.
              </p>
            </Card>
          </div>

          <div>
            <h2
              className={cn(
                textStyles.titleMd,
                'mb-4 text-fg border-b border-border pb-2',
              )}
            >
              이상사례 보고 후 과정
            </h2>
            <Card variant="primary" padding="lg">
              <div className="flex flex-col md:flex-row items-stretch gap-0">
                {[
                  {
                    icon: '📋',
                    title: '정보 수집',
                    desc: '한국의약품안전관리원으로 체계적인 정보 보고 및 수집',
                  },
                  {
                    icon: '🗄️',
                    title: 'DB 구축',
                    desc: '전국적인 이상사례 데이터베이스 구축 및 관리',
                  },
                  {
                    icon: '🔍',
                    title: '분석 및 연구',
                    desc: '실마리정보 분석 및 심층적 약물역학 연구 수행',
                  },
                  {
                    icon: '⚖️',
                    title: '안전 대책 강구',
                    desc: '안전성 정보 생산 및 정부 위해관리정책 근거 제공',
                  },
                ].map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    {/* 스텝 카드: 가로로 균등 분배, 넘침 없음 */}
                    <div className="flex-1 min-w-0 flex flex-col items-center text-center px-3 py-5">
                      <div className="flex items-center justify-center w-14 h-14 rounded-full text-2xl mb-3 bg-bg shrink-0">
                        {step.icon}
                      </div>
                      <p
                        className={cn(textStyles.titleSm, 'mb-1.5 break-keep')}
                      >
                        {step.title}
                      </p>
                      <p
                        className={cn(
                          textStyles.bodySm,
                          'leading-snug break-keep',
                        )}
                      >
                        {step.desc}
                      </p>
                    </div>
                    {idx < arr.length - 1 && (
                      <div
                        className="flex items-center justify-center shrink-0 text-muted-fg/50 text-lg
                                      md:self-center md:px-1
                                      self-center py-0"
                      >
                        <span className="hidden md:inline">→</span>
                        <span className="md:hidden">↓</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <ReportingMethodsSection />
        <ReportItemsSection />
      </div>
    </PageLayout>
  );
}
