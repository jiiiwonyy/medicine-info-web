import Callout from '@/components/Callout';
import PageLayout from '@/components/PageLayout';
import ReliefProcess from '@/components/ReliefProcess';

export default function AdverseReliefPage() {
  return (
    <PageLayout title="의약품 부작용 피해구제">
      <p className="mb-6 text-lg font-semibold text-sky-900">
        부작용 피해구제 제도 안내
      </p>

      {/* 제도 설명 */}
      <Callout variant="info" className="mb-8">
        부작용 피해구제 제도란, 의약품을{' '}
        <span className="font-semibold">적정하게 사용했음에도 불구하고</span>{' '}
        중대한 부작용 피해가 발생한 경우, 환자 또는 유족에게 국가가
        진료비·보상금을 지원하는 제도입니다. <br></br>
        <br></br>부작용 피해구제는 누구나 신청할 수 있는 것이 아니라,{' '}
        <span className="font-semibold text-sky-900">
          적정하게 약을 사용했음에도 불구하고 예기치 못한 중대한 부작용
        </span>
        이 발생한 경우에 한해 지원됩니다.
        <br />
        신청 후에는 한국의약품안전관리원(KIDS)에서 인과관계를 조사하고, 피해구제
        심의위원회의 심의를 거쳐 지원 여부와 보상 범위가 결정됩니다.
      </Callout>

      {/* 구분선 */}
      <hr className="my-8 border-gray-300" />

      {/* 지원 대상 */}
      <h3 className="text-xl font-semibold mb-3">📌 지원 대상</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          ✅ 적정하게 의약품을 사용했음에도 불구하고{' '}
          <span className="font-semibold">
            예상치 못한 중대한 부작용(사망, 장애, 장기 입원 등)
          </span>{' '}
          이 발생한 경우
        </li>
        <li>✅ 환자 본인 또는 법정대리인, 유족이 신청 가능</li>
      </ul>

      {/* 구분선 */}
      <hr className="my-8 border-gray-300" />

      {/* 지원 범위 */}
      <h3 className="text-xl font-semibold mb-3">💰 지원 범위</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          🏥 <span className="font-semibold">진료비</span> : 부작용 치료에
          소요된 본인 부담 의료비
        </li>
        <li>
          💰 <span className="font-semibold">장해보상금</span> : 약물로 인해
          영구적 장애가 남은 경우
        </li>
        <li>
          ⚰ <span className="font-semibold">사망 일시보상금</span> : 의약품
          부작용으로 인한 사망 시
        </li>
        <li>
          👨‍👩‍👧‍👦 <span className="font-semibold">간병비</span> : 장기간 치료·간병이
          필요한 경우
        </li>
      </ul>

      {/* 구분선 */}
      <hr className="my-8 border-gray-300" />

      {/* 신청 방법 */}
      <h3 className="text-xl font-semibold mb-3">📝 신청 방법 및 절차</h3>
      <p className="mb-4">
        부작용 피해구제 신청은{' '}
        <span className="font-semibold text-sky-900">
          의약품안전나라 전자민원/보고 메뉴
        </span>{' '}
        를 통해 진행할 수 있습니다.
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <p className="font-medium mb-2">📍 신청 경로</p>
        <ol className="list-decimal pl-6 space-y-1">
          <li>
            의약품안전나라 (
            <a
              href="https://nedrug.mfds.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 underline hover:text-sky-900"
            >
              nedrug.mfds.go.kr
            </a>
            ) 접속
          </li>
          <li>
            상단 메뉴 <strong>[전자민원/보고]</strong> →{' '}
            <strong>[의약품 부작용 피해구제]</strong> 선택
          </li>
          <li>본인 인증 후 신청서 작성 및 제출</li>
        </ol>
      </div>

      {/* 바로가기 버튼 */}
      <div className="flex flex-wrap gap-3">
        <a
          href="https://nedrug.mfds.go.kr/cntnts/230"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition"
        >
          🔗 의약품부작용피해구제 민원신청 바로가기
        </a>
        <a
          href="https://karp.drugsafe.or.kr/frt/ara/AplCtf.do"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition"
        >
          🔗 신청서 작성 바로가기
        </a>
        <a
          href="https://www.youtube.com/watch?v=rcxfVtL8nlM"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition"
        >
          🔗 신청 방법 유튜브 안내 보기
        </a>
      </div>
      <ReliefProcess />
    </PageLayout>
  );
}
