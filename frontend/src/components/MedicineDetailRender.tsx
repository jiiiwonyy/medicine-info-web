export default function MedicineDetailRenderer({ data }: { data: any }) {
  if (!data) return null;

  // 문자열일 경우 그대로 출력
  if (typeof data === 'string') {
    return <p className="whitespace-pre-line">{data}</p>;
  }

  // JSON 배열 (ARTICLE 리스트)
  if (Array.isArray(data)) {
    return (
      <div className="space-y-6">
        {data.map((section, idx) => (
          <div key={idx} className="space-y-3">
            {section.title && (
              <h3 className="text-md font-semibold">{section.title}</h3>
            )}

            {section.items?.map((item: any, i: number) => {
              // 1) TEXT 처리
              if (item.type === 'text') {
                return (
                  <p key={i} className="leading-relaxed whitespace-pre-line">
                    {item.text}
                  </p>
                );
              }

              // 2) TABLE 처리
              if (item.type === 'table') {
                return (
                  <div
                    key={i}
                    className="overflow-x-auto my-4 border rounded-md"
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
