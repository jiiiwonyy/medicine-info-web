import PageLayout from '@/components/PageLayout';
import DefinitionCardsSection from '@/features/relief/components/DefinitionCardsSection';
import ReportingMethodsSection from '@/features/relief/components/ReportingMethodsSection';
import ReportItemsSection from '@/features/relief/components/ReportItemSection';
import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function ReliefPage() {
  return (
    <PageLayout>
      <div className="space-y-12">
        <DefinitionCardsSection />
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
            <Card variant="outlined">
              <p
                className={cn(
                  textStyles.bodyMd,
                  'leading-relaxed text-fg text-justify',
                )}
              >
                이상사례가 보고되면,{' '}
                <strong className="text-primary-700">
                  한국의약품안전관리원
                </strong>
                에서는 이러한 정보를 체계적으로 수집하고, 보고된 자료 관리를
                통하여 이상사례보고 데이터베이스를 구축합니다.
                <br />
                <br />
                이렇게 축적된 이상사례 데이터베이스를 이용하여 약물이상사례의
                실마리정보를 분석하게 되며, 또한 특정 이상사례에 대해 보다
                체계적으로 평가하거나 심층적인 약물역학연구를 수행합니다. 이를
                통해 의약품 안전성정보를 생산하며, 정부의 위해 관리정책에 대한
                근거를 제공하는 업무를 수행하고 있습니다.
              </p>
            </Card>
          </div>
        </section>

        <ReportingMethodsSection />
        <ReportItemsSection />
      </div>
    </PageLayout>
  );
}
