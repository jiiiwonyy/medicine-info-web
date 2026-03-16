import { reportTypeData } from '@/features/adverse-event-domestic/data/adverseEventData';
import SectionHeading from './SectionHeading';
import StatCard from './StatCard';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';
import Callout from '@/components/ui/Callout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function ReportTypeTable() {
  return (
    <div className="mb-10">
      <SectionNumberHeader
        title="보고 구분별 의약품등 이상사례 보고 현황"
        number="4"
        className="mb-4"
      />
      <Callout variant="info" className="mb-4">
        보고 구분은 이상사례 보고서식에서 자발적보고, 시험/연구, 모름, 기타로
        구분되어 있다. 시험/연구는 임상시험, 개별환자사용, 재심사 보고
        사용성적조사, 재심사 보고 시판 후 임 상연구, 재심사 보고 특별조사,
        기타로 구분되어 있다.
      </Callout>
      <SectionHeading>
        📋 보고 구분별 의약품등 이상사례 보고 현황
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
                자발적 보고
              </th>
              <th
                colSpan={6}
                className="px-4 py-2 border-r text-center font-bold bg-primary-50"
              >
                시험/연구
              </th>
              <th
                rowSpan={2}
                className="px-3 py-3 border-r text-center font-semibold text-muted-fg"
              >
                모름
              </th>
              <th
                rowSpan={2}
                className="px-3 py-3 border-r text-center font-semibold text-muted-fg"
              >
                기타**
              </th>
              <th
                rowSpan={2}
                className="px-4 py-3 text-center font-bold bg-muted"
              >
                합계
              </th>
            </tr>

            <tr className="bg-primary-50">
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg">
                임상시험
              </th>
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg">
                개별환자
              </th>
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg">
                재심사
              </th>
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg">
                시판후
                <br />
                임상
              </th>
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg">
                특별조사
              </th>
              <th className="px-2 py-2 border-r text-center font-semibold text-muted-fg">
                기타*
              </th>
            </tr>
          </thead>

          <tbody>
            {reportTypeData.map((row) => (
              <tr key={row.year} className="bg-surface border-b hover:bg-muted">
                <td className="px-4 py-3 border-r text-center font-bold text-fg">
                  {row.year}
                </td>

                <td className="px-4 py-3 border-r text-right font-bold bg-primary-50/50 text-primary-700">
                  {row.spontaneous.toLocaleString()}
                </td>

                <td className="px-2 py-3 border-r text-right">
                  {row.clinicalTrial.toLocaleString()}
                </td>
                <td className="px-2 py-3 border-r text-right">
                  {row.individualPatient.toLocaleString()}
                </td>
                <td className="px-2 py-3 border-r text-right">
                  {row.pms.toLocaleString()}
                </td>
                <td className="px-2 py-3 border-r text-right">
                  {row.postClinical.toLocaleString()}
                </td>
                <td className="px-2 py-3 border-r text-right">
                  {row.specialSurvey.toLocaleString()}
                </td>
                <td className="px-2 py-3 border-r text-right">
                  {row.testOther.toLocaleString()}
                </td>

                <td className="px-3 py-3 border-r text-right">
                  {row.unknown.toLocaleString()}
                </td>
                <td className="px-3 py-3 border-r text-right">
                  {row.other.toLocaleString()}
                </td>

                <td className="px-4 py-3 text-right font-extrabold text-fg bg-muted/60">
                  {row.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className={cn(textStyles.captionMd, 'mt-4 text-right')}>
          * 기타(시험/연구): 약물역학조사 등 포함 | ** 기타: 문헌 등 포함 |
          (단위: 건)
        </p>
      </StatCard>
    </div>
  );
}
