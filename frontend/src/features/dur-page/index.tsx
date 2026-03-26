import Callout from '@/components/ui/Callout';
import PageLayout from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import { textStyles } from '@/styles/typography';
import { cn } from '@/shared/cn';
import SectionTitle from '@/components/ui/SectionTitle';
import SubTitle from '@/components/ui/SubTitle';
import ItemTitle from '@/components/ui/ItemTitle';
import DurInfoCard from '@/features/dur-page/components/DurInfoCard';
import { DUR_MAIN_INFO, DUR_USE_CASES } from '@/features/dur-page/data/DurData';

export default function DURPage() {
  return (
    <PageLayout title="의약품안전사용서비스(DUR)">
      <div className="space-y-12">
        {/* DUR 정의 */}
        <section className="space-y-4">
          <SectionTitle>DUR(의약품안전사용서비스)란?</SectionTitle>

          <Callout variant="info" className="mb-8">
            <p
              className={cn(textStyles.bodyMd, 'text-fg leading-relaxed mb-4')}
            >
              <strong className="text-primary-700">
                DUR(Drug Utilization Review, 의약품안전사용서비스)
              </strong>
              는 환자의 안전한 의약품 사용을 위해 처방·조제 단계에서 금기 및
              주의사항을 실시간으로 점검·제공하는 국가 운영 서비스입니다.
            </p>
            <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
              의약품 처방 또는 조제 시 환자의 연령, 성별, 임신 여부, 기존 투약
              이력 등을 종합적으로 분석하여 임상적으로 문제가 될 수 있는 의약품
              사용을 사전에 차단하거나 주의를 환기하는 것을 목적으로 합니다.
            </p>
          </Callout>
        </section>

        {/* DUR 서비스 제공 방식 */}
        <section className="space-y-4">
          <SectionTitle>DUR 서비스 제공 방식</SectionTitle>

          <Card variant="outlined" padding="lg" className="border-border">
            <div className="space-y-3">
              <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
                의약품명을 검색하거나 처방·조제 시스템을 통해 확인하면, 해당
                의약품에 대한{' '}
                <strong className="text-fg">
                  DUR 기준 정보가 실시간으로 제공
                </strong>
                됩니다.
              </p>
              <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
                제공되는 정보는{' '}
                <span className="font-semibold text-primary-700">
                  건강보험심사평가원
                </span>
                에서 관리·운영하며, 임상적 근거 및 안전성 정보를 바탕으로
                지속적으로 업데이트됩니다.
              </p>
            </div>
          </Card>
        </section>

        {/* DUR 주요 정보 */}
        <section className="space-y-4">
          <SectionTitle>DUR에서 제공하는 주요 정보</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DUR_MAIN_INFO.map((item) => (
              <DurInfoCard
                key={item.key}
                icon={item.icon}
                title={item.title}
                desc={item.desc}
              />
            ))}
          </div>
        </section>

        {/* DUR 활용 사례 */}
        <section className="space-y-4">
          <SectionTitle>DUR 활용 사례</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DUR_USE_CASES.map((item) => (
              <Card
                key={item.title}
                variant="muted"
                padding="md"
                className="border-border"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-primary-100 text-primary flex items-center justify-center font-bold">
                      ✔
                    </div>
                  </div>

                  <div className="space-y-1">
                    <ItemTitle>{item.title}</ItemTitle>
                    <p
                      className={cn(
                        textStyles.bodyMd,
                        'text-muted-fg leading-relaxed',
                      )}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 마무리 강조 섹션 */}
        <section>
          <Card variant="primary" padding="lg" className="text-center">
            <SubTitle className="text-2xl mb-4">
              DUR 활용의 의의
            </SubTitle>
            <p
              className={cn(textStyles.bodyMd, 'text-muted-fg leading-relaxed')}
            >
              DUR은 단순한 경고 시스템이 아니라, 의약품 오남용 예방, 중대한 약물
              사고 감소, 환자 중심 약료 실현을 위한{' '}
              <span className="text-primary-700 font-bold border-b border-primary-200">
                핵심 인프라
              </span>
              입니다.
            </p>

            <div className="mt-6">
              <p className={cn(textStyles.titleLg)}>
                "의료 현장에서 DUR을 적극적으로 활용하는 것은 <br />
                <strong className="text-primary-700">
                  전문가로서의 책임이자 환자 보호를 위한 필수 과정
                </strong>
                입니다."
              </p>
            </div>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}
