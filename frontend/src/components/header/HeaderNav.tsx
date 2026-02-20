import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { SubTabsMap } from './types';

type Props = {
  mainTabs: string[];
  subTabsMap: SubTabsMap;
  openMain: string | null;
  onOpenMain: (tab: string | null) => void;
  pathname: string;
  onNavigate: (path: string) => void;
};

export default function HeaderNav({
  mainTabs,
  subTabsMap,
  openMain,
  onOpenMain,
  pathname,
  onNavigate,
}: Props) {
  const subTabs = openMain ? subTabsMap[openMain] : undefined;

  return (
    <div
      className="w-full xl:px-72 bg-primary relative"
      onMouseLeave={() => onOpenMain(null)}
    >
      <div className="w-full flex items-center justify-center space-x-3">
        {mainTabs.map((tab) => (
          <button
            key={tab}
            onMouseEnter={() => onOpenMain(tab)}
            className={cn(
              'px-4 py-3 cursor-pointer transition',
              textStyles.uiLg,
              openMain === tab
                ? 'bg-primary-100 text-fg'
                : 'text-primary-fg hover:bg-primary-700',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {openMain && subTabs && (
        <div className="absolute left-0 top-full w-full bg-surface shadow-md z-20 border-b border-border">
          <div className="mx-auto w-full max-w-6xl px-8 py-6">
            <h3
              className={cn(
                textStyles.uiLg,
                'text-fg mb-4 border-b border-border pb-2',
              )}
            >
              {openMain}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
              {subTabs.map((sub) => {
                const isActive = pathname.startsWith(sub.path);

                return (
                  <button
                    key={sub.path}
                    onClick={() => {
                      onNavigate(sub.path);
                      onOpenMain(null);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-md transition',
                      textStyles.bodyMd,
                      isActive
                        ? 'bg-primary-50 text-primary font-semibold'
                        : 'text-muted-fg hover:bg-muted hover:text-fg',
                    )}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
