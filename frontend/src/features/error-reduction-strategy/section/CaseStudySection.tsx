import { Card } from '@/components/ui/Card';
import Callout from '@/components/ui/Callout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function CaseStudySection() {
  return (
    <div className="flex flex-col gap-10">
      {/* 사례 */}
      <section className="space-y-4">
        <Card
          variant="outlined"
          padding="lg"
          className="shadow-sm space-y-3 border-danger-200"
        >
          <p className={cn(textStyles.bodyMd, 'font-semibold text-danger-700')}>
            📌 사례
          </p>
          <div
            className={cn(
              textStyles.bodyMd,
              'text-fg leading-relaxed space-y-2',
            )}
          >
            <p>
              38세 여성이 20분간 붉고 가려운 발진과 얼굴 부종으로 내원. 심각한
              알레르기 반응의 과거력이 있음.
            </p>
            <p>
              간호사는 10ml 주사기에{' '}
              <span className="font-semibold">
                1:10,000ml의 아드레날린(에피네프린)
              </span>
              을 빼내어 의사가 요청에 대비하여 즉시 사용할 수 있도록 침대
              머리맡에 둠 (총 1mg).
            </p>
            <p>그러는 동안 의사는 정맥 캐뉼라를 삽입.</p>
            <p>
              의사는 간호사가 만든 깨끗한 액체가 담긴 주사기 10ml를 보고{' '}
              <span className="font-semibold text-danger-700">
                그것이 생리 식염수라고 추정함.
              </span>
            </p>
            <p className="text-muted-fg italic">
              이 기간에 의사와 간호사 사이에 의사소통이 없음.
            </p>
            <p>
              의사는 생리식염수로 라인을 슈팅(flush)하고 있다고 생각하며{' '}
              <span className="font-semibold text-danger-700">
                아드레날린(에피네프린) 10ml를 정맥 투여.
              </span>
            </p>
            <p>
              환자는 갑자기 불안하며 빈맥이 생기고 맥박이 약해지고 의식이
              소실됨. 심실 빈맥이 발견되었으나 소생되었고 다행히 회복이 잘
              되었다.
            </p>
          </div>

          <div className="pt-3 border-t border-danger-200">
            <p
              className={cn(
                textStyles.captionMd,
                'text-danger-700 font-semibold',
              )}
            >
              ⇒ 아나필락시스에서 아드레날린(에피네프린)의 권장량은{' '}
              <span className="underline">0.3~0.5mg IM</span>이나, 이 환자는{' '}
              <span className="underline">1mg IV</span>를 투약
            </p>
          </div>
        </Card>
      </section>

      {/* 원인 분석 */}
      <section className="space-y-4">
        <p className={cn(textStyles.titleMd, 'text-fg')}>원인 분석</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              icon: '🔴',
              label: '추측',
              desc: '주사기 내용물을 확인하지 않고 생리식염수라고 추정',
            },
            {
              icon: '🔴',
              label: '의사소통의 부재',
              desc: '의사와 간호사 사이에 아무런 소통 없음',
            },
            {
              icon: '🔴',
              label: '부적절한 라벨',
              desc: '주사기에 내용물 표시 없음',
            },
            {
              icon: '🔴',
              label: '확인 습관 부재',
              desc: '약물 성분을 확인·재확인하지 않고 투약',
            },
            {
              icon: '🔴',
              label: '고위험약 관리 부족',
              desc: '에피네프린의 고위험 특성에 대한 주의 부족',
            },
          ].map(({ icon, label, desc }) => (
            <div
              key={label}
              className="flex gap-3 rounded-xl border border-danger-200 bg-danger-50 p-4"
            >
              <span className="text-xl shrink-0">{icon}</span>
              <div>
                <p
                  className={cn(
                    textStyles.bodyMd,
                    'font-semibold text-danger-800',
                  )}
                >
                  {label}
                </p>
                <p
                  className={cn(
                    textStyles.captionMd,
                    'text-danger-700 mt-0.5 leading-relaxed',
                  )}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 교훈 */}
      <section className="space-y-4">
        <p className={cn(textStyles.titleMd, 'text-fg')}>이 사례에서 배울 점</p>
        <div className="space-y-3">
          {[
            {
              icon: '✅',
              text: '약물이 무엇인지 확실히 알지 못하는 한 절대 투약하지 않을 것; 라벨이 없는 주사기를 의심할 것',
            },
            {
              icon: '✅',
              text: '직접 약을 조제하지 않은 경우 라벨이 부착되지 않은 주사기를 사용하지 마십시오. → 모든 주사기에 라벨 표시',
            },
            {
              icon: '✅',
              text: '의사소통 — 간호사와 의사가 서로의 행동을 계속 알려준다. 예) 간호사: "아드레날린 빼내는 중입니다"',
            },
            {
              icon: '✅',
              text: '모든 약물을 투약하기 전 확인하는 습관을 기른다. 5Rs(8Rs) 확인. 예) "이 주사기에 무엇이 들어있나요?"',
            },
          ].map(({ icon, text }, i) => (
            <Callout key={i} variant="success" icon={icon}>
              <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>{text}</p>
            </Callout>
          ))}
        </div>
      </section>
    </div>
  );
}
