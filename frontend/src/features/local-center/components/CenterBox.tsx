import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { HospitalInfo } from '@/features/local-center/types';
import TooltipLink from '@/features/local-center/components/TooltipLink';
import ItemTitle from '@/components/ui/ItemTitle';

export default function CenterBox({
  region,
  hospitals,
  hoveredRegion,
}: {
  region: string;
  hospitals: HospitalInfo[];
  hoveredRegion: string | null;
}) {
  const isHovered = hoveredRegion === region;

  return (
    <div
      className={cn(
        'bg-white shadow-md rounded-lg p-3 w-50 mb-2 transition-all duration-300',
        isHovered ? 'translate-y-[-4px] shadow-lg border border-primary' : '',
      )}
    >
      <ItemTitle className="mb-2 text-primary-700">
        {region}
      </ItemTitle>
      <ul className={cn(textStyles.bodyMd, 'space-y-1')}>
        {hospitals.map((h) => (
          <li key={h.name}>
            <TooltipLink {...h} />
          </li>
        ))}
      </ul>
    </div>
  );
}
