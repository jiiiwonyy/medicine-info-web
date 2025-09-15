import kidsLogo from '@/assets/kids_logo.png';
import Callout from '@/components/Callout';

export default function KidsInfoPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 text-gray-800 leading-relaxed">
      <Callout variant="info" className="mb-12" icon={<></>}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={kidsLogo}
            alt="한국의약품안전관리원 로고"
            className="w-40 h-auto object-contain"
          />
          <div>
            <h2 className="text-2xl font-bold mb-3">
              한국의약품안전관리원 (KIDS)
            </h2>
            <p className="mb-2">
              <strong>Korea Institute of Drug Safety & Risk Management</strong>
            </p>
            <p>
              의약품의 안전한 사용을 지원하고, 부작용 피해를 예방·보상하기 위해
              설립된 <strong>식품의약품안전처 산하 공공기관</strong>입니다.
            </p>
          </div>
        </div>
      </Callout>

      {/* 주요 기능 */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">주요 기능</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>국내에서 보고된 의약품 이상사례 수집·분석</li>
          <li>안전성 정보 제공 및 실마리정보 탐지</li>
          <li>의약품 부작용 피해구제 제도 운영</li>
          <li>국가 차원의 약물감시체계(Pharmacovigilance) 강화</li>
        </ul>
      </div>

      {/* 이상사례 보고 주체 */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-3">이상사례 보고 주체</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>의료인</strong> : 진료·투약 과정에서 발생한 환자의 부작용
            보고
          </li>
          <li>
            <strong>약사</strong> : 조제·투약 중 확인된 부작용 보고
          </li>
          <li>
            <strong>제약사</strong> : 자사 의약품 관련 이상사례를 의무적으로
            보고
          </li>
          <li>
            <strong>소비자(환자)</strong> : 본인 또는 가족에게 발생한 부작용을
            온라인으로 자발적 보고
          </li>
        </ul>
      </div>

      <div className="mb-10">
        <a
          href="https://kaers.drugsafe.or.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-blue-900 transition"
        >
          🔗 KIDS 이상사례 보고하기
        </a>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">보고 시 작성 항목</h3>
        <div className="mb-3">
          부작용 보고를 위해 사이트에 접속하면 아래와 같은 항목들을 입력하게
          됩니다.
        </div>
        <ul className="list-disc pl-6 space-y-1 mt-3">
          <li>환자 기본정보 (연령, 성별, 상태 등)</li>
          <li>의약품 정보 (제품명, 성분명, 투여 방법·기간)</li>
          <li>이상사례 내용 (발현 시점, 증상, 결과 등)</li>
          <li>보고자 정보 (보고자 유형: 의사·약사·간호사·환자·보호자 등)</li>
          <li>첨부자료 (검사결과, 진단서 등 필요 시 첨부 가능)</li>
        </ul>
      </div>

      {/* 기능 요약 */}
      <div>
        <h3 className="text-xl font-semibold mb-3">KIDS 주요 기능 요약</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>이상사례 보고</strong> : 의약품 사용 후 발생한 부작용
            기록·전송
          </li>
          <li>
            <strong>실마리정보 제공</strong> : 새로운 안전성 신호 탐지
          </li>
          <li>
            <strong>안전성 정보 공유</strong> : 분석 결과를 의료인 및 국민에게
            제공
          </li>
        </ul>
      </div>
    </section>
  );
}
