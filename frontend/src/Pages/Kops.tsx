import Callout from '@/components/ui/Callout';
import PageLayout from '@/components/PageLayout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type MenuCardProps = {
  emoji: string;
  title: string;
  desc: React.ReactNode;
  href: string;
  note?: React.ReactNode;
};

const menuCards: MenuCardProps[] = [
  {
    emoji: '⚠️',
    title: '주의경보',
    desc: (
      <>
        환자안전과 관련하여{' '}
        <span className="font-semibold text-fg">
          반복적이거나 중대한 사고 위험
        </span>
        이 확인된 경우 발령되는 공식 알림으로, 유사 사례 예방을 위한 주의사항과
        대응 방안을 제시합니다.
        <br />
        지금까지 발령된 주의경보:{' '}
        <span className="font-semibold text-fg">총 53건</span>
      </>
    ),
    href: 'https://www.kops.or.kr/portal/aam/atent/atentAlarmCntrmsrList.do',
  },
  {
    emoji: '📌',
    title: '정보제공',
    desc: (
      <>
        환자안전과 관련된 최신 동향, 지침, 사례 등을 간략히 정리하여{' '}
        <span className="font-semibold text-fg">
          의료현장에서 바로 참고할 수 있는 자료
        </span>
        를 제공합니다.
      </>
    ),
    href: 'https://www.kops.or.kr/portal/ifm/infoProvdStdrList.do',
  },
  {
    emoji: '📊',
    title: '통계',
    desc: (
      <>
        환자안전사고{' '}
        <span className="font-semibold text-fg">
          보고 현황, 발생 추이, 유형별 통계자료
        </span>
        를 시각화하여 제공합니다.
      </>
    ),
    href: 'https://statistics.kops.or.kr/biWorks/dashBoardMain.do',
  },
  {
    emoji: '📂',
    title: '자료실',
    desc: (
      <>
        환자안전과 관련된{' '}
        <span className="font-semibold text-fg">
          보고서, 연구자료, 교육자료
        </span>{' '}
        등을 다운로드할 수 있습니다.
      </>
    ),
    href: 'https://www.kops.or.kr/portal/board/policyRsrch/boardList.do',
  },
];

function Step({
  n,
  title,
  subtitle,
}: {
  n: number;
  title: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 w-full md:w-[240px]">
      <div className="w-10 h-10 flex items-center justify-center bg-primary text-primary-fg font-bold rounded-full flex-shrink-0">
        {n}
      </div>
      <div className="mt-2">
        <p className={cn(textStyles.titleSm, 'text-fg')}>{title}</p>
        {subtitle ? (
          <p className={cn(textStyles.bodyMd, 'mt-1 text-muted-fg')}>
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function KopsPage() {
  return (
    <PageLayout title="환자안전보고학습시스템 (KOPS; Korea Patient Safety reporting & learning system)">
      {/* 상단 헤더 */}
      <div className="mt-1">
        <p className={cn(textStyles.titleLg, 'text-primary-700')}>
          환자안전보고학습시스템
        </p>
        <p
          className={cn(
            textStyles.bodyMd,
            'mt-2 text-muted-fg leading-relaxed',
          )}
        >
          환자안전을 위한{' '}
          <span className="font-semibold text-fg">보고·학습·공유</span> 기능을
          제공하는 국가 플랫폼입니다.
        </p>
      </div>

      {/* 핵심 요약 Callout */}
      <div className="mt-6 space-y-3">
        <Callout variant="info">
          "환자안전보고학습시스템(KOPS)은 환자안전을 위한{' '}
          <span className="font-semibold">보고, 학습, 공유 기능</span>을
          제공하는 국가 플랫폼입니다."
        </Callout>
        <p className={cn(textStyles.titleMd, 'mt-4')}>📖 소개</p>
        <p
          className={cn(
            textStyles.bodyMd,
            'mt-2 text-muted-fg leading-relaxed',
          )}
        >
          환자안전보고학습시스템의 설립 배경, 운영체계, 관련 법령과 가이드라인을
          제공합니다.
        </p>
        <Callout variant="note">
          보고하기 기능은 환자안전 관련 정보를 보호하기 위해{' '}
          <span className="font-semibold">본인인증 후 이용</span> 가능합니다.
        </Callout>
      </div>

      {/* 섹션: 링크 카드들 */}
      <div className="mt-10">
        <h2 className={cn(textStyles.titleMd, 'text-fg')}>주요 메뉴</h2>
        <div className="mt-5 grid grid-cols-1 gap-4">
          {menuCards.map(({ emoji, title, desc, href, note }) => (
            <Card
              key={href}
              variant="outlined"
              padding="lg"
              className="border-border"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0">
                  <h3 className={cn(textStyles.titleSm, 'text-fg')}>
                    <span className="mr-2">{emoji}</span>
                    {title}
                  </h3>
                  <p
                    className={cn(
                      textStyles.bodyMd,
                      'mt-2 text-muted-fg leading-relaxed',
                    )}
                  >
                    {desc}
                  </p>

                  {note ? (
                    <div className="mt-3 rounded-[var(--radius-md)] border border-border bg-muted px-3 py-2">
                      <p
                        className={cn(
                          textStyles.bodyMd,
                          'text-muted-fg leading-relaxed',
                        )}
                      >
                        {note}
                      </p>
                    </div>
                  ) : null}
                </div>

                <Button asChild className="shrink-0">
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    🔗 바로가기
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 섹션: 보고하기 */}
      <div className="mt-12">
        <h2 className={cn(textStyles.titleMd, 'text-fg')}>📝 보고하기</h2>
        <p
          className={cn(
            textStyles.bodyMd,
            'mt-2 text-muted-fg leading-relaxed',
          )}
        >
          우리나라{' '}
          <span className="font-semibold text-fg">전체 환자안전사고 보고</span>
          를 병원 내에서도 받고 있으며, 각 의료기관의{' '}
          <span className="font-semibold text-fg">환자안전 전담인력</span>이
          보고를 수행하고 있습니다.
        </p>

        <Card variant="muted" padding="lg" className="mt-5">
          <h3 className={cn(textStyles.titleSm, 'text-fg')}>▸ 보고 유형</h3>
          <ul
            className={cn(
              textStyles.bodyMd,
              'mt-3 list-disc pl-6 space-y-1 text-fg',
            )}
          >
            <li>자율보고</li>
            <li>의무보고</li>
            <li>환자안전 전담인력 보고</li>
            <li>환자안전위원회 보고</li>
          </ul>
        </Card>

        <Card variant="outlined" padding="lg" className="mt-4 border-border">
          <h3 className={cn(textStyles.titleSm, 'text-fg mb-4')}>
            ▸ 보고 절차
          </h3>
          <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-10">
            <Step n={1} title="보고하기 클릭" />
            <div className="hidden md:flex items-center text-muted-fg text-2xl font-bold">
              →
            </div>
            <Step n={2} title="본인인증 절차" subtitle="(본인확인 필수)" />
            <div className="hidden md:flex items-center text-muted-fg text-2xl font-bold">
              →
            </div>
            <Step n={3} title="보고서 작성" />
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <a
                href="https://www.kops.or.kr/portal/rcp/rcpReport/rcpReportList.do"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 보고하기 바로가기
              </a>
            </Button>

            <Button asChild variant="secondary">
              <a
                href="https://www.kops.or.kr/portal/main.do"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 KOPS 메인
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
