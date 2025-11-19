export default function MedicineDetailRenderer({ data }: { data: any }) {
  if (!data) return null;

  // 1) 문자열 → 그냥 표시
  if (typeof data === 'string') {
    return <p className="whitespace-pre-line">{data}</p>;
  }

  // 2) JSON 배열 → 파싱 구조 렌더링
  if (Array.isArray(data)) {
    return (
      <div className="space-y-4">
        {data.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {section.title && (
              <h3 className="text-md font-semibold">{section.title}</h3>
            )}

            {section.items?.map((item: any, i: number) => {
              // 단순 텍스트
              if (typeof item === 'string') {
                return (
                  <p
                    key={i}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              }

              // 표
              // 표 렌더링 개선 버전
              if (item.type === 'table') {
                const rows = item.data;

                const headerTop = rows[0]; // ["체중 (kg)", "키 (cm)"]
                const headerBottom = rows[1]; // ["150", "160", ...]
                const bodyRows = rows.slice(2);

                return (
                  <table
                    key={i}
                    className="border border-gray-300 text-sm w-full"
                  >
                    <thead>
                      <tr>
                        <th
                          rowSpan={2}
                          className="border border-gray-300 px-2 py-1 bg-gray-50"
                          dangerouslySetInnerHTML={{ __html: headerTop[0] }}
                        />

                        <th
                          colSpan={headerBottom.length}
                          className="border border-gray-300 px-2 py-1 bg-gray-50 text-center"
                          dangerouslySetInnerHTML={{ __html: headerTop[1] }}
                        />
                      </tr>

                      <tr>
                        {headerBottom.map((h, idx) => (
                          <th
                            key={idx}
                            className="border border-gray-300 px-2 py-1 bg-gray-50 text-center"
                            dangerouslySetInnerHTML={{ __html: h }}
                          />
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {bodyRows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className="border border-gray-300 px-2 py-1 text-center"
                              dangerouslySetInnerHTML={{ __html: cell }}
                            />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                );
              }

              return null;
            })}
          </div>
        ))}
      </div>
    );
  }

  return null;
}
