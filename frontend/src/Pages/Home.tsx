import { useState } from 'react';
import Spinner from '@/components/Spinner';
import type { Medicine } from '@/types/medicine';

export default function Home() {
  const [loading] = useState(false);
  const [searchResult] = useState<Medicine[]>([]);

  return (
    <div className=" w-full flex flex-col items-center">
      <div className="w-full max-w-5xl mt-6">
        {loading && <Spinner />}
        {searchResult.length > 0 && (
          <div className="bg-white rounded-md shadow p-6 mt-4">
            <h2 className="text-lg font-bold mb-2">검색 결과</h2>
          </div>
        )}
      </div>
    </div>
  );
}
