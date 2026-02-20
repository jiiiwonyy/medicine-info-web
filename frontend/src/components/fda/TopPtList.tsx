import { textStyles } from '@/styles/typography';

type Item = { pt: string; total: number };

/**
 * Renders a ranked list of point items with their totals or a compact empty-state message.
 *
 * @param items - Array of items to display; each item must have `pt` (label) and `total` (numeric count). When the array is empty, a small gray "데이터가 없어요." message is rendered instead.
 * @returns A JSX element containing an ordered list of the items with index, label, and formatted total, or the empty-state message when there are no items.
 */
export default function TopPtList({ items }: { items: Item[] }) {
  if (!items.length)
    return <div className="text-sm text-gray-600">데이터가 없어요.</div>;

  return (
    <ol className="space-y-2">
      {items.map((it, idx) => (
        <li key={it.pt} className="flex items-start justify-between gap-3">
          <div className="flex gap-2 items-center">
            <span className="text-gray-500 w-5">{idx + 1}</span>
            <div className={textStyles.bodySm}>{it.pt}</div>
          </div>
          <div className={textStyles.bodySm}>{it.total.toLocaleString()}</div>
        </li>
      ))}
    </ol>
  );
}