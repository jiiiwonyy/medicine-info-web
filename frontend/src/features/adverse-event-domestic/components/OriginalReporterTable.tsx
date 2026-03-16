import { originalReporterData } from '@/features/adverse-event-domestic/data/adverseEventData';
import SectionHeading from './SectionHeading';
import StatCard from './StatCard';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';
import Callout from '@/components/ui/Callout';

export default function OriginalReporterTable() {
  return (
    <div className="mb-10">
      <SectionNumberHeader
        title="최초 원보고자 (규제 목적 상 원보고자 ) 자격별 의약품등 이상사례 보고 현황"
        number="3"
        className="mb-4"
      />
      <Callout variant="info" className="mb-4">
        원보고자는 이상사례 보고서식에서 의사(치과의사, 한의사포함),
        약사(한약사포 함), 간호사, 기타 의료전문가, 변호사, 소비자, 기타
        비의료전문가, 기타유관기 관, 기타로 구분되어 있다. 원보고자는 보고자에게
        이상사례 정보를 제공한 사람을 의미한다. 여러 원보고자가 있는 경우, 가장
        먼저 이상사례 정보를 제공한 사람을 최초 원보고자(규제 목적 상
        원보고자)로 구분한다.
      </Callout>
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
