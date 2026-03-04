import PageLayout from '@/components/PageLayout';
import LawIntro from '@/features/law-info/components/LawIntro';
import LawRoleSection from '@/features/law-info/components/LawRoleSection';
import LawFeatureSection from '@/features/law-info/components/LawFeatureSection';
import LawGrid from '@/features/law-info/components/LawGrid';
import { LAWS } from '@/features/law-info/data/lawsData';

export default function LawInfoPage() {
  return (
    <PageLayout title="국가법령정보센터">
      <LawIntro />
      <LawRoleSection />
      <LawFeatureSection />
      <LawGrid laws={LAWS} />
    </PageLayout>
  );
}
