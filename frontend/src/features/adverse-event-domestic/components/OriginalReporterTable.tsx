import { originalReporterData } from '@/features/adverse-event-domestic/data/adverseEventData';
import SectionHeading from './SectionHeading';
import StatCard from './StatCard';

export default function OriginalReporterTable() {
  return (
    <div className="mb-10">
      <SectionHeading>🧑‍⚕️ 최초 원보고자 자격별 보고 현황</SectionHeading>

      <StatCard className="overflow-x-auto">
        <table className="w-full text-left text-muted-fg border-collapse min-w-[700px]">
          <thead className="text-fg uppercase bg-muted border-b">
            <tr>
              <th className="px-4 py-3 border-r text-center font-bold">연도</th>
              <th className="px-3 py-3 border-r text-center font-semibold">
                의사
              </th>
              <th className="px-3 py-3 border-r text-center font-semibold">
                약사
              </th>
              <th className="px-3 py-3 border-r text-center font-semibold">
                간호사
              </th>
              <th className="px-3 py-3 border-r text-center font-semibold text-muted-fg">
                기타
                <br />
                의료인
              </th>
              <th className="px-3 py-3 border-r text-center font-semibold text-muted-fg">
                소비자
              </th>
              <th className="px-3 py-3 border-r text-center font-semibold text-muted-fg">
                기타
              </th>
              <th className="px-4 py-3 text-center font-bold bg-muted">합계</th>
            </tr>
          </thead>

          <tbody>
            {originalReporterData.map((row) => (
              <tr key={row.year} className="bg-surface border-b hover:bg-muted">
                <td className="px-4 py-3 border-r text-center font-bold text-fg">
                  {row.year}
                </td>

                <td className="px-3 py-3 border-r text-right font-bold bg-info-50/40 text-info-700">
                  {row.doctor.toLocaleString()}
                </td>
                <td className="px-3 py-3 border-r text-right font-bold bg-info-50/40 text-info-700">
                  {row.pharmacist.toLocaleString()}
                </td>
                <td className="px-3 py-3 border-r text-right font-bold bg-info-50/40 text-info-700">
                  {row.nurse.toLocaleString()}
                </td>

                <td className="px-3 py-3 border-r text-right">
                  {row.otherMed.toLocaleString()}
                </td>
                <td className="px-3 py-3 border-r text-right">
                  {row.consumer.toLocaleString()}
                </td>
                <td className="px-3 py-3 border-r text-right">
                  {(row.otherOrg + row.lawyer + row.unknown).toLocaleString()}
                </td>

                <td className="px-4 py-3 text-right font-extrabold text-fg bg-muted/60">
                  {row.total.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-xs text-muted-fg mt-4 text-right">
          * 기타: 변호사, 유관기관, 모름 등 포함 (단위: 건)
        </p>
      </StatCard>
    </div>
  );
}
