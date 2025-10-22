export default function ReliefProcessVertical() {
  const steps = [
    {
      title: '신청접수 및 서류 검토',
      period: '소요 기간: 약 1~2주',
      desc: '피해구제 신청서와 구비서류를 제출하면, 요건에 맞게 작성되었는지를 검토하는 단계',
      sections: [
        {
          subtitle: '📂 필요 서류',
          content: [
            {
              label: '공통 필수 서류',
              items: [
                '피해구제급여 지급신청서',
                '서약서 (2종)',
                '개인정보 수집·이용·제공 동의서',
                '진료기록 열람 및 사본발급 동의서, 위임장',
                '신청인 신분증 사본, 통장 사본',
                '부작용 발생 확인서 (피해 경위 작성)',
              ],
            },
            {
              label: '피해 유형별 추가 서류',
              items: [
                '🩺 진료비: 진료비 영수증 및 상세내역서 (일자별)',
                '💰 장애급여: 장애진단서',
                '⚰ 사망일시금: 사망진단서, 가족관계증명서',
                '⚱ 장례비: 장례확인서(장례식장발급) 또는 사망진단서',
              ],
            },
          ],
        },
      ],
    },
    {
      title: '인과관계 조사',
      period: '소요 기간: 최대 120일 (기본 90일, 필요시 30일 연장)',
      desc: '의약품 사용과 발생한 피해 사이의 의학적 인과관계를 규명하는 단계',
    },
    {
      title: '피해구제심의위원회 심의',
      period: '소요 기간: 약 1~3개월',
      desc: '전문가 위원회가 조사 결과를 바탕으로 피해구제 지급 여부와 금액을 최종 결정하는 단계',
    },
    {
      title: '결과 통보 및 지원금 지급',
      period: '소요 기간: 약 1개월 이내',
      desc: '심의 결과를 신청인에게 통보하고, 결정된 지원금을 지급하는 단계',
    },
    {
      title: '이의신청 절차',
      period: '소요 기간: 90일 이내 (처리 기간은 사안에 따라 상이)',
      desc: '심의 결과에 동의하지 않을 경우, 결과 통보 받은 날로부터 90일 이내에 재심의를 요청하는 절차',
      sections: [
        {
          subtitle: '📋 필요 서류',
          content: [
            {
              label: '',
              items: [
                '이의신청서',
                '이의신청 사유를 증명할 수 있는 자료',
                '새로운 진료기록',
                '상급병원 소견서 등 객관적 자료',
              ],
            },
          ],
        },
        {
          subtitle: '☎ 대표전화',
          content: [{ label: '', items: ['1644-6223'] }],
        },
      ],
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-gray-800 leading-relaxed">
      <h2 className="text-2xl font-bold border-b-2 border-sky-700 pb-2 mb-10">
        의약품 부작용 피해구제 절차
      </h2>

      <div className="space-y-10 relative">
        {steps.map((step, index) => (
          <div key={index} className="relative flex gap-4">
            {/* 왼쪽 타임라인 */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="w-[2px] flex-1 bg-sky-300 mt-1"></div>
              )}
            </div>

            {/* 본문 카드 */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 w-full">
              <h3 className="text-lg font-semibold text-sky-800 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-700 mb-2">{step.desc}</p>
              <p className="text-sm font-medium text-sky-700 mb-3">
                {step.period}
              </p>

              {/* 섹션 */}
              {step.sections &&
                step.sections.map((section, sIdx) => (
                  <div key={sIdx} className="mt-4">
                    <p className="font-semibold text-gray-800 mb-1">
                      {section.subtitle}
                    </p>

                    {section.content.map((group, gIdx) => (
                      <div key={gIdx} className="mb-3">
                        {group.label && (
                          <p className="text-sm font-medium text-sky-800 mb-1">
                            • {group.label}
                          </p>
                        )}
                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                          {group.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-sky-50 border border-sky-200 rounded-md py-5 px-6 text-center">
        <p className="font-medium text-gray-800">
          신청부터 최종 결과까지 모든 단계가 지연 없이 진행될 경우{' '}
          <span className="font-bold text-sky-800">
            최소 4개월에서 최대 8개월 이상
          </span>{' '}
          소요될 수 있습니다.
        </p>
      </div>
    </section>
  );
}
