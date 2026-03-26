import Callout from '@/components/ui/Callout';
import { useRef, useState } from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import '@/styles/map.css';
import { CENTERS } from '@/features/local-center/data/centers';
import {
  REGION_GROUPS,
  REGION_ORDER,
} from '@/features/local-center/data/regions';
import { useMapHighlight } from '@/features/local-center/hooks/useMapHighlight';
import CenterMap from '@/features/local-center/components/CenterMap';
import CenterBox from '@/features/local-center/components/CenterBox';
import MobileCenterTable from '@/features/local-center/components/MobileCenterTable';
import PageLayout from '@/components/PageLayout';
export default function LocalCenterPage() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const tableRefs = useRef<Record<string, HTMLTableSectionElement | null>>({});

  useMapHighlight({
    activeRegion: hoveredRegion,
    regionGroups: REGION_GROUPS,
    rootSelector: '.interactive-map',
  });

  const handleMobileMapClick = (region: string) => {
    const target = tableRefs.current[region];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <PageLayout title="지역의약품안전센터">
      <section className="mx-auto px-4 py-8 leading-relaxed space-y-8">
        <Callout variant="info" title="지역의약품안전센터란?">
          우리나라는 권역별로 지정된 지역의약품안전센터를 통해 의약품 이상사례를
          수집·분석하고, 교육 및 상담을 제공합니다. 가까운 센터를 통해 이상사례
          보고, 환자 상담, 교육 참여를 할 수 있습니다.
        </Callout>

        {/* ── 모바일 ── */}
        <div className="md:hidden space-y-6">
          <div className="flex justify-center">
            <CenterMap onRegionClick={handleMobileMapClick} />
          </div>

          <p className={cn(textStyles.bodySm, 'text-muted-fg text-center')}>
            지역을 탭하면 해당 센터 목록으로 이동합니다.
          </p>

          <MobileCenterTable
            centers={CENTERS}
            regionOrder={REGION_ORDER}
            hoveredRegion={hoveredRegion}
            tableRefs={tableRefs}
          />
        </div>

        {/* ── 데스크탑 ── */}
        <div className="hidden md:block">
          <div className="relative flex justify-center items-center w-full h-[800px]">
            <CenterMap
              className="interactive-map w-[400px] h-auto"
              regionGroups={REGION_GROUPS}
              onHoverRegion={(r) => setHoveredRegion(r)}
              onLeave={() => setHoveredRegion(null)}
            />

            <div className="absolute top-0">
              <CenterBox
                region="전국약국통합센터"
                hospitals={CENTERS['전국약국통합센터']}
                hoveredRegion={hoveredRegion}
              />
            </div>

            <div className="absolute left-4 top-20 flex flex-col gap-4">
              <CenterBox
                region="서울"
                hospitals={CENTERS['서울']}
                hoveredRegion={hoveredRegion}
              />
              <CenterBox
                region="인천·경기"
                hospitals={CENTERS['인천·경기']}
                hoveredRegion={hoveredRegion}
              />
              <CenterBox
                region="대전·충청"
                hospitals={CENTERS['대전·충청']}
                hoveredRegion={hoveredRegion}
              />
              <CenterBox
                region="광주·전라"
                hospitals={CENTERS['광주·전라']}
                hoveredRegion={hoveredRegion}
              />
            </div>

            <div className="absolute right-4 top-28 flex flex-col gap-4">
              <CenterBox
                region="강원"
                hospitals={CENTERS['강원']}
                hoveredRegion={hoveredRegion}
              />
              <CenterBox
                region="대구·경북"
                hospitals={CENTERS['대구·경북']}
                hoveredRegion={hoveredRegion}
              />
              <CenterBox
                region="부산·울산·경남"
                hospitals={CENTERS['부산·울산·경남']}
                hoveredRegion={hoveredRegion}
              />
            </div>
          </div>
        </div>

        <article className="prose prose-blue max-w-none md:mt-40">
          <p className={cn(textStyles.bodySm)}>
            "지역의약품안전센터는 전국을 권역별로 나누어 지정되며, 권역 내
            센터들이 특정 구역을 나눠 맡는 것이 아니라 권역 전체를 공동으로
            담당합니다. 따라서 환자·의료진은 거주지와 가까운 센터를 선택해
            보고·상담할 수 있으며, 모든 보고 내용은
            한국의약품안전관리원(KIDS)에서 최종적으로 통합 관리됩니다."
          </p>
        </article>
      </section>
    </PageLayout>
  );
}
