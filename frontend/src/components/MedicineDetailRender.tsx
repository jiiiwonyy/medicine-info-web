export default function MedicineDetailRenderer({ data }: { data: any }) {
  if (!data) return null;

  if (typeof data === 'string') {
    return <p className="whitespace-pre-line">{data}</p>;
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-6">
        {data.map((section, idx) => (
          <div key={idx} className="space-y-3">
            {section.title && (
              <h3 className="text-md font-semibold">{section.title}</h3>
            )}

            {section.items?.map((item: any, i: number) => {
              if (item.type === 'text') {
                return (
                  <p
                    key={i}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.html }}
                  />
                );
              }

              if (item.type === 'table') {
                return (
                  <div
                    key={i}
                    className="overflow-x-auto my-4 table-wrapper rounded-md"
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
