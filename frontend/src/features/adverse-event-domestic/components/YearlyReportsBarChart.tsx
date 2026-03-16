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
} from 'recharts';
import { domesticData } from '@/features/adverse-event-domestic/data/adverseEventData';

import SectionHeading from './SectionHeading';
import StatCard from './StatCard';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';
import Callout from '@/components/ui/Callout';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export default function YearlyReportsBarChart() {
  return (
    <div className="mb-10">
      <SectionNumberHeader
        title="의약품등 이상사례 보고 현황"
        number="1"
        className="mb-4"
      />
      <Callout variant="info" className="mb-4">
        의약품등의 투여·사용 중 발생하였거나 알게 된 이상사례·약물이상반응에
        대하여 의사, 치과의사, 한의사, 간호사, 약사, 한약사 또는 관련단체 및
        기관 등과 환자 또는 소비자는 [식품의약품안전처 공고 제2023-057호]에 따라
        한국의약품안전 관리원으로 보고할 수 있다.
      </Callout>
      <SectionHeading className="mb-4">연도별 보고 건수 현황</SectionHeading>

      <StatCard className="p-4">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={domesticData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                fill="rgb(var(--primary))"
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
        <p className={cn(textStyles.captionMd, 'mt-4 text-right')}>
          * (단위: 건)
        </p>
      </StatCard>
    </div>
  );
}
