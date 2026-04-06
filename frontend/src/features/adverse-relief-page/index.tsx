import Callout from '@/components/ui/Callout';
import PageLayout from '@/components/PageLayout';
import ReliefProcess from '@/features/adverse-relief-page/components/ReliefProcess';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { Card } from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';
import LinkButton from '@/components/ui/LinkButton';

const COVERAGE_ITEMS = [
  {
    icon: '🏥',
    label: '진료비',
    desc: '부작용 치료에 소요된 본인 부담 의료비',
  },
  {
    icon: '💰',
    label: '장해보상금',
    desc: '약물로 인해 영구적 장애가 남은 경우',
  },
  {
    icon: '⚰️',
    label: '사망 일시보상금',
    desc: '의약품 부작용으로 인한 사망 시',
  },
  { icon: '🧑‍🤝‍🧑', label: '간병비', desc: '장기간 치료·간병이 필요한 경우' },
];

const APPLICATION_STEPS = [
  <>
    의약품안전나라 (
    <a
      href="https://nedrug.mfds.go.kr"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline hover:text-primary-700"
    >
      nedrug.mfds.go.kr
    </a>
    ) 접속
  </>,
  <>
    상단 메뉴 <strong>[전자민원/보고]</strong> →{' '}
    <strong>[의약품 부작용 피해구제]</strong> 선택
  </>,
  '본인 인증 후 신청서 작성 및 제출',
];

export default function AdverseReliefPage() {
  return (
    <PageLayout title="의약품 부작용 피해구제">
      <Callout variant="info" className="mb-10">
        부작용 피해구제 제도란, 의약품을{' '}
        <span className="font-semibold">적정하게 사용했음에도 불구하고</span>{' '}
        중대한 부작용 피해가 발생한 경우, 환자 또는 유족에게 국가가
        진료비·보상금을 지원하는 제도입니다.
        <br />
        <br />
        부작용 피해구제는 누구나 신청할 수 있는 것이 아니라,{' '}
        <span className="font-semibold">
          적정하게 약을 사용했음에도 불구하고 예기치 못한 중대한 부작용
        </span>
        이 발생한 경우에 한해 지원됩니다. 신청 후에는
        한국의약품안전관리원(KIDS)에서 인과관계를 조사하고, 피해구제
        심의위원회의 심의를 거쳐 지원 여부와 보상 범위가 결정됩니다.
      </Callout>

      {/* 지원 대상 */}
      <section className="mb-12">
        <SectionTitle className="mb-4">📌 지원 대상</SectionTitle>
        <div className="flex flex-col gap-3">
          <Card
            variant="outlined"
            padding="md"
            className="flex items-start gap-3"
          >
            <span className="text-success shrink-0 mt-0.5">✅</span>
            <p className={textStyles.bodyMd}>
              적정하게 의약품을 사용했음에도 불구하고{' '}
              <span className="font-semibold">
                예상치 못한 중대한 부작용(사망, 장애, 장기 입원 등)
              </span>
              이 발생한 경우
            </p>
          </Card>
          <Card
            variant="outlined"
            padding="md"
            className="flex items-start gap-3"
          >
            <span className="text-success shrink-0 mt-0.5">✅</span>
            <p className={textStyles.bodyMd}>
              환자 본인 또는 법정대리인, 유족이 신청 가능
            </p>
          </Card>
        </div>
      </section>

      {/* 지원 범위 */}
      <section className="mb-12">
        <SectionTitle className="mb-4">💰 지원 범위</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COVERAGE_ITEMS.map((item) => (
            <Card
              key={item.label}
              variant="outlined"
              padding="md"
              className="flex items-start gap-3"
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
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

      {/* 신청 방법 */}
      <section className="mb-10">
        <SectionTitle className="mb-4">📝 신청 방법 및 절차</SectionTitle>
        <p className={cn(textStyles.bodyMd, 'mb-5')}>
          부작용 피해구제 신청은{' '}
          <span className="font-semibold">
            의약품안전나라 전자민원/보고 메뉴
          </span>
          를 통해 진행할 수 있습니다.
        </p>

        <Card variant="muted" padding="lg" className="mb-6">
          <p className={cn(textStyles.titleSm, 'mb-4')}>📍 신청 경로</p>
          <ol className="space-y-3">
            {APPLICATION_STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={cn(
                    textStyles.uiMd,
                    'w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5',
                  )}
                >
                  {i + 1}
                </span>
                <p className={textStyles.bodyMd}>{step}</p>
              </li>
            ))}
          </ol>
        </Card>

        <div className="flex flex-wrap gap-3">
          <LinkButton
            href="https://nedrug.mfds.go.kr/cntnts/230"
            text="의약품부작용피해구제 민원신청 바로가기"
          />
          <LinkButton
            href="https://karp.drugsafe.or.kr/frt/ara/AplCtf.do"
            text="신청서 작성 바로가기"
            variant="white"
          />
          <LinkButton
            href="https://www.youtube.com/watch?v=rcxfVtL8nlM"
            text="신청 방법 유튜브 안내 보기"
            variant="white"
          />
        </div>
      </section>

      <ReliefProcess />
    </PageLayout>
  );
}
