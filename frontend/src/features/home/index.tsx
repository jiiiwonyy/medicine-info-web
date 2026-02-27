import PageLayout from '@/components/PageLayout';
import HeroSection from '@/features/home/components/HeroSection';
import KeyInfoCards from '@/features/home/components/KeyInfoCards';
import CautionSectionList from '@/features/home/components/CautionSectionList';
import QuickLinksPanel from '@/features/home/components/QuickLinksPanel';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { CAUTION_SECTIONS, QUICK_LINKS } from '@/features/home/data/homeData';

export default function Home() {
  return (
    <PageLayout>
      <div className="py-6">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div className="space-y-8">
            <p className={cn(textStyles.titleSm, 'text-fg')}>
              투약안전, 의약품 정보확인이 기본입니다!
              <br />* 의약품 정보는 효능.효과, 용법.용량, 주의사항으로 구성되어
              있습니다.
            </p>
            <KeyInfoCards />
            <CautionSectionList items={CAUTION_SECTIONS} />
          </div>

          {/* Right */}
          <QuickLinksPanel items={QUICK_LINKS} />
        </div>
      </div>
    </PageLayout>
  );
}
