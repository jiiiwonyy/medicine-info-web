import Callout from '@/components/ui/Callout';
import SectionTitle from '@/components/ui/SectionTitle';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function KopsHeader() {
  return (
    <>
      {/* 소개/요약 */}
      <div className="mt-6 space-y-3">
        <Callout variant="info" className="mb-10">
          "환자안전보고학습시스템(KOPS)은 환자안전을 위한{' '}
          <span className="font-semibold">보고, 학습, 공유 기능</span>을
          제공하는 국가 플랫폼입니다."
        </Callout>

        <SectionTitle className="mt-4">📖 소개</SectionTitle>
        <p
          className={cn(
            textStyles.bodyMd,
            'mt-2 text-muted-fg leading-relaxed',
          )}
        >
          환자안전보고학습시스템의 설립 배경, 운영체계, 관련 법령과 가이드라인을
          제공합니다.
        </p>

        <Callout variant="note">
          보고하기 기능은 환자안전 관련 정보를 보호하기 위해{' '}
          <span className="font-semibold">본인인증 후 이용</span> 가능합니다.
        </Callout>
      </div>
    </>
  );
}
