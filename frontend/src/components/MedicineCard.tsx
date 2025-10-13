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
      <h2 className="text-xl font-semibold mb-1">{medicine.product_name}</h2>
      {medicine.product_name_eng && (
        <p className="text-sm text-gray-400 mb-2">
          {medicine.product_name_eng}
        </p>
      )}
      <div className="text-sm space-y-1">
        {medicine.company_name && (
          <p>
            <span className="font-medium">제조사:</span> {medicine.company_name}
          </p>
        )}
        {medicine.main_ingredient && (
          <p>
            <span className="font-medium">주성분:</span>{' '}
            {medicine.main_ingredient}
          </p>
        )}
        {medicine.dosage_and_administration && (
          <p>
            <span className="font-medium">용법·용량:</span>{' '}
            {medicine.dosage_and_administration.split('\n')[0]}…
          </p>
        )}
      </div>
    </Link>
  );
}
