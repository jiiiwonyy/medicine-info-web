import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

type InfoCard = { title: string; desc: React.ReactNode };

const INFO_CARDS: InfoCard[] = [
  {
    title: '효능·효과',
    desc: (
      <>
        의약품의{' '}
        <strong className="text-primary-700">허가된 적응증(Indication)</strong>
        을 기술하는 항목으로, 임상시험 결과 및 약리학적 근거에 따라
        식품의약품안전처가 승인한 치료 목적을 의미
      </>
    ),
  },
  {
    title: '용법·용량',
    desc: (
      <>의약품의 표준 투여 경로, 투여 빈도, 1회 및 1일 투여량을 규정하는 항목</>
    ),
  },
  {
    title: '사용상의 주의사항',
    desc: (
      <>
        의약품 사용 시 발생 가능한 위해 요소를 최소화하기 위한 안전성 정보를
        제공하는 항목
      </>
    ),
  },
];

export default function KeyInfoCards() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {INFO_CARDS.map((item) => (
        <Card
          key={item.title}
          variant="primary"
          padding="lg"
          className="flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-700" />
            <strong className={cn(textStyles.titleSm, 'text-fg')}>
              {item.title}
            </strong>
          </div>
          <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
            {item.desc}
          </p>
        </Card>
      ))}
    </div>
  );
}
