import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import FdaSearchBar from '@/features/fda-page/components/FdaSearchBar';
import YearRangeFilter from '@/features/fda-page/components/YearRangeFilter';
import FdaSuggestModal from '@/features/fda-page/components/FdaSuggestModal';

type SuggestItem = { value: string } | string;

export default function SearchPanel({
  q,
  onChangeQ,
  debouncedQ,
  selectedDrug,
  onSelectDrug,
  roleOnlySuspect,
  onChangeRoleOnlySuspect,
  yearFrom,
  yearTo,
  onChangeYearRange,
  suggestOpen,
  setSuggestOpen,
  suggestItems,
  suggestLoading,
  suggestError,
}: {
  q: string;
  onChangeQ: (v: string) => void;
  debouncedQ: string;

  selectedDrug: string;
  onSelectDrug: (drug: string) => void;

  roleOnlySuspect: boolean;
  onChangeRoleOnlySuspect: (v: boolean) => void;

  yearFrom?: number;
  yearTo?: number;
  onChangeYearRange: (from?: number, to?: number) => void;

  suggestOpen: boolean;
  setSuggestOpen: (v: boolean) => void;

  suggestItems: SuggestItem[];
  suggestLoading: boolean;
  suggestError: boolean;
}) {
  return (
    <div className="mb-6 space-y-4">
      <FdaSearchBar
        value={q}
        onChange={onChangeQ}
        onSubmit={() => setSuggestOpen(true)}
        placeholder="약물명을 입력하세요 (예: bleo)"
      />

      <FdaSuggestModal
        open={suggestOpen}
        query={debouncedQ}
        items={suggestItems as any}
        loading={suggestLoading}
        error={suggestError}
        onClose={() => setSuggestOpen(false)}
        onSelect={(drug: string) => {
          onSelectDrug(drug);
          onChangeQ(drug);
          setSuggestOpen(false);
        }}
      />

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

      {!selectedDrug && (
        <div className={cn(textStyles.bodySm, 'text-muted-fg')}>
          약물명을 입력하면 후보를 선택할 수 있어요. 선택 후 연도별 보고 건수와
          주요 PT 추이를 볼 수 있어요.
        </div>
      )}
    </div>
  );
}
