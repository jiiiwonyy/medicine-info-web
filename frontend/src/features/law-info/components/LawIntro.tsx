import Callout from '@/components/ui/Callout';

export default function LawIntro() {
  return (
    <Callout variant="info" title="국가법령정보센터란?">
      <p>
        대한민국 법제처가 운영하는 공식적인{' '}
        <strong className="text-sky-800">국가 법령정보 통합 검색 플랫폼</strong>
        입니다. 법률, 시행령, 행정규칙 등 모든 법령 정보를 한곳에서 무료로
        확인할 수 있습니다.
      </p>
    </Callout>
  );
}
