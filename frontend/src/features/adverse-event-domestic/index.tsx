import PageLayout from '@/components/PageLayout';
import IntroSection from '@/features/adverse-event-domestic/components/IntroSection';
import ProvidedStatsSection from '@/features/adverse-event-domestic/components/ProvidedStatsSection';
import YearlyReportsBarChart from '@/features/adverse-event-domestic/components/YearlyReportsBarChart';
import ReporterTypePieCharts from '@/features/adverse-event-domestic/components/ReporterTypePieCharts';
import RegionalReportTable from '@/features/adverse-event-domestic/components/RegionalReportTable';
import OriginalReporterTable from '@/features/adverse-event-domestic/components/OriginalReporterTable';
import ReportTypeTable from '@/features/adverse-event-domestic/components/ReportTypeTable';
import EfficacyGroupTable from '@/features/adverse-event-domestic/components/EfficacyGroupTable';
import AdverseEventGroupTable from '@/features/adverse-event-domestic/components/AdverseEventGroupTable';
import LookupGuideSection from '@/features/adverse-event-domestic/components/LookupGuideSection';
import Button from '@/components/ui/Button';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SectionTitle from '@/components/ui/SectionTitle';

const links = [
  { id: 'yearly-reports', label: '연도별 현황' },
  { id: 'reporter-type', label: '보고자별 현황' },
  { id: 'regional-report', label: '지역센터 현황' },
  { id: 'original-reporter', label: '원보고자 현황' },
  { id: 'report-type', label: '보고구분별 현황' },
  { id: 'efficacy-group', label: '효능군별 현황' },
  { id: 'adverse-event-group', label: '이상사례별 현황' },
];

export default function AdverseEventDomesticPage() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageLayout title="국내 의약품 부작용 보고자료">
      <div className="mb-10 p-4 rounded-[var(--radius-lg)] bg-muted/30 border border-border">
        <h3 className={cn(textStyles.titleMd, 'mb-3 px-1')}>바로가기</h3>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Button
              key={link.id}
              variant="secondary"
              size="sm"
              className="rounded-full bg-surface text-xs font-semibold hover:bg-muted"
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
      <IntroSection />
      <ProvidedStatsSection />
      <SectionTitle className="mb-4">
        2024년 의약품등 안전성정보 보고동향
      </SectionTitle>
      <section className="space-y-14">
        <section id="yearly-reports" className="scroll-mt-40">
          <YearlyReportsBarChart />
        </section>
        <section id="reporter-type" className="scroll-mt-40">
          <ReporterTypePieCharts />
        </section>

        <section id="regional-report" className="scroll-mt-40">
          <RegionalReportTable />
        </section>
        <section id="original-reporter" className="scroll-mt-40">
          <OriginalReporterTable />
        </section>
        <section id="report-type" className="scroll-mt-40">
          <ReportTypeTable />
        </section>
        <section id="efficacy-group" className="scroll-mt-40">
          <EfficacyGroupTable />
        </section>
        <section id="adverse-event-group" className="scroll-mt-40">
          <AdverseEventGroupTable />
        </section>
      </section>

      <LookupGuideSection />
    </PageLayout>
  );
}
