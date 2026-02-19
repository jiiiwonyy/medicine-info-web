import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

type StepKey = 'prescribing' | 'administration' | 'monitoring';

const STEP_META: Array<{
  key: StepKey;
  title: string;
  en: string;
  active: string;
  inactive: string;
  activeText: string;
  inactiveText: string;
}> = [
  {
    key: 'prescribing',
    title: '처방',
    en: 'Prescribing',
    active: 'bg-danger',
    inactive: 'bg-danger-200/40',
    activeText: 'text-white',
    inactiveText: 'text-fg',
  },
  {
    key: 'administration',
    title: '투여',
    en: 'Administering',
    active: 'bg-success',
    inactive: 'bg-success-200/40',
    activeText: 'text-white',
    inactiveText: 'text-fg',
  },
  {
    key: 'monitoring',
    title: '관찰',
    en: 'Monitoring',
    active: 'bg-primary',
    inactive: 'bg-primary-200/40',
    activeText: 'text-white',
    inactiveText: 'text-fg',
  },
];

export default function ArrowStepper({
  value,
  onChange,
}: {
  value: StepKey;
  onChange: (v: StepKey) => void;
}) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 sm:min-w-0">
        {STEP_META.map((s) => {
          const active = s.key === value;
          const arrowSize = '24px';
          const clipArrow = `polygon(0 0, calc(100% - ${arrowSize}) 0, 100% 50%, calc(100% - ${arrowSize}) 100%, 0 100%)`;

          return (
            <button
              key={s.key}
              type="button"
              onClick={() => onChange(s.key)}
              aria-current={active ? 'step' : undefined}
              style={
                {
                  '--step-clip': clipArrow,
                } as React.CSSProperties
              }
              className={cn(
                'relative w-full',
                'h-[84px] sm:h-[110px]',
                'transition-transform duration-150',
                'rounded-[var(--radius-lg)]',
                'sm:rounded-none',
                'sm:[clip-path:var(--step-clip)]',
                'sm:flex-1',

                active ? s.active : s.inactive,
                active ? s.activeText : s.inactiveText,
              )}
            >
              {/* Content */}
              <div
                className="relative flex h-full items-center justify-center text-center px-4"
                data-content
              >
                <div>
                  <div className={cn(textStyles.titleMd, 'font-bold')}>
                    {s.title}
                  </div>
                  <div className={cn(textStyles.bodySm, 'mt-1 opacity-90')}>
                    ({s.en})
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
