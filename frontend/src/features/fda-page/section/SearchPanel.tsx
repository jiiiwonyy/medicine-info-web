import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import FdaSearchBar from '@/features/fda-page/components/FdaSearchBar';

import FdaSuggestModal from '@/features/fda-page/components/FdaSuggestModal';

type SuggestItem = { value: string } | string;

export default function SearchPanel({
  q,
  onChangeQ,
  debouncedQ,
  selectedDrug,
  onSelectDrug,

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

      {!selectedDrug && (
        <div className={cn(textStyles.bodySm, 'text-muted-fg')}>
          약물명을 입력하면 후보를 선택할 수 있어요. 선택 후 연도별 보고 건수와
          주요 PT 추이를 볼 수 있어요.
        </div>
      )}
    </div>
  );
}
