import PageLayout from '@/components/PageLayout';

import HeroSection from '@/features/home/components/HeroSection';
import KeyInfoCards from '@/features/home/components/KeyInfoCards';
import CautionSectionList from '@/features/home/components/CautionSectionList';
import QuickLinksPanel from '@/features/home/components/QuickLinksPanel';

import { CAUTION_SECTIONS, QUICK_LINKS } from '@/features/home/data/homeData';

export default function Home() {
  return (
    <PageLayout>
      <div className="py-6">
        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div className="space-y-8">
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
