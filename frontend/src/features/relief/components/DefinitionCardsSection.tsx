import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { MdSick, MdWarningAmber, MdMedication } from 'react-icons/md';

export default function DefinitionCardsSection() {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      <div
        className={cn(
          'flex flex-col h-full',
          'bg-surface rounded-lg border border-border shadow-sm p-6',
          'hover:shadow-md transition-shadow duration-200',
        )}
      >
        <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
          <MdSick size={24} />
        </div>
        <h2 className={cn(textStyles.titleSm, 'mb-3 text-primary-700')}>
          부작용
          <br />
          <span className={cn(textStyles.bodySm, 'font-normal block mt-1')}>
            (Side Effect)
          </span>
        </h2>
        <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
          정상적인 용량에 따라 약물을 투여할 경우 발생하는 모든 의도되지 않은
          효과
        </p>
      </div>

      <div
        className={cn(
          'flex flex-col h-full',
          'bg-surface rounded-lg border border-border shadow-sm p-6',
          'hover:shadow-md transition-shadow duration-200',
        )}
      >
        <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4">
          <MdWarningAmber size={24} />
        </div>
        <h2 className={cn(textStyles.titleSm, 'mb-3 text-primary-700')}>
          이상사례
          <br />
          <span className={cn(textStyles.bodySm, 'font-normal block mt-1')}>
            (Adverse Event)
          </span>
        </h2>
        <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
          약물 사용 중 발생한 바람직하지 않고 의도되지 않는 징후, 증상 또는 질병
        </p>
      </div>

      <div
        className={cn(
          'flex flex-col h-full',
          'bg-surface rounded-lg border border-border shadow-sm p-6',
          'hover:shadow-md transition-shadow duration-200',
        )}
      >
        <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
          <MdMedication size={24} />
        </div>
        <h2 className={cn(textStyles.titleSm, 'mb-3 text-primary-700')}>
          약물이상반응
          <br />
          <span className={cn(textStyles.bodySm, 'font-normal block mt-1')}>
            (Adverse Drug Reaction)
          </span>
        </h2>
        <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
          이상사례 중 해당 의약품과의 인과관계를 배제할 수 없는 경우
        </p>
      </div>
    </section>
  );
}
