import type { ChangeEvent } from 'react';
import Button from '@/components/ui/Button';

interface SearchBarProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onFilterChange: (type: 'product' | 'ingredient') => void;
  filterType: 'product' | 'ingredient';
  placeholder?: string;
}
export default function SearchBar({
  id,
  value,
  onChange,
  placeholder,
  onSearch,
}: SearchBarProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex w-full max-w-xl gap-2">
      <input
        id={id}
        type="text"
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 p-2 border rounded border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
      />

      <Button onClick={onSearch}>검색</Button>
    </div>
  );
}
