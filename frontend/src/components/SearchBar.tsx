import type { ChangeEvent } from 'react';

interface SearchBarProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  id,
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={handleInput}
      placeholder={placeholder}
      className="w-full p-2 border rounded"
    />
  );
}
