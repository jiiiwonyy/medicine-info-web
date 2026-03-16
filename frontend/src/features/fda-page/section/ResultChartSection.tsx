import { Card } from '@/components/ui/Card';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

import TopPtList from '@/features/fda-page/components/TopPtList';
import YearlyTotalChart from '@/features/fda-page/components/YearlyTotalChart';
import TopPtTimeseriesChart from '@/features/fda-page/components/TopPtTimeseriesChart';

type SummaryLike = {
  yearly_total: any;
};

type TimeseriesLike = {
  years: number[];
  series: any;
};

export default function ResultChartsSection({
  summary,
  timeseries,
  topPts,
}: {
  summary: SummaryLike;
  timeseries: TimeseriesLike;
  topPts: any[];
}) {
  return (
    <>
      <Card variant="strong">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(textStyles.bodySm, 'text-muted-fg')}>
            기준: DEMO.FDA_DT
          </div>
        </div>
        <YearlyTotalChart data={summary.yearly_total} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="strong" className="w-full">
          <h2 className={cn(textStyles.titleSm, 'mb-4')}>Top PT</h2>
          <TopPtList items={topPts} />
        </Card>

        <Card variant="strong" className="w-full md:col-span-2">
          <h2 className={cn(textStyles.titleSm, 'mb-4')}>
            Top5 PT 연도별 추이
          </h2>
          <TopPtTimeseriesChart
            years={timeseries.years}
            series={timeseries.series}
          />
        </Card>
      </div>
    </>
  );
}
