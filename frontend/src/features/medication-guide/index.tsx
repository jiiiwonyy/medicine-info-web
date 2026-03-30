import PageLayout from '@/components/PageLayout';
import Button from '@/components/ui/Button';
import Callout from '@/components/ui/Callout';
import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import HowToSection from '@/features/medication-guide/components/HowToSection';
import {
  KPIS_STEPS,
  KPIS_URL,
} from '@/features/medication-guide/data/medicationGuide';
import SectionTitle from '@/components/ui/SectionTitle';

const FEATURES = [
  { icon: '🔍', text: '제품명으로 검색 시 해당 의약품의 복약지도서 확인 가능' },
  { icon: '🧪', text: '성분명으로도 검색 가능, 동일 성분 복약정보 비교 제공' },
  { icon: '🖨️', text: '복약지도서 인쇄 및 열람 기능 지원' },
  { icon: '👤', text: '환자 맞춤형 복약 설명을 위한 전문 정보 제공' },
];

export default function MedicationGuidePage() {
  return (
    <PageLayout title="복약지도서">
      <section className="mb-10">
        <p className={cn(textStyles.bodySm, 'text-primary-700 mb-1')}>
          Korean Pharmaceutical Information Service
        </p>
        <SectionTitle className="mb-4">약학정보원 (KPIS)</SectionTitle>
        <p className={textStyles.bodyMd}>
          <strong>약학정보원(KPIS)</strong>은 국내 유일의 공신력 있는 의약품
          정보 통합 플랫폼으로, 제품별 복약지도서를 제공하여 의료진과 환자가
          안전하고 올바르게 약을 사용할 수 있도록 돕습니다.
        </p>
      </section>

      {/* 복약지도서란? */}
      <section className="mb-10">
        <SectionTitle className="mb-4">🧾 복약지도서란?</SectionTitle>
        <Callout variant="info">
          복약지도서는 환자가 약을{' '}
          <strong>안전하고 효과적으로 복용할 수 있도록</strong> 복용 방법,
          보관법, 주의사항 등을 쉽게 정리한 안내문입니다. 환자 맞춤형 설명이
          가능하며, 의료진이 환자 교육 자료로 활용할 수 있습니다.
        </Callout>
      </section>

      {/* 주요 기능 */}
      <section className="mb-10">
        <SectionTitle className="mb-4">📄 주요 기능</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FEATURES.map((f) => (
            <Card
              key={f.icon}
              variant="outlined"
              padding="md"
              className="flex items-start gap-3"
            >
              <span className="text-xl shrink-0">{f.icon}</span>
              <p className={textStyles.bodyMd}>{f.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* 확인 방법 */}
      <section className="mb-10">
        <SectionTitle className="mb-4">복약지도서 확인 방법</SectionTitle>
        <HowToSection steps={[...KPIS_STEPS]} />
      </section>

      <Button asChild className="w-full">
        <a href={KPIS_URL} target="_blank" rel="noopener noreferrer">
          🔗 약학정보원 복약지도서 검색 바로가기
        </a>
      </Button>
    </PageLayout>
  );
}
