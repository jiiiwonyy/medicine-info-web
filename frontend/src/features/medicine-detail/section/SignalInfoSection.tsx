import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import type { SignalInfo } from '../types';
import { useSignalInfoView } from '../hooks/useSignalInfoView';
import Callout from '@/components/ui/Callout';
import { Card } from '@/components/ui/Card';
import SignalInfoCard from '@/features/signal-info/components/SignalInfoCard';
import { trimDocNo } from '@/features/signal-info/utils';

interface Props {
  signalInfos: SignalInfo[];
}

export function SignalInfoSection({ signalInfos }: Props) {
  const { isLoading, error, handleView } = useSignalInfoView();

  const isEmpty = !signalInfos?.length;

  return (
    <section className="relative mt-8">
      {/* 섹션 전체 로딩 오버레이 */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-surface/70 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent" />
        </div>
      )}

      <Callout variant="info" className="mb-4">
        한국의약품안전관리원은 의약품이상사례보고시스템(Korea Adverse Event
        Reporting System, KAERS)을 통해 제조수입업체, 지역의약품안전센터,
        의약전문가 및 소비자 등으로부터 의약품 부작용 사례를 수집하여
        데이터베이스로 관리하고 있습니다. 수집된 정보를 토대로 통계적 방법을
        활용한 실마리정보 탐지, 개별보고자료 분석평가를 비롯한 국내외 허가정보
        및 관련 문헌 등의 다각적 검토를 거쳐 안전정보를 생산하는 업무를 수행하고
        있습니다. 실마리정보 알리미는 KAERS를 통해 새롭게 확인된 실마리정보가
        유의미한 안전정보로서 식품의약품안전처에 제공되어 후속 조치된 내용을
        공유하기 위하여 마련된 소식지입니다.
      </Callout>

      {error && (
        <p className={cn(textStyles.bodySm, 'text-danger-700 mb-3')}>{error}</p>
      )}

      {isEmpty ? (
        <Card variant="empty" className="py-8 text-center">
          <p className={cn(textStyles.bodyMd, 'text-muted-fg')}>
            이 약품과 관련된 실마리정보가 없습니다.
          </p>
        </Card>
      ) : (
        <>
          <p className={cn(textStyles.bodyMd, 'text-muted-fg mb-4')}>
            자세한 내용은 아래 파일을 열어 확인하여 주십시오.
          </p>
          <div className="space-y-3">
            {signalInfos.map((info) => (
              <SignalInfoCard
                key={info.id}
                item={info}
                mainTitle={trimDocNo(info.title)}
                onView={handleView}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
