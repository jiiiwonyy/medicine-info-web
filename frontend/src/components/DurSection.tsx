import type { DurData } from '@/types/dur';

interface Props {
  dur: DurData;
}

const LABEL_MAP: Record<keyof DurData, string> = {
  interactions: '병용금기',
  age: '연령금기',
  pregnancy: '임부금기',
};

const HIDDEN_KEYS = ['연번'];

export default function DurSection({ dur }: Props) {
  return (
    <div className="space-y-10 mt-8">
      {Object.entries(dur).map(([label, list]) =>
        list.length > 0 ? (
          <div key={label}>
            <h2
              id={
                label === 'interactions'
                  ? 'dur-interactions'
                  : label === 'age'
                    ? 'dur-age'
                    : 'dur-pregnancy'
              }
              className="text-green-700 font-bold text-lg mb-4"
            >
              📌 {LABEL_MAP[label as keyof DurData]}
            </h2>

            <div className="overflow-x-auto">
              <table className="table-auto w-full text-sm border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    {Object.keys(list[0])
                      .filter((key) => !HIDDEN_KEYS.includes(key))
                      .map((key) => (
                        <th
                          key={key}
                          className="border border-gray-200 px-3 py-2 text-left font-medium"
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {list.map((item, idx) => {
                    const entries = Object.entries(item).filter(
                      ([key]) => !HIDDEN_KEYS.includes(key),
                    );
                    return (
                      <tr key={idx} className="odd:bg-white even:bg-gray-50">
                        {entries.map(([, value], i) => (
                          <td
                            key={i}
                            className="border border-gray-200 px-3 py-2"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
}
