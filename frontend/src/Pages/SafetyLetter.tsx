export default function SafetyLetter() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-8 text-gray-800 leading-relaxed">
      <h2 className="text-2xl font-bold border-b-2 border-sky-800 pb-2 mb-4">
        의약품 안전성서한(속보)란?
      </h2>
      <p className="mb-6">
        식품의약품안전처가 의약품 사용 중 발생할 수 있는{' '}
        <span className="font-semibold">중대한 부작용</span>이나{' '}
        <span className="font-semibold">
          안전성과 관련된 새로운 정보 및 조치사항
        </span>
        을 의료 전문가와 일반인에게{' '}
        <span className="font-semibold">신속·명확하게 안내</span>하기 위해
        발행하는 공식 문서입니다.
      </p>

      <h3 className="text-xl font-semibold mb-2">최근 발행 현황</h3>
      <table className="w-full border-collapse border border-gray-300 mb-6 text-center">
        <thead>
          <tr className="bg-blue-50">
            <th className="border border-gray-300 py-2 px-4">연도</th>
            <th className="border border-gray-300 py-2 px-4">건수</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 py-2 px-4">2025년</td>
            <td className="border border-gray-300 py-2 px-4">1건</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-2 px-4">2024년</td>
            <td className="border border-gray-300 py-2 px-4">4건</td>
          </tr>
          <tr>
            <td className="border border-gray-300 py-2 px-4">2023년</td>
            <td className="border border-gray-300 py-2 px-4">17건</td>
          </tr>
          <tr className="bg-blue-100 font-semibold">
            <td className="border border-gray-300 py-2 px-4">최근 총계</td>
            <td className="border border-gray-300 py-2 px-4">22건</td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-xl font-semibold mb-2">안전성 서한 확인 방법</h3>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>메인 화면에서 바로 확인</li>
        <li>
          메뉴 경로:{' '}
          <span className="font-semibold">
            고시/공고/알림 → 안전성 정보 → 안전성 서한(속보)
          </span>
        </li>
      </ul>
      <a
        href="https://nedrug.mfds.go.kr/pbp/CCBAC01"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition mb-8"
      >
        🔗 안전성 서한 바로가기
      </a>

      <h3 className="text-xl font-semibold mb-2">검색 예시</h3>
      <div className="border border-gray-300 bg-gray-50 p-4 rounded mb-6 text-sm">
        <p>
          검색창에서 <span className="font-semibold">“리도카인”</span> 입력
        </p>
        <div className="bg-white border border-gray-300 rounded p-3 my-3">
          2009-01-20 | 리도카인 주사제 안전성 서한 <br />
          국소마취제 “리도카인 등 4개 성분” 함유 외용제제 관련 안전성서한 배포
        </div>
        <p>
          상세내역 클릭 시 →{' '}
          <strong>제목 / 공개일자 / 상세정보 / PDF 다운로드</strong>
        </p>
      </div>

      {/* 문의 */}
      {/* <p className="text-sm text-gray-600 border-t border-gray-200 pt-4">
        📩 문의: 안전성 서한 관련 추가 안내가 필요할 경우 이메일로 문의해
        주세요.
      </p> */}
    </section>
  );
}
