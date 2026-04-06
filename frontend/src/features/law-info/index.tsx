import PageLayout from '@/components/PageLayout';
import Button from '@/components/ui/Button';
import LawIntro from '@/features/law-info/components/LawIntro';
import LawRoleSection from '@/features/law-info/components/LawRoleSection';
import LawFeatureSection from '@/features/law-info/components/LawFeatureSection';
import LawGrid from '@/features/law-info/components/LawGrid';
import { LAWS } from '@/features/law-info/data/lawsData';
import LinkButton from '@/components/ui/LinkButton';

export default function LawInfoPage() {
  return (
    <PageLayout title="국가법령정보센터">
      <LawIntro />
      <LawRoleSection />
      <LawFeatureSection />
      <LawGrid laws={LAWS} />

      <div className="mt-8">
        <LinkButton
          href="https://www.law.go.kr"
          text="국가법령정보센터 바로가기"
        />
      </div>
    </PageLayout>
  );
}
