import { regionalTableData } from '@/features/adverse-event-domestic/data/adverseEventData';
import SectionHeading from './SectionHeading';
import StatCard from './StatCard';

export default function RegionalReportTable() {
  return (
    <div className="mb-10">
      <SectionHeading>
        🏢 지역의약품안전센터 의약품등 이상사례 보고 현황
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

        <p className="text-xs text-muted-fg mt-4 text-right">* (단위: 건)</p>
      </StatCard>
    </div>
  );
}
