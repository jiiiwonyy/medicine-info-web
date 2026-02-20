import { useMemo } from 'react';
import { useScrollSpy, scrollToId } from '@/hooks/useScrollSpy';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

type DurLite = {
  interactions: unknown[];
  age: unknown[];
  pregnancy: unknown[];
};

type FloatingNavProps = {
  dur: DurLite;
  headerOffset?: number;
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

/**
 * Render a fixed vertical auxiliary navigation that scrolls to and highlights document sections.
 *
 * The component displays a right-aligned, fixed aside with top-level navigation entries and optional nested items.
 * Clicking an item scrolls the page to the corresponding section; the active section is highlighted based on scroll position.
 *
 * @param dur - Optional durability-related data. If `dur.interactions`, `dur.age`, or `dur.pregnancy` contain entries, a DUR section is included in the navigation.
 * @param headerOffset - Vertical offset in pixels applied when scrolling to a section (defaults to 72).
 * @returns The rendered floating auxiliary navigation element.
 */
export default function FloatingNavigation({
  dur,
  headerOffset = 72,
}: FloatingNavProps) {
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
    ];

    return [
      { id: 'detail', label: '의약품 상세정보', children: detailChildren },
      ...(hasDur ? [{ id: 'dur', label: '의약품안전사용(DUR)' }] : []),
      { id: 'letters', label: '안전성 서한 및 실마리' },
      { id: 'adrs', label: '부작용 보고자료' },
    ];
  }, [hasDur]);

  const allIds = useMemo(() => collectIds(navTree), [navTree]);
  const activeId = useScrollSpy(allIds, headerOffset);

  const isParentActive = (item: NavItem) =>
    activeId === item.id || !!item.children?.some((c) => c.id === activeId);

  return (
    <aside className="fixed top-1/3 right-20 hidden lg:flex flex-col space-y-2 bg-bg border rounded shadow-md p-3 z-50 min-w-52">
      <nav aria-label="보조 내비게이션" className="space-y-1">
        {navTree.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => scrollToId(item.id, headerOffset)}
              className={cn(
                textStyles.bodyMd,
                `w-full text-left px-3 py-2 rounded-lg transition`,
                isParentActive(item)
                  ? 'bg-primary-50 text-primary-700'
                  : 'hover:bg-muted text-fg',
              )}
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
                        className={cn(
                          `w-full text-left px-3 py-1.5 rounded-md text-sm transition`,
                          childActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'hover:bg-muted text-fg',
                        )}
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