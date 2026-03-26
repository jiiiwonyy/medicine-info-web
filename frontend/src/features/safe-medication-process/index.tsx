import * as React from 'react';
import PageLayout from '@/components/PageLayout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import SectionTitle from '@/components/ui/SectionTitle';
import ArrowStepper from '@/features/safe-medication-process/components/MedicationStepper';
import { STEPS } from '@/features/safe-medication-process/data/StepMeta';
import type { StepKey } from '@/features/safe-medication-process/types';
import AdministeringStep from '@/features/safe-medication-process/section/AdministeringStep';
import MonitoringStep from '@/features/safe-medication-process/section/MonitoringStep';
import PrescribingStep from '@/features/safe-medication-process/section/PrescribingStep';

export default function SafetyMedicationProcess() {
  const [step, setStep] = React.useState<StepKey>('prescribing');

  const active = React.useMemo(
    () => STEPS.find((s) => s.key === step)!,
    [step],
  );

  return (
    <PageLayout title="안전한 투약 과정">
      <div className="mt-2">
        <ArrowStepper value={step} onChange={setStep} />
      </div>

      {/* 단계 카드 */}
      <div className="mt-6">
        <div
          className={cn(
            'rounded-[var(--radius-lg)] border shadow-[var(--shadow-sm)] overflow-hidden bg-surface',
            active.theme.border,
          )}
        >
          {/* 헤더 */}
          <div className={cn('p-6', active.theme.headerBg)}>
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div>
                <div
                  className={cn(
                    textStyles.captionMd,
                    'font-semibold',
                    active.theme.headerText,
                  )}
                >
                  {active.badge}
                </div>
                <div
                  className={cn(
                    'mt-1',
                    textStyles.titleLg,
                    active.theme.headerText,
                  )}
                >
                  {active.title} 단계
                </div>
              </div>
            </div>
          </div>

          {/* 본문 */}
          <div className="p-6 bg-surface">
            {step === 'prescribing' ? (
              <PrescribingStep theme={active.theme} />
            ) : step === 'administration' ? (
              <AdministeringStep theme={active.theme} />
            ) : (
              <MonitoringStep theme={active.theme} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className={cn(textStyles.captionMd, 'text-muted-fg')}>
          https://www.pharmaceutical-journal.com/learning/learning-article/the-top-ten-prescribing-errors-in-practice-and-how-to-avoid-them/20206123.fullarticle?firstPass=false
        </p>
      </div>
    </PageLayout>
  );
}
