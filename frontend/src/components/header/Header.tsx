import { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

import HeaderTop from './HeaderTop';
import HeaderNav from './HeaderNav';
import type { SubTabsMap } from './types';

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

  const subTabsMap: SubTabsMap = {
    의약품정보: [{ label: '상세검색', path: '/search' }],

    '의약품 안전정보': [
      { label: '의약품안전사용(DUR)', path: '/dur' },
      { label: '의약품 안전성 서한(속보)', path: '/safety-letter' },
      { label: '의약품 이상반응(실마리) 정보', path: '/signal' },
    ],

    '안전한 투약 관리': [
      { label: '투약 안전이란?', path: '/medication-safety-info' },
      { label: '안전한 투약 과정', path: '/safe-medication-process' },
      { label: '투약오류 감소 전략', path: '/error-reduction-strategy' },
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
      <HeaderTop
        logoSrc={logo}
        query={q}
        onChangeQuery={setQ}
        onSearch={handleSearch}
        onClickLogo={() => {
          setQ('');
          navigate('/');
        }}
      />

      <HeaderNav
        mainTabs={mainTabs}
        subTabsMap={subTabsMap}
        openMain={openMain}
        onOpenMain={setOpenMain}
        pathname={location.pathname}
        onNavigate={(path) => navigate(path)}
      />
    </div>
  );
}
