import type { DurData } from '@/types/dur';

export const LABEL_MAP: Record<keyof DurData, string> = {
  interactions: '병용금기',
  age: '연령금기',
  pregnancy: '임부금기',
};

export const HIDDEN_KEYS = ['id'] as const;

export const COLUMN_LABELS: Record<string, string> = {
  ingredient_1: '유효성분 1',
  ingredient_2: '유효성분 2',
  remarks: '비고',
  approval_info: '허가사항',

  ingredient_name: '성분명',
  age_criteria: '연령기준',
  dosage_form: '제형',

  pregnancy_risk_grade: '임부금기 등급',
};

export type DurKey = keyof DurData;

export const SECTION_THEME: Record<
  DurKey,
  {
    bar: string;
    bg: string;
    title: string;
    calloutVariant: 'info' | 'note' | 'warning';
  }
> = {
  interactions: {
    bar: 'bg-info-600',
    bg: 'bg-info-50/20',
    title: 'text-info-700',
    calloutVariant: 'info',
  },
  age: {
    bar: 'bg-warning-600',
    bg: 'bg-warning-50/20',
    title: 'text-warning-700',
    calloutVariant: 'note',
  },
  pregnancy: {
    bar: 'bg-danger-600',
    bg: 'bg-danger-50/40',
    title: 'text-danger-700',
    calloutVariant: 'warning',
  },
};

export const INFO_MAP: Record<keyof DurData, React.ReactNode> = {
  interactions: (
    <>
      "병용금기 성분"이란 두 가지 이상의 유효성분을 함께 사용하는 경우
      치료효과의 변화 또는 심각한 부작용 발생 등의 우려가 있어 동시에 사용하지
      않아야 하는 유효성분의 조합을 말함.
    </>
  ),
  age: (
    <>
      "특정 연령대 금기 성분"이란 소아, 노인 등 특정한 연령대의 환자가 사용함에
      있어 안전성이 확보되지 않았거나 심각한 부작용 발생 등의 우려가 있어
      사용하지 않아야 하는 유효성분을 말함.
    </>
  ),
  pregnancy: (
    <>
      "임부금기 성분"이란 태아에게 심각한 위해성(기형 또는 태아독성 등)을 유발할
      가능성이 높아 임부에게 사용하는 것이 권장되지 않는 유효성분을 의미함.
      <div className="mt-2 space-y-1 pl-4">
        <div className="flex">
          <span className="w-6 shrink-0">가.</span>
          <span>
            1등급 : 태아 위해성이 명확하며 약물 사용의 위험성이 치료 유익성을
            상회 → <b>원칙적으로 사용 금지</b>
          </span>
        </div>
        <div className="flex">
          <span className="w-6 shrink-0">나.</span>
          <span>
            2등급 : 태아 위해성이 나타날 수 있으며 약물 사용의 위험성이 유익성을
            상회 → <b>원칙적으로 사용 금지</b>
          </span>
        </div>
      </div>
    </>
  ),
};
