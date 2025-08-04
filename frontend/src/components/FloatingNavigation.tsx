type FloatingNavProps = {
  onScrollTo: (target: 'effect' | 'usage' | 'caution') => void;
};

const navItems = [
  { key: 'effect', label: '효능·효과' },
  { key: 'usage', label: '용법·용량' },
  { key: 'caution', label: '사용상의 주의사항' },
] as const;

export default function FloatingNavigation({ onScrollTo }: FloatingNavProps) {
  return (
    <div className="fixed top-1/3 right-20 hidden lg:flex flex-col space-y-2 bg-white border rounded shadow-md p-3 z-50">
      {navItems.map((item) => (
        <button
          key={item.key}
          onClick={() => onScrollTo(item.key)}
          className="text-sm hover:text-green-700 cursor-pointer"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
