import south_korea_map from '@/assets/map.svg';
import Callout from '@/components/Callout';

export default function LocalCenter() {
  const centers = {
    전국약국통합센터: [{ name: '대한약사회', phone: '025827896' }],
    서울: [
      { name: '가톨릭대학교 서울성모병원', phone: '0222582533' },
      { name: '고려대학교 구로병원', phone: '0226261657' },
      { name: '국립중앙의료원', phone: '0222624865' },
      { name: '삼성서울병원', phone: '0234103392' },
      { name: '서울대학교병원', phone: '0220722684' },
      { name: '서울아산병원', phone: '0230101020' },
      { name: '중앙대학교병원', phone: '0262991330' },
      { name: '한양대학교병원', phone: '0222909061' },
    ],
    '인천·경기': [
      { name: '동국대학교 일산병원', phone: '0319618441' },
      { name: '분당서울대병원', phone: '0317872478' },
      { name: '아주대학교병원', phone: '0312194039' },
      { name: '인하대학교병원', phone: '0328903319' },
      { name: '한림대학교 동탄성심병원', phone: '03180863126' },
    ],
    강원: [{ name: '한림대학교 춘천성심병원', phone: '0332405265' }],
    '대전·충청': [
      { name: '단국대학교병원', phone: '0415506693' },
      { name: '충남대학교병원', phone: '0422806108' },
      { name: '충북대학교병원', phone: '0432696769' },
    ],
    '광주·전라': [
      { name: '전남대학교병원', phone: '0622205321' },
      { name: '전북대학교병원', phone: '0632502801' },
      { name: '조선대학교병원', phone: '0622203969' },
    ],
    '대구·경북': [
      { name: '계명대학교 동산병원', phone: '0532586697' },
      { name: '경북대학교병원', phone: '0522006560' },
    ],
    '부산·울산·경남': [
      { name: '동아대학교병원', phone: '0512405860' },
      { name: '부산대학교병원', phone: '0512407926' },
      { name: '인제대학교 해운대백병원', phone: '0517972542' },
    ],
  };

  const Box = ({
    region,
    hospitals,
  }: {
    region: string;
    hospitals: { name: string; phone: string }[];
  }) => (
    <div className="bg-white shadow-md rounded-lg p-3 w-44 mb-2">
      <h3 className="font-bold text-sm mb-2">{region}</h3>
      <ul className="space-y-1 text-sm">
        {hospitals.map((h) => (
          <li key={h.name}>
            <a href={`tel:${h.phone}`} className="hover:underline">
              {h.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className="max-w-5xl mx-auto px-4 py-8 text-gray-800 leading-relaxed space-y-8">
      {/* 상단 설명 */}
      <Callout variant="info" title="지역의약품안전센터란?">
        우리나라는 권역별로 지정된 지역의약품안전센터를 통해 의약품 이상사례를
        수집·분석하고, 교육 및 상담을 제공합니다. 가까운 센터를 통해 이상사례
        보고, 환자 상담, 교육 참여를 할 수 있습니다.
      </Callout>

      {/* 지도 + 센터 박스 */}
      <div className="relative flex justify-center items-center w-full h-[800px]">
        <img src={south_korea_map} alt="대한민국 지도" className="w-[400px]" />

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

      {/* 지도 아래 설명/추가 콘텐츠 */}
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
