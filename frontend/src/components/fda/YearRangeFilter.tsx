type Props = {
  yearFrom?: number;
  yearTo?: number;
  onChange: (from?: number, to?: number) => void;
};

export default function YearRangeFilter({ yearFrom, yearTo, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center text-sm">
      <span className="text-gray-600">연도 범위</span>
      <input
        type="number"
        className="w-24 border rounded px-2 py-1"
        placeholder="From"
        value={yearFrom ?? ''}
        onChange={(e) => onChange(e.target.value ? Number(e.target.value) : undefined, yearTo)}
      />
      <span className="text-gray-400">~</span>
      <input
        type="number"
        className="w-24 border rounded px-2 py-1"
        placeholder="To"
        value={yearTo ?? ''}
        onChange={(e) => onChange(yearFrom, e.target.value ? Number(e.target.value) : undefined)}
      />
      <button
        type="button"
        className="ml-1 px-2 py-1 border rounded"
        onClick={() => onChange(undefined, undefined)}
      >
        초기화
      </button>
    </div>
  );
}
