import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMedicineById } from '@/api/searchMedicine';
import type { Medicine } from '@/types/medicine';
import { useMemo, useState } from 'react';
import TopButton from '@/components/TopButton';
import Spinner from '@/components/Spinner';
import FloatingNavigation from '@/components/FloatingNavigation';
import DurSection from '@/components/DurSection';
import { scrollToId } from '@/hooks/useScrollSpy';
import MedicineDetailRenderer from '@/components/MedicineDetailRender';
import {
  TableWrap,
  Table,
  TBody,
  Tr,
  Th,
  Td,
  TableContent,
} from '@/components/ui/Table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { textStyles } from '@/styles/typography';
import { cn } from '@/shared/cn';

type TabKey = 'effect' | 'usage' | 'caution' | 'dur';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabKey>('effect');

  const HEADER_OFFSET = 72;
  const numericId = Number(id);

  const {
    data: med,
    isLoading,
    isError,
    error,
  } = useQuery<Medicine, Error>({
    queryKey: ['medicine', numericId],
    queryFn: () => getMedicineById(numericId),
    enabled: !!numericId,
  });

  const dur = med?.dur ?? { interactions: [], age: [], pregnancy: [] };

  const tabs = useMemo(() => {
    const base: Array<{ value: TabKey; label: string; id: string }> = [
      { value: 'effect', label: '효능·효과', id: 'effect' },
      { value: 'usage', label: '용법·용량', id: 'usage' },
      { value: 'caution', label: '사용상의 주의사항', id: 'caution' },
    ];
    return base;
  }, []);

  const onTabClick = (tab: { id: string; value: TabKey }) => {
    setActiveTab(tab.value);
    scrollToId(tab.id, HEADER_OFFSET);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-red-600">❗ 오류: {error?.message}</p>;
  if (!med) return <p>해당 약품을 찾을 수 없습니다.</p>;

  const baseRows: Array<[string, unknown]> = [
    ['품목기준코드', med.item_code],
    ['업체명', med.company_name],
    ['허가일', med.approval_date],
    ['주성분', med.main_ingredient],
    ['주성분영문', med.main_ingredient_eng],
    ['첨가제', med.additive],
    ['전문의약품', med.prescription_type],
    ['완제/원료', med.formulation_type],
    ['원료', med.raw_material],
    ['허가/신고', med.approval_or_report],
    ['제조/수입', med.manufacture_or_import],
    ['마약구분', med.narcotic_class],
    ['제형', med.dosage_form],
    ['신약구분', med.new_drug_flag],
    ['ATC코드', med.atc_code],
    ['수입제조국', med.import_country],
  ];

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className={cn(
          textStyles.bodyLg,
          'text-primary-700 mb-4 block hover:underline',
        )}
      >
        ← 목록으로 돌아가기
      </button>

      <h1 className={cn(textStyles.titleLg, 'mb-2')}>{med.product_name}</h1>
      {med.product_name_eng && (
        <p className={cn(textStyles.bodyMd, 'mb-4')}>{med.product_name_eng}</p>
      )}

      <TableWrap scroll className="mb-6 overflow-hidden bg-surface">
        <Table className={cn('border-0', 'border-y border-border-strong')}>
          <TBody>
            {baseRows.map(([label, value], idx) => {
              const isLast = idx === baseRows.length - 1;
              const display =
                value == null || value === '' ? '-' : String(value);

              return (
                <Tr key={label} className="hover:bg-transparent">
                  <Th
                    className={cn(
                      'bg-muted',
                      'border-0 border-b border-border',
                      'border-x-0',
                      isLast && 'border-b-0',
                      'w-[180px] align-top text-fg',
                      textStyles.bodyMd,
                    )}
                  >
                    {label}
                  </Th>

                  <Td
                    className={cn(
                      textStyles.bodyMd,
                      'border-0 border-b border-border',
                      'border-x-0',
                      isLast && 'border-b-0',
                      'text-fg',
                    )}
                  >
                    <TableContent className={textStyles.bodyMd}>
                      {display}
                    </TableContent>
                  </Td>
                </Tr>
              );
            })}
          </TBody>
        </Table>
      </TableWrap>

      {/* ✅ Tabs 공용 컴포넌트로 스크롤 네비 통일 */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as TabKey)}
        className="mb-6"
      >
        <TabsList className="w-full grid h-12 grid-cols-3">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              onClick={() => onTabClick(t)}
              className="text-base"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* 본문 내용 */}
      <section id="detail" className="scroll-mt-24 space-y-8 mb-6">
        <section id="effect" className="scroll-mt-24 pt-4">
          <h2 className={cn(textStyles.titleMd, 'text-primary mb-2')}>
            📌 효능·효과
          </h2>
          <MedicineDetailRenderer data={med.efficacy} />
        </section>

        <section
          id="usage"
          className="scroll-mt-24 pt-4 border-t border-border"
        >
          <h2 className={cn(textStyles.titleMd, 'text-primary mb-2')}>
            📌 용법·용량
          </h2>
          <MedicineDetailRenderer data={med.dosage_and_administration} />
        </section>

        <section
          id="caution"
          className="pt-4 border-t border-border scroll-mt-24"
        >
          <h2 className={cn(textStyles.titleMd, 'text-primary mb-2')}>
            📌 사용상의 주의사항
          </h2>
          <MedicineDetailRenderer data={med.precautions} />
        </section>

        <section id="dur" className="scroll-mt-24">
          <h2 className={cn(textStyles.titleMd, 'text-primary mb-2')}>
            📌 의약품안전사용(DUR)
          </h2>
          <DurSection dur={dur} />
        </section>
      </section>

      <FloatingNavigation dur={dur} />
      <TopButton />
    </div>
  );
}
