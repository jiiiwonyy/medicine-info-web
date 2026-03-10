import type { RightItem } from '../types';

export const FIVE_RIGHTS: RightItem[] = [
  {
    icon: '🧑',
    title: '1. 정확한 환자 (Right Patient)',
    description:
      '환자의 이름을 개방형으로 질문하고, 등록번호(팔찌)를 반드시 확인하십시오. 동명이인에 주의해야 합니다.',
    tip: '환자의 이름을 개방형으로 질문하고, 등록번호(팔찌)를 반드시 확인하십시오. 동명이인에 주의해야 합니다.',
  },
  {
    icon: '💊',
    title: '2. 정확한 약 (Right Drug)',
    description:
      '처방전과 약품 라벨을 3번 확인(꺼낼 때, 준비할 때, 넣을 때)하십시오.',
    tip: '약품의 이름, 성분, 유효기간, 개봉일자를 확인합니다. 유사한 이름의 약물(LASA)에 주의하세요.',
  },
  {
    icon: '⚖️',
    title: '3. 정확한 용량 (Right Dose)',
    description:
      '용량 계산이 정확한지 재확인하십시오. 고위험 약물은 동료와 이중 확인(Double Check)이 필요합니다.',
    tip: '소수점 위치, 단위(mg, g, mcg) 변환에 특히 주의하십시오.',
  },
  {
    icon: '⏰',
    title: '4. 정확한 시간 (Right Time)',
    description:
      '약물의 반감기와 치료 효과를 고려하여 정해진 시간에 투여하십시오.',
    tip: '식전/식후, 투약 간격을 엄수하고 누락되지 않도록 기록합니다.',
  },
  {
    icon: '💉',
    title: '5. 정확한 경로 (Right Route)',
    description:
      '처방된 투여 경로(IV, IM, PO 등)가 맞는지 확인하고, 해당 경로에 적합한 제형인지 확인하십시오.',
    tip: '주사 부위의 상태를 확인하고, 경구약을 임의로 분쇄하지 마십시오.',
  },
];
