import PageLayout from '@/components/PageLayout';
import IntroSection from '@/features/adverse-event-domestic/components/IntroSection';
import ProvidedStatsSection from '@/features/adverse-event-domestic/components/ProvidedStatsSection';
import YearlyReportsBarChart from '@/features/adverse-event-domestic/components/YearlyReportsBarChart';
import ReporterTypePieCharts from '@/features/adverse-event-domestic/components/ReporterTypePieCharts';
import RegionalReportTable from '@/features/adverse-event-domestic/components/RegionalReportTable';
import OriginalReporterTable from '@/features/adverse-event-domestic/components/OriginalReporterTable';
import ReportTypeTable from '@/features/adverse-event-domestic/components/ReportTypeTable';
import EfficacyGroupTable from '@/features/adverse-event-domestic/components/EfficacyGroupTable';
import LookupGuideSection from '@/features/adverse-event-domestic/components/LookupGuideSection';

export default function AdverseEventDomesticPage() {
  return (
    <PageLayout title="국내 의약품 부작용 보고자료">
      <IntroSection />
      <ProvidedStatsSection />

      <YearlyReportsBarChart />
      <ReporterTypePieCharts />

      <RegionalReportTable />
      <OriginalReporterTable />
      <ReportTypeTable />
      <EfficacyGroupTable />

      <LookupGuideSection />
    </PageLayout>
  );
}
