import PageLayout from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import StatCard from '@/features/medication-safety/components/StatCard';
import WhoAreaSection from '@/features/medication-safety/components/WhoAreaSection';
import HamTableSection from '@/features/medication-safety/components/HamTableSection';
import MedicationErrorChartsSection from '@/features/medication-safety/components/MedicationErrorChartsSection';
import { WHO_AREAS } from '@/features/medication-safety/data/whoAreas';
import { HAM_CATEGORIES } from '@/features/medication-safety/data/hamCategories';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';

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
        </div>

        {/* B. Stats */}
        <section className="space-y-4">
          <SectionNumberHeader number={1} title="왜 중요한가?" />
          <p>
            투약은 환자 치료 과정의 가장 큰 영역을 차지하지만, 동시에 가장
            빈번한 의료 오류가 발생하는 지점입니다. 아래 데이터는 우리가 왜 투약
            안전에 집중해야 하는지를 명확히 보여줍니다.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="연간 사망자 수(추정)"
              value="7,000명"
              note="투약오류로 인한 심각한 결과"
              accentColor="bg-danger"
            />
            <StatCard
              title="환자 경험 비율(7개국)"
              value="11%"
              note="환자 10명중 1명은 오류 경험"
              accentColor="bg-success"
            />
            <StatCard
              title="병원 입원 관련성"
              value="6~7%"
              note="전체 입원의 투약오류 연관 비율"
            />
          </div>
          <MedicationErrorChartsSection />
        </section>

        {/* C. WHO 3 areas */}
        <WhoAreaSection areas={WHO_AREAS} />

        {/* D. HAM definition */}
        <section className="space-y-4">
          <SectionNumberHeader
            number={3}
            title="고위험약물(High Alert Medication)이란?"
          />
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
