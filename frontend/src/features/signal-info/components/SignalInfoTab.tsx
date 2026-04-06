import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SubTitle from '@/components/ui/SubTitle';
import ItemTitle from '@/components/ui/ItemTitle';
import LinkButton from '@/components/ui/LinkButton';

export default function SignalInfoInfoTab() {
  return (
    <div className="space-y-12">
      <Card variant="primary">
        <div className="grid grid-cols-1 gap-8">
          <Card variant="outlined">
            <ItemTitle className="mb-3 flex items-center gap-2">
              🔍 실마리정보 (Signal)
            </ItemTitle>
            <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>
              약물과 이상사례 간{' '}
              <strong className="text-primary">새로운 잠재적 인과관계</strong>{' '}
              또는 알려진 관계의 새로운 측면을 제시하는 정보로, 분석할 만한
              가치가 있는 정보를 의미합니다. 관계가 반드시 유해한 것에만
              국한되지는 않습니다.
            </p>
          </Card>

          <Card variant="outlined">
            <ItemTitle className="mb-3 flex items-center gap-2">
              📢 실마리 소식지
            </ItemTitle>
            <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>
              KAERS(한국의약품안전관리원 이상사례 보고시스템) 데이터를 분석하여,
              식약처가 안전성 검토 및 조치를 진행한 결과를
              <strong className="text-primary">
                의료인과 국민에게 제공하는 공식 소식지
              </strong>
              입니다.
            </p>
          </Card>
        </div>
      </Card>

      <section>
        <div className="flex justify-center items-end mb-12 relative h-72">
          <div className="absolute bottom-0 w-72 h-72 bg-gray-100 rounded-full border border-gray-200" />
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(16rem-20px)] text-center text-black z-30">
            <p className="font-semibold text-lg">부작용</p>
            <p className="text-sm opacity-90">Side Effect</p>
          </div>

          <div className="absolute bottom-0 w-56 h-56 bg-sky-100 rounded-full border border-gray-200" />
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(12rem-20px)] text-center text-black z-30">
            <p className="font-semibold text-base">이상사례</p>
            <p className="text-sm opacity-90">Adverse Event</p>
          </div>

          <div className="absolute bottom-0 w-40 h-40 bg-sky-600 rounded-full border border-gray-200" />
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(5rem-20px)] text-center text-white z-30">
            <p className="font-semibold text-sm">약물이상반응</p>
            <p className="text-xs opacity-90">Adverse Drug Reaction</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card padding="lg" className="bg-gray-100 border border-gray-200">
            <ItemTitle className="mb-2">1. 부작용</ItemTitle>
            <p className={cn(textStyles.bodyMd, 'mb-1 text-muted-fg')}>
              Side Effect
            </p>
            <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>
              의약품 등을 정상적인 용량에 따라 투여할 경우 발생하는{' '}
              <strong>모든 의도되지 않은 효과</strong> (유익한 효과 포함)
            </p>
          </Card>

          <div className="bg-sky-100 p-6 rounded-xl border border-sky-100">
            <ItemTitle className="mb-2">2. 이상사례 (AE)</ItemTitle>
            <p className={cn(textStyles.bodyMd, 'mb-1 text-muted-fg')}>
              Adverse Event
            </p>
            <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>
              의약품 투여 중 발생한 바람직하지 않은 징후, 증상, 질병.
              <span
                className={cn(textStyles.bodySm, 'block mt-1 text-primary-700')}
              >
                *약물과 반드시 인과관계가 입증된 것은 아님
              </span>
            </p>
          </div>

          <div className="bg-sky-600 p-6 rounded-xl text-white shadow-md">
            <ItemTitle className="mb-2">3. 약물이상반응 (ADR)</ItemTitle>
            <p className={cn(textStyles.bodyMd, 'mb-1')}>
              Adverse Drug Reaction
            </p>
            <p className="text-white leading-relaxed">
              정상적인 용법에도 불구하고 발생한 해롭고 예기치 못한 반응.
              인과관계가 어느 정도 입증된 경우를 말함.
            </p>
          </div>
        </div>
      </section>

      <section>
        <SubTitle className="mb-6 pb-2 border-b border-gray-200">
          실마리정보 확인 및 관련 사이트
        </SubTitle>

        <Card variant="muted" padding="lg">
          <ItemTitle className="mb-4">📢 확인 경로 안내</ItemTitle>
          <ol className="space-y-4">
            <li className="flex gap-3 items-start">
              <span
                className={cn(
                  textStyles.uiLg,
                  'flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold',
                )}
              >
                1
              </span>
              <p className="text-gray-700 mt-0.5">
                <strong>한국의약품안전관리원(KIDS)</strong> 홈페이지 접속 → 상단
                메뉴 <strong>[안전정보공개]</strong> 선택
              </p>
            </li>
            <li className="flex gap-3 items-start">
              <span
                className={cn(
                  textStyles.uiLg,
                  'flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold',
                )}
              >
                2
              </span>
              <p className="text-gray-700 mt-0.5">
                안전정보공개 메뉴 내 <strong>[KIDS 실마리정보 알리미]</strong>{' '}
                클릭 → 의약품안전나라 자동 연동
              </p>
            </li>
            <li className="flex gap-3 items-start">
              <span
                className={cn(
                  textStyles.uiLg,
                  'flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold',
                )}
              >
                3
              </span>
              <p className="mt-0.5">
                의약품안전나라 사이트에서{' '}
                <strong>최신 실마리 정보 및 소식지 PDF</strong> 확인
              </p>
            </li>
          </ol>
        </Card>

        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <LinkButton
            href="https://nedrug.mfds.go.kr/bbs/3"
            text="의약품안전나라 실마리정보 바로가기"
          />
          <LinkButton
            href="https://www.drugsafe.or.kr/"
            text="한국의약품안전관리원 홈"
            variant="white"
          />
        </div>
      </section>
    </div>
  );
}
