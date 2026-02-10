import { TableWrap } from '@/components/ui/Table';

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
                  <TableWrap
                    key={i}
                    className="border border-border bg-surface overflow-hidden"
                  >
                    <div
                      className="legacy-html-table"
                      dangerouslySetInnerHTML={{ __html: item.html }}
                    />
                  </TableWrap>
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
