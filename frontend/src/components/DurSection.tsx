import type { DurData } from '@/types/dur';
import Callout from './Callout';

interface Props {
  dur: DurData;
}

const LABEL_MAP: Record<keyof DurData, string> = {
  interactions: '병용금기',
  age: '연령금기',
  pregnancy: '임부금기',
};

const VARIANT_MAP: Record<keyof DurData, 'info' | 'note' | 'warning'> = {
  interactions: 'info',
  age: 'info',
  pregnancy: 'info',
};

const HIDDEN_KEYS = ['연번'];

type DurRow = DurData[keyof DurData][number];

const INFO_MAP: Record<keyof DurData, React.ReactNode> = {
  interactions: (
    <>
      "병용금기 성분" 이란 두 가지 이상의 유효성분을 함께 사용하는 경우
      치료효과의 변화 또는 심각한 부작용 발생 등의 우려가 있어 동시에 사용하지
      않아야 하는 유효성분의 조합을 말함.
    </>
  ),
  age: (
    <>
      "특정연령대 금기 성분" 이란 소아, 노인 등 특정한 연령대의 환자가 사용함에
      있어 안전성이 확보되지 않았거나 심각한 부작용 발생 등의 우려가 있어
      사용하지 않아야 하는 유효성분을 말한다
    </>
  ),
  pregnancy: (
    <>
      "임부금기 성분"이란 태아에게 매우 심각한 위해성(태아기형 또는 태아독성
      등)을 유발하거나 유발할 가능성이 높아 임부에게 사용하는 것이 권장되지 않는
      유효성분을 말하는 것으로 다음 각 목의 구분에 따라 사용이 금지되는 성분을
      말한다.
      <div className="mt-2 space-y-1 pl-4">
        <div className="flex">
          <span className="w-6 shrink-0">가.</span>
          <span>
            1 등급 : 사람에서 태아에 대한 위해성이 명확하고, 약물사용의 위험성이
            치료 상의 유익성을 상회하는 경우로 <b>원칙적으로 사용금지</b>
          </span>
        </div>
        <div className="flex">
          <span className="w-6 shrink-0">나.</span>
          <span>
            2 등급 : 사람에서 태아에 대한 위해성이 나타날 수 있으며, 약물사용의
            위험성이 치료 상의 유익성을 상회하는 경우로{' '}
            <b>원칙적으로 사용금지</b>.
          </span>
        </div>
      </div>
      다만, 치료 상의 유익성이 약물사용의 잠재적 위험성을 상회하거나 명확한
      임상적 사유가 있어 사용하는 경우에는 예외로 한다
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

        const columns = Object.keys(list[0] as Record<string, unknown>).filter(
          (k) => !HIDDEN_KEYS.includes(k),
        );

        return (
          <div key={key}>
            <h2
              id={sectionId}
              className="scroll-mt-24 text-green-700 font-bold text-lg mb-3"
            >
              📌 {LABEL_MAP[key]}
            </h2>

            <Callout variant={VARIANT_MAP[key]} title={`${LABEL_MAP[key]}란?`}>
              {INFO_MAP[key]}
            </Callout>

            <div className="overflow-x-auto mt-3">
              <table className="table-auto w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="border border-gray-200 px-3 py-2 text-left font-medium"
                      >
                        {col}
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
                      <tr key={idx} className="odd:bg-white even:bg-gray-50">
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
        );
      })}
    </div>
  );
}
