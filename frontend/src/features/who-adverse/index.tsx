import PageLayout from '@/components/PageLayout';
import WhoIntroSection from '@/features/who-adverse/components/WhoIntroSection';
import VigiAccessGuideSection from '@/features/who-adverse/components/VigiAccessGuideSection';

export default function WhoAdversePage() {
  return (
    <PageLayout title="WHO 부작용 보고자료">
      <WhoIntroSection />
      <VigiAccessGuideSection />
    </PageLayout>
  );
}
