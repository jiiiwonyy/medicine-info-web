import type { DurData } from '@/types/dur';
import Callout from '@/components/ui/Callout';
import {
  TableWrap,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  TableContent,
} from '@/components/ui/Table';
import { textStyles } from '@/styles/typography';
import { cn } from '@/shared/cn';
import {
  COLUMN_LABELS,
  HIDDEN_KEYS,
  INFO_MAP,
  LABEL_MAP,
  SECTION_THEME,
  type DurKey,
} from '@/features/medicine-detail/data/durData';

interface Props {
  dur: DurData;
}

type DurRow = DurData[keyof DurData][number];

function getSectionId(key: DurKey) {
  switch (key) {
    case 'interactions':
      return 'dur-interactions';
    case 'age':
      return 'dur-age';
    case 'pregnancy':
      return 'dur-pregnancy';
  }
}

export default function DurSection({ dur }: Props) {
  const sections: Array<{ key: DurKey; list: DurRow[] }> = [
    { key: 'interactions', list: (dur.interactions ?? []) as DurRow[] },
    { key: 'age', list: (dur.age ?? []) as DurRow[] },
    { key: 'pregnancy', list: (dur.pregnancy ?? []) as DurRow[] },
  ];

  return (
    <div className="space-y-10 mt-8">
      {sections.map(({ key, list }) => {
        if (list.length === 0) return null;

        const sectionId = getSectionId(key);
        const theme = SECTION_THEME[key];

        const columns = Object.keys(list[0] as Record<string, unknown>).filter(
          (k) => !(HIDDEN_KEYS as readonly string[]).includes(k),
        );

        return (
          <section key={key} className={theme.bg}>
            <div className="flex gap-4">
              <div className={cn('w-1.5 rounded-l-2xl', theme.bar)} />

              <div className="flex-1 py-4 pr-4">
                <h2
                  id={sectionId}
                  className={cn(
                    'scroll-mt-24',
                    textStyles.titleMd,
                    'mb-3',
                    theme.title,
                  )}
                >
                  {LABEL_MAP[key]}
                </h2>

                <Callout
                  variant={theme.calloutVariant}
                  title={`${LABEL_MAP[key]}란?`}
                >
                  {INFO_MAP[key]}
                </Callout>

                <p className={cn(textStyles.bodySm, 'mt-2 mb-2 text-fg')}>
                  ※ 아래에서 검색한 약물의 주성분 결과를 확인하여 주십시오.
                </p>

                <TableWrap className="mt-3 border border-border bg-surface">
                  <Table className="border-0">
                    <THead>
                      <Tr>
                        {columns.map((col) => (
                          <Th key={col} className="bg-muted">
                            {COLUMN_LABELS[col] ?? col}
                          </Th>
                        ))}
                      </Tr>
                    </THead>

                    <TBody>
                      {list.map((row, idx) => (
                        <Tr key={idx} className="odd:bg-surface even:bg-muted">
                          {columns.map((col) => (
                            <Td key={col}>
                              <TableContent>
                                {String(
                                  (row as Record<string, unknown>)[col] ?? '',
                                )}
                              </TableContent>
                            </Td>
                          ))}
                        </Tr>
                      ))}
                    </TBody>
                  </Table>
                </TableWrap>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
