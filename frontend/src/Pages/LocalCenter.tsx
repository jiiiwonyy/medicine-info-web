import Callout from '@/components/ui/Callout';
import { useState, useEffect } from 'react';
import KoreaMap from '@/assets/map.svg?react';
import '@/styles/map.css';

interface HospitalInfo {
  name: string;
  phone: string;
  url: string;
}

type CentersType = Record<string, HospitalInfo[]>;

export default function LocalCenter() {
  const centers: CentersType = {
    전국약국통합센터: [
      {
        name: '대한약사회',
        phone: '025827896',
        url: 'https://www.kpanet.or.kr/',
      },
    ],
    서울: [
      {
        name: '가톨릭대학교 서울성모병원',
        phone: '0222582533',
        url: 'https://www.cmcseoul.or.kr/page/main',
      },
      {
        name: '고려대학교 구로병원',
        phone: '0226261657',
        url: 'https://guro.kumc.or.kr/kr/index.do',
      },
      {
        name: '국립중앙의료원',
        phone: '0222624865',
        url: 'https://www.nmc.or.kr/nmc/main',
      },
      {
        name: '삼성서울병원',
        phone: '0234103392',
        url: 'https://www.samsunghospital.com/home/main/index.do',
      },
      {
        name: '서울대학교병원',
        phone: '0220722684',
        url: 'https://www.snuh.org/main.do',
      },
      {
        name: '서울아산병원',
        phone: '0230101020',
        url: 'https://www.amc.seoul.kr/asan/main.do',
      },
      {
        name: '연세대학교 세브란스병원',
        phone: '0222281966',
        url: 'https://sev.severance.healthcare/sev/index.do',
      },
      {
        name: '중앙대학교병원',
        phone: '0262991330',
        url: 'https://ch.cauhs.or.kr/',
      },
      {
        name: '한양대학교병원',
        phone: '0222909061',
        url: 'https://www.hyumc.com/',
      },
    ],
    '인천·경기': [
      {
        name: '동국대학교 일산병원',
        phone: '0319618441',
        url: 'http://www.dumc.or.kr/index02.jsp',
      },
      {
        name: '분당서울대병원',
        phone: '0317872478',
        url: 'https://www.snubh.org/index.do',
      },
      {
        name: '아주대학교병원',
        phone: '0312194039',
        url: 'https://hosp.ajoumc.or.kr/',
      },
      {
        name: '인하대학교병원',
        phone: '0328903319',
        url: 'https://www.inha.com/page/main',
      },
      {
        name: '한림대학교 동탄성심병원',
        phone: '03180863126',
        url: 'https://dongtan.hallym.or.kr/',
      },
    ],
    강원: [
      {
        name: '한림대학교 춘천성심병원',
        phone: '0332405265',
        url: 'https://chuncheon.hallym.or.kr/',
      },
    ],
    '대전·충청': [
      {
        name: '단국대학교병원',
        phone: '0415506693',
        url: 'https://www.dkuh.co.kr/html_2016/',
      },
      {
        name: '충남대학교병원',
        phone: '0422806108',
        url: 'https://www.cnuh.co.kr/intro/',
      },
      {
        name: '충북대학교병원',
        phone: '0432696769',
        url: 'https://www.cbnuh.or.kr/main/index.do',
      },
    ],
    '광주·전라': [
      {
        name: '전남대학교병원',
        phone: '0622205321',
        url: 'https://www.cnuh.com/main.cs',
      },
      {
        name: '전북대학교병원',
        phone: '0632502801',
        url: 'https://www.jbuh.co.kr/main.do',
      },
      {
        name: '조선대학교병원',
        phone: '0622203969',
        url: 'https://hosp.chosun.ac.kr/',
      },
    ],
    '대구·경북': [
      {
        name: '계명대학교 동산병원',
        phone: '0532586697',
        url: 'https://daegu.dsmc.or.kr:49880/',
      },
      {
        name: '경북대학교병원',
        phone: '0522006560',
        url: 'https://www.knuh.kr/index.asp',
      },
    ],
    '부산·울산·경남': [
      {
        name: '동아대학교병원',
        phone: '0512405860',
        url: 'https://www.damc.or.kr/main/main_2017.php',
      },
      {
        name: '부산대학교병원',
        phone: '0512407926',
        url: 'https://www.pnuh.or.kr/pnuh/index.do',
      },
      {
        name: '인제대학교 해운대백병원',
        phone: '0517972542',
        url: 'https://www.paik.ac.kr/haeundae/user/main/view.do',
      },
      {
        name: '울산대학교병원',
        phone: '0522507521',
        url: 'https://www.uuh.ulsan.kr/intro/',
      },
    ],
  };

  const regionGroups: Record<string, string> = {
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

  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    document
      .querySelectorAll('.interactive-map [data-active]')
      .forEach((el) => {
        el.removeAttribute('data-active');
      });

    if (hoveredRegion) {
      const ids = Object.keys(regionGroups).filter(
        (key) => regionGroups[key] === hoveredRegion,
      );
      ids.forEach((id) => {
        const el = document.querySelector(`.interactive-map #${id}`);
        if (el) el.setAttribute('data-active', 'true');
      });
    }
  }, [hoveredRegion]);

  const TooltipLink = ({ name, phone, url }: HospitalInfo) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        className="relative inline-block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-700 hover:underline font-medium"
        >
          {name}
        </a>
        {hovered && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-1 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 shadow-md">
            ☎ {phone}
          </div>
        )}
      </div>
    );
  };

  const Box = ({
    region,
    hospitals,
  }: {
    region: string;
    hospitals: HospitalInfo[];
  }) => {
    const isHovered = hoveredRegion === region;
    return (
      <div
        className={`bg-white shadow-md rounded-lg p-3 w-44 mb-2 transition-all duration-300 ${
          isHovered ? 'translate-y-[-4px] shadow-lg border border-sky-500' : ''
        }`}
      >
        <h3 className="font-bold text-sm mb-2 text-sky-800">{region}</h3>
        <ul className="space-y-1 text-sm">
          {hospitals.map((h) => (
            <li key={h.name}>
              <TooltipLink {...h} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 text-gray-800 leading-relaxed space-y-8">
      <Callout variant="info" title="지역의약품안전센터란?">
        우리나라는 권역별로 지정된 지역의약품안전센터를 통해 의약품 이상사례를
        수집·분석하고, 교육 및 상담을 제공합니다. 가까운 센터를 통해 이상사례
        보고, 환자 상담, 교육 참여를 할 수 있습니다.
      </Callout>

      {/* 지도 + 센터 박스 */}
      <div className="relative flex justify-center items-center w-full h-[800px]">
        <KoreaMap
          className="interactive-map w-[400px] h-auto"
          onMouseOver={(e) => {
            const id = (e.target as SVGElement).id;
            if (id && regionGroups[id]) setHoveredRegion(regionGroups[id]);
          }}
          onMouseOut={() => setHoveredRegion(null)}
        />

        {/* 지도 양쪽 Box 위치 (기존 위치 그대로 유지) */}
        <div className="absolute top-0">
          <Box
            region="전국약국통합센터"
            hospitals={centers['전국약국통합센터']}
          />
        </div>

        <div className="absolute left-4 top-20 flex flex-col gap-4">
          <Box region="서울" hospitals={centers['서울']} />
          <Box region="인천·경기" hospitals={centers['인천·경기']} />
          <Box region="대전·충청" hospitals={centers['대전·충청']} />
          <Box region="광주·전라" hospitals={centers['광주·전라']} />
        </div>

        <div className="absolute right-4 top-28 flex flex-col gap-4">
          <Box region="강원" hospitals={centers['강원']} />
          <Box region="대구·경북" hospitals={centers['대구·경북']} />
          <Box region="부산·울산·경남" hospitals={centers['부산·울산·경남']} />
        </div>
      </div>

      {/* 지도 아래 설명 */}
      <article className="prose prose-blue max-w-none">
        <p className="text-sm">
          “지역의약품안전센터는 전국을 권역별로 나누어 지정되며, 권역 내
          센터들이 특정 구역을 나눠 맡는 것이 아니라 권역 전체를 공동으로
          담당합니다. 따라서 환자·의료진은 거주지와 가까운 센터를 선택해
          보고·상담할 수 있으며, 모든 보고 내용은 한국의약품안전관리원(KIDS)에서
          최종적으로 통합 관리됩니다.”
        </p>
      </article>
    </section>
  );
}
