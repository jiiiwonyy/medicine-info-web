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
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {series.map((s) => (
            <Line key={s.pt} type="monotone" dataKey={s.pt} dot={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
