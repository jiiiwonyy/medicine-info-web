import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { CentersType } from '@/features/local-center/types';
import {
  Table,
  TableWrap,
  THead,
  TBody,
  Tr,
  Th,
  Td,
} from '@/components/ui/Table';

export default function MobileCenterTable({
  centers,
  regionOrder,
  hoveredRegion,
  tableRefs,
}: {
  centers: CentersType;
  regionOrder: readonly string[];
  hoveredRegion: string | null;
  tableRefs: React.MutableRefObject<
    Record<string, HTMLTableSectionElement | null>
  >;
}) {
  return (
    <TableWrap>
      <Table>
        <THead>
          <Tr>
            <Th className={cn(textStyles.titleSm, 'bg-muted w-1/3')}>권역</Th>
            <Th className={cn(textStyles.titleSm, 'bg-muted')}>
              기관명 / 전화번호
            </Th>
          </Tr>
        </THead>

        {regionOrder.map((region) => (
          <TBody
            key={region}
            ref={(el) => {
              tableRefs.current[region] = el;
            }}
            className={hoveredRegion === region ? 'bg-primary-50' : undefined}
          >
            {centers[region].map((h, i) => (
              <Tr key={h.name}>
                {i === 0 && (
                  <Td
                    rowSpan={centers[region].length}
                    className={cn(
                      textStyles.bodySm,
                      'font-semibold text-primary-700 align-top',
                    )}
                  >
                    {region}
                  </Td>
                )}

                <Td>
                  <a
                    href={h.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      textStyles.bodyMd,
                      'text-primary-700 hover:underline block',
                    )}
                  >
                    {h.name}
                  </a>
                  <span className={cn(textStyles.bodySm, 'text-muted-fg')}>
                    ☎ {h.phone}
                  </span>
                </Td>
              </Tr>
            ))}
          </TBody>
        ))}
      </Table>
    </TableWrap>
  );
}
