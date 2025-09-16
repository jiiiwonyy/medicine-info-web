import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import logo from '@/assets/logo.png';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [q, setQ] = useState('');
  const [hoverMain, setHoverMain] = useState<string | null>(null);

  const [filterType, setFilterType] = useState<'product' | 'ingredient'>(
    'product',
  );

  const mainTabs = useMemo(
    () => [
      '의약품정보',
      '안전성 서한 및 실마리정보',
      '부작용 보고자료',
      '부작용보고 및 피해구제',
      '의약품 관련 사이트',
    ],
    [],
  );

  const subTabsMap: Record<string, { label: string; path: string }[]> = {
    의약품정보: [
      { label: '상세검색', path: '/search' },
      { label: '의약품안전사용(DUR)', path: '/dur' },
      { label: '의약품 안전정보', path: '/medicines/safe' },
    ],

    '안전성 서한 및 실마리정보': [
      { label: '의약품 안전성 서한(속보)', path: '/safety-letter' },
      { label: '의약품 이상반응(실마리) 정보', path: '/signal' },
    ],

    '부작용 보고자료': [
      { label: '국내 부작용 보고건수', path: '/domestic' },
      { label: '미국 FDA 부작용 보고건수', path: '/fda' },
      { label: 'WHO 부작용 보고건수', path: '/who' },
    ],

    '부작용보고 및 피해구제': [
      { label: '피해구제 제도 안내', path: '/relief' },
      { label: '지역의약품안전센터', path: '/local-center' },
      { label: '복약지도서', path: '/medication-guide' },
    ],

    '의약품 관련 사이트': [
      { label: 'KOPS', path: '/kops' },
      { label: '마약류 종합 시스템', path: '/narcotics' },
    ],
  };

  const handleSearch = async () => {
    const trimmed = q.trim();

    if (trimmed === '') {
      navigate('/search');
      return;
    }

    if (trimmed.length < 2) {
      alert('검색어는 2글자 이상 입력해주세요.');
      return;
    }

    navigate(`/search?query=${encodeURIComponent(trimmed)}&type=${filterType}`);
  };

  return (
    <div className="w-full flex flex-col items-center mb-7">
      <div className="w-full bg-white shadow p-10 flex xl:px-72 flex-col items-center">
        <img
          src={logo}
          alt="로고"
          onClick={() => navigate('/')}
          className="cursor-pointer"
        />
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

      <div
        className="w-full xl:px-72 bg-sky-700 relative"
        onMouseLeave={() => setHoverMain(null)}
      >
        <div className="w-full flex items-center space-x-3">
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onMouseEnter={() => setHoverMain(tab)}
              className={`px-4 py-2 font-medium cursor-pointer ${
                hoverMain === tab ? 'bg-sky-200 text-gray-800' : 'text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {hoverMain && subTabsMap[hoverMain] && (
          <div className="absolute top-full w-full bg-white shadow-inne z-10">
            <div className="flex space-x-4 py-2 px-4">
              {subTabsMap[hoverMain].map((sub) => {
                const isActive = location.pathname.startsWith(sub.path);
                return (
                  <button
                    key={sub.path}
                    onClick={() => navigate(sub.path)}
                    className={`text-sm px-3 py-1 transition-colors border-b-2 border-transparent cursor-pointer ${
                      isActive
                        ? 'border-sky-500 text-sky-700 font-medium'
                        : 'text-gray-600 hover:font-bold hover:border-sky-500'
                    }`}
                  >
                    {sub.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
