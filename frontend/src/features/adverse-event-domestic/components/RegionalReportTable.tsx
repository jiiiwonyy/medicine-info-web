import { regionalTableData } from '@/features/adverse-event-domestic/data/adverseEventData';
import SectionHeading from './SectionHeading';
import StatCard from './StatCard';
import Callout from '@/components/ui/Callout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function RegionalReportTable() {
  return (
    <div className="mb-10">
      <Callout variant="info" className="mb-4">
        지역의약품안전센터는 원내뿐만 아니라 협력병원 및 의료전문가,
        환자/소비자, 제약회사 등의 이상사례 수집 및 평가를 수행하고 있다.
        지역의약품안전센터를 통해 수집되는 의료전문가, 환자/소비자, 제약회사
        등의 이상사례 보고는 지역보 고로 분류되었다. 의료전문가는 병/의원, 약국,
        보건소 등을 포함한다.
      </Callout>
      <SectionHeading>
        지역의약품안전센터 의약품등 이상사례 보고 현황
      </SectionHeading>

      <StatCard className="overflow-x-auto">
        <table className="w-full text-left text-muted-fg border-collapse min-w-[700px]">
          <thead className="text-fg uppercase bg-muted border-b">
            <tr>
              <th
                rowSpan={2}
                className="px-4 py-3 border-r text-center font-bold"
              >
                연도
              </th>
              <th
                rowSpan={2}
                className="px-4 py-3 border-r text-center font-bold"
              >
                원내보고
              </th>
              <th
                colSpan={5}
                className="px-4 py-2 border-r text-center font-bold bg-primary-50"
              >
                지역보고
              </th>
              <th
                rowSpan={2}
                className="px-4 py-3 text-center font-bold bg-muted"
              >
                합계
              </th>
            </tr>
            <tr className="bg-primary-50">
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg text-xs">
                의료전문가
              </th>
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg text-xs">
                환자/소비자
              </th>
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg text-xs">
                제약회사
              </th>
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg text-xs">
                기타
              </th>
              <th className="px-3 py-2 border-r text-center font-bold text-primary-700">
                소계
              </th>
            </tr>
          </thead>

          <tbody>
            {regionalTableData.map((row) => (
              <tr key={row.year} className="bg-surface border-b hover:bg-muted">
                <td className="px-4 py-3 border-r text-center font-bold text-fg">
                  {row.year}
                </td>
                <td className="px-4 py-3 border-r text-right font-semibold text-primary-700">
                  {row.inHouse.toLocaleString()}
                </td>
                <td className="px-2 py-3 border-r text-right">
                  {row.regMedical.toLocaleString()}
                </td>
                <td className="px-2 py-3 border-r text-right">
                  {row.regConsumer.toLocaleString()}
                </td>
                <td className="px-2 py-3 border-r text-right">
                  {row.regPharma.toLocaleString()}
                </td>
                <td className="px-2 py-3 border-r text-right">
                  {row.regOther.toLocaleString()}
                </td>
                <td className="px-3 py-3 border-r text-right font-bold text-primary-700 bg-primary-50/50">
                  {row.regTotal.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right font-extrabold text-fg bg-muted/60">
                  {row.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className={cn(textStyles.captionMd, 'mt-4 text-right')}>
          * (단위: 건)
        </p>
      </StatCard>
    </div>
  );
}
