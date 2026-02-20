import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function ProvidedStatsSection() {
  return (
    <>
      <h3 className={cn(textStyles.titleLg, 'mb-3')}>제공되는 주요 통계</h3>
      <ul className={cn(textStyles.bodySm, 'list-disc pl-6 mb-8 space-y-1')}>
        <li>국내 의약품 부작용 보고 추이 (그래프)</li>
        <li>성별·연령대별 분포 (차트)</li>
        <li>주요 이상사례 유형 (예: 발진, 소화기계 이상, 간수치 상승 등)</li>
        <li>보고 주체별 분포 (의료인 / 제약사 / 소비자)</li>
      </ul>
    </>
  );
}
