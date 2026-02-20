import PageLayout from '@/components/PageLayout';

import IntroSection from '@/features/AdverseEventDomestic/components/IntroSection';
import ProvidedStatsSection from '@/features/AdverseEventDomestic/components/ProvidedStatsSection';
import YearlyReportsBarChart from '@/features/AdverseEventDomestic/components/YearlyReportsBarChart';
import ReporterTypePieCharts from '@/features/AdverseEventDomestic/components/ReporterTypePieCharts';
import RegionalReportTable from '@/features/AdverseEventDomestic/components/RegionalReportTable';
import OriginalReporterTable from '@/features/AdverseEventDomestic/components/OriginalReporterTable';
import ReportTypeTable from '@/features/AdverseEventDomestic/components/ReportTypeTable';
import LookupGuideSection from '@/features/AdverseEventDomestic/components/LookupGuideSection';

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

      <LookupGuideSection />
    </PageLayout>
  );
}
