import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

type Props = {
  yearFrom?: number;
  yearTo?: number;
  onChange: (from?: number, to?: number) => void;
};

/**
 * Renders a compact year-range filter UI with From and To numeric inputs and a reset button.
 *
 * @param yearFrom - Currently selected start year; undefined shows an empty From input.
 * @param yearTo - Currently selected end year; undefined shows an empty To input.
 * @param onChange - Called when either input changes or the reset button is clicked. Receives `(from?: number, to?: number)` where `undefined` represents an empty field.
 * @returns The year-range filter React element.
 */
export default function YearRangeFilter({ yearFrom, yearTo, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center text-sm">
      <span className="text-muted-fg">연도 범위</span>
      <Input
        type="number"
        className="w-24 border rounded px-2 py-1"
        placeholder="From"
        value={yearFrom ?? ''}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : undefined, yearTo)
        }
      />
      <span className="text-muted-fg">~</span>
      <Input
        type="number"
        className="w-24 border rounded px-2 py-1"
        placeholder="To"
        value={yearTo ?? ''}
        onChange={(e) =>
          onChange(
            yearFrom,
            e.target.value ? Number(e.target.value) : undefined,
          )
        }
      />
      <Button
        type="button"
        variant="secondary"
        className="bg-fg text-white"
        size="sm"
        onClick={() => onChange(undefined, undefined)}
      >
        초기화
      </Button>
    </div>
  );
}