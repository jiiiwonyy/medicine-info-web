import * as React from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { StepTheme } from './types';
import { InfoList } from './StepCommon';
import { FlowWrap, FlowBlock, FinalBlock } from './FlowLayout';

const PRESCRIBING_CONSIDERATIONS: React.ReactNode[] = [
  <>
    주어진 임상적 상황에서 알레르기와 같은{' '}
    <span className="font-semibold">환자 개인 요소</span>를 고려한 적합한
    약물인가
  </>,
  <>
    <span className="font-semibold">
      투약 경로, 용량, 시간과 약물 요법(regimen)이 정확
    </span>
    한가
  </>,
  <div className="space-y-1">
    <div>
      투약 계획의 세부사항에 대한{' '}
      <span className="font-semibold">의사소통</span>
    </div>
    <ul className="list-[circle] pl-5 space-y-1">
      <li>약물을 처방·투약하는 사람(서면 전달 및/또는 구두)</li>
      <li>환자</li>
    </ul>
  </div>,
  <>
    <span className="font-semibold">투약기록</span>
  </>,
];

const TOP_10_PRESCRIBING_ERRORS: React.ReactNode[] = [
  '처방 누락, 지연',
  '혈액응고방지제 (헤파린, 와파린, DOAC/NOAC)',
  '오피오이드 (diamorphine, morphine, codeine, fentanyl, oxycodone, methadone)',
  '인슐린 용량 확인',
  'NSAID (ADR 입원의 30%: 출혈, 심경색, 뇌졸중, 신부전)',
  '혈액검사 누락, 지연 (ACEi, 디곡신, lithium, methotrexate 등)',
  '알러지 (특히 항생제)',
  '약물 상호 작용 무시 (디곡신 + 클라리스로마이신)',
  'Loading dose (아미오대론)',
  '산소 (COPD, PCO2)',
];

const PRESCRIBING_CHECKLIST: React.ReactNode[] = [
  '1. 환자확인',
  '2. 적응증, 용량, 빈도, 투약 방법, 속도',
  '3. 중복, 병원 규정 상충',
  '4. 알러지(과거력, 가능성), 금기',
  '5. 약품-약품, 약품-음식 상호 작용',
  '6. 체중, 소아, 노인',
  '7. 기타: titrating, tapering, 또는 range orders',
];

export default function PrescribingStep({ theme }: { theme: StepTheme }) {
  return (
    <FlowWrap>
      <FlowBlock title="처방단계 고려사항">
        <InfoList items={PRESCRIBING_CONSIDERATIONS} />
      </FlowBlock>

      <FlowBlock title="상위 10가지 처방 오류">
        <InfoList items={TOP_10_PRESCRIBING_ERRORS} />
      </FlowBlock>

      <FinalBlock title="처방 확인 체크리스트" theme={theme}>
        <ol className="space-y-3">
          {PRESCRIBING_CHECKLIST.map((item, idx) => (
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
