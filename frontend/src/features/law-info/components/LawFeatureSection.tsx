import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SectionTitle from '@/components/ui/SectionTitle';

const FEATURES = [
  {
    icon: '🏛️',
    title: '3단 비교',
    desc: '법률-시행령-시행규칙을 한 화면에 나란히 놓고 비교할 수 있습니다. 법 조항이 하위 법령에서 어떻게 구체화되는지 한눈에 파악 가능합니다.',
  },
  {
    icon: '🔄',
    title: '신구법 비교',
    desc: '법이 개정되었을 때 개정 전(구법)과 후(신법)의 조문을 나란히 비교하여 변경된 부분을 쉽게 확인할 수 있습니다.',
  },
  {
    icon: '📄',
    title: 'HWP·PDF 파일 다운로드',
    desc: '법령에 첨부된 각종 별표, 서식(신청서 등)을 클릭 한 번으로 다운로드하여 바로 사용할 수 있습니다.',
  },
  {
    icon: '🔍',
    title: '통합 검색 및 연혁 조회',
    desc: '키워드 하나로 관련된 법령, 판례 등을 모두 찾고, 특정 법의 제정부터 현재까지 모든 개정 이력을 조회할 수 있습니다.',
  },
];

export default function LawFeatureSection() {
  return (
    <section className="mt-10">
      <SectionTitle className="mb-4">⚙️ 핵심 기능</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FEATURES.map((f) => (
          <Card key={f.title} variant="outlined" padding="md" className="flex items-start gap-3">
            <span className="text-2xl shrink-0">{f.icon}</span>
            <div>
              <p className={cn(textStyles.titleSm, 'mb-1')}>{f.title}</p>
              <p className={cn(textStyles.bodyMd, 'text-muted-fg')}>{f.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
