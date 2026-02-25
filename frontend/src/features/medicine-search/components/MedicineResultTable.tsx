import type { Medicine } from '@/types/medicine';
import { cn } from '@/shared/cn';
import {
  TableWrap,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
} from '@/components/ui/Table';
import { MEDICINE_RESULT_COLUMNS } from '@/features/medicine-search/data/columns';

function CellText({ value }: { value: unknown }) {
  return (
    <div className="line-clamp-3 whitespace-normal break-words">
      {String(value ?? '-') || '-'}
    </div>
  );
}

export default function MedicineResultTable({
  medicines,
  empty,
  onRowClick,
}: {
  medicines: Medicine[];
  empty: boolean;
  onRowClick: (id: number) => void;
}) {
  return (
    <TableWrap
      className={cn(
        'rounded-[var(--radius-lg)] border-2 border-border bg-surface',
        empty && 'min-h-[100px] flex items-center justify-center',
      )}
    >
      {empty ? (
        <div className="text-muted-fg text-center p-4">
          검색 결과가 없습니다.
        </div>
      ) : (
        <Table className="table-fixed border-0">
          <THead>
            <Tr className="bg-primary-100 h-[48px]">
              {MEDICINE_RESULT_COLUMNS.map((c) => (
                <Th key={c.key} className={cn(c.width, c.maxWidth)}>
                  {c.label}
                </Th>
              ))}
            </Tr>
          </THead>

          <TBody>
            {medicines.map((med) => (
              <Tr
                key={med.id}
                onClick={() => onRowClick(med.id)}
                className="cursor-pointer h-[72px] hover:bg-primary-50"
              >
                {MEDICINE_RESULT_COLUMNS.map((c) => {
                  const value = (med as any)[c.key] ?? '-';

                  return (
                    <Td
                      key={c.key}
                      className={cn(
                        c.width,
                        c.maxWidth,
                        c.key === 'efficacy' && 'h-[72px] overflow-hidden',
                      )}
                      nowrap={c.key !== 'efficacy'}
                      title={c.title ? String(value) : undefined}
                    >
                      {c.clamp ? <CellText value={value} /> : String(value)}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </TBody>
        </Table>
      )}
    </TableWrap>
  );
}
