import { Card } from '@/components/ui/Card';
import Callout from '@/components/ui/Callout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SectionHeader from '@/features/error-reduction-strategy/components/SectionHeader';
import BulletList from '@/features/error-reduction-strategy/components/BulletList';
import { EIGHT_RIGHTS } from '@/features/error-reduction-strategy/data/rightsData';

export default function SafeMedicationSection() {
  return (
    <div className="flex flex-col gap-10">
      {/* 1. 투약 오류 발생 상황 */}
      <section className="space-y-4">
        <SectionHeader
          number={1}
          title="어떤 상황에서 투약 오류가 발생 가능?"
        />
        <Card variant="outlined" padding="lg" className="shadow-sm">
          <BulletList
            items={[
              '경험 부족',
              '서두름',
              '두 가지 일을 동시에 하는 것',
              '방해',
              '피로, 지루함, "자율주행(automatic pilot)" 상태여서 확인 및 재확인 실패',
              '확인 및 재확인 습관의 부재',
              '팀워크 및/또는 동료 간의 의사소통 부족',
              '기억력 보조 도구의 활용을 주저',
            ]}
          />
        </Card>
      </section>

      {/* 2. 맞춤 처방 */}
      <section className="space-y-4">
        <SectionHeader number={2} title="환자 개개인에 맞는 맞춤 처방" />
        <p className={cn(textStyles.bodyLg, 'text-muted-fg')}>
          투약 과거력을 완전히 사정하는 것을 배우고 실천
        </p>
        <Card variant="outlined" padding="lg" className="shadow-sm">
          <BulletList
            items={[
              '알레르기',
              '이환 질환 (간과 신장 손상)',
              '다른 약물',
              '임신과 모유수유',
              '환자의 체구 (size)',
            ]}
          />
        </Card>
      </section>

      {/* 3. 고위험의약품 */}
      <section className="space-y-4">
        <SectionHeader
          number={3}
          title="고위험의약품을 숙지하고 예방조치 취하기"
        />
        <Card variant="outlined" padding="lg" className="shadow-sm">
          <BulletList
            items={[
              '다른 약물과의 다중 상호작용',
              '부작용이 강한 약',
              '복잡한 용량 및 관찰 시간표',
            ]}
          />
        </Card>
      </section>

      {/* 4. 처방약 숙지 */}
      <section className="space-y-4">
        <SectionHeader number={4} title="처방하는 약 완전히 숙지" />
        <Card variant="outlined" padding="lg" className="shadow-sm">
          <BulletList
            items={[
              '복용 약물의 이름, 용량, 경로, 빈도, 지속 시간을 확인',
              '최근 중단한 약물 확인',
              '처방전 없이 살 수 있는 의약품, 영양보조제와 대체의약품 확인',
              {
                text: '환자가 실제 복용하는 것이 목록과 확인',
                subItems: [
                  '이동할 시(transitions of care) 특히 확인',
                  '입원 및 퇴원 시 약물 조정 실천',
                ],
              },
              '익숙하지 않은 약물 확인',
              {
                text: '약물 상호작용, 중단 가능한 약물이나 부작용을 일으킬 수 있는 약물 고려',
                subItems: [
                  '적응증, 금기, 부작용, 특별한 주의사항, 용량 및 투약, 약물 요법(regimen) 포함',
                ],
              },
            ]}
          />
        </Card>
      </section>

      {/* 5. 8 Rights */}
      <section className="space-y-4">
        <SectionHeader number={5} title="기억력 보조 도구 사용 — 5Rs → 8Rs" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EIGHT_RIGHTS.map(({ num, label }) => (
            <div
              key={num}
              className="flex flex-col items-center gap-1 rounded-xl border border-primary-200 bg-primary-50 p-4 text-center"
            >
              <span className={cn(textStyles.captionMd, 'text-primary-400')}>
                {num}
              </span>
              <span className={cn(textStyles.bodyMd, 'font-semibold')}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 확인 습관 */}
      <section className="space-y-4">
        <SectionHeader number={6} title="확인하는 습관 기르기" />
        <Callout variant="warning" icon="⚠️">
          <ul className="space-y-2">
            {[
              '라벨이 부착되지 않은 의약품은 쓰레기통에!',
              '어떤 약인지 100% 알기 전까지 절대 약물을 투여하지 않기',
              '연습은 항구성을 만든다. 완벽한 연습이 완벽을 만든다.',
              '확인하는 습관을 지금 들여라!',
            ].map((item, i) => (
              <li
                key={i}
                className={cn(textStyles.bodyMd, 'flex gap-2 leading-relaxed')}
              >
                <span className="shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Callout>
      </section>

      {/* 7. 환자 참여 */}
      <section className="space-y-4">
        <SectionHeader number={7} title="환자가 적극적으로 참여하도록 유도" />
        <Card variant="outlined" padding="lg" className="shadow-sm">
          <BulletList
            items={[
              {
                text: '신규 약물을 처방할 때 환자에게 다음과 같은 정보를 제공',
                subItems: [
                  '약물의 명칭, 목적 및 작용',
                  '용량, 경로 및 투약 일정',
                  '특별 지침, 지침 및 주의사항',
                  '일반적인 부작용과 상호작용',
                  '약물 관찰 방법',
                ],
              },
              '서면으로 약품과 알레르기 정보를 보관할 것을 권장',
              '의사에게 진찰을 받을 때마다 이 정보를 제시하도록 권장',
            ]}
          />
        </Card>
      </section>

      {/* 8. 투약오류 보고 */}
      <section className="space-y-4">
        <SectionHeader number={8} title="투약오류 보고 및 오류를 통한 학습" />
        <Card variant="outlined" padding="lg" className="shadow-sm">
          <BulletList
            items={[
              '부작용 보고자료 확인',
              '환자안전사고보고자료 확인',
              '환자안전 주의·경보 확인',
            ]}
          />
        </Card>
      </section>
    </div>
  );
}
