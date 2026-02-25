import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function LawRoleSection() {
  return (
    <section>
      <h3 className={cn(textStyles.titleMd, 'text-primary-700 mt-10 mb-4')}>
        📘 핵심 역할
      </h3>
      <ul className={cn(textStyles.bodyMd, 'list-disc pl-6 space-y-1')}>
        <li>
          <strong>법률정보 통합 제공</strong>: 법률, 시행령, 판례, 조례 등
          흩어져 있는 모든 법령정보를 하나로 모아 제공합니다.
        </li>
        <li>
          <strong>대국민 접근성 보장</strong>: 전문가부터 일반 국민까지 누구나
          회원가입 없이 모든 정보를 무료로 이용할 수 있도록 합니다.
        </li>
        <li>
          <strong>정보의 신뢰성 확보</strong>: 국가 법제 업무 총괄 기관인
          법제처가 직접 운영하여 가장 정확하고 최신 정보를 유지합니다.
        </li>
      </ul>
    </section>
  );
}
