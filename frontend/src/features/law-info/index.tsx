import PageLayout from '@/components/PageLayout';
import Button from '@/components/ui/Button';
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

      <div className="mt-8">
        <Button asChild className="w-full">
          <a
            href="https://www.law.go.kr"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 국가법령정보센터 바로가기
          </a>
        </Button>
      </div>
    </PageLayout>
  );
}
