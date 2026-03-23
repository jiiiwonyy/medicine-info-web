import { useState } from 'react';
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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {open ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" />
          <line x1="18" y1="4" x2="4" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="3" y1="16" x2="19" y2="16" />
        </>
      )}
    </svg>
  );
}

export default function HeaderNav({
  mainTabs,
  subTabsMap,
  openMain,
  onOpenMain,
  pathname,
  onNavigate,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const subTabs = openMain ? subTabsMap[openMain] : undefined;

  const handleMobileNavigate = (path: string) => {
    onNavigate(path);
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <div className="w-full bg-primary relative" onMouseLeave={() => onOpenMain(null)}>
      {/* 데스크탑 네비게이션 */}
      <div className="hidden md:flex xl:px-72 w-full items-center justify-center space-x-3">
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

      {/* 데스크탑 드롭다운 */}
      {openMain && subTabs && (
        <div className="hidden md:block absolute left-0 top-full w-full bg-surface shadow-md z-20 border-b border-border">
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

      {/* 모바일 상단 바 */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <span className={cn(textStyles.uiLg, 'text-primary-fg')}>메뉴</span>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="text-primary-fg p-1"
          aria-label={mobileOpen ? '메뉴 닫기' : '메뉴 열기'}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden absolute left-0 top-full w-full bg-surface shadow-md z-20 border-b border-border">
          {mainTabs.map((tab) => {
            const isExpanded = mobileExpanded === tab;
            const subs = subTabsMap[tab];
            return (
              <div key={tab} className="border-b border-border last:border-b-0">
                <button
                  onClick={() =>
                    setMobileExpanded(isExpanded ? null : tab)
                  }
                  className={cn(
                    'w-full flex items-center justify-between px-5 py-4 transition',
                    textStyles.uiLg,
                    isExpanded ? 'text-primary bg-primary-50' : 'text-fg hover:bg-muted',
                  )}
                >
                  <span>{tab}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={cn('transition-transform', isExpanded && 'rotate-180')}
                  >
                    <polyline points="3,5 8,11 13,5" />
                  </svg>
                </button>

                {isExpanded && subs && (
                  <div className="bg-muted px-4 py-2">
                    {subs.map((sub) => {
                      const isActive = pathname.startsWith(sub.path);
                      return (
                        <button
                          key={sub.path}
                          onClick={() => handleMobileNavigate(sub.path)}
                          className={cn(
                            'w-full text-left px-4 py-3 rounded-md transition',
                            textStyles.bodyMd,
                            isActive
                              ? 'text-primary font-semibold'
                              : 'text-muted-fg hover:text-fg',
                          )}
                        >
                          {sub.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
