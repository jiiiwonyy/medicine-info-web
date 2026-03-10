import { Card } from '@/components/ui/Card';
import {
  Table,
  TableWrap,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from '@/components/ui/Table';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { HamCategory } from '../types';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';

export default function HamTableSection({
  categories,
}: {
  categories: HamCategory[];
}) {
  return (
    <section className="space-y-4">
      <SectionNumberHeader number={4} title="고위험약물 종류" />
      <Card
        variant="outlined"
        padding="none"
        className="shadow-sm overflow-hidden"
      >
        <TableWrap className="my-0">
          <Table className="border-0">
            <THead>
              <Tr className="bg-muted/30">
                <Th
                  className={cn(
                    textStyles.uiLg,
                    'w-[160px] text-center py-4 text-muted-fg font-medium',
                  )}
                >
                  구분
                </Th>
                <Th
                  className={cn(
                    textStyles.uiLg,
                    'py-4 text-muted-fg font-medium',
                  )}
                >
                  종류 및 예시
                </Th>
              </Tr>
            </THead>

            <TBody>
              {categories.map((cat) => (
                <Tr
                  key={cat.key}
                  className="group hover:bg-muted/50 transition-colors"
                >
                  <Th
                    className={cn(
                      'text-center align-middle bg-surface group-hover:bg-muted/50 transition-colors',
                      textStyles.uiLg,
                      'text-fg',
                    )}
                  >
                    {cat.label.split(' ').slice(1).join(' ')}
                  </Th>

                  <Td className={cn('py-4', textStyles.bodyMd, 'text-fg')}>
                    <ul className="list-disc pl-5 space-y-1.5">
                      {cat.items.map((item, idx) => (
                        <li
                          key={idx}
                          className={cn(
                            textStyles.bodyMd,
                            'text-muted-fg leading-relaxed',
                          )}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableWrap>
      </Card>
    </section>
  );
}
