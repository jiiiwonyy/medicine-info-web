import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import YearRangeFilter from '@/features/fda-page/components/YearRangeFilter';

export default function ResultHeaderCards({
  drug,
  matchedIsrCount,
  roleOnlySuspect,
  onChangeRoleOnlySuspect,
  yearFrom,
  yearTo,
  onChangeYearRange,
}: {
  drug: string;
  matchedIsrCount: number;
  roleOnlySuspect: boolean;
  onChangeRoleOnlySuspect: (checked: boolean) => void;
  yearFrom: number | undefined;
  yearTo: number | undefined;
  onChangeYearRange: (from: number | undefined, to: number | undefined) => void;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <YearRangeFilter
          yearFrom={yearFrom}
          yearTo={yearTo}
          onChange={(from, to) => onChangeYearRange(from, to)}
        />

        <div className="flex flex-wrap gap-3 items-center">
          <label className={cn(textStyles.bodySm, 'flex items-center gap-2')}>
            <input
              type="checkbox"
              checked={roleOnlySuspect}
              onChange={(e) => onChangeRoleOnlySuspect(e.target.checked)}
            />
            의심약(PS/SS)만
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="strong" className="w-full">
          <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>
            선택 약물
          </div>
          <div className={cn(textStyles.titleSm)}>{drug}</div>
        </Card>

        <Card variant="strong" className="w-full">
          <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>
            매칭 ISR 수
          </div>
          <div className={cn(textStyles.titleSm)}>
            {matchedIsrCount.toLocaleString()}
          </div>
        </Card>
      </div>
    </>
  );
}
