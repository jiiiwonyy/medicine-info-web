import type { DurData } from '@/types/dur';
import Callout from './ui/Callout';

interface Props {
  dur: DurData;
}

const LABEL_MAP: Record<keyof DurData, string> = {
  interactions: '병용금기',
  age: '연령금기',
  pregnancy: '임부금기',
};

const HIDDEN_KEYS = ['id'];

const COLUMN_LABELS: Record<string, string> = {
  ingredient_1: '유효성분 1',
  ingredient_2: '유효성분 2',
  remarks: '비고',
  approval_info: '허가사항',

  ingredient_name: '성분명',
  age_criteria: '연령기준',
  dosage_form: '제형',

  pregnancy_risk_grade: '임부금기 등급',
};

type DurRow = DurData[keyof DurData][number];

// ✅ 2번 방식: 섹션별 패널 테마(왼쪽 바 + 배경 + 타이틀색 + callout variant)
type DurKey = keyof DurData;

const SECTION_THEME: Record<
  DurKey,
  {
    bar: string;
    bg: string;
    title: string;
    calloutVariant: 'info' | 'note' | 'warning';
    theadBg: string;
  }
> = {
  interactions: {
    bar: 'bg-sky-500',
    bg: 'bg-sky-50/40',
    title: 'text-sky-800',
    calloutVariant: 'info',
    theadBg: 'bg-sky-50',
  },
  age: {
    bar: 'bg-amber-500',
    bg: 'bg-amber-50/40',
    title: 'text-amber-800',
    calloutVariant: 'note',
    theadBg: 'bg-amber-50',
  },
  pregnancy: {
    bar: 'bg-rose-500',
    bg: 'bg-rose-50/40',
    title: 'text-rose-800',
    calloutVariant: 'warning',
    theadBg: 'bg-rose-50',
  },
};

// 각 DUR 섹션 설명 텍스트
const INFO_MAP: Record<keyof DurData, React.ReactNode> = {
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

export default function DurSection({ dur }: Props) {
  const sections: Array<{ key: keyof DurData; list: DurRow[] }> = [
    { key: 'interactions', list: (dur.interactions ?? []) as DurRow[] },
    { key: 'age', list: (dur.age ?? []) as DurRow[] },
    { key: 'pregnancy', list: (dur.pregnancy ?? []) as DurRow[] },
  ];

  return (
    <div className="space-y-10 mt-8">
      {sections.map(({ key, list }) => {
        if (list.length === 0) return null;

        const sectionId =
          key === 'interactions'
            ? 'dur-interactions'
            : key === 'age'
              ? 'dur-age'
              : 'dur-pregnancy';

        const theme = SECTION_THEME[key];

        const columns = Object.keys(list[0] as Record<string, unknown>).filter(
          (k) => !HIDDEN_KEYS.includes(k),
        );

        return (
          // ✅ 섹션 패널 래퍼 + 왼쪽 컬러바
          <section key={key} className={`rounded-2xl ${theme.bg}`}>
            <div className="flex gap-4">
              <div className={`w-1.5 rounded-l-2xl ${theme.bar}`} />
              <div className="flex-1 py-4 pr-4">
                <h2
                  id={sectionId}
                  className={`scroll-mt-24 font-bold text-lg mb-3 ${theme.title}`}
                >
                  {LABEL_MAP[key]}
                </h2>

                <Callout
                  variant={theme.calloutVariant}
                  title={`${LABEL_MAP[key]}란?`}
                >
                  {INFO_MAP[key]}
                </Callout>

                <div className="overflow-x-auto mt-3">
                  <table className="table-auto w-full text-sm border border-gray-200 bg-white rounded-xl overflow-hidden">
                    <thead className={theme.theadBg}>
                      <tr>
                        {columns.map((col) => (
                          <th
                            key={col}
                            className="border border-gray-200 px-3 py-2 text-left font-medium"
                          >
                            {COLUMN_LABELS[col] ?? col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item: DurRow, idx) => {
                        const entries = Object.entries(item).filter(
                          ([k]) => !HIDDEN_KEYS.includes(k),
                        );
                        return (
                          <tr
                            key={idx}
                            className="odd:bg-white even:bg-gray-50"
                          >
                            {entries.map(([k, value]) =>
                              columns.includes(k) ? (
                                <td
                                  key={k}
                                  className="border border-gray-200 px-3 py-2"
                                >
                                  {String(value ?? '')}
                                </td>
                              ) : null,
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
