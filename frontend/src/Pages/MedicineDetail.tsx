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

  const dur = med?.dur ?? {
    interactions: [],
    age: [],
    pregnancy: [],
  };

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

      <h1 className="text-xl font-bold mb-2">{med.제품명}</h1>
      {med.제품영문명 && (
        <p className="text-gray-600 italic mb-4">{med.제품영문명}</p>
      )}

      {/* 기본 정보 테이블 */}
      <table className="table-auto w-full mb-6 border-collapse">
        <tbody>
          {[
            ['품목기준코드', med.품목기준코드],
            ['업체명', med.업체명],
            ['허가일', med.허가일],
            ['주성분', med.주성분],
            ['주성분영문', med.주성분영문],
            ['첨가제', med.첨가제],
            ['전문의약품', med.전문의약품],
            ['완제/원료', med.완제원료],
            ['원료', med.원료],
            ['허가신고', med.허가신고],
            ['제조수입', med.제조수입],
            ['마약구분', med.마약구분],
            ['제형', med.제형],
            ['신약구분', med.신약구분],
            ['ATC코드', med.ATC코드],
            ['수입제조국', med.수입제조국],
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
          <h2 className="text-sky-700 font-bold text-lg mb-2">📌 효능·효과</h2>
          <p className="whitespace-pre-line">{med.효능효과}</p>
        </section>

        <section
          id="usage"
          ref={usageRef}
          className="scroll-mt-24 pt-4 border-t border-gray-300"
        >
          <h2 className="text-sky-700 font-bold text-lg mb-2">📌 용법·용량</h2>
          <p className="whitespace-pre-line">{med.용법용량}</p>
        </section>

        <section
          id="caution"
          ref={cautionRef}
          className="pt-4 border-t border-gray-300 scroll-mt-24"
        >
          <h2 className="text-sky-700 font-bold text-lg mb-2">
            📌 사용상의 주의사항
          </h2>
          <p className="whitespace-pre-line">{med.주의사항}</p>
        </section>
        <section id="dur" className="scroll-mt-24">
          {med.dur && <DurSection dur={med.dur} />}
        </section>
      </section>

      <FloatingNavigation dur={dur} />

      <TopButton />
    </div>
  );
}
