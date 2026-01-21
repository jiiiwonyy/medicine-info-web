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
            <div className="text-sm text-gray-500">검색 후보</div>
            <div className="text-base font-semibold">
              “{query}”에 대한 후보
            </div>
          </div>
          <button
            className="text-sm px-3 py-1 rounded border hover:bg-gray-50"
            onClick={onClose}
          >
            닫기
          </button>
        </div>

        <div className="p-4 max-h-[60vh] overflow-auto">
          {loading && <div className="text-sm text-gray-600">불러오는 중…</div>}
          {error && (
            <div className="text-sm text-red-600">
              후보를 불러오지 못했어요.
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="text-sm text-gray-600">
              후보가 없어요. 더 길게 입력해보세요.
            </div>
          )}

          <ul className="divide-y">
            {items.map((name) => (
              <li key={name}>
                <button
                  className="w-full text-left py-3 hover:bg-gray-50 px-2 rounded"
                  onClick={() => onSelect(name)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t text-xs text-gray-500">
          팁: 철자를 더 입력하면 후보가 더 정확해져요.
        </div>
      </div>
    </div>
  );
}
