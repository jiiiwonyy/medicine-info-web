import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMedicineById } from '@/api/searchMedicine';
import type { Medicine } from '../types/medicine';
import { useRef } from 'react';
import TopButton from '@/components/TopButton';
import Spinner from '@/components/Spinner';
import FloatingNavigation from '@/components/FloatingNavigation';
import DurSection from '@/components/DurSection';
import { scrollToId } from '@/hooks/useScrollSpy';
import MedicineDetailRenderer from '@/components/MedicineDetailRender';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const effectRef = useRef<HTMLDivElement>(null);
  const usageRef = useRef<HTMLDivElement>(null);
  const cautionRef = useRef<HTMLDivElement>(null);

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

  const hasDur =
    (dur.interactions?.length ?? 0) > 0 ||
    (dur.age?.length ?? 0) > 0 ||
    (dur.pregnancy?.length ?? 0) > 0;

  if (isLoading) return <Spinner />;
  if (isError) return <p className="text-red-600">❗ 오류: {error?.message}</p>;
  if (!med) return <p>해당 약품을 찾을 수 없습니다.</p>;

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sky-700 hover:underline mb-4 block"
      >
        ← 목록으로 돌아가기
      </button>

      {/* ✅ 필드명 영문화 적용 */}
      <h1 className="text-xl font-bold mb-2">{med.product_name}</h1>
      {med.product_name_eng && (
        <p className="text-gray-600 italic mb-4">{med.product_name_eng}</p>
      )}

      {/* 기본 정보 테이블 */}
      <table className="table-auto w-full mb-6 border-collapse">
        <tbody>
          {[
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
          ].map(([label, value]) => (
            <tr key={label}>
              <th className="text-left p-2 border">{label}</th>
              <td className="p-2 border">{value || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 탭 */}
      <div className="flex border-b mb-4 space-x-4">
        <button
          onClick={() => scrollToId('effect', HEADER_OFFSET)}
          className="px-4 py-2 text-sm md:text-base font-medium text-gray-600 hover:text-sky-600 cursor-pointer"
        >
          효능·효과
        </button>
        <button
          onClick={() => scrollToId('usage', HEADER_OFFSET)}
          className="px-4 py-2 text-sm md:text-base font-medium text-gray-600 hover:text-sky-600 cursor-pointer"
        >
          용법·용량
        </button>
        <button
          onClick={() => scrollToId('caution', HEADER_OFFSET)}
          className="px-4 py-2 text-sm md:text-base font-medium text-gray-600 hover:text-sky-600 cursor-pointer"
        >
          사용상의 주의사항
        </button>
      </div>

      {/* 본문 내용 */}
      <section id="detail" className="scroll-mt-24 space-y-8 mb-6">
        <section id="effect" ref={effectRef} className="scroll-mt-24 pt-4">
          <h2 className="text-sky-700 font-bold text-xl mb-2">📌 효능·효과</h2>
          <MedicineDetailRenderer data={med.efficacy} />
        </section>

        <section
          id="usage"
          ref={usageRef}
          className="scroll-mt-24 pt-4 border-t border-gray-300"
        >
          <h2 className="text-sky-700 font-bold text-xl mb-2">📌 용법·용량</h2>
          <MedicineDetailRenderer data={med.dosage_and_administration} />
        </section>

        <section
          id="caution"
          ref={cautionRef}
          className="pt-4 border-t border-gray-300 scroll-mt-24"
        >
          <h2 className="text-sky-700 font-bold text-xl mb-2">
            📌 사용상의 주의사항
          </h2>
          <MedicineDetailRenderer data={med.precautions} />
        </section>

        <section id="dur" className="scroll-mt-24">
          {hasDur && (
            <>
              <h2 className="text-sky-700 font-bold text-xl mb-2">
                📌 의약품안전사용(DUR)
              </h2>
              <DurSection dur={dur} />
            </>
          )}
        </section>
      </section>

      <FloatingNavigation dur={dur} />
      <TopButton />
    </div>
  );
}
