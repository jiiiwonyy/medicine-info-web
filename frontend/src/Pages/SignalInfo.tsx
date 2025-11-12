import PageLayout from '@/components/PageLayout';

export default function SignalInfo() {
  return (
    <PageLayout title="의약품 이상반응(실마리) 정보">
      <div className="flex justify-center items-end mb-12 relative h-72">
        <div className="absolute bottom-0 w-72 h-72 bg-sky-900 rounded-full" />
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(16rem-20px)] text-center text-white z-30">
          <p className="font-semibold text-lg">부작용</p>
          <p className="text-sm opacity-90">Side Effect</p>
        </div>

        <div className="absolute bottom-0 w-56 h-56 bg-sky-700 rounded-full" />
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(12rem-20px)] text-center text-white z-30">
          <p className="font-semibold text-base">이상사례</p>
          <p className="text-sm opacity-90">Adverse Event</p>
        </div>

        <div className="absolute bottom-0 w-40 h-40 bg-sky-400 rounded-full" />
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(5rem-20px)] text-center text-white z-30">
          <p className="font-semibold text-sm">약물이상반응</p>
          <p className="text-xs opacity-90">Adverse Drug Reaction</p>
        </div>
      </div>

      {/* 설명 섹션 */}
      <div className="space-y-6 mb-8">
        <div className="border rounded-lg p-4 bg-sky-50">
          <h3 className="text-lg font-semibold mb-2">
            의약품 이상반응 (ADR, Adverse Drug Reaction)
          </h3>
          <p>
            의약품을 정상적인 용량·용법에 따라 사용했음에도 불구하고 발생하는
            원하지 않는 해롭거나 예기치 못한 반응을 말합니다.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            예시: 발진, 어지럼증, 간수치 상승, 심각한 경우 사망까지 이어질 수
            있음
          </p>
          <br />
          <h3 className="text-lg font-semibold mb-2">
            이상사례 (AE, Adverse Event)
          </h3>
          <p>
            의약품 등의 투여·사용 중 발생한 바람직하지 않고 의도되지 아니한 징후
            (sign), 증상(symptom) 또는 질병을 말합니다. 해당 의약품과 반드시
            인과관계를 가져야 하는 것은 아닙니다.
          </p>
        </div>

        <div className="border rounded-lg p-4 bg-sky-50">
          <h3 className="text-lg font-semibold mb-2">부작용 (Side Effect)</h3>
          <p>
            의약품 등을 정상적인 용량에 따라 투여할 경우 발생하는 모든 의도되지
            않은 효과를 말합니다.
          </p>
          <br />
          <h3 className="text-lg font-semibold mb-2">실마리정보 (Signal)</h3>
          <p>
            약물과 이상사례 간 새로운 잠재적 인과관계 또는 알려진 관계의 새로운
            측면을 제시하는 것으로, 분석할 만한 가치가 있는 정보입니다. 관계가
            유해한 것에 국한하지 않습니다.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3">실마리 소식지</h3>
      <p className="mb-6">
        KAERS(한국의약품안전관리원 이상사례 보고시스템)를 통해 수집·분석된
        실마리정보를 바탕으로, 식품의약품안전처가 안전성 검토 및 후속 조치를
        진행한 결과를 정리하여 의료인과 국민에게 제공하는 소식지입니다.
      </p>

      <h3 className="text-xl font-semibold mb-3">실마리정보 확인 경로</h3>
      <ol className="list-decimal pl-6 mb-6 space-y-1">
        <li>
          한국의약품안전관리원(KIDS) 홈페이지 접속 → 상단 메뉴에서{' '}
          <strong>“안전정보공개”</strong> 선택
        </li>
        <li>
          안전정보공개 메뉴 안의 <strong>[KIDS 실마리정보 알리미]</strong> 클릭
          → 의약품안전나라 연동
        </li>
        <li>
          의약품안전나라 사이트 이동 → 실마리정보 알리미에서 최신 정보 확인
        </li>
      </ol>

      <div className="flex flex-wrap gap-3">
        <a
          href="https://nedrug.mfds.go.kr/bbs/3"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition"
        >
          🔗 의약품안전나라 실마리정보 바로가기
        </a>
        <a
          href="https://www.drugsafe.or.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition"
        >
          🔗 한국의약품안전관리원 소식지 바로가기
        </a>
      </div>
    </PageLayout>
  );
}
