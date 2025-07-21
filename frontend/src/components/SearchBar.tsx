import type { ChangeEvent } from 'react';

interface SearchBarProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
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
        className="flex-1 p-2 border rounded border-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="button"
        onClick={onSearch}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        검색
      </button>
    </div>
  );
}
