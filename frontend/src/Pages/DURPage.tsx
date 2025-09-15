export default function DURPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-gray-800 leading-relaxed">
      <h2 className="text-2xl font-bold border-b-2 border-blue-800 pb-2 mb-6">
        의약품안전사용(DUR; Drug Utilization Review)
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">
          DUR(의약품안전사용서비스)란?
        </h3>
        <p className="mb-3">
          환자가 안전하게 약을 복용할 수 있도록, 처방·조제 단계에서
          <strong> 실시간으로 금기·주의 알림</strong>을 제공하는 국가
          서비스입니다.
        </p>
        <p className="text-gray-700">
          약품명을 검색하면 해당 약품의 DUR 정보
          <span className="font-medium">
            (병용금기, 연령·임부 금기, 투여기간 제한 등)
          </span>
          을 바로 확인할 수 있습니다.
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-3">DUR에서 제공하는 주요 정보</h3>
      <ul className="list-disc pl-6 mb-8 space-y-1">
        <li>
          <strong>🚫 병용금기 의약품</strong>: 함께 사용 시 위험한 조합
        </li>
        <li>
          <strong>👶 연령별 금기 의약품</strong>: 소아·고령자 금기 약물
        </li>
        <li>
          <strong>🤰 임부 금기 의약품</strong>: 임신 중 사용 시 위험
        </li>
        <li>
          <strong>⏳ 투여기간 제한 의약품</strong>: 장기 사용 시 부작용 우려
        </li>
      </ul>

      <h3 className="text-xl font-semibold mb-3">DUR 활용 사례</h3>
      <ul className="list-disc pl-6 mb-6 space-y-1">
        <li>
          <strong>투약 전 확인</strong>: DUR에서 제공한 알림을 근거로 환자 투약
          안전 점검
        </li>
        <li>
          <strong>환자 교육</strong>: 금기·주의 약물에 대해 환자 및 보호자 설명
          가능
        </li>
        <li>
          <strong>의사·약사 협력</strong>: DUR 알림을 근거로 처방·조제 조정 협의
        </li>
        <li>
          <strong>환자 안전 관리</strong>: 현장에서 최종적으로 투약하는 역할을
          맡기 때문에 DUR 활용은 환자 보호와 직결
        </li>
      </ul>
    </section>
  );
}
