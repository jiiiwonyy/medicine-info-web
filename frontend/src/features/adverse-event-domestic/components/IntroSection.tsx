import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function IntroSection() {
  return (
    <div className={cn('mb-8 space-y-2', textStyles.bodyMd)}>
      <p>
        국내에서 보고된 의약품 이상사례 자료는{' '}
        <strong>한국의약품안전관리원(KIDS)</strong>을 통해 수집·관리되며,
        식품의약품안전처의 안전성 검토 및 정책에 활용됩니다.
      </p>
      <p>
        이상사례 자료는 <strong>실마리정보 탐지</strong>,{' '}
        <strong>안전성 서한 발행</strong> 등 후속 안전조치의 근거가 됩니다.
      </p>
    </div>
  );
}
