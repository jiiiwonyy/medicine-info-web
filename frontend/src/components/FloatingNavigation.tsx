type FloatingNavProps = {
  onScrollTo: (target: string) => void;
  dur: {
    interactions: unknown[];
    age: unknown[];
    pregnancy: unknown[];
  };
};

export default function FloatingNavigation({
  onScrollTo,
  dur,
}: FloatingNavProps) {
  const navItems = [
    { key: 'effect', label: '효능·효과' },
    { key: 'usage', label: '용법·용량' },
    { key: 'caution', label: '사용상의 주의사항' },
    ...(dur.interactions.length > 0
      ? [{ key: 'dur-interactions', label: '병용금기' }]
      : []),
    ...(dur.age.length > 0 ? [{ key: 'dur-age', label: '연령금기' }] : []),
    ...(dur.pregnancy.length > 0
      ? [{ key: 'dur-pregnancy', label: '임부금기' }]
      : []),
  ];

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
