import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SectionTitle from '@/components/ui/SectionTitle';
import LinkButton from '@/components/ui/LinkButton';

export default function LookupGuideSection() {
  return (
    <div className="mt-12">
      <SectionTitle className="mb-3">이상사례보고 조회 안내</SectionTitle>
      <p className={cn(textStyles.bodySm, 'mb-4 text-muted-fg')}>
        <strong className="text-fg">의약품안전나라</strong> 사이트에서
        이상사례보고 동향을 직접 확인할 수 있습니다.
      </p>

      <ol className={cn(textStyles.bodySm, 'list-decimal pl-6 mb-6 space-y-1')}>
        <li>의약품안전나라 접속</li>
        <li>상단 메뉴 → 전자민원/보고 → 이상사례 → 이상사례보고 동향</li>
      </ol>

      <LinkButton
        href="https://nedrug.mfds.go.kr/bbs/2"
        text="의약품안전나라 이상사례보고동향 바로가기"
      />
    </div>
  );
}
