export type RouteInfo = { category: string; label: string };

export const ROUTE_MAP: Record<string, RouteInfo> = {
  '/dur': { category: '의약품 안전정보', label: '의약품안전사용(DUR)' },
  '/safety-letter': { category: '의약품 안전정보', label: '의약품 안전성 서한(속보)' },
  '/signal': { category: '의약품 안전정보', label: '의약품 이상반응(실마리) 정보' },

  '/medication-safety-info': { category: '안전한 투약 관리', label: '투약 안전이란?' },
  '/safe-medication-process': { category: '안전한 투약 관리', label: '안전한 투약 과정' },
  '/error-reduction-strategy': { category: '안전한 투약 관리', label: '투약오류 감소 전략' },

  '/domestic': { category: '부작용 보고자료', label: '국내 부작용 보고자료' },
  '/fda': { category: '부작용 보고자료', label: '미국 FDA 부작용 보고자료' },
  '/who': { category: '부작용 보고자료', label: 'WHO 부작용 보고자료' },

  '/relief': { category: '부작용보고 및 피해구제', label: '부작용(이상사례) 보고' },
  '/drug-adverse-relief': { category: '부작용보고 및 피해구제', label: '부작용 피해 구제' },
  '/local-center': { category: '부작용보고 및 피해구제', label: '지역의약품안전센터' },
  '/medication-guide': { category: '부작용보고 및 피해구제', label: '복약지도서' },

  '/kops': { category: '의약품 관련 사이트', label: '환자안전보고학습시스템(KOPS)' },
  '/nims': { category: '의약품 관련 사이트', label: '마약류 종합 시스템' },
  '/lawinfo': { category: '의약품 관련 사이트', label: '국가법령정보센터' },
};
