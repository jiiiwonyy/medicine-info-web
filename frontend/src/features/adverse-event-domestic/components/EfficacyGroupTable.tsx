import { efficacyGroupData } from '@/features/adverse-event-domestic/data/adverseEventData';
import SectionHeading from './SectionHeading';
import StatCard from './StatCard';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';
import Callout from '@/components/ui/Callout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function EfficacyGroupTable() {
  return (
    <div className="mb-10">
      <SectionNumberHeader
        title="효능군별 이상사례 보고 현황"
        number="5"
        className="mb-4"
      />
      <Callout className="mb-4">
        하나의 이상사례 보고서에는 여러 개의 의약품이 보고될 수 있으며,
        의심약물, 병용약물, 상호작용약물, 비투여약물로 구분하여 보고할 수 있으나
        최소 1개의 의심약물 혹은 상호작용약물이 포함되어야 한다. 동일한 환자에
        대한 이상사례 보고가 여러 번 추적 보고된 경우, 한 사례에 대 해 동일한
        약물이 여러 번 중복하여 산출될 수 있으므로, 최초보고 기준으로
        산출하였다. 국내 시판 중인 의약품등은 식품의약품안전처예규 ⌜의약품등
        분류번호에 관한 규정⌟에 따라 품목별로 분류번호가 부여되어 있으며,
        분류번호에 따라 효능군 을 분류하였다. 단, 품목이 아닌 성분으로 보고된
        경우는 분류번호를 부여할 수 없어 제외되었다.
      </Callout>

      <SectionHeading>
        💊 효능군별 의약품등 이상사례 보고 현황(상위 10개)
      </SectionHeading>

      <StatCard className="overflow-x-auto">
        <table className="w-full text-left text-muted-fg border-collapse min-w-[800px]">
          <thead className="text-fg uppercase bg-muted border-b">
            <tr>
              <th
                rowSpan={2}
                className="px-4 py-3 border-r text-center font-bold"
              >
                순위
              </th>
              <th
                colSpan={3}
                className="px-4 py-2 border-r text-center font-bold"
              >
                2023년
              </th>
              <th colSpan={3} className="px-4 py-2 text-center font-bold">
                2024년
              </th>
            </tr>
            <tr className="bg-primary-50/50">
              <th className="px-4 py-2 border-r text-center font-semibold text-muted-fg whitespace-nowrap">
                효능군*
              </th>
              <th className="px-4 py-2 border-r text-center font-semibold text-muted-fg whitespace-nowrap">
                보고건수**
              </th>
              <th className="px-4 py-2 border-r text-center font-semibold text-muted-fg whitespace-nowrap">
                비율***
              </th>
              <th className="px-4 py-2 border-r text-center font-semibold text-muted-fg whitespace-nowrap">
                효능군*
              </th>
              <th className="px-4 py-2 border-r text-center font-semibold text-muted-fg whitespace-nowrap">
                보고건수**
              </th>
              <th className="px-4 py-2 text-center font-semibold text-muted-fg whitespace-nowrap">
                비율***
              </th>
            </tr>
          </thead>
          <tbody>
            {efficacyGroupData.map((row) => (
              <tr key={row.rank} className="bg-surface border-b hover:bg-muted">
                <td className="px-4 py-3 border-r text-center font-bold text-fg">
                  {row.rank}
                </td>
                <td className="px-4 py-3 border-r text-fg font-medium">
                  {row.year2023.group}
                </td>
                <td className="px-4 py-3 border-r text-right font-medium">
                  {row.year2023.reports.toLocaleString()}
                </td>
                <td className="px-4 py-3 border-r text-right text-muted-fg">
                  {row.year2023.ratio.toFixed(1)}
                </td>
                <td className="px-4 py-3 border-r text-fg font-medium">
                  {row.year2024.group}
                </td>
                <td className="px-4 py-3 border-r text-right font-medium">
                  {row.year2024.reports.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right text-muted-fg">
                  {row.year2024.ratio.toFixed(1)}
                </td>
              </tr>
            ))}
            <tr className="bg-muted/30 font-bold text-fg border-b">
              <td colSpan={2} className="px-4 py-3 border-r text-center">
                합계
              </td>
              <td className="px-4 py-3 border-r text-right">268,148</td>
              <td className="px-4 py-3 border-r text-right">100.0</td>
              <td className="px-4 py-3 border-r text-center">합계</td>
              <td className="px-4 py-3 border-r text-right">253,486</td>
              <td className="px-4 py-3 text-right">100.0</td>
            </tr>
          </tbody>
        </table>

        <div
          className={cn(
            textStyles.captionMd,
            'bg-muted/20 border-t space-y-1',
            'text-muted-fg',
          )}
        >
          <div className="text-right pt-2">(단위: 건, %)</div>
          <p>
            * 식품의약품안전처예규 「의약품등 분류번호에 관한 규정」에 따른
            의약품 분류기준
          </p>
          <p>** 최초보고, 의심 및 상호작용 의약품 기준</p>
          <p className="text-muted-fg">*** 전체 보고건수에 대한 비율</p>
        </div>
      </StatCard>
    </div>
  );
}
