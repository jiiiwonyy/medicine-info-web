import Button from '../ui/Button';
import Input from '../ui/Input';

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

/**
 * Render a controlled search bar form with an input and a primary submit button.
 *
 * @param value - Current input value
 * @param onChange - Called with the new input value when the user types
 * @param onSubmit - Called when the form is submitted
 * @param placeholder - Optional placeholder text for the input
 * @returns A form element containing a bound input and a primary submit button
 */
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