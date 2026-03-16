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
import {
  reporterData2023,
  reporterData2024,
} from '@/features/adverse-event-domestic/data/adverseEventData';

import SectionHeading from './SectionHeading';
import StatCard from './StatCard';
import Callout from '@/components/ui/Callout';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';

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
      <SectionNumberHeader
        title="보고자 유형별 의약품등 이상사례 보고 현황"
        number="2"
        className="mb-4"
      />
      <Callout variant="info" className="mb-4">
        보고자는 이상사례보고서식에서 제약회사, 의료전문가, 지역의약품안전센터,
        환자/ 소비자, 기타로 구분되어 있다. 지역의약품안전센터는 원내뿐만 아니라
        협력병원 및 의료전문가, 환자/소비자, 제약회사 등의 이상사례 수집 및
        평가를 수행하고 있다. 지역의약품안전센터를 통해 수집되는 의료전문가,
        환자/소비자, 제약회사 등의 이상사례 보고는 지역의약품안전센터의 보고에
        포함되었다. 기타는 공공 기관이나 환자단체 등을 포함한다.
      </Callout>
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
