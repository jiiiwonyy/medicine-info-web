import { TableWrap } from '@/components/ui/Table';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

type DetailItem = {
  type: 'text' | 'table';
  html: string;
};

type DetailSection = {
  title?: string;
  items?: DetailItem[];
};

type DetailData = string | DetailSection[];

export default function MedicineDetailRenderer({ data }: { data: DetailData | null | undefined }) {
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
              <h3 className={textStyles.titleMd}>{section.title}</h3>
            )}

            {section.items?.map((item, i) => {
              if (item.type === 'text') {
                return (
                  <p
                    key={i}
                    className={cn(textStyles.bodyMd, 'leading-relaxed')}
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
