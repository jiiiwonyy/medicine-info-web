import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import Callout from '@/components/ui/Callout';
import ItemTitle from '@/components/ui/ItemTitle';

const preventableData = [
  { name: '예방 가능', value: 67, fill: 'rgb(var(--primary))' },
  { name: '예방 불가', value: 33, fill: 'rgb(var(--border))' },
];

const hospitalizationData = [
  { name: '투약 오류 관련', value: 6.5, fill: 'rgb(var(--danger))' },
  { name: '일반 입원', value: 93.5, fill: 'rgb(var(--border))' },
];

function PreventableDonutPanel() {
  return (
    <Card variant="outlined" padding="lg" className="shadow-sm flex flex-col">
      <div className="mb-1">
        <p
          className={cn(
            textStyles.captionMd,
            'text-muted-fg font-medium uppercase tracking-wide',
          )}
        >
          WHO, 2022
        </p>
        <ItemTitle className="text-fg mt-0.5">
          투약 오류의 예방 가능성
        </ItemTitle>
        <p className={cn(textStyles.bodySm, 'text-muted-fg mt-1')}>
          투약 오류 중 우리가 막을 수 있었던 건은 얼마나 될까요?
        </p>
      </div>

      <div className="h-64 w-full mt-4 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={preventableData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={105}
              dataKey="value"
              paddingAngle={3}
              startAngle={90}
              endAngle={-270}
            >
              {preventableData.map((entry, index) => (
                <Cell key={`prev-cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | string | undefined) => [
                `${value ?? ''}%`,
                '',
              ]}
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            />
            <Legend iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <Callout>
        3분의 2가 예방 가능하다는 것은 시스템과 주의를 통해 대다수의 사고를 막을
        수 있다는 희망적인 메시지입니다.
      </Callout>
    </Card>
  );
}

function HospitalizationBarPanel() {
  return (
    <Card variant="outlined" padding="lg" className="shadow-sm flex flex-col">
      <div className="mb-1">
        <p
          className={cn(
            textStyles.captionMd,
            'text-muted-fg font-medium uppercase tracking-wide',
          )}
        >
          의료 오류 발생 빈도
        </p>
        <ItemTitle className="text-fg mt-0.5">
          치료 과정 중 투약의 비중과 위험도
        </ItemTitle>
        <p className={cn(textStyles.bodySm, 'text-muted-fg mt-1')}>
          병원 입원 원인 분석 — 전체 입원 중 투약 오류 관련 비율 (6~7%)
        </p>
      </div>

      <div className="h-64 w-full mt-4 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={hospitalizationData}
            margin={{ top: 8, right: 48, left: 8, bottom: 8 }}
            barCategoryGap="40%"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="name" width={110} />
            <Tooltip
              formatter={(value: number | string | undefined) => [
                `${value ?? ''}%`,
                '',
              ]}
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={36}>
              {hospitalizationData.map((entry, index) => (
                <Cell key={`hosp-cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Callout>
        투약은 치료 과정 중 가장 큰 영역을 차지하며, 그만큼 오류 발생의 빈도도
        가장 높습니다.
      </Callout>
    </Card>
  );
}

export default function MedicationErrorChartsSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <PreventableDonutPanel />
      <HospitalizationBarPanel />
    </div>
  );
}
