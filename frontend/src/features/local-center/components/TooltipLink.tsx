import { useState } from 'react';
import type { HospitalInfo } from '@/features/local-center/types';

export default function TooltipLink({ name, phone, url }: HospitalInfo) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-700 hover:underline font-medium"
      >
        {name}
      </a>

      {hovered && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-1 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 shadow-md">
          ☎ {phone}
        </div>
      )}
    </div>
  );
}
