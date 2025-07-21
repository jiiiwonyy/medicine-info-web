import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMedicine } from '../api/searchMedicine';
import type { Medicine } from '../types/medicine';
import { useRef } from 'react';
import TopButton from '@/components/TopButton';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const effectRef = useRef<HTMLDivElement>(null);
  const usageRef = useRef<HTMLDivElement>(null);
  const cautionRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const {
    data: med,
    isLoading,
    isError,
    error,
  } = useQuery<Medicine, Error>({
    queryKey: ['medicine', id],
    queryFn: () => getMedicine(Number(id!)),
    enabled: !!id,
  });

  if (isLoading) return <p>🔄 불러오는 중…</p>;
  if (isError) return <p className="text-red-600">❗ 오류: {error?.message}</p>;
  if (!med) return <p>해당 약품을 찾을 수 없습니다.</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-green-700 hover:underline mb-4 block"
      >
        ← 목록으로 돌아가기
      </button>

      <h1 className="text-xl font-bold mb-2">{med.제품명}</h1>
      {med.제품영문명 && (
        <p className="text-gray-600 italic mb-4">{med.제품영문명}</p>
      )}

      <table className="table-auto w-full mb-6 border-collapse">
        <tbody>
          <tr>
            <th className="text-left p-2 border">품목기준코드</th>
            <td className="p-2 border">{med.품목기준코드}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">업체명</th>
            <td className="p-2 border">{med.업체명}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">허가일</th>
            <td className="p-2 border">{med.허가일}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">주성분</th>
            <td className="p-2 border">{med.주성분}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">주성분영문</th>
            <td className="p-2 border">{med.주성분영문}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">첨가제</th>
            <td className="p-2 border">{med.첨가제}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">전문의약품</th>
            <td className="p-2 border">{med.전문의약품}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">완제/원료</th>
            <td className="p-2 border">{med.완제원료}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">원료</th>
            <td className="p-2 border">{med.원료}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">허가신고</th>
            <td className="p-2 border">{med.허가신고}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">제조수입</th>
            <td className="p-2 border">{med.제조수입}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">마약구분</th>
            <td className="p-2 border">{med.마약구분}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">제형</th>
            <td className="p-2 border">{med.제형}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">신약구분</th>
            <td className="p-2 border">{med.신약구분}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">ATC코드</th>
            <td className="p-2 border">{med.ATC코드}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">수입제조국</th>
            <td className="p-2 border">{med.수입제조국}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex border-b mb-4 space-x-4">
        <button
          onClick={() => scrollTo(effectRef)}
          className="px-4 py-2 text-sm md:text-base font-medium text-gray-600 hover:text-green-600 cursor-pointer"
        >
          효능·효과
        </button>
        <button
          onClick={() => scrollTo(usageRef)}
          className="px-4 py-2 text-sm md:text-base font-medium text-gray-600 hover:text-green-600 cursor-pointer"
        >
          용법·용량
        </button>
        <button
          onClick={() => scrollTo(cautionRef)}
          className="px-4 py-2 text-sm md:text-base font-medium text-gray-600 hover:text-green-600 cursor-pointer"
        >
          사용상의 주의사항
        </button>
      </div>

      <div className="space-y-8 mb-6">
        <section ref={effectRef} className="pt-4">
          <h2 className="text-green-700 font-bold text-lg mb-2">
            📌 효능·효과
          </h2>
          <p className="whitespace-pre-line">{med.효능효과}</p>
        </section>

        <section ref={usageRef} className="pt-4 border-t border-gray-300">
          <h2 className="text-green-700 font-bold text-lg mb-2">
            📌 용법·용량
          </h2>
          <p className="whitespace-pre-line">{med.용법용량}</p>
        </section>

        <section ref={cautionRef} className="pt-4 border-t border-gray-300">
          <h2 className="text-green-700 font-bold text-lg mb-2">
            📌 사용상의 주의사항
          </h2>
          <p className="whitespace-pre-line">{med.주의사항}</p>
        </section>
      </div>
      <TopButton />
    </div>
  );
}
