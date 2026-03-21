import { useMemo, useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import Spinner from '@/components/Spinner';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

import { useDebounce } from '@/hooks/useDebounce';
import { useFaersSuggestQuery } from '@/features/fda-page/api/fda';
import {
  useFaersSummaryCountQuery,
  useFaersSummaryQuery,
  useFaersTimeseriesQuery,
} from '@/features/fda-page/hooks/useFaers';

import SearchPanel from '@/features/fda-page/section/SearchPanel';
import ResultHeaderCards from '@/features/fda-page/section/ResultHeaderCards';
import ResultChartsSection from '@/features/fda-page/section/ResultChartSection';
import ChartsSkeleton from '@/features/fda-page/section/ChartsSkeleton';
import InterpretationCard from '@/features/fda-page/section/InterpretationCard';

export default function FdaPage() {
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 300);

  const [selectedDrug, setSelectedDrug] = useState<string>('');
  const [roleOnlySuspect, setRoleOnlySuspect] = useState(true);
  const [yearFrom, setYearFrom] = useState<number | undefined>(undefined);
  const [yearTo, setYearTo] = useState<number | undefined>(undefined);

  const roleFilter = roleOnlySuspect ? 'suspect' : 'all';

  const canSuggest = debouncedQ.trim().length >= 2;
  const [suggestOpen, setSuggestOpen] = useState(false);

  const suggestQuery = useFaersSuggestQuery({
    q: debouncedQ.trim(),
    enabled: canSuggest,
    limit: 30,
  });

  useEffect(() => {
    if (!q.trim()) {
      setSelectedDrug('');
      setSuggestOpen(false);
      return;
    }
    if (selectedDrug && q.trim().toLowerCase() !== selectedDrug.toLowerCase()) {
      setSelectedDrug('');
    }
  }, [q, selectedDrug]);

  useEffect(() => {
    if (canSuggest && !selectedDrug) setSuggestOpen(true);
  }, [canSuggest, selectedDrug]);

  const canSearch = selectedDrug.trim().length > 0;

  const countQuery = useFaersSummaryCountQuery({
    drug: selectedDrug,
    enabled: canSearch,
    role_filter: roleFilter,
    year_from: yearFrom,
    year_to: yearTo,
  });

  const summaryQuery = useFaersSummaryQuery({
    drug: selectedDrug,
    enabled: canSearch,
    role_filter: roleFilter,
    year_from: yearFrom,
    year_to: yearTo,
  });

  const tsQuery = useFaersTimeseriesQuery({
    drug: selectedDrug,
    enabled: canSearch,
    role_filter: roleFilter,
    year_from: yearFrom,
    year_to: yearTo,
  });

  const chartsLoading = summaryQuery.isLoading || tsQuery.isLoading;
  const error = countQuery.error || summaryQuery.error || tsQuery.error;

  const countData = countQuery.data;
  const summary = summaryQuery.data;
  const timeseries = tsQuery.data;

  const topPts = useMemo(() => summary?.top_pts ?? [], [summary]);

  return (
    <PageLayout title="미국 FDA(FAERS) 부작용 보고 자료">
      <SearchPanel
        q={q}
        onChangeQ={setQ}
        debouncedQ={debouncedQ.trim()}
        selectedDrug={selectedDrug}
        onSelectDrug={setSelectedDrug}
        roleOnlySuspect={roleOnlySuspect}
        onChangeRoleOnlySuspect={setRoleOnlySuspect}
        yearFrom={yearFrom}
        yearTo={yearTo}
        onChangeYearRange={(from, to) => {
          setYearFrom(from);
          setYearTo(to);
        }}
        suggestOpen={suggestOpen}
        setSuggestOpen={setSuggestOpen}
        suggestItems={suggestQuery.data?.items ?? []}
        suggestLoading={suggestQuery.isLoading}
        suggestError={!!suggestQuery.error}
      />

      {error && (
        <div className={cn(textStyles.bodySm, 'text-danger-700')}>
          데이터를 불러오는데 실패했습니다.
        </div>
      )}

      {countData && (
        <div className="space-y-8">
          <ResultHeaderCards
            drug={countData.drug}
            matchedIsrCount={countData.matched_isr_count}
          />

          {chartsLoading && <ChartsSkeleton />}

          {summary && timeseries && (
            <div className="animate-fade-in-up space-y-8">
              <ResultChartsSection
                summary={summary}
                timeseries={timeseries}
                topPts={topPts}
              />
              <InterpretationCard />
            </div>
          )}
        </div>
      )}

      {!countData && countQuery.isLoading && <Spinner />}
    </PageLayout>
  );
}
