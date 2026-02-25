import { useState } from 'react';
import KoreaMap from '@/assets/map.svg?react';
import { REGION_GROUPS } from '@/features/local-center/data/regions';
import type { RegionGroups } from '@/features/local-center/types';
import { useMapHighlight } from '@/features/local-center/hooks/useMapHighlight';

interface CenterMapProps {
  className?: string;
  onRegionClick?: (region: string) => void;
  regionGroups?: RegionGroups;
  onHoverRegion?: (region: string) => void;
  onLeave?: () => void;
}

export default function KoreaInteractiveMap({
  className,
  onRegionClick,
  onHoverRegion,
  onLeave,
}: CenterMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useMapHighlight({
    activeRegion: hoveredRegion,
    regionGroups: REGION_GROUPS,
    rootSelector: '.interactive-map',
  });

  return (
    <KoreaMap
      className={className ?? 'interactive-map w-[280px] h-auto cursor-pointer'}
      onMouseOver={(e) => {
        const id = (e.target as SVGElement).id;
        if (id && REGION_GROUPS[id]) {
          setHoveredRegion(REGION_GROUPS[id]);
          onHoverRegion?.(REGION_GROUPS[id]);
        }
      }}
      onMouseLeave={() => {
        setHoveredRegion(null);
        onLeave?.();
      }}
      onClick={(e) => {
        const id = (e.target as SVGElement).id;
        if (id && REGION_GROUPS[id]) onRegionClick?.(REGION_GROUPS[id]);
      }}
    />
  );
}
