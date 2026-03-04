import type { WhoArea } from '../types';

export const WHO_AREAS: WhoArea[] = [
  {
    key: 'highRisk',
    title: '1. 고위험 상황 (High-risk situations)',
    subtitle:
      '특정 약물(고위험약물)에서 투약오류 및 그로 인한 위해 발생 위험이 높습니다.',
    bullets: [
      '고위험 상황을 인지하고 이해하는 것이 중요합니다.',
      '도구·기술은 고위험 경고 약물을 취급·투여하는 의료진을 지원할 수 있습니다.',
      '환자의 인식과 이해도를 높이는 데에도 기여할 수 있습니다.',
    ],
  },
  {
    key: 'polypharmacy',
    title: '2. 다약제 복용 (Polypharmacy)',
    subtitle:
      '다약제 복용에서는 정책, 절차 및 프로토콜의 표준화가 매우 중요합니다.',
    bullets: [
      '초기 처방 단계부터 정기적인 약물 검토에 이르기까지 적용됩니다.',
      '기술은 환자의 인식과 약물 사용 과정에 대한 이해를 향상시켜 유용한 지원 수단이 될 수 있습니다.',
    ],
  },
  {
    key: 'transition',
    title: '3. 치료 전환기 (Transition of care)',
    subtitle:
      '치료 전환 과정은 의사소통 오류의 가능성을 높여 심각한 투약오류로 이어질 수 있습니다.',
    bullets: [
      '효과적인 의사소통이 매우 중요합니다.',
      '치료 전·후 약물을 공식적으로 비교하는 절차(약물 조정, medication reconciliation)가 포함됩니다.',
    ],
  },
] as const;
