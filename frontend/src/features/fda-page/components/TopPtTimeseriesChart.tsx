import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

type Series = { pt: string; data: { year: number; count: number }[] };

const COLORS = [
  '#2563eb', // blue-600
  '#db2777', // pink-600
  '#d97706', // amber-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#0891b2', // cyan-600
  '#dc2626', // red-600
  '#4f46e5', // indigo-600
  '#ca8a04', // yellow-600
  '#0d9488', // teal-600
];

export default function TopPtTimeseriesChart({
  years,
  series,
}: {
  years: number[];
  series: Series[];
}) {
  if (!years.length || !series.length) {
    return <div className="text-sm text-gray-600">시계열 데이터가 없어요.</div>;
  }

  // recharts는 "wide format"이 편해서 year 기준으로 합치기
  const byYear: Record<number, any> = {};
  years.forEach((y) => (byYear[y] = { year: y }));

  series.forEach((s) => {
    s.data.forEach((p) => {
      byYear[p.year][s.pt] = p.count;
    });
  });

  const chartData = years.map((y) => byYear[y]);

  return (
    <div className="h-80 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {series.map((s, idx) => (
            <Line
              key={s.pt}
              type="monotone"
              dataKey={s.pt}
              stroke={COLORS[idx % COLORS.length]}
              dot={false}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
