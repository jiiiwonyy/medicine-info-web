import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function HeroSection() {
  return (
    <div className="text-center space-y-3 py-4 mb-10">
      <p className={cn(textStyles.displayLg, 'text-fg tracking-tight')}>
        간호사를 위한{' '}
        <span className="text-primary-700">투약안전 & 의약품 정보 시스템</span>
      </p>
      <p className={cn(textStyles.bodyMd, 'text-muted-fg')}>
        안전한 투약을 위한 의약품 정보, 쉽고 정확하게
        <br />
        식품의약품안전처, 공공기관 데이터를 기반으로 신뢰할 수 있는 정보를
        제공합니다
      </p>
    </div>
  );
}
