import { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';

export default function Header() {
  const location = useLocation();
  const isSearchPage = location.pathname.startsWith('/search');
  const navigate = useNavigate();

  const [q, setQ] = useState('');
  const [hoverMain, setHoverMain] = useState<string | null>(null);
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [hoverLeft, setHoverLeft] = useState(0);
  const mainRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (location.pathname.startsWith('/search')) {
      setHoverMain('의약품검색');
      setActiveSub('의약품 상세정보');
    } else {
      setHoverMain(null);
      setActiveSub(null);
    }
  }, [location.pathname]);

  const mainTabs = useMemo(
    () => [
      '의약품검색',
      '복약안내 및 DUR',
      '이상반응정보',
      '안정성 서한 및 조치이력',
      '부작용대응 및 피해구제',
      '법적,제도 정보',
    ],
    [],
  );

  const subTabsMap: Record<string, string[]> = {
    의약품검색: ['의약품 상세정보'],
    '복약안내 및 DUR': ['복약지도서안내', 'DUR, 복약지도 정보'],
    이상반응정보: ['국내 이상반응건수', '해외 이상반응건수'],
    '안정성 서한 및 조치이력': [
      '의약품 관련 안정성 경고',
      '안정성 서한, 회수폐기 이력',
      '실마리정보 알리미',
    ],
    '부작용대응 및 피해구제': [
      '피해구제 제도 안내',
      'WHO-UMC',
      '지역의약품안전센터',
      '의약품 부작용 보고사이트',
    ],
    '법적,제도 정보': ['마약류 종합시스템'],
  };

  useEffect(() => {
    if (hoverMain) {
      const idx = mainTabs.indexOf(hoverMain);
      const el = mainRefs.current[idx];
      if (el) {
        const rect = el.getBoundingClientRect();
        const leftX = rect.left + window.scrollX; // 시작 좌표
        setHoverLeft(leftX);
      }
    }
  }, [hoverMain, mainTabs]);

  const handleSearch = async () => {
    if (q.trim().length < 2) return;
    navigate(`/search?query=${encodeURIComponent(q)}`);
  };

  return (
    <div className="w-full flex flex-col items-center mb-7">
      {/* 검색바 영역 */}
      <div className="w-full bg-white shadow p-10 flex xl:px-72 flex-col items-center">
        <h1
          onClick={() => navigate('/')}
          className="text-2xl md:text-3xl font-bold mb-6 cursor-pointer hover:text-green-600 transition-colors"
        >
          💊 약 정보 검색 사이트
        </h1>
        <div className="w-full max-w-xl">
          <SearchBar
            id="medicine-search-bar"
            value={q}
            onChange={setQ}
            onSearch={handleSearch}
            placeholder="약 이름을 입력하세요 (최소 2글자)"
          />
        </div>
      </div>

      {/* 메인탭 + 서브탭 */}
      <div
        className="w-full xl:px-72 bg-green-700 relative"
        onMouseLeave={() => {
          if (isSearchPage) {
            setHoverMain('의약품검색');
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
                hoverMain === tab ? 'bg-green-200 text-gray-800' : 'text-white'
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
                        ? 'border-green-500 text-green-700 font-medium'
                        : 'text-gray-600 hover:font-bold hover:border-b-2 hover:border-green-500'
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
