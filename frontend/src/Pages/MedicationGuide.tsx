import PageLayout from '@/components/PageLayout';

export default function MedicationGuide() {
  return (
    <PageLayout>
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-3">약학정보원 (KPIS)</h2>
        <p className="mb-2">
          <strong>Korean Pharmaceutical Information Service</strong>
        </p>
        <p>
          <strong>약학정보원(KPIS)</strong>은 국내 유일의 공신력 있는 의약품
          정보 통합 플랫폼으로, 제품별 복약지도서를 제공하여 의료진과 환자가
          안전하고 올바르게 약을 사용할 수 있도록 돕습니다.
        </p>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">📄 주요 기능 안내</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>제품명으로 검색 시 해당 의약품의 복약지도서 확인 가능</li>
          <li>성분명으로도 검색 가능, 동일 성분 복약정보 비교 제공</li>
          <li>복약지도서 인쇄 및 열람 기능 지원</li>
          <li>환자 맞춤형 복약 설명을 위한 전문 정보 제공</li>
        </ul>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">🧾 복약지도서란?</h3>
        <p className="mb-2">
          복약지도서는 환자가 약을{' '}
          <strong>안전하고 효과적으로 복용할 수 있도록,</strong> 복용 방법,
          보관법, 주의사항 등을 쉽게 정리한 안내문입니다.
        </p>
        <p>
          환자 맞춤형 설명이 가능하며, 의료진이 환자 교육 자료로 활용할 수
          있습니다.
        </p>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-6">복약지도서 확인 방법</h3>
        <div className="space-y-4">
          {[
            { step: 1, text: '약학정보원 홈페이지 접속' },
            {
              step: 2,
              text: '상단 메뉴 [의약품정보] → [제품별 복약정보] 선택',
            },
            {
              step: 3,
              text: '성분명 또는 제품명으로 검색하여 해당 의약품 복약지도서 확인',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-center gap-4 border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">
                {item.step}
              </div>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10 text-center">
        <a
          href="https://www.health.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-sky-700 text-white font-semibold px-6 py-3 rounded hover:bg-sky-900 transition"
        >
          🔗 약학정보원 복약지도서 검색 바로가기
        </a>
      </div>
    </PageLayout>
  );
}
