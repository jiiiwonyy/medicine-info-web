import PageLayout from '@/components/PageLayout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import {
  MdComputer,
  MdPhoneInTalk,
  MdSick,
  MdWarningAmber,
  MdMedication,
} from 'react-icons/md';

export default function ReliefPage() {
  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Section 1: 3 Definitions (Card Layout) */}
        <section className="grid gap-6 md:grid-cols-3">
          {/* Card 1: Side Effect */}
          <div
            className={cn(
              'flex flex-col h-full',
              'bg-surface rounded-lg border border-border shadow-sm p-6',
              'hover:shadow-md transition-shadow duration-200',
            )}
          >
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
              <MdSick size={24} />
            </div>
            <h2 className={cn(textStyles.titleMd, 'mb-3 text-primary-700')}>
              부작용
              <br />
              <span className={cn(textStyles.bodySm, 'font-normal block mt-1')}>
                (Side Effect)
              </span>
            </h2>
            <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
              정상적인 용량에 따라 약물을 투여할 경우 발생하는 모든 의도되지
              않은 효과
            </p>
          </div>

          {/* Card 2: Adverse Event */}
          <div
            className={cn(
              'flex flex-col h-full',
              'bg-surface rounded-lg border border-border shadow-sm p-6',
              'hover:shadow-md transition-shadow duration-200',
            )}
          >
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
              <MdWarningAmber size={24} />
            </div>
            <h2 className={cn(textStyles.titleMd, 'mb-3 text-primary-700')}>
              이상사례
              <br />
              <span className={cn(textStyles.bodySm, 'font-normal block mt-1')}>
                (Adverse Event)
              </span>
            </h2>
            <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
              약물 사용 중 발생한 바람직하지 않고 의도되지 않는 징후, 증상 또는
              질병
            </p>
          </div>

          {/* Card 3: Adverse Drug Reaction */}
          <div
            className={cn(
              'flex flex-col h-full',
              'bg-surface rounded-lg border border-border shadow-sm p-6',
              'hover:shadow-md transition-shadow duration-200',
            )}
          >
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
              <MdMedication size={24} />
            </div>
            <h2 className={cn(textStyles.titleMd, 'mb-3 text-primary-700')}>
              약물이상반응
              <br />
              <span className={cn(textStyles.bodySm, 'font-normal block mt-1')}>
                (Adverse Drug Reaction)
              </span>
            </h2>
            <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
              이상사례 중 해당 의약품과의 인과관계를 배제할 수 없는 경우
            </p>
          </div>
        </section>

        {/* Section 2: Serious AE/ADR */}
        <section
          className={cn(
            'bg-surface rounded-lg border border-border shadow-sm p-8',
            'border-l-4 border-l-danger',
          )}
        >
          <h2
            className={cn(
              textStyles.titleMd,
              'mb-4 text-danger flex items-center gap-2',
            )}
          >
            ⚠️ 중대한 이상사례·약물이상반응
          </h2>
          <p className={cn(textStyles.bodySm, 'mb-4')}>
            다음 각 항목의 어느 하나에 해당하는 경우를 말합니다.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
            {[
              '사망을 초래하거나 생명을 위협하는 경우',
              '입원 또는 입원기간의 연장이 필요한 경우',
              '지속적 또는 중대한 불구나 기능저하를 초래하는 경우',
              '선천적 기형 또는 이상을 초래하는 경우',
            ].map((item, index) => (
              <li
                key={index}
                className={cn(textStyles.bodyMd, 'flex items-start text-fg')}
              >
                <span className="mr-2 text-danger">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3: Necessity & Process */}
        <section className="space-y-8">
          <div>
            <h2
              className={cn(
                textStyles.titleMd,
                'mb-4 text-fg border-b border-border pb-2',
              )}
            >
              의약품 이상사례 보고의 필요성
            </h2>
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <p
                className={cn(
                  textStyles.bodyMd,
                  'leading-relaxed text-fg text-justify',
                )}
              >
                의약품은 시판 전 동물시험에 의한 전임상시험과 사람에 대한
                임상시험을 거쳐 시판 허가를 받게 됩니다. 이러한 임상시험은
                관찰기간이 제한되고, 한정된 연구대상자를 대상으로 하기 때문에
                모든 약물이상반응을 파악하는 것은 불가능합니다.
                <br />
                <br />
                따라서{' '}
                <strong className="text-primary-700">시판 후 약물감시</strong>는
                대단히 중요하며, 의약품 사용시 나타나는 각종 이상사례를
                수집·평가하여 안전대책을 강구함으로써 국민의 안전한 의약품
                사용을 도모할 수 있습니다.
              </p>
            </div>
          </div>

          <div>
            <h2
              className={cn(
                textStyles.titleLg,
                'mb-4 text-fg border-b border-border pb-2',
              )}
            >
              이상사례 보고 후 과정
            </h2>
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <p
                className={cn(
                  textStyles.bodyMd,
                  'leading-relaxed text-fg text-justify',
                )}
              >
                이상사례가 보고되면,{' '}
                <strong className="text-primary-700">
                  한국의약품안전관리원
                </strong>
                에서는 이러한 정보를 체계적으로 수집하고, 보고된 자료 관리를
                통하여 이상사례보고 데이터베이스를 구축합니다.
                <br />
                <br />
                이렇게 축적된 이상사례 데이터베이스를 이용하여 약물이상사례의
                실마리정보를 분석하게 되며, 또한 특정 이상사례에 대해 보다
                체계적으로 평가하거나 심층적인 약물역학연구를 수행합니다. 이를
                통해 의약품 안전성정보를 생산하며, 정부의 위해 관리정책에 대한
                근거를 제공하는 업무를 수행하고 있습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Reporting Methods (Updated) */}
        <section>
          <h2
            className={cn(
              textStyles.titleLg,
              'mb-6 text-fg border-b border-border pb-2',
            )}
          >
            이상사례 보고 방법
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Online Reporting */}
            <div
              className={cn(
                'flex flex-col items-center text-center p-8 rounded-xl',
                'bg-surface border border-border shadow-sm',
                'hover:shadow-md transition-shadow duration-200',
              )}
            >
              <div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center mb-6',
                  'bg-primary-50 text-primary-700',
                )}
              >
                <MdComputer size={36} />
              </div>
              <h3 className={cn(textStyles.titleMd, 'text-fg mb-3')}>
                온라인 보고
              </h3>
              <p className={cn(textStyles.bodySm, 'mb-8 leading-relaxed')}>
                의약품안전나라 의약품통합정보시스템을
                <br />
                이용하실 수 있습니다.
              </p>
              <a
                href="https://kaers.drugsafe.or.kr/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center justify-center',
                  'bg-primary text-white font-bold',
                  'px-8 py-3 rounded-lg shadow-sm',
                  'hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5',
                  'transition-all duration-200 w-full md:w-auto',
                  textStyles.bodyMd,
                )}
              >
                온라인 보고 바로가기 &rarr;
              </a>
            </div>

            {/* Phone Reporting */}
            <div
              className={cn(
                'flex flex-col items-center text-center p-8 rounded-xl',
                'bg-surface border border-border shadow-sm',
                'hover:shadow-md transition-shadow duration-200',
              )}
            >
              <div
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center mb-6',
                  'bg-primary-50 text-primary-700',
                )}
              >
                <MdPhoneInTalk size={36} />
              </div>
              <h3 className={cn(textStyles.titleMd, 'text-fg mb-3')}>
                전화 보고
              </h3>
              <p className={cn(textStyles.bodySm, 'mb-8 leading-relaxed')}>
                한국의약품안전관리원 대표전화
                <br />
                <span className="font-bold text-fg">1644-6223</span> (또는
                14-3330)으로 보고하실 수 있습니다.
              </p>
              <a
                href="tel:1644-6223"
                className={cn(
                  'inline-flex items-center justify-center',
                  'bg-white border border-border text-fg font-bold',
                  'px-8 py-3 rounded-lg shadow-sm',
                  'hover:bg-muted hover:border-primary-200 hover:-translate-y-0.5',
                  'transition-all duration-200 w-full md:w-auto',
                  textStyles.bodyMd,
                )}
              >
                전화 걸기 1644-6223
              </a>
            </div>
          </div>
        </section>

        {/* Section 5: Items to Report */}
        <section>
          <h2
            className={cn(
              textStyles.titleLg,
              'mb-4 text-fg border-b border-border pb-2',
            )}
          >
            보고 시 작성 항목
          </h2>
          <p className={cn(textStyles.bodyMd, 'mb-6')}>
            부작용 보고를 위해 사이트에 접속하면 아래와 같은 항목들을 입력하게
            됩니다.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: '환자 기본정보',
                desc: '연령, 성별, 상태 등',
              },
              {
                title: '의약품 정보',
                desc: '제품명, 성분명, 투여 방법·기간',
              },
              {
                title: '이상사례 내용',
                desc: '발현 시점, 증상, 결과 등',
              },
              {
                title: '보고자 정보',
                desc: '의사·약사·간호사·환자·보호자 등',
              },
              {
                title: '첨부자료',
                desc: '검사결과, 진단서 등 필요 시 첨부 가능',
              },
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex flex-col p-4 rounded bg-muted/30 border border-border/50"
              >
                <strong
                  className={cn(
                    textStyles.bodyMd,
                    'font-bold text-primary-700 mb-1',
                  )}
                >
                  {item.title}
                </strong>
                <span className={cn(textStyles.bodySm)}>{item.desc}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageLayout>
  );
}
