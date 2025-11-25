export default function MedicineDetailRenderer({ data }: { data: any }) {
  if (!data) return null;

  // 문자열일 경우
  if (typeof data === 'string') {
    return <p className="whitespace-pre-line">{data}</p>;
  }

  // JSON 배열일 경우
  if (Array.isArray(data)) {
    return (
      <div className="space-y-4">
        {data.map((section, idx) => (
          <div key={idx} className="space-y-2">
            {section.title && (
              <h3 className="text-md font-semibold">{section.title}</h3>
            )}

            {section.items?.map((item: any, i: number) => {
              // 1) 일반 텍스트
              if (typeof item === 'string') {
                return (
                  <p
                    key={i}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                );
              }

              // 2) HTML TABLE 원본 출력
              if (item.type === 'html-table') {
                return (
                  <div
                    key={i}
                    className="overflow-x-auto my-4"
                    dangerouslySetInnerHTML={{ __html: item.html }}
                  />
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
