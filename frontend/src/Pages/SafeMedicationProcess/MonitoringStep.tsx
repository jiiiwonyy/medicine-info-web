import * as React from 'react';
import type { StepTheme } from './types';
import { InfoList } from './StepCommon';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { FlowWrap, FlowBlock, FinalBlock } from './FlowLayout';

const MONITORING_CONSIDERATIONS: React.ReactNode[] = [
  <>
    약물의 <span className="font-semibold">효과</span>,{' '}
    <span className="font-semibold">적절히 사용</span>되고 있는지, 그리고
    환자에게 <span className="font-semibold">위해를 가하지 않는지</span>를
    결정하기 위해 환자를 관찰하는 것
  </>,
  <>
    <span className="font-semibold">기록</span>
  </>,
];

const MONITORING_ERROR_CAUSES: React.ReactNode[] = [
  '부작용 관찰의 부족',
  '약물이 듣지 않거나 복용을 완료하였을 때(course completed) 약물 미중단',
  '약물 복용 완료(course completed) 전 약물 중단',
  '약물 수치 미측정, 혹은 추적 관찰하지 않음',
  '의사소통 오류',
];

const ADR_MONITORING_POINTS: React.ReactNode[] = [
  <>
    <span className="font-semibold">환자 설명 및 참여</span> 중요
  </>,
  <>
    <span className="font-semibold">환자와 의사소통</span> 중요
  </>,
];

export default function MonitoringStep({ theme }: { theme: StepTheme }) {
  return (
    <FlowWrap>
      <FlowBlock title="관찰단계 고려사항">
        <InfoList items={MONITORING_CONSIDERATIONS} />
      </FlowBlock>

      <FlowBlock title="관찰단계 투약오류 원인">
        <InfoList items={MONITORING_ERROR_CAUSES} />
      </FlowBlock>

      <FinalBlock title="부작용 관찰" theme={theme}>
        <ol className="space-y-3">
          {ADR_MONITORING_POINTS.map((item, idx) => (
            <li
              key={idx}
              className={cn(
                textStyles.bodyMd,
                'flex items-start gap-3 text-fg leading-relaxed',
              )}
            >
              <span
                className={cn(
                  'mt-1 inline-block h-2 w-2 rounded-full',
                  theme.dot,
                )}
              />
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </FinalBlock>
    </FlowWrap>
  );
}
