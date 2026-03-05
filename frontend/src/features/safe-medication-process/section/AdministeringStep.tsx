import * as React from 'react';
import type { StepTheme } from '../types';
import { InfoList } from '../components/StepCommon';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { FinalBlock, FlowBlock, FlowWrap } from '../components/FlowLayout';
import IVRateTip from '../components/IVRateTip';
import { MdCampaign } from 'react-icons/md';
import { Card } from '@/components/ui/Card';
import { RightCard } from '@/features/safe-medication-process/components/FiveRightCard';
import { FIVE_RIGHTS } from '@/features/safe-medication-process/data/fiveRights';

const ADMIN_CONSIDERATIONS: React.ReactNode[] = [
  '즉시 사용할 수 있는 형태로 약물을 얻는 것 (계수, 계산, 혼합, 라벨 부착 등 준비 과정)',
  <>
    <span className="font-semibold text-danger">알레르기 확인</span>
  </>,
  <>
    <span className="font-semibold text-danger">
      적절한 환자에게 적절한 용량, 올바른 경로를 통해 적절한 시간에 적절한 약물
      투약
    </span>
  </>,
  '기록',
];

const EIGHT_RIGHTS: React.ReactNode[] = [
  <>
    <span className="font-semibold">1. 올바른 약물</span>: 약물 라벨을 확인하고
    투여할 약물과 형태가 처방된 약물인지 확인
  </>,
  <>
    <span className="font-semibold">2. 올바른 환자</span>: 환자 식별자 두 개를
    확인하여 환자의 신원을 확인
  </>,
  <>
    <span className="font-semibold">3. 올바른 용량</span>: 투여할 약품과 제형이
    환자에게 적합한지 확인하고 약품 라벨 확인
  </>,
  <>
    <span className="font-semibold">4. 올바른 시간</span>: 약물이 정확한 시간과
    빈도로 투여되는지 확인
  </>,
  <>
    <span className="font-semibold">5. 올바른 경로</span>: 약물을 투여하는
    경로가 처방에서 지정한 것이며 환자에게 적합한지 확인
  </>,
  <>
    <span className="font-semibold">6. 올바른 이유</span>: 처방된 약이 환자의
    상태를 치료하는 데 적절한지 확인
  </>,
  <>
    <span className="font-semibold">7. 올바른 반응</span>: 투여된 약물에 대한
    환자의 반응을 모니터
  </>,
  <>
    <span className="font-semibold">8. 올바른 문서화</span>: 환자의 의료 기록에
    투여된 약물, 환자의 반응(환자 모니터링), 기타 간호 수행을 완전하고 정확하게
    문서화
  </>,
];

function FiveRightsSection({ theme }: { theme: StepTheme }) {
  return (
    <div className={cn('p-6 mt-8')}>
      <p className={cn(textStyles.titleSm, 'text-fg mb-4 text-center')}>
        예방 가능한 오류를 줄이기 위해,
        <br /> 간호사가 투약 전 반드시 확인해야 할 5가지 기본 원칙입니다.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FIVE_RIGHTS.map((item) => (
          <RightCard key={item.title} item={item} theme={theme} />
        ))}
      </div>

      <Card variant="primary" className="mt-6">
        <p
          className={cn(
            textStyles.titleSm,
            'text-info flex items-center justify-center gap-2',
          )}
        >
          <MdCampaign size={20} />
          Speak Up for Safety
        </p>
        <p className={cn(textStyles.bodyMd, 'mt-1 text-center')}>
          의약품 처방이나 조제 내용이 의심스럽다면, 투약하기 전 반드시 다시
          확인하십시오.<br></br>
          불확실할 때는 멈추는 것이 가장 큰 용기입니다.
        </p>
      </Card>
    </div>
  );
}

export default function AdministeringStep({ theme }: { theme: StepTheme }) {
  return (
    <>
      <FlowWrap>
        <FlowBlock title="투여단계 고려사항">
          <InfoList items={ADMIN_CONSIDERATIONS} />
        </FlowBlock>

        <FlowBlock title="투여원칙 8 Rights">
          <InfoList items={EIGHT_RIGHTS} />
        </FlowBlock>
        <FinalBlock
          title="투약 안전 수칙(5 Rights)"
          theme={theme}
          className="max-w-6xl"
        >
          <FiveRightsSection theme={theme} />
        </FinalBlock>
      </FlowWrap>

      <IVRateTip />
    </>
  );
}
