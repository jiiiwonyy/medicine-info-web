import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

const reportItems = [
  { title: '환자 기본정보', desc: '연령, 성별, 상태 등' },
  { title: '의약품 정보', desc: '제품명, 성분명, 투여 방법·기간' },
  { title: '이상사례 내용', desc: '발현 시점, 증상, 결과 등' },
  { title: '보고자 정보', desc: '의사·약사·간호사·환자·보호자 등' },
  { title: '첨부자료', desc: '검사결과, 진단서 등 필요 시 첨부 가능' },
];

export default function ReportItemsSection() {
  return (
    <section>
      <h2
        className={cn(
          textStyles.titleMd,
          'mb-4 text-fg border-b border-border pb-2',
        )}
      >
        보고 시 작성 항목
      </h2>

      <p className={cn(textStyles.bodyMd, 'mb-6')}>
        부작용 보고를 위해 사이트에 접속하면 아래와 같은 항목들을 입력하게
        됩니다.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportItems.map((item, idx) => (
          <li
            key={idx}
            className="flex flex-col p-4 rounded bg-muted/30 border border-border/50"
          >
            <strong className={cn(textStyles.titleSm, 'text-primary-700 mb-1')}>
              {item.title}
            </strong>
            <span className={cn(textStyles.bodyMd)}>{item.desc}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
