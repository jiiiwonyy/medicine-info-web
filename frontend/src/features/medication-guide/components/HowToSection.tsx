// src/features/medication-guide/components/HowToSection.tsx
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

type StepItem = {
  step: number;
  text: string;
};

export default function HowToSection({ steps }: { steps: StepItem[] }) {
  return (
    <div className="space-y-4">
      {steps.map((item) => (
        <div
          key={item.step}
          className="flex items-center gap-4 rounded-[var(--radius-md)] border border-border bg-surface p-4 shadow-[var(--shadow-sm)]"
        >
          <div
            className={cn(
              textStyles.uiLg,
              'flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-fg flex items-center justify-center',
            )}
          >
            {item.step}
          </div>
          <p className={cn(textStyles.bodyMd)}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
