import PageLayout from '@/components/PageLayout';
import Callout from '@/components/ui/Callout';
import { Card } from '@/components/ui/Card';
import { textStyles } from '@/styles/typography';
import { cn } from '@/shared/cn';
import SectionTitle from '@/components/ui/SectionTitle';
import LinkButton from '@/components/ui/LinkButton';

const FEATURES = [
  {
    icon: '📋',
    title: '보고 시스템',
    desc: '마약류의 제조, 수입, 처방, 조제, 폐기 등 각 단계별로 의무적인 보고 기능을 제공합니다.',
  },
  {
    icon: '📡',
    title: '실시간 모니터링',
    desc: '국가가 마약류 유통 현황을 실시간으로 파악하고 감시할 수 있도록 지원합니다.',
  },
  {
    icon: '🛡️',
    title: '오남용 예방',
    desc: '과다처방, 중복처방, 불법 유통 등을 방지하고 마약류 사용의 안전성과 윤리성을 높이는 데 기여합니다.',
  },
];

const GUIDE_ITEMS = [
  { icon: '🔔', label: '알림', desc: '공지사항, 시스템 안내' },
  { icon: '🎓', label: '교육센터', desc: '사용자 교육 자료, 동영상 가이드' },
  { icon: '🔗', label: '연계', desc: '외부 프로그램 연계 안내' },
  {
    icon: '📖',
    label: '매뉴얼',
    desc: '마약류 취급보고, 수출입, 제조/사용자, 연구자 보고',
  },
  { icon: '👤', label: '회원', desc: '회원가입, 로그인, 고객문의' },
];

export default function NimsPage() {
  return (
    <PageLayout title="마약류통합관리시스템(NIMS)">
      <Callout variant="info" className="mb-10">
        <span className="font-semibold">
          마약류의 제조, 수입, 유통, 사용, 폐기
        </span>
        까지의 전 과정을 실시간으로 보고·관리하는 국가 통합 플랫폼입니다.
        보건복지부와 식품의약품안전처가 운영하며, 마약류의 오남용 방지,
        의료기관의 책임 있는 사용 관리, 국가 차원의 유통 투명성 확보를 목표로
        합니다.
      </Callout>

      <section className="mb-10">
        <SectionTitle className="mb-4">주요 기능</SectionTitle>
        <div className="flex flex-col gap-3">
          {FEATURES.map((f) => (
            <Card
              key={f.title}
              variant="outlined"
              padding="md"
              className="flex items-start gap-4"
            >
              <span className="text-2xl shrink-0">{f.icon}</span>
              <div>
                <p className={cn(textStyles.titleSm, 'mb-1')}>{f.title}</p>
                <p className={cn(textStyles.bodyMd, 'text-muted-fg')}>
                  {f.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <SectionTitle className="mb-4">이용 안내</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {GUIDE_ITEMS.map((item) => (
            <Card
              key={item.label}
              variant="muted"
              padding="md"
              className="flex items-start gap-3"
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <div>
                <p className={cn(textStyles.titleSm, 'mb-0.5')}>{item.label}</p>
                <p className={cn(textStyles.bodyMd, 'text-muted-fg')}>
                  {item.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <LinkButton
        href="https://www.nims.or.kr/"
        text="마약류통합관리시스템(NIMS) 바로가기"
      />
    </PageLayout>
  );
}
