import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import logo from '@/assets/logo.png';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [q, setQ] = useState('');

  const [openMain, setOpenMain] = useState<string | null>(null);

  const mainTabs = useMemo(
    () => [
      '의약품정보',
      '의약품 안전정보',
      '안전한 투약 관리',
      '부작용 보고자료',
      '부작용보고 및 피해구제',
      '의약품 관련 사이트',
    ],
    [],
  );

  const subTabsMap: Record<string, { label: string; path: string }[]> = {
    의약품정보: [{ label: '상세검색', path: '/search' }],

    '의약품 안전정보': [
      { label: '의약품안전사용(DUR)', path: '/dur' },
      { label: '의약품 안전성 서한(속보)', path: '/safety-letter' },
      { label: '의약품 이상반응(실마리) 정보', path: '/signal' },
    ],

    '부작용 보고자료': [
      { label: '국내 부작용 보고건수', path: '/domestic' },
      { label: '미국 FDA 부작용 보고건수', path: '/fda' },
      { label: 'WHO 부작용 보고건수', path: '/who' },
    ],

    '부작용보고 및 피해구제': [
      { label: '부작용(이상사례) 보고', path: '/relief' },
      { label: '부작용 피해 구제', path: '/drug-adverse-relief' },
      { label: '지역의약품안전센터', path: '/local-center' },
      { label: '복약지도서', path: '/medication-guide' },
    ],

    '의약품 관련 사이트': [
      { label: '환자안전보고학습시스템(KOPS)', path: '/kops' },
      { label: '마약류 종합 시스템', path: '/nims' },
      { label: '국가법령정보센터', path: '/lawinfo' },
    ],
  };

  const handleSearch = () => {
    const trimmed = q.trim();
    if (trimmed === '') return navigate('/search');

    if (trimmed.length < 2) {
      alert('검색어는 2글자 이상 입력해주세요.');
      return;
    }

    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="w-full flex flex-col items-center mb-7">
      {/* 상단: 로고+검색 */}
      <div className="w-full bg-surface shadow-sm p-10 flex xl:px-72 flex-col items-center border-b border-border">
        <img
          src={logo}
          alt="로고"
          onClick={() => {
            setQ('');
            navigate('/');
          }}
          className="cursor-pointer"
        />
        <div className="w-full max-w-xl">
          <SearchBar
            id="medicine-search-bar"
            value={q}
            onChange={setQ}
            onSearch={handleSearch}
            placeholder="검색어를 입력하세요 (최소 2글자)"
          />
        </div>
      </div>

      {/* 메인 네비 */}
      <div
        className="w-full xl:px-72 bg-primary relative"
        onMouseLeave={() => setOpenMain(null)}
      >
        <div className="w-full flex items-center justify-center space-x-3">
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onMouseEnter={() => setOpenMain(tab)}
              className={cn(
                'px-4 py-3 cursor-pointer transition',
                textStyles.nav,
                openMain === tab
                  ? 'bg-primary-100 text-fg'
                  : 'text-primary-fg hover:bg-primary-700',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 드롭다운 */}
        {openMain && subTabsMap[openMain] && (
          <div className="absolute left-0 top-full w-full bg-surface shadow-md z-20 border-b border-border">
            <div className="mx-auto w-full max-w-6xl px-8 py-6">
              <h3
                className={cn(
                  textStyles.sectionTitle,
                  'text-fg mb-4 border-b border-border pb-2',
                )}
              >
                {openMain}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
                {subTabsMap[openMain].map((sub) => {
                  const isActive = location.pathname.startsWith(sub.path);
                  return (
                    <button
                      key={sub.path}
                      onClick={() => {
                        navigate(sub.path);
                        setOpenMain(null);
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-md transition',
                        textStyles.nav,
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
    </div>
  );
}
