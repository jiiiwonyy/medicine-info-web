import PageLayout from '@/components/PageLayout';

export default function AdverseEventDomestic() {
  return (
    <PageLayout title="국내 의약품 부작용 보고자료">
      {/* 소개 */}
      <div className="mb-8 space-y-2">
        <p>
          국내에서 보고된 의약품 이상사례 자료는{' '}
          <strong>한국의약품안전관리원(KIDS)</strong>을 통해 수집·관리되며,
          식품의약품안전처의 안전성 검토 및 정책에 활용됩니다.
        </p>
        <p>
          이상사례 자료는 <strong>실마리정보 탐지</strong>,{' '}
          <strong>안전성 서한 발행</strong> 등 후속 안전조치의 근거가 됩니다.
        </p>
      </div>

      {/* 보여줄 자료 */}
      <h3 className="text-xl font-semibold mb-3">제공되는 주요 통계</h3>
      <ul className="list-disc pl-6 mb-8 space-y-1">
        <li>국내 의약품 부작용 보고 추이 (그래프)</li>
        <li>성별·연령대별 분포 (차트)</li>
        <li>주요 이상사례 유형 (예: 발진, 소화기계 이상, 간수치 상승 등)</li>
        <li>보고 주체별 분포 (의료인 / 제약사 / 소비자)</li>
      </ul>

      {/* 그래프 자리 (추후 데이터 연동) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="h-64 border rounded flex items-center justify-center text-gray-500 bg-gray-50">
          📊 보고 추이 그래프 자리
        </div>
        <div className="h-64 border rounded flex items-center justify-center text-gray-500 bg-gray-50">
          🧑‍⚕️ 성별·연령대별 분포 차트 자리
        </div>
        <div className="h-64 border rounded flex items-center justify-center text-gray-500 bg-gray-50 md:col-span-2">
          📝 주요 이상사례 유형 / 보고 주체별 분포 차트 자리
        </div>
      </div>

      {/* 조회 안내 */}
      <h3 className="text-xl font-semibold mb-3">이상사례보고 조회 안내</h3>
      <p className="mb-4">
        <strong>의약품안전나라</strong> 사이트에서 이상사례보고 동향을 직접
        확인할 수 있습니다.
      </p>
      <ol className="list-decimal pl-6 mb-6 space-y-1">
        <li>의약품안전나라 접속</li>
        <li>상단 메뉴 → 전자민원/보고 → 이상사례 → 이상사례보고 동향</li>
      </ol>
      <a
        href="https://nedrug.mfds.go.kr/pbp/CCBCB01"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition"
      >
        🔗 의약품안전나라 이상사례보고동향 바로가기
      </a>
    </PageLayout>
  );
}
