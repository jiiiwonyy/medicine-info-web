import Callout from '@/components/Callout';

export default function LawInfoPage() {
  const laws = [
    {
      title: '간호법',
      link: 'https://www.law.go.kr/법령/간호법',
      threeLink:
        'https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=265413&lsId=014736&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
    {
      title: '환자안전법',
      link: 'https://www.law.go.kr/LSW/lsSc.do?section=&menuId=1&subMenuId=15&tabMenuId=81&eventGubun=060101&query=%ED%99%98%EC%9E%90%EC%95%88%EC%A0%84%EB%B2%95#undefined',
      threeLink:
        'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=265481&lsId=012242&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
    {
      title: '의료법',
      link: 'https://www.law.go.kr/법령/의료법',
      threeLink:
        'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=269965&lsId=001788&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
    {
      title: '약사법',
      link: 'https://www.law.go.kr/법령/약사법',
      threeLink:
        'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=217283&lsId=001783&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
    {
      title: '의료기기법',
      link: 'https://www.law.go.kr/법령/의료기기법',
      threeLink:
        'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=268885&lsId=009514&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
    {
      title: '마약류 관리에 관한 법률',
      link: 'https://www.law.go.kr/법령/마약류관리에관한법률',
      threeLink:
        'https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=270395&lsId=002025&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
    {
      title: '보건의료기본법',
      link: 'https://www.law.go.kr/법령/보건의료기본법',
      threeLink:
        'https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=267417&lsId=002029&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
    {
      title: '지역보건법',
      link: 'https://www.law.go.kr/법령/지역보건법',
      threeLink:
        'https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=265479&lsId=000236&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
    {
      title: '감염병의 예방 및 관리에 관한 법률',
      link: 'https://www.law.go.kr/법령/감염병의예방및관리에관한법률',
      threeLink:
        'https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=270385&lsId=001792&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
    {
      title: '응급의료에 관한 법률',
      link: 'https://www.law.go.kr/법령/응급의료에관한법률',
      threeLink:
        'https://www.law.go.kr/LSW//lsInfoP.do?lsiSeq=254067&lsId=000218&chrClsCd=010202&urlMode=lsEfInfoR&viewCls=thdCmpNewScP&ancYnChk=0#',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-4 py-10 text-gray-800 leading-relaxed space-y-16">
      <h2 className="text-2xl font-bold border-b-2 border-sky-800 pb-2 mb-4">
        국가법령정보센터
      </h2>

      <Callout variant="info" title="국가법령정보센터란?">
        <p>
          대한민국 법제처가 운영하는 공식적인{' '}
          <strong className="text-sky-800">
            국가 법령정보 통합 검색 플랫폼
          </strong>
          입니다. 법률, 시행령, 행정규칙 등 모든 법령 정보를 한곳에서 무료로
          확인할 수 있습니다.
        </p>
      </Callout>

      <div>
        <h3 className="text-xl font-bold mt-10 mb-4 text-sky-800">
          📘 핵심 역할
        </h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>법률정보 통합 제공</strong>: 법률, 시행령, 판례, 조례 등
            흩어져 있는 모든 법령정보를 하나로 모아 제공합니다.
          </li>
          <li>
            <strong>대국민 접근성 보장</strong>: 전문가부터 일반 국민까지 누구나
            회원가입 없이 모든 정보를 무료로 이용할 수 있도록 합니다.
          </li>
          <li>
            <strong>정보의 신뢰성 확보</strong>: 국가 법제 업무 총괄 기관인
            법제처가 직접 운영하여 가장 정확하고 최신 정보를 유지합니다.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-bold mt-10 mb-4 text-sky-800">
          ⚙️ 핵심 기능
        </h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            🏛️ <strong>3단 비교 법률-시행령</strong> - 시행규칙을 한 화면에
            나란히 놓고 비교할 수 있는 가장 강력한 기능입니다.<br></br>
            <span className="pl-5 block">
              법 조항이 하위 법령에서 어떻게 구체화되는지 한눈에 파악할 수
              있습니다.
            </span>
          </li>
          <li>
            🔄 <strong>신구법 비교 법</strong>이 개정되었을 때,{' '}
            <strong>개정 전(구법)과 후(신법)의 조문</strong>을 나란히 비교하여
            변경된 부분을 쉽게 확인할 수 있습니다.
          </li>
          <li>
            📄 <strong>한글(HWP)·PDF 파일 다운로드</strong> 법령에 첨부된 각종
            <strong> 별표, 서식(신청서 등)</strong>을 클릭 한 번으로
            다운로드하여 바로 사용할 수 있습니다.
          </li>
          <li>
            🔍 <strong>통합 검색 및 연혁 조회</strong> 키워드 하나로 관련된
            법령, 판례 등을 모두 찾고, 특정 법의 제정부터 현재까지 모든 개정
            이력을 조회할 수 있습니다.
          </li>
        </ul>
      </div>

      <h3 className="text-xl font-bold mt-10 mb-4 text-sky-800">
        📚 주요 보건의료 관련 법률 바로가기
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {laws.map((law) => (
          <div
            key={law.title}
            className="bg-white border border-sky-100 rounded-lg shadow-sm p-4 hover:shadow-md transition hover:-translate-y-0.5"
          >
            <h4 className="font-semibold text-sky-800 mb-2">{law.title}</h4>
            <div className="flex flex-wrap gap-2">
              <a
                href={law.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white bg-sky-700 hover:bg-sky-900 px-3 py-1 rounded transition"
              >
                🔗 법령 바로가기
              </a>
              <a
                href={law.threeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sky-800 border border-sky-700 px-3 py-1 rounded hover:bg-sky-50 transition"
              >
                📖 삼단비교법 보기
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
