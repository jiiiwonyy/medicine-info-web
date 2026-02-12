import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-muted">
      <div
        className={cn(
          textStyles.bodyMd,
          'max-w-screen-xl mx-auto px-6 py-10 text-muted-fg leading-relaxed',
        )}
      >
        <p className="mb-4">
          *본 사이트는 2026년 2월 업데이트된 식품의약품안전처(의약품안전나라) 및
          공공기관의 정보를 기반으로 제공하고 있습니다.
          <br />
          또한, 본 사이트의 정보는 교육 및 정보 제공을 위한 자료이며, 개별 환자
          진료에 대한 의학적 판단을 대체하지 않습니다.
        </p>

        <p className="mb-4">
          본 웹사이트는 정부(과학기술정보통신부)의 재원으로 한국연구재단의
          지원을 받아 수행된 연구과제에서 개발됨 (과제번호: RS-2024-00345750
          IRIS).
          <br />
          This work was supported by the National Research Foundation of
          Korea(NRF) grant funded by the Korea government(MSIT) (Grant No.
          RS-2024-00345750).
        </p>

        <div className="mt-6">
          <a
            href="mailto:carpe@jnu.ac.kr"
            className="text-primary-600 hover:text-primary-700 hover:underline"
          >
            Contact PI(carpe@jnu.ac.kr)
          </a>
        </div>
      </div>
    </footer>
  );
}
