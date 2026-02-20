import Button from '../ui/Button';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import Spinner from '../Spinner';

type Props = {
  open: boolean;
  query: string;
  items: string[];
  loading?: boolean;
  error?: boolean;
  onClose: () => void;
  onSelect: (drug: string) => void;
};

export default function FdaSuggestModal({
  open,
  query,
  items,
  loading,
  error,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="close"
      />
      {/* modal */}
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl">
        <div className="p-4 border-b flex items-center justify-between">
          <div>
            <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>
              검색 후보
            </div>
            <div className={textStyles.titleSm}>“{query}”에 대한 후보</div>
          </div>
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-auto">
          {loading && <Spinner />}
          {error && (
            <div className={cn(textStyles.bodyMd, 'text-danger')}>
              후보를 불러오지 못했어요.
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>
              후보가 없어요. 더 길게 입력해보세요.
            </div>
          )}

          <ul className="divide-y">
            {items.map((name) => (
              <li key={name}>
                <button
                  className="w-full text-left py-2 hover:bg-muted"
                  onClick={() => onSelect(name)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={cn(textStyles.bodySm, 'p-4 border-t text-muted-fg')}>
          팁: 철자를 더 입력하면 후보가 더 정확해져요.
        </div>
      </div>
    </div>
  );
}
