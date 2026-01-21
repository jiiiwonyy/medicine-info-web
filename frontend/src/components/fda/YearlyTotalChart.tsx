import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function YearlyTotalChart({ data }: { data: { year: number; count: number }[] }) {
  if (!data.length) return <div className="text-sm text-gray-600">연도별 데이터가 없어요.</div>;

  return (
    <div className="h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#74a5ffff" name="보고 건수" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
