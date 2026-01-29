import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';

export default function Home() {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: '의약품 상세검색',
      desc: '제품명, 성분명으로 의약품 정보를 상세하게 검색해보세요.',
      path: '/search',
      color: 'bg-blue-50 text-blue-600',
      icon: (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      ),
    },
    {
      title: '의약품 안전정보(DUR)',
      desc: '병용금기, 임부금기 등 의약품 복용 시 주의사항을 확인하세요.',
      path: '/dur',
      color: 'bg-emerald-50 text-emerald-600',
      icon: (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
      ),
    },
    {
      title: '부작용 피해구제',
      desc: '의약품 부작용으로 인한 피해, 구제 절차를 안내해드립니다.',
      path: '/drug-adverse-relief',
      color: 'bg-rose-50 text-rose-600',
      icon: (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      ),
    },
    {
      title: '안전성 속보',
      desc: '새로운 의약품 안전성 정보와 서한을 신속하게 알려드립니다.',
      path: '/safety-letter',
      color: 'bg-amber-50 text-amber-600',
      icon: (
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.31 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="py-6">
        {/* Hero Section */}
        <div className="text-center space-y-3 py-4 mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            의약품 정보, <span className="text-sky-700">쉽고 정확하게</span>
          </h1>
          <p className="text-gray-500 text-lg">
            안전한 투약을 위한 의약품 정보, 쉽고 정확하게
            <br />
            식품의약품안전처, 공공기관 데이터를 기반으로 신뢰할 수 있는 정보를
            제공합니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-sky-50 rounded-xl p-5 border border-sky-100 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  <strong className="text-gray-900 text-lg">효능·효과</strong>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  의약품의{' '}
                  <strong className="text-sky-700">
                    허가된 적응증(Indication)
                  </strong>
                  을 기술하는 항목으로, 임상시험 결과 및 약리학적 근거에 따라
                  식품의약품안전처가 승인한 치료 목적을 의미
                </p>
              </div>

              <div className="bg-sky-50 rounded-xl p-5 border border-sky-100 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  <strong className="text-gray-900 text-lg">용법·용량</strong>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  의약품의 표준 투여 경로, 투여 빈도, 1회 및 1일 투여량을
                  규정하는 항목
                </p>
              </div>

              <div className="bg-sky-50 rounded-xl p-5 border border-sky-100 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  <strong className="text-gray-900 text-lg">
                    사용상의 주의사항
                  </strong>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  의약품 사용 시 발생 가능한 위해 요소를 최소화하기 위한 안전성
                  정보를 제공하는 항목
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <p className="mb-6 font-bold text-gray-800 text-lg flex items-center gap-2">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-amber-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                상세 주의사항 구분
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: '1. 경고',
                    content:
                      '생명 위협 또는 중대한 위해 발생 가능성이 있어 가장 우선적으로 인지되어야 하는 안전성 정보이다. 임상적으로 중대한 이상반응, 치명적 결과, 사용 제한 조건 등이 포함된다.',
                  },
                  {
                    title: '2. 다음 환자에는 투여하지 말 것(금기)',
                    content:
                      '해당 의약품 투여 시 위험성이 유익성을 명확히 초과하는 환자군을 정의하는 항목이다. 절대적 금기에 해당하며, 임상적 판단에 의한 예외 적용을 원칙적으로 허용하지 않는다.',
                  },
                  {
                    title: '3. 다음 환자에는 신중히 투여할 것(주의)',
                    content:
                      '투여가 금지되지는 않으나, 면밀한 관찰 또는 용량 조절이 요구되는 환자군을 규정한다. 기저질환, 병력, 병용요법 등을 고려한 개별적 위험 평가가 필요하다.',
                  },
                  {
                    title: '4. 이상반응(부작용)',
                    contentHTML: (
                      <>
                        임상시험, 시판 후 조사, 자발적 보고 등을 통해 확인된{' '}
                        <strong className="text-rose-600">
                          유해반응(Adverse Drug Reaction)
                        </strong>
                        을 기술한다. 발생 빈도, 중증도, 인과관계 등을 기준으로
                        분류되며, 약물감시(PV)의 근거 자료로 활용된다.
                      </>
                    ),
                  },
                  {
                    title: '5. 일반적 주의',
                    content:
                      '특정 환자군에 한정되지 않고, 모든 투여 대상자에게 적용되는 전반적 안전 사용 지침을 포함한다. 장기 투여, 치료 중 모니터링, 치료 중단 기준 등이 여기에 해당한다.',
                  },
                  {
                    title: '6. 상호작용',
                    content:
                      '본 의약품과 다른 의약품 또는 특정 물질 간의 약물상호작용을 기술하는 항목이다. 약동학적 또는 약력학적 상호작용에 따른 효과 변화 및 이상반응 위험을 포함한다.',
                  },
                  {
                    title: '7. 임부 및 수유부에 대한 투여',
                    content:
                      '임신 또는 수유 중 노출 시 태아 및 영아에 대한 잠재적 위험성 평가 결과를 제시하는 항목이다.',
                  },
                  {
                    title: '8. 소아에 대한 투여',
                    content:
                      '소아 환자에서의 안전성·유효성 확보 여부 및 투여 가능성을 설명하는 항목이다.',
                  },
                  {
                    title: '9. 고령자에 대한 투여',
                    content:
                      '고령자에서의 약물 대사 및 배설 기능 저하 가능성을 고려한 투여 시 유의사항을 기술한다.',
                  },
                  {
                    title: '10. 과량투여시의 처치',
                    content:
                      '의약품 과량 노출 시 나타날 수 있는 임상 증상 및 대응 원칙을 제시한다. 특이적 해독제 존재 여부, 대증요법 및 지지요법 기준이 포함된다.',
                  },
                  {
                    title: '11. 적용상의 주의사항',
                    content:
                      '의약품의 보관, 조제, 투여 과정 전반에서의 기술적·실무적 유의사항을 기술하는 항목이다. 품질 유지 및 오사용 방지를 목적으로 한다.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="group hover:bg-gray-50 p-4 rounded-xl transition-colors border-l-4 border-gray-200 hover:border-sky-500"
                  >
                    <h4 className="font-bold text-gray-900 mb-1 group-hover:text-sky-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.content || item.contentHTML}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 sticky top-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Quick Access
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickLinks.map((link) => (
                  <button
                    key={link.title}
                    onClick={() => navigate(link.path)}
                    className="group flex flex-col items-start gap-3 p-4 bg-gray-50 rounded-xl border border-transparent hover:border-sky-200 hover:bg-sky-50 transition-all text-left h-full"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${link.color} group-hover:scale-110 transition-transform`}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-sky-700 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1 leading-snug">
                        {link.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
