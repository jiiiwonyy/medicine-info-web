import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import PageLayout from '@/components/PageLayout';
import { textStyles } from '@/styles/typography';
import { cn } from '@/shared/cn';
import {
  domesticData,
  reporterData2023,
  reporterData2024,
  regionalTableData,
  originalReporterData,
  reportTypeData,
} from '@/data/adverseEventData';

/**
 * Render the domestic adverse event reports page with charts, tables, and guidance.
 *
 * Presents yearly report trends, reporter-type distributions, regional center tables,
 * reporter qualification breakdowns, report-type breakdowns, and lookup instructions
 * for external resources.
 *
 * @returns The React element for the "국내 의약품 부작용 보고자료" page.
 */
export default function AdverseEventDomestic() {
  return (
    <PageLayout title="국내 의약품 부작용 보고자료">
      {/* 소개 */}
      <div className="mb-8 space-y-2">
        <p>
          국내에서 보고된 의약품 이상사례 자료는{' '}
          <strong>한국의약품안전관리원(KIDS)</strong>을 통해 수집·관리되며,
          식품의약품안전처의 안전성 검토 및 정책에 활용됩니다.
        </p>
        <p>
          이상사례 자료는 <strong>실마리정보 탐지</strong>,{' '}
          <strong>안전성 서한 발행</strong> 등 후속 안전조치의 근거가 됩니다.
        </p>
      </div>

      {/* 보여줄 자료 */}
      <h3 className={cn(textStyles.titleLg, 'mb-3')}>제공되는 주요 통계</h3>
      <ul className={'list-disc pl-6 mb-8 space-y-1'}>
        <li>국내 의약품 부작용 보고 추이 (그래프)</li>
        <li>성별·연령대별 분포 (차트)</li>
        <li>주요 이상사례 유형 (예: 발진, 소화기계 이상, 간수치 상승 등)</li>
        <li>보고 주체별 분포 (의료인 / 제약사 / 소비자)</li>
      </ul>

      {/* 보고 추이 그래프 */}
      <div className="mb-10">
        <h4
          className={cn(
            textStyles.headingLg,
            'mb-4 border-l-4 border-primary pl-3',
          )}
        >
          연도별 보고 건수 현황
        </h4>
        <div className="h-80 w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={domesticData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 13 }} />
              <YAxis
                tickFormatter={(value) => value.toLocaleString()}
                width={80}
                tick={{ fontSize: 13 }}
              />
              <Tooltip
                formatter={(value: number | undefined) => [
                  `${value?.toLocaleString() ?? 0}건`,
                  '보고건수',
                ]}
                labelStyle={{ fontWeight: 'bold', color: '#333' }}
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar
                dataKey="reports"
                name="보고건수"
                fill="#0ea5e9"
                radius={[4, 4, 0, 0]}
                barSize={50}
              >
                <LabelList
                  dataKey="reports"
                  position="top"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => value?.toLocaleString() ?? ''}
                  style={{ fill: '#6b7280', fontSize: '12px' }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-right">* (단위: 건)</p>
      </div>

      <div className="mb-10">
        <h4
          className={cn(
            textStyles.headingLg,
            'mb-4 border-l-4 border-primary pl-3',
          )}
        >
          보고자 유형별 의약품등 이상사례 보고 현황
        </h4>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-96">
            {/* 2023 Chart */}
            <div className="flex flex-col items-center">
              <h5 className={cn(textStyles.titleSm, 'mb-2')}>2023년</h5>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reporterData2023}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reporterData2023.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(
                      value: number | undefined,
                      name: string | undefined,
                    ) => [`${value?.toLocaleString() ?? 0}건`, name ?? '']}
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 2024 Chart */}
            <div className="flex flex-col items-center">
              <h5 className={cn(textStyles.titleSm, 'mb-2')}>2024년</h5>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reporterData2024}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {reporterData2024.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(
                      value: number | undefined,
                      name: string | undefined,
                    ) => [`${value?.toLocaleString() ?? 0}건`, name ?? '']}
                    contentStyle={{
                      borderRadius: '12px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-right">
            * 의약품부작용신고센터를 통한 보고건, 질병관리청으로부터 전달받은
            보고건 등 포함 (단위: 건)
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h4
          className={cn(
            textStyles.headingLg,
            'mb-4 border-l-4 border-primary pl-3',
          )}
        >
          🏢 지역의약품안전센터 의약품등 이상사례 보고 현황
        </h4>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2 overflow-x-auto">
          <table className="w-full text-left text-gray-600 border-collapse min-w-[700px]">
            <thead className="text-gray-700 uppercase bg-gray-50 border-b">
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
                  className="px-4 py-2 border-r text-center font-bold bg-sky-50"
                  style={{ borderBottom: '1px solid #e5e7eb' }}
                >
                  지역보고
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 text-center font-bold bg-gray-100"
                >
                  합계
                </th>
              </tr>
              <tr className="bg-sky-50">
                <th
                  className="px-2 py-2 border-r text-center font-semibold text-gray-500"
                  style={{ fontSize: '0.8rem' }}
                >
                  의료전문가
                </th>
                <th
                  className="px-2 py-2 border-r text-center font-semibold text-gray-500"
                  style={{ fontSize: '0.8rem' }}
                >
                  환자/소비자
                </th>
                <th
                  className="px-2 py-2 border-r text-center font-semibold text-gray-500"
                  style={{ fontSize: '0.8rem' }}
                >
                  제약회사
                </th>
                <th
                  className="px-2 py-2 border-r text-center font-semibold text-gray-500"
                  style={{ fontSize: '0.8rem' }}
                >
                  기타
                </th>
                <th className="px-3 py-2 border-r text-center font-bold text-sky-700">
                  소계
                </th>
              </tr>
            </thead>
            <tbody>
              {regionalTableData.map((row) => (
                <tr
                  key={row.year}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 border-r text-center font-bold">
                    {row.year}
                  </td>
                  <td className="px-4 py-3 border-r text-right font-semibold text-sky-600">
                    {row.inHouse.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.regMedical.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.regConsumer.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.regPharma.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.regOther.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 border-r text-right font-bold text-sky-700 bg-sky-50/50">
                    {row.regTotal.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-extrabold text-gray-800 bg-gray-50/50">
                    {row.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-4 text-right">* (단위: 건)</p>
        </div>
      </div>

      <div className="mb-10">
        <h4
          className={cn(
            textStyles.headingLg,
            'mb-4 border-l-4 border-primary pl-3',
          )}
        >
          🧑‍⚕️ 최초 원보고자 자격별 보고 현황
        </h4>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2 overflow-x-auto">
          <table className="w-full text-left text-gray-600 border-collapse min-w-[700px]">
            <thead className="text-gray-700 uppercase bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 border-r text-center font-bold">
                  연도
                </th>
                <th className="px-3 py-3 border-r text-center font-semibold">
                  의사
                </th>
                <th className="px-3 py-3 border-r text-center font-semibold">
                  약사
                </th>
                <th className="px-3 py-3 border-r text-center font-semibold">
                  간호사
                </th>
                <th className="px-3 py-3 border-r text-center font-semibold text-gray-500">
                  기타
                  <br />
                  의료인
                </th>
                <th className="px-3 py-3 border-r text-center font-semibold text-gray-500">
                  소비자
                </th>
                <th className="px-3 py-3 border-r text-center font-semibold text-gray-500">
                  기타
                </th>
                <th className="px-4 py-3 text-center font-bold bg-gray-100">
                  합계
                </th>
              </tr>
            </thead>
            <tbody>
              {originalReporterData.map((row) => (
                <tr
                  key={row.year}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 border-r text-center font-bold">
                    {row.year}
                  </td>
                  <td className="px-3 py-3 border-r text-right text-indigo-700 font-bold bg-indigo-50/30">
                    {row.doctor.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 border-r text-right text-indigo-700 font-bold bg-indigo-50/30">
                    {row.pharmacist.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 border-r text-right text-indigo-700 font-bold bg-indigo-50/30">
                    {row.nurse.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 border-r text-right text-gray-500">
                    {row.otherMed.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 border-r text-right text-gray-500">
                    {row.consumer.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 border-r text-right text-gray-500">
                    {(row.otherOrg + row.lawyer + row.unknown).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-extrabold text-gray-800 bg-gray-50/50">
                    {row.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-4 text-right">
            * 기타: 변호사, 유관기관, 모름 등 포함 (단위: 건)
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h4
          className={cn(
            textStyles.headingLg,
            'mb-4 border-l-4 border-primary pl-3',
          )}
        >
          📋 보고 구분별 의약품등 이상사례 보고 현황
        </h4>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2 overflow-x-auto">
          <table className="w-full text-left text-gray-600 border-collapse min-w-[700px]">
            <thead className="text-gray-700 uppercase bg-gray-50 border-b">
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
                  className="px-4 py-2 border-r text-center font-bold bg-violet-50"
                  style={{ borderBottom: '1px solid #e5e7eb' }}
                >
                  시험/연구
                </th>
                <th
                  rowSpan={2}
                  className="px-3 py-3 border-r text-center font-semibold text-gray-500"
                >
                  모름
                </th>
                <th
                  rowSpan={2}
                  className="px-3 py-3 border-r text-center font-semibold text-gray-500"
                >
                  기타**
                </th>
                <th
                  rowSpan={2}
                  className="px-4 py-3 text-center font-bold bg-gray-100"
                >
                  합계
                </th>
              </tr>
              <tr className="bg-violet-50">
                <th className="px-2 py-2 border-r text-center font-semibold text-gray-500">
                  임상시험
                </th>
                <th className="px-2 py-2 border-r text-center font-semibold text-gray-500">
                  개별환자
                </th>
                <th className="px-2 py-2 border-r text-center font-semibold text-gray-500">
                  재심사
                </th>
                <th className="px-2 py-2 border-r text-center font-semibold text-gray-500">
                  시판후
                  <br />
                  임상
                </th>
                <th className="px-2 py-2 border-r text-center font-semibold text-gray-500">
                  특별조사
                </th>
                <th className="px-2 py-2 border-r text-center font-semibold text-gray-500">
                  기타*
                </th>
              </tr>
            </thead>
            <tbody>
              {reportTypeData.map((row) => (
                <tr
                  key={row.year}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-3 border-r text-center font-bold">
                    {row.year}
                  </td>
                  <td className="px-4 py-3 border-r text-right font-semibold text-violet-700 font-bold bg-violet-50/30">
                    {row.spontaneous.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.clinicalTrial.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.individualPatient.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.pms.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.postClinical.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.specialSurvey.toLocaleString()}
                  </td>
                  <td className="px-2 py-3 border-r text-right text-gray-500">
                    {row.testOther.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 border-r text-right text-gray-500">
                    {row.unknown.toLocaleString()}
                  </td>
                  <td className="px-3 py-3 border-r text-right text-gray-500">
                    {row.other.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-extrabold text-gray-800 bg-gray-50/50">
                    {row.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-4 text-right">
            * 기타(시험/연구): 약물역학조사 등 포함 | ** 기타: 문헌 등 포함 |
            (단위: 건)
          </p>
        </div>
      </div>

      {/* 조회 안내 */}
      <h3 className={cn(textStyles.titleLg, 'mb-3')}>이상사례보고 조회 안내</h3>
      <p className="mb-4">
        <strong>의약품안전나라</strong> 사이트에서 이상사례보고 동향을 직접
        확인할 수 있습니다.
      </p>
      <ol className="list-decimal pl-6 mb-6 space-y-1">
        <li>의약품안전나라 접속</li>
        <li>상단 메뉴 → 전자민원/보고 → 이상사례 → 이상사례보고 동향</li>
      </ol>
      <a
        href="https://nedrug.mfds.go.kr/bbs/2"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition"
      >
        🔗 의약품안전나라 이상사례보고동향 바로가기
      </a>
    </PageLayout>
  );
}