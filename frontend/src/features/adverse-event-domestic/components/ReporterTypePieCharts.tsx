import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { reporterData2023, reporterData2024 } from '@/data/adverseEventData';

import SectionHeading from './SectionHeading';
import StatCard from './StatCard';

function PieBlock({
  title,
  data,
}: {
  title: string;
  data: Array<{ name: string; value: number; fill: string }>;
}) {
  return (
    <div className="flex flex-col items-center">
      <h5 className={cn(textStyles.titleSm, 'mb-2')}>{title}</h5>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`${title}-cell-${index}`} fill={entry.fill} />
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
  );
}

export default function ReporterTypePieCharts() {
  return (
    <div className="mb-10">
      <SectionHeading>보고자 유형별 의약품등 이상사례 보고 현황</SectionHeading>

      <StatCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-96">
          <PieBlock title="2023년" data={reporterData2023} />
          <PieBlock title="2024년" data={reporterData2024} />
        </div>

        <p className="text-xs text-muted-fg mt-4 text-right">
          * 의약품부작용신고센터를 통한 보고건, 질병관리청으로부터 전달받은
          보고건 등 포함 (단위: 건)
        </p>
      </StatCard>
    </div>
  );
}
