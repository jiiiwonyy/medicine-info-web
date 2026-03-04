import type { RegionGroups } from '@/features/local-center/types';

export const REGION_GROUPS: RegionGroups = {
  seoul: '서울',
  daejeon: '대전·충청',
  chungnam: '대전·충청',
  chungbuk: '대전·충청',
  sejong: '대전·충청',
  busan: '부산·울산·경남',
  ulsan: '부산·울산·경남',
  gyeongnam: '부산·울산·경남',
  daegu: '대구·경북',
  gyeongbuk: '대구·경북',
  incheon: '인천·경기',
  gyeonggi: '인천·경기',
  gangwon: '강원',
  gwangju: '광주·전라',
  jeonbuk: '광주·전라',
  jeonnam: '광주·전라',
};

export const REGION_ORDER = [
  '전국약국통합센터',
  '서울',
  '인천·경기',
  '강원',
  '대전·충청',
  '광주·전라',
  '대구·경북',
  '부산·울산·경남',
] as const;
