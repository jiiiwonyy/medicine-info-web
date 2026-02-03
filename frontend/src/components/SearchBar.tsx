import type { ChangeEvent } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

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
      <Input
        id={id}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />

      <Button type="button" onClick={onSearch}>
        검색
      </Button>
    </div>
  );
}
