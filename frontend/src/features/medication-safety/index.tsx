import PageLayout from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import Callout from '@/components/ui/Callout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import StatCard from '@/features/medication-safety/components/StatCard';
import WhoAreaSection from '@/features/medication-safety/components/WhoAreaSection';
import HamTableSection from '@/features/medication-safety/components/HamTableSection';
import { WHO_AREAS } from '@/features/medication-safety/data/whoAreas';
import { HAM_CATEGORIES } from '@/features/medication-safety/data/hamCategories';

export default function MedicationSafetyPage() {
  return (
    <PageLayout title="투약안전(Medication Safety)">
      <div className="flex flex-col gap-10 pb-10">
        {/* A. Hero */}
        <div className="flex flex-col gap-6">
          <Card variant="outlined" padding="lg" className="shadow-sm">
            <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
              <span className="font-semibold">투약안전(Medication Safety)</span>
              은 약물 사용에서 발생 가능한{' '}
              <span className="font-semibold">투약 오류</span>를 올바르게
              교정하여 예방하고자 하는 활동으로, 투약과정에서 발생할 수 있는
              사고나 오류의 제거로 정의됩니다(WHO, 2009).
            </p>
          </Card>

          <Callout
            variant="info"
            icon="💡"
            className="bg-primary-50 border-primary-200 text-primary-900"
          >
            <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>
              투약오류 중{' '}
              <span className="font-bold border-b-2 border-primary-500">
                3분의 2가 예방 가능
              </span>
              한 것으로 보고되며(WHO, 2022), 투약은 치료 과정에서 가장 큰 영역을
              차지하는 동시에 많은 의료오류가 발생하는 분야이므로 예방 가능한
              투약오류를 줄이는 것이 중요합니다.
            </p>
          </Callout>
        </div>

        {/* B. Stats */}
        <section className="space-y-4">
          <div className={cn(textStyles.titleMd, 'flex items-center gap-2')}>
            <span
              className={cn(
                textStyles.uiLg,
                'flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-fg',
              )}
            >
              1
            </span>
            왜 중요한가?
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="예방 가능 비율"
              value="2/3"
              note="투약오류 중 3분의 2 예방 가능"
            />
            <StatCard
              title="입원 관련"
              value="6~7%"
              note="병원 입원의 6~7%가 투약오류와 관련"
            />
            <StatCard title="환자 경험" value="11%" note="투약 오류 경험" />
            <StatCard
              title="연간 사망(미국)"
              value="7,000명+"
              note="투약오류로 인한 연간 사망자 수"
            />
          </div>
        </section>

        {/* C. WHO 3 areas */}
        <WhoAreaSection areas={WHO_AREAS} />

        {/* D. HAM definition */}
        <section className="space-y-4">
          <div className={cn(textStyles.titleMd, 'flex items-center gap-2')}>
            <span
              className={cn(
                textStyles.uiLg,
                'flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-fg',
              )}
            >
              3
            </span>
            고위험약물(High Alert Medication)이란?
          </div>

          <Card variant="outlined" padding="lg" className="shadow-sm">
            <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
              오류 발생 시 환자와 직원의 안전에{' '}
              <span className="font-semibold text-danger-700 bg-danger-50 px-1 rounded">
                치명적인 위해 또는 잠재적으로 높은 위험
              </span>
              을 초래할 가능성이 있거나, 치료역이 좁아 부작용이 발현될 위험성이
              높아, ‘처방, 보관, 조제, 이송, 투여, 폐기’ 시 특별한 주의를 요하는
              의약품입니다.
            </p>
          </Card>
        </section>

        {/* E. HAM list */}
        <HamTableSection categories={HAM_CATEGORIES} />
      </div>
    </PageLayout>
  );
}
