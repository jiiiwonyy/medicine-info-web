// FloatingNavigation.tsx
import { useMemo } from 'react';
import { useScrollSpy, scrollToId } from '@/hooks/useScrollSpy';

type DurLite = {
  interactions: unknown[];
  age: unknown[];
  pregnancy: unknown[];
};

type FloatingNavProps = {
  dur: DurLite;
  headerOffset?: number;
  onScrollTo: (targetId: string) => void; // 선택: 부모에서 여전히 넘겨주고 있다면 경고 방지용
};

type NavItem = {
  id: string;
  label: string;
  children?: NavItem[];
};

const collectIds = (items: NavItem[]): string[] =>
  items.flatMap((it) => [
    it.id,
    ...(it.children ? collectIds(it.children) : []),
  ]);

export default function FloatingNavigation({
  dur,
  headerOffset = 72,
  onScrollTo,
}: FloatingNavProps) {
  // DUR 표시 여부만 boolean으로 관리 → useMemo 의존성 최소화
  const hasDur = !!(
    dur?.interactions?.length ||
    dur?.age?.length ||
    dur?.pregnancy?.length
  );

  const navTree: NavItem[] = useMemo(() => {
    const detailChildren: NavItem[] = [
      { id: 'effect', label: '효능·효과' },
      { id: 'usage', label: '용법·용량' },
      { id: 'caution', label: '사용상의 주의사항' },
      ...(hasDur ? [{ id: 'dur', label: 'DUR' }] : []),
    ];

    return [
      { id: 'detail', label: '의약품 상세정보', children: detailChildren },
      { id: 'letters', label: '안전성 서한 및 실마리' },
      { id: 'adrs', label: '부작용 보고자료' },
    ];
  }, [hasDur]);

  const allIds = useMemo(() => collectIds(navTree), [navTree]);
  const activeId = useScrollSpy(allIds, headerOffset);

  const isParentActive = (item: NavItem) =>
    activeId === item.id || !!item.children?.some((c) => c.id === activeId);

  return (
    <aside className="fixed top-1/3 right-20 hidden lg:flex flex-col space-y-2 bg-white border rounded shadow-md p-3 z-50 min-w-52">
      <nav aria-label="보조 내비게이션" className="space-y-1">
        {navTree.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => scrollToId(item.id, headerOffset)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition
                ${isParentActive(item) ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50 text-gray-800'}`}
              aria-current={isParentActive(item) ? 'location' : undefined}
            >
              {item.label}
            </button>

            {item.children && (
              <ul className="mt-1 ml-3 border-l pl-3 space-y-1">
                {item.children.map((c) => {
                  const childActive = activeId === c.id;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => scrollToId(c.id, headerOffset)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition
                          ${childActive ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50 text-gray-600'}`}
                        aria-current={childActive ? 'location' : undefined}
                      >
                        {c.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
