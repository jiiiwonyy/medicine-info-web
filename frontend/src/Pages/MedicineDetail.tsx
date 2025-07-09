import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMedicine } from '../api/searchMedicine';
import type { Medicine } from '../types/medicine';

export default function Detail() {
  const { id } = useParams<{ id: string }>();

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
      <Link to="/" className="text-blue-600 hover:underline mb-4 block">
        ← 목록으로 돌아가기
      </Link>

      <h1 className="text-3xl font-bold mb-2">{med.제품명}</h1>
      {med.제품영문명 && (
        <p className="text-gray-600 italic mb-4">{med.제품영문명}</p>
      )}

      <table className="table-auto w-full mb-6 border-collapse">
        <tbody>
          <tr>
            <th className="text-left p-2 border">번호</th>
            <td className="p-2 border">{med.번호}</td>
          </tr>
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
            <th className="text-left p-2 border">효능·효과</th>
            <td className="p-2 border whitespace-pre-wrap">{med.효능효과}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">용법·용량</th>
            <td className="p-2 border whitespace-pre-wrap">{med.용법용량}</td>
          </tr>
          <tr>
            <th className="text-left p-2 border">주의사항</th>
            <td className="p-2 border whitespace-pre-wrap">{med.주의사항}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
