import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { Card } from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';

export default function WhoIntroSection() {
  return (
    <div className="mb-10 space-y-6">
      <SectionTitle>WHO UMC 글로벌 의약품 부작용 보고 및 분석</SectionTitle>
      <Card variant="primary" padding="lg">
        <p className={cn(textStyles.bodyMd, 'leading-relaxed text-fg')}>
          WHO 협력기관인 <strong>Uppsala Monitoring Centre(UMC)</strong>는
          세계보건기구(WHO)의 <strong>국제 의약품 모니터링 프로그램</strong>
          (WHO Programme for International Drug Monitoring)을 운영하며, 전
          세계에서 보고되는 의약품 및 백신의 부작용 정보를 수집하고 분석하는
          역할을 수행합니다.
        </p>
      </Card>

      <div className={cn('space-y-4', textStyles.bodyMd)}>
        <p>
          각 국가의 약물감시기관(National Pharmacovigilance Centre)에서 보고된{' '}
          <strong>
            개별 부작용 사례 보고서(Individual Case Safety Reports, ICSRs)
          </strong>
          는 WHO의 글로벌 데이터베이스인 <strong>VigiBase</strong>에 축적됩니다.
          이 데이터베이스에는 수천만 건 이상의 부작용 보고가 저장되어 있으며
          지속적으로 업데이트되고 있습니다.
        </p>
        <p>
          UMC는 이러한 글로벌 데이터를 기반으로 <strong>통계적 분석</strong>과{' '}
          <strong>신호 탐지(signal detection)</strong>를 수행하여 의약품과
          백신의 잠재적인 안전성 문제를 조기에 발견합니다. 분석 결과는 각국
          규제기관 및 보건 당국과 공유되어 의약품 안전 관리와 환자 보호를 위한
          의사결정에 활용됩니다.
        </p>
        <p>
          이와 같은 국제 협력 체계를 통해 WHO와 UMC는 전 세계 약물감시
          네트워크를 강화하고, 의약품과 백신의 안전성을 지속적으로 평가하여{' '}
          <strong>환자 안전과 공중보건 향상</strong>에 기여하고 있습니다.
        </p>
      </div>
    </div>
  );
}
