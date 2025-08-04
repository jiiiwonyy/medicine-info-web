import { Link } from 'react-router-dom';
import type { Medicine } from '../types/medicine';

interface Props {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: Props) {
  return (
    <Link
      to={`/medicines/${medicine.id}`}
      className="block border bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <h2 className="text-xl font-semibold mb-1">{medicine.제품명}</h2>
      {medicine.제품영문명 && (
        <p className="text-sm text-gray-400 mb-2">{medicine.제품영문명}</p>
      )}
      <div className="text-sm space-y-1">
        {medicine.업체명 && (
          <p>
            <span className="font-medium">제조사:</span> {medicine.업체명}
          </p>
        )}
        {medicine.주성분 && (
          <p>
            <span className="font-medium">주성분:</span> {medicine.주성분}
          </p>
        )}
        {medicine.용법용량 && (
          <p>
            <span className="font-medium">용법·용량:</span>{' '}
            {medicine.용법용량.split('\n')[0]}…
          </p>
        )}
      </div>
    </Link>
  );
}
