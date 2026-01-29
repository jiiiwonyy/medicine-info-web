import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import logo from '@/assets/logo.png';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [q, setQ] = useState('');
  const [filterType, setFilterType] = useState<'product' | 'ingredient'>(
    'product',
  );

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

    navigate(`/search?query=${encodeURIComponent(trimmed)}&type=${filterType}`);
  };

  return (
    <div className="w-full flex flex-col items-center mb-7">
      <div className="w-full bg-white shadow p-10 flex xl:px-72 flex-col items-center">
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
            filterType={filterType}
            onFilterChange={setFilterType}
            placeholder="검색어를 입력하세요 (최소 2글자)"
          />
        </div>
      </div>

      <div
        className="w-full xl:px-72 bg-sky-700 relative"
        onMouseLeave={() => setOpenMain(null)}
      >
        <div className="w-full flex items-center justify-center space-x-3">
          {mainTabs.map((tab) => (
            <button
              key={tab}
              onMouseEnter={() => setOpenMain(tab)}
              className={`px-4 py-3 font-medium cursor-pointer transition ${
                openMain === tab ? 'bg-sky-200 text-gray-800' : 'text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {openMain && subTabsMap[openMain] && (
          <div className="absolute left-0 top-full w-full bg-white shadow-lg z-20">
            <div className="mx-auto w-full max-w-6xl px-8 py-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
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
                      className={`w-full text-left px-3 py-2 rounded-md transition ${
                        isActive
                          ? 'bg-sky-100 text-sky-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
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
