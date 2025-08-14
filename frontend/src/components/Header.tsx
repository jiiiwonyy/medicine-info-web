import { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import logo from '@/assets/logo.png';

export default function Header() {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');
  const navigate = useNavigate();

  const [q, setQ] = useState('');
  const [hoverMain, setHoverMain] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [hoverLeft, setHoverLeft] = useState(0);
  const mainRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [filterType, setFilterType] = useState<'product' | 'ingredient'>(
    'product',
  );

  useEffect(() => {
    if (location.pathname.startsWith('/search')) {
      setHoverMain('의약품정보');
      setActiveSub('의약품 상세정보');
    } else {
      setHoverMain(null);
      setActiveSub(null);
    }
  }, [location.pathname]);

  const mainTabs = useMemo(
    () => [
      '의약품정보',
      '안전성 서한 및 실마리정보',
      '부작용 보고자료',
      '부작용대응 및 피해구제',
      '의약품 관련 사이트',
    ],
    [],
  );

  const subTabsMap: Record<string, string[]> = {
    의약품정보: ['의약품 상세정보'],
    '안전성 서한 및 실마리정보': [
      '의약품 안전성 서한(속보)',
      '의약품이상반응(실마리) 정보',
    ],
    '부작용 보고자료': [
      '국내 부작용 보고건수',
      '미국 FDA 부작용 보고건수',
      'WHO 부작용 보고건수',
      '의약품 부작용 보고사이트',
    ],
    '부작용대응 및 피해구제': ['피해구제 제도 안내', '복약지도서 연결'],
    '의약품 관련 사이트': ['KOPS', '마약류 종합 시스템'],
  };

  useEffect(() => {
    if (hoverMain) {
      const idx = mainTabs.indexOf(hoverMain);
      const el = mainRefs.current[idx];
      if (el) {
        const rect = el.getBoundingClientRect();
        const leftX = rect.left + window.scrollX;
        setHoverLeft(leftX);
      }
    }
  }, [hoverMain, mainTabs]);

  const handleSearch = async () => {
    if (q.trim().length < 2) return;

    navigate(`/search?query=${encodeURIComponent(q)}&type=${filterType}`);
  };

  return (
    <div className="w-full flex flex-col items-center mb-7">
      <div className="w-full bg-white shadow p-10 flex xl:px-72 flex-col items-center">
        <img src={logo} alt="로고" onClick={() => navigate('/')} />
        <div className="w-full max-w-xl">
          <SearchBar
            id="medicine-search-bar"
            value={q}
            onChange={setQ}
            onSearch={handleSearch}
            filterType={filterType}
            onFilterChange={setFilterType}
            placeholder="검색어를 입력하세요 (최소 2글자)"
          />
        </div>
      </div>

      {/* 메인탭 + 서브탭 */}
      <div
        className="w-full xl:px-72 bg-sky-700 relative"
        onMouseLeave={() => {
          if (isSearchPage) {
            setHoverMain('의약품정보');
            setActiveSub('의약품 상세정보');
          } else {
            setHoverMain(null);
            setActiveSub(null);
          }
        }}
      >
        <div className="w-full flex items-center space-x-3 ">
          {mainTabs.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => {
                mainRefs.current[i] = el;
              }}
              onMouseEnter={() => setHoverMain(tab)}
              className={`px-4 py-2 font-medium cursor-pointer ${
                hoverMain === tab ? 'bg-sky-200 text-gray-800' : 'text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {hoverMain && (
          <div className="absolute top-full left-0 w-full bg-white shadow-inner h-12">
            <div className="absolute top-0" style={{ left: `${hoverLeft}px` }}>
              <div className="flex space-x-4 py-2">
                {subTabsMap[hoverMain].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSub(sub)}
                    className={`text-sm px-3 py-1 transition-colors border-b-2 border-transparent cursor-pointer ${
                      activeSub === sub
                        ? 'border-sky-500 text-sky-700 font-medium'
                        : 'text-gray-600 hover:font-bold hover:border-b-2 hover:border-sky-500'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
