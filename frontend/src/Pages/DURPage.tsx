import Callout from '@/components/Callout';
import PageLayout from '@/components/PageLayout';

export default function DURPage() {
  return (
    <PageLayout title="의약품안전사용서비스(DUR)">
      <div className="space-y-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <span className="w-2 h-8 bg-sky-600 rounded-full"></span>
          DUR(의약품안전사용서비스)란?
        </h3>
        <Callout variant="info" className="mb-8">
          <p className="text-gray-700 leading-relaxed text-lg mb-4">
            <strong className="text-sky-700">
              DUR(Drug Utilization Review, 의약품안전사용서비스)
            </strong>
            는 환자의 안전한 의약품 사용을 위해 처방·조제 단계에서 금기 및
            주의사항을 실시간으로 점검·제공하는 국가 운영 서비스입니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            의약품 처방 또는 조제 시 환자의 연령, 성별, 임신 여부, 기존 투약
            이력 등을 종합적으로 분석하여 임상적으로 문제가 될 수 있는 의약품
            사용을 사전에 차단하거나 주의를 환기하는 것을 목적으로 합니다.
          </p>
        </Callout>
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            DUR 서비스 제공 방식
          </h3>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="mb-2">
              의약품명을 검색하거나 처방·조제 시스템을 통해 확인하면, 해당
              의약품에 대한{' '}
              <strong className="text-gray-900">
                DUR 기준 정보가 실시간으로 제공
              </strong>
              됩니다.
            </p>
            <p>
              제공되는 정보는{' '}
              <span className="font-semibold text-sky-700">
                건강보험심사평가원
              </span>
              에서 관리·운영하며, 임상적 근거 및 안전성 정보를 바탕으로
              지속적으로 업데이트됩니다.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            DUR에서 제공하는 주요 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-2xl mb-4">
                🚫
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">병용금기</h4>
              <p className="text-gray-600 leading-relaxed">
                "병용금기 성분"이란 두 가지 이상의 유효성분을 함께 사용하는 경우
                치료효과의 변화 또는 심각한 부작용 발생 등의 우려가 있어 동시에
                사용하지 않아야 하는 유효성분의 조합을 말합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-2xl mb-4">
                👶
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                연령 금기
              </h4>
              <p className="text-gray-600 leading-relaxed">
                "특정 연령대 금기 성분"이란 소아, 노인 등 특정한 연령대의 환자가
                사용함에 있어 안전성이 확보되지 않았거나 심각한 부작용 발생 등의
                우려가 있어 사용하지 않아야 하는 유효성분을 말합니다.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-2xl mb-4">
                🤰
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                임부 금기
              </h4>
              <p className="text-gray-600 leading-relaxed">
                "임부금기 성분"이란 태아에게 심각한 위해성(기형 또는 태아독성
                등)을 유발할 가능성이 높아 임부에게 사용하는 것이 권장되지 않는
                유효성분을 의미합니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
            DUR 활용 사례
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: '투약 전 안전성 확인',
                desc: '의사 및 약사는 DUR 알림을 통해 처방 또는 조제 단계에서 환자의 투약 안전성을 사전에 점검할 수 있습니다.',
              },
              {
                title: '환자 및 보호자 교육',
                desc: 'DUR 정보를 근거로 금기·주의 의약품에 대한 복용 목적, 위험성, 주의사항을 환자 및 보호자에게 명확히 설명할 수 있습니다.',
              },
              {
                title: '보건의료전문가 간 협력 강화',
                desc: 'DUR 알림을 공통 근거로 활용하여 처방 변경, 대체 약물 선택, 투여 기간 조정 등에 대해 전문적 협의가 가능합니다.',
              },
              {
                title: '환자 안전 관리의 최종 단계',
                desc: '의약품을 실제로 환자에게 투여하거나 조제하는 단계에서 DUR 확인은 환자 안전을 확보하는 마지막 안전장치로 기능합니다.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                    ✔
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-sky-50 rounded-2xl p-10 text-center border border-sky-100 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            DUR 활용의 의의
          </h3>
          <p className="text-gray-600 leading-relaxed">
            DUR은 단순한 경고 시스템이 아니라, 의약품 오남용 예방, 중대한 약물
            사고 감소, 환자 중심 약료 실현을 위한{' '}
            <span className="text-sky-700 font-bold border-b border-sky-400">
              핵심 인프라
            </span>
            입니다.
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/20">
            <p className="font-medium text-xl">
              "의료 현장에서 DUR을 적극적으로 활용하는 것은 <br />
              <strong className="text-sky-700">
                전문가로서의 책임이자 환자 보호를 위한 필수 과정
              </strong>
              입니다."
            </p>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
