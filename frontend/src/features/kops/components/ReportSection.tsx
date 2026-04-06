import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { Step } from '@/features/kops/components/ReportSteps';
import SectionTitle from '@/components/ui/SectionTitle';
import ItemTitle from '@/components/ui/ItemTitle';
import LinkButton from '@/components/ui/LinkButton';

export default function ReportSection({
  reportTypes,
}: {
  reportTypes: string[];
}) {
  return (
    <div className="mt-12">
      <SectionTitle className="text-fg">📝 보고하기</SectionTitle>

      <p
        className={cn(textStyles.bodyMd, 'mt-2 text-muted-fg leading-relaxed')}
      >
        우리나라{' '}
        <span className="font-semibold text-fg">전체 환자안전사고 보고</span>를
        병원 내에서도 받고 있으며, 각 의료기관의{' '}
        <span className="font-semibold text-fg">환자안전 전담인력</span>이
        보고를 수행하고 있습니다.
      </p>

      <Card variant="muted" padding="lg" className="mt-5">
        <ItemTitle className="text-fg">▸ 보고 유형</ItemTitle>
        <ul
          className={cn(
            textStyles.bodyMd,
            'mt-3 list-disc pl-6 space-y-1 text-fg',
          )}
        >
          {reportTypes.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Card>

      <Card variant="outlined" padding="lg" className="mt-4 border-border">
        <ItemTitle className="text-fg mb-4">▸ 보고 절차</ItemTitle>

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
      </Card>

      <div className="mt-5 flex flex-wrap gap-3">
        <LinkButton
          href="https://www.kops.or.kr/portal/rcp/rcpReport/rcpReportList.do"
          text="보고하기 바로가기"
        />
        <LinkButton
          href="https://www.kops.or.kr/portal/main.do"
          text="KOPS 메인"
          variant="white"
        />
      </div>
    </div>
  );
}
