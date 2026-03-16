import { Card } from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ProvidedStatsSection() {
  return (
    <section className="mb-10">
      <SectionTitle className="mb-4">제공되는 주요 통계</SectionTitle>
      <Card variant="muted" className="mb-2">
        국내 의약품 부작용 보고 추이 (그래프)
      </Card>
      <Card variant="muted" className="mb-2">
        성별·연령대별 분포 (차트)
      </Card>
      <Card variant="muted" className="mb-2">
        주요 이상사례 유형 (예: 발진, 소화기계 이상, 간수치 상승 등)
      </Card>
      <Card variant="muted">보고 주체별 분포 (의료인 / 제약사 / 소비자)</Card>
    </section>
  );
}
