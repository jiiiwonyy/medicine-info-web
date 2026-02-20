import Button from '../ui/Button';
import Input from '../ui/Input';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

export default function FdaSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder,
}: Props) {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <Button type="submit" variant="primary">
        검색
      </Button>
    </form>
  );
}
