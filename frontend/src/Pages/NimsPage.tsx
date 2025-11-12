import PageLayout from '@/components/PageLayout';

export default function NimsPage() {
  return (
    <PageLayout title="마약류통합관리시스템(NIMS)">
      <p className="mb-6">
        <span className="font-semibold">
          마약류의 제조, 수입, 유통, 사용, 폐기
        </span>
        까지의 전 과정을 실시간으로 보고·관리하는 국가 통합 플랫폼입니다.
      </p>
      <p className="mb-6">
        보건복지부와 식품의약품안전처가 운영하며, 마약류의 오남용 방지,
        의료기관의 책임 있는 사용 관리, 국가 차원의 유통 투명성 확보를 목표로
        하고 있습니다.
      </p>

      <h3 className="text-xl font-semibold mb-2">주요 기능</h3>
      <div className="space-y-4 mb-8">
        <div className="border border-gray-300 bg-gray-50 rounded p-4">
          <h4 className="font-semibold mb-1">[보고 시스템]</h4>
          <p>
            마약류의 제조, 수입, 처방, 조제, 폐기 등 각 단계별로 의무적인 보고
            기능을 제공합니다.
          </p>
        </div>
        <div className="border border-gray-300 bg-gray-50 rounded p-4">
          <h4 className="font-semibold mb-1">[실시간 모니터링]</h4>
          <p>
            국가가 마약류 유통 현황을 실시간으로 파악하고 감시할 수 있도록
            지원합니다.
          </p>
        </div>
        <div className="border border-gray-300 bg-gray-50 rounded p-4">
          <h4 className="font-semibold mb-1">[오남용 예방]</h4>
          <p>
            과다처방, 중복처방, 불법 유통 등을 방지하고 마약류 사용의 안전성과
            윤리성을 높이는 데 기여합니다.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">이용 안내</h3>
      <ul className="list-disc pl-6 mb-6 space-y-1">
        <li>알림 : 공지사항, 시스템 안내</li>
        <li>교육센터 : 사용자 교육 자료, 동영상 가이드</li>
        <li>연계 : 외부 프로그램 연계 안내</li>
        <li>매뉴얼 : 마약류 취급보고, 수출입, 제조/사용자, 연구자 보고</li>
        <li>회원 : 회원가입, 로그인, 고객문의</li>
      </ul>

      <a
        href="https://www.nims.or.kr/"
        className="inline-block bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition mb-10"
      >
        🔗 마약류통합관리시스템(NIMS) 바로가기
      </a>

      <h3 className="text-xl font-semibold mb-2">국가법령정보센터</h3>
      <table className="w-full border-collapse border border-gray-300 mb-6 text-center">
        <thead>
          <tr className="bg-blue-50">
            <th className="border border-gray-300 py-2 px-4">법령명</th>
            <th className="border border-gray-300 py-2 px-4">바로가기</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 py-2 px-4">간호법</td>
            <td className="border border-gray-300 py-2 px-4">
              <a
                href="#"
                className="text-sky-700 font-semibold hover:underline"
              >
                삼단비교 보기 / 다운로드
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-2 px-4">환자안전법</td>
            <td className="border border-gray-300 py-2 px-4">
              <a
                href="#"
                className="text-sky-700 font-semibold hover:underline"
              >
                바로가기
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-2 px-4">의료법</td>
            <td className="border border-gray-300 py-2 px-4">
              <a
                href="#"
                className="text-sky-700 font-semibold hover:underline"
              >
                바로가기
              </a>
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-2 px-4">약사법</td>
            <td className="border border-gray-300 py-2 px-4">
              <a
                href="#"
                className="text-sky-700 font-semibold hover:underline"
              >
                바로가기
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </PageLayout>
  );
}
