import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { MdComputer, MdPhoneInTalk } from 'react-icons/md';

export default function ReportingMethodsSection() {
  return (
    <section>
      <h2
        className={cn(
          textStyles.titleMd,
          'mb-6 text-fg border-b border-border pb-2',
        )}
      >
        이상사례 보고 방법
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Card
          variant="outlined"
          className={cn(
            'flex flex-col items-center text-center p-8 rounded-xl',
            'hover:shadow-md transition-shadow duration-200',
          )}
        >
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center mb-6',
              'bg-primary-50 text-primary-700',
            )}
          >
            <MdComputer size={36} />
          </div>

          <h3 className={cn(textStyles.titleMd, 'text-fg mb-3')}>
            온라인 보고
          </h3>
          <p className={cn(textStyles.bodySm, 'mb-8 leading-relaxed')}>
            의약품안전나라 의약품통합정보시스템을
            <br />
            이용하실 수 있습니다.
          </p>

          <a
            href="https://kaers.drugsafe.or.kr/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center justify-center',
              'bg-primary text-white font-bold',
              'px-8 py-3 rounded-lg shadow-sm',
              'hover:bg-primary-700 hover:shadow-md hover:-translate-y-0.5',
              'transition-all duration-200 w-full md:w-auto',
              textStyles.bodyMd,
            )}
          >
            온라인 보고 바로가기 &rarr;
          </a>
        </Card>

        <Card
          variant="outlined"
          className={cn(
            'flex flex-col items-center text-center p-8 rounded-xl',
            'hover:shadow-md transition-shadow duration-200',
          )}
        >
          <div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center mb-6',
              'bg-primary-50 text-primary-700',
            )}
          >
            <MdPhoneInTalk size={36} />
          </div>

          <h3 className={cn(textStyles.titleMd, 'text-fg mb-3')}>전화 보고</h3>
          <p className={cn(textStyles.bodySm, 'mb-8 leading-relaxed')}>
            한국의약품안전관리원 대표전화
            <br />
            <span className="font-bold text-fg">1644-6223</span> (또는
            14-3330)으로 보고하실 수 있습니다.
          </p>

          <a
            href="tel:1644-6223"
            className={cn(
              'inline-flex items-center justify-center',
              'bg-white border border-border text-fg font-bold',
              'px-8 py-3 rounded-lg shadow-sm',
              'hover:bg-muted hover:border-primary-200 hover:-translate-y-0.5',
              'transition-all duration-200 w-full md:w-auto',
              textStyles.bodyMd,
            )}
          >
            전화 걸기 1644-6223
          </a>
        </Card>
      </div>
    </section>
  );
}
