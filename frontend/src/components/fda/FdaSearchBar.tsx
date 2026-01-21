type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

export default function FdaSearchBar({ value, onChange, onSubmit, placeholder }: Props) {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        className="flex-1 border rounded-lg px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-black text-white"
      >
        검색
      </button>
    </form>
  );
}
