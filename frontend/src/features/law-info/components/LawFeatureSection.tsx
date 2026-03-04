import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function LawFeatureSection() {
  return (
    <section>
      <h3 className={cn(textStyles.titleMd, 'text-primary-700 mt-10 mb-4')}>
        ⚙️ 핵심 기능
      </h3>

      <ul className={cn(textStyles.bodyMd, 'list-disc pl-6 space-y-1')}>
        <li>
          🏛️ <strong>3단 비교 법률-시행령</strong> - 시행규칙을 한 화면에 나란히
          놓고 비교할 수 있는 가장 강력한 기능입니다.
          <span className="pl-5 block">
            법 조항이 하위 법령에서 어떻게 구체화되는지 한눈에 파악할 수
            있습니다.
          </span>
        </li>
        <li>
          🔄 <strong>신구법 비교</strong> 법이 개정되었을 때,{' '}
          <strong>개정 전(구법)과 후(신법)의 조문</strong>을 나란히 비교하여
          변경된 부분을 쉽게 확인할 수 있습니다.
        </li>
        <li>
          📄 <strong>한글(HWP)·PDF 파일 다운로드</strong> 법령에 첨부된 각종{' '}
          <strong>별표, 서식(신청서 등)</strong>을 클릭 한 번으로 다운로드하여
          바로 사용할 수 있습니다.
        </li>
        <li>
          🔍 <strong>통합 검색 및 연혁 조회</strong> 키워드 하나로 관련된 법령,
          판례 등을 모두 찾고, 특정 법의 제정부터 현재까지 모든 개정 이력을
          조회할 수 있습니다.
        </li>
      </ul>
    </section>
  );
}
