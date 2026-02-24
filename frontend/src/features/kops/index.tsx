import PageLayout from '@/components/PageLayout';

import KopsHeader from '@/features/kops/components/KopsHeader';
import KopsMenuCards from '@/features/kops/components/KopsMenuCards';
import ReportSection from '@/features/kops/components/ReportSection';
import { MENU_CARDS, REPORT_TYPES } from '@/features/kops/data/kopsData';

export default function KopsPage() {
  return (
    <PageLayout title="환자안전보고학습시스템 (KOPS; Korea Patient Safety reporting & learning system)">
      <KopsHeader />
      <KopsMenuCards items={MENU_CARDS} />
      <ReportSection reportTypes={REPORT_TYPES} />
    </PageLayout>
  );
}
