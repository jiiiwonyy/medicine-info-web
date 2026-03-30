import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SectionTitle from '@/components/ui/SectionTitle';

const ROLES = [
  {
    icon: '📚',
    title: '법률정보 통합 제공',
    desc: '법률, 시행령, 판례, 조례 등 흩어져 있는 모든 법령정보를 하나로 모아 제공합니다.',
  },
  {
    icon: '👥',
    title: '대국민 접근성 보장',
    desc: '전문가부터 일반 국민까지 누구나 회원가입 없이 모든 정보를 무료로 이용할 수 있습니다.',
  },
  {
    icon: '✅',
    title: '정보의 신뢰성 확보',
    desc: '국가 법제 업무 총괄 기관인 법제처가 직접 운영하여 가장 정확하고 최신 정보를 유지합니다.',
  },
];

export default function LawRoleSection() {
  return (
    <section className="mt-10">
      <SectionTitle className="mb-4">📘 핵심 역할</SectionTitle>
      <div className="flex flex-col gap-3">
        {ROLES.map((role) => (
          <Card key={role.title} variant="outlined" padding="md" className="flex items-start gap-4">
            <span className="text-2xl shrink-0">{role.icon}</span>
            <div>
              <p className={cn(textStyles.titleSm, 'mb-1')}>{role.title}</p>
              <p className={cn(textStyles.bodyMd, 'text-muted-fg')}>{role.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
