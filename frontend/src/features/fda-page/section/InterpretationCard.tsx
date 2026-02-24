import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function InterpretationCard() {
  return (
    <Card variant="muted">
      <div className={cn(textStyles.titleSm, 'mb-4')}>해석 시 주의</div>
      <ul className={cn(textStyles.bodySm, 'list-disc pl-5 space-y-1')}>
        <li>
          FAERS는 자발적 보고 데이터라 인과관계를 확정하지 않으며, 보고 편향이
          존재할 수 있어요.
        </li>
        <li>
          의심약(PS/SS) 필터를 끄면 병용약(C)까지 포함되어 보고 건수가 증가할 수
          있어요.
        </li>
        <li>동일 ISR에서 여러 PT가 함께 보고되면 각각 카운트에 포함됩니다.</li>
      </ul>
    </Card>
  );
}
