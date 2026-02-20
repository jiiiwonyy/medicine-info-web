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
import { domesticData } from '@/data/adverseEventData';

import SectionHeading from './SectionHeading';
import StatCard from './StatCard';

export default function YearlyReportsBarChart() {
  return (
    <div className="mb-10">
      <SectionHeading>연도별 보고 건수 현황</SectionHeading>

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
      </StatCard>

      <p className="text-xs text-muted-fg mt-4 text-right">* (단위: 건)</p>
    </div>
  );
}
