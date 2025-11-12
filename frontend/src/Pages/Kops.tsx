import Callout from '@/components/Callout';
import PageLayout from '@/components/PageLayout';

export default function KopsPage() {
  return (
    <PageLayout title="환자안전보고학습시스템 (KOPS; Korea Patient Safety reporting & learning system)">
      <p className="mb-6 text-lg font-semibold text-sky-900">
        환자안전보고학습시스템
      </p>

      <Callout variant="info" className="mb-8">
        “환자안전보고학습시스템(KOPS)은 환자안전을 위한{' '}
        <span className="font-semibold">보고, 학습, 공유 기능</span>을 제공하는
        국가 플랫폼입니다.”
      </Callout>

      <h3 className="text-xl font-semibold mb-2">📖 소개</h3>
      <p className="mb-6">
        환자안전보고학습시스템의 설립 배경, 운영체계, 관련 법령과 가이드라인을
        제공합니다.
      </p>

      <Callout variant="note" className="mb-8">
        보고하기는 환자안전 관련 정보를 보호하기 위해 본인인증 후 이용
        가능합니다.
      </Callout>

      <h3 className="text-xl font-semibold mb-2">⚠️ 주의경보</h3>
      <p>
        환자안전과 관련하여{' '}
        <span className="font-semibold">반복적이거나 중대한 사고 위험</span>이
        확인된 경우 발령되는 공식 알림으로, 유사 사례 예방을 위한 주의사항과
        대응 방안을 제시합니다.
      </p>
      <p className="mt-2 mb-3">
        지금까지 발령된 주의경보: <span className="font-semibold">총 53건</span>
      </p>
      <a
        href="https://www.kops.or.kr/portal/aam/atent/atentAlarmCntrmsrList.do"
        className="inline-block bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition mb-8"
      >
        🔗 주의경보 발령 바로가기
      </a>

      <h3 className="text-xl font-semibold mb-2">📌 정보제공</h3>
      <p>
        환자안전과 관련된 최신 동향, 지침, 사례 등을 간략히 정리하여{' '}
        <span className="font-semibold">
          의료현장에서 바로 참고할 수 있는 자료
        </span>
        를 제공합니다.
      </p>
      <a
        href="https://www.kops.or.kr/portal/ifm/infoProvdStdrList.do"
        className="inline-block bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition mb-8 mt-3"
      >
        🔗 환자안전 정보제공 바로가기
      </a>

      <h3 className="text-xl font-semibold mb-2">📊 통계</h3>
      <p>
        환자안전사고{' '}
        <span className="font-semibold">
          보고 현황, 발생 추이, 유형별 통계자료
        </span>
        를 시각화하여 제공합니다.
      </p>
      <a
        href="https://statistics.kops.or.kr/biWorks/dashBoardMain.do"
        className="inline-block bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition mb-8 mt-3"
      >
        🔗 통계포털 바로가기
      </a>

      <h3 className="text-xl font-semibold mb-2">📂 자료실</h3>
      <p>
        환자안전과 관련된{' '}
        <span className="font-semibold">보고서, 연구자료, 교육자료</span> 등을
        다운로드할 수 있습니다.
      </p>
      <a
        href="https://www.kops.or.kr/portal/board/policyRsrch/boardList.do"
        className="inline-block bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition mb-8 mt-3"
      >
        🔗 자료실 바로가기
      </a>

      <h3 className="text-xl font-semibold mb-2">
        📝 보고하기 (본인인증 필요)
      </h3>
      <p>
        우리나라 <span className="font-semibold">전체 환자안전사고 보고</span>를
        병원 내에서도 받고 있으며, 각 의료기관의{' '}
        <span className="font-semibold">환자안전 전담인력</span>이 보고를
        수행하고 있습니다.
      </p>

      <h4 className="text-lg font-semibold mt-4 mb-2">▸ 보고 유형</h4>
      <ul className="list-disc pl-6 mb-4 space-y-1">
        <li>자율보고</li>
        <li>의무보고</li>
        <li>환자안전 전담인력 보고</li>
        <li>환자안전위원회 보고</li>
      </ul>

      <h4 className="text-lg font-semibold mt-6 mb-4">▸ 보고 절차</h4>
      <div className="w-full bg-gray-50 py-8 px-4 items-center justify-center rounded">
        <div className="flex flex-col md:flex-row items-start justify-center gap-12">
          <div className="flex items-start gap-3 w-64">
            <div className="w-10 h-10 flex items-center justify-center bg-sky-700 text-white font-bold rounded-full flex-shrink-0">
              1
            </div>
            <p className="font-medium mt-2">보고하기 클릭</p>
          </div>

          <div className="hidden md:flex items-center text-sky-700 font-bold text-2xl">
            →
          </div>

          <div className="flex items-start gap-3 w-64">
            <div className="w-10 h-10 flex items-center justify-center bg-sky-700 text-white font-bold rounded-full flex-shrink-0">
              2
            </div>
            <p className="font-medium mt-2">
              본인인증 절차 <br />
              <span className="text-sm text-gray-600">(본인확인 필수)</span>
            </p>
          </div>

          <div className="hidden md:flex items-center text-sky-700 font-bold text-2xl">
            →
          </div>

          <div className="flex items-start gap-3 w-64">
            <div className="w-10 h-10 flex items-center justify-center bg-sky-700 text-white font-bold rounded-full flex-shrink-0">
              3
            </div>
            <p className="font-medium mt-2">보고서 작성</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
