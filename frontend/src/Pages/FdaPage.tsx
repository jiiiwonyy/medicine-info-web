import { useMemo, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import {
  useFaersSummaryQuery,
  useFaersTimeseriesQuery,
} from '@/hooks/useFaers';
import { useFaersSuggestQuery } from '@/api/fda';
import { useDebounce } from '@/hooks/useDebounce';
import FdaSearchBar from '../components/fda/FdaSearchBar';
import YearRangeFilter from '../components/fda/YearRangeFilter';
import TopPtList from '../components/fda/TopPtList';
import YearlyTotalChart from '../components/fda/YearlyTotalChart';
import TopPtTimeseriesChart from '../components/fda/TopPtTimeseriesChart';
import FdaSuggestModal from '../components/fda/FdaSuggestModal';
import { useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { Card } from '@/components/ui/Card';
import { textStyles } from '@/styles/typography';
import { cn } from '@/shared/cn';

/**
 * Render the FDA(FAERS) adverse event reporting analysis page.
 *
 * Displays a searchable drug input with suggestion modal, year-range and role filters,
 * and, when a drug is selected, summary metrics, yearly totals, top PT list, top-5 PT timeseries,
 * and interpretation notes.
 *
 * @returns The React element for the FDA(FAERS) analysis UI.
 */
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
    if (canSuggest && !selectedDrug) {
      setSuggestOpen(true);
    }
  }, [canSuggest, selectedDrug]);

  const canSearch = selectedDrug.trim().length > 0;

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

  const loading = summaryQuery.isLoading || tsQuery.isLoading;
  const error = summaryQuery.error || tsQuery.error;

  const summary = summaryQuery.data;
  const timeseries = tsQuery.data;

  const topPts = useMemo(() => summary?.top_pts ?? [], [summary]);

  return (
    <PageLayout title="FDA(FAERS) 부작용 보고 분석">
      {/* 검색 영역 */}
      <div className="mb-6 space-y-4">
        <FdaSearchBar
          value={q}
          onChange={setQ}
          onSubmit={() => setSuggestOpen(true)}
          placeholder="약물명을 입력하세요 (예: bleo)"
        />

        <FdaSuggestModal
          open={suggestOpen}
          query={debouncedQ.trim()}
          items={suggestQuery.data?.items ?? []}
          loading={suggestQuery.isLoading}
          error={!!suggestQuery.error}
          onClose={() => setSuggestOpen(false)}
          onSelect={(drug) => {
            setSelectedDrug(drug);
            setQ(drug);
            setSuggestOpen(false);
          }}
        />

        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <YearRangeFilter
            yearFrom={yearFrom}
            yearTo={yearTo}
            onChange={(from, to) => {
              setYearFrom(from);
              setYearTo(to);
            }}
          />

          <div className="flex flex-wrap gap-3 items-center">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={roleOnlySuspect}
                onChange={(e) => setRoleOnlySuspect(e.target.checked)}
              />
              의심약(PS/SS)만
            </label>
          </div>
        </div>
      </div>

      {/* 상태 */}
      {!selectedDrug && (
        <div className={cn(textStyles.bodySm, 'text-muted-fg')}>
          약물명을 입력하면 후보를 선택할 수 있어요. 선택 후 연도별 보고 건수와
          주요 PT 추이를 볼 수 있어요.
        </div>
      )}

      {loading && <Spinner />}

      {error && (
        <div className="text-sm text-red-600">
          데이터를 불러오는데 실패했습니다.
        </div>
      )}

      {/* 결과 */}
      {summary && timeseries && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card variant="strong" className="md:col-span-1 w-full">
              <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>
                선택 약물
              </div>
              <div className={cn(textStyles.titleSm)}>{summary.drug}</div>
            </Card>
            <Card variant="strong" className="md:col-span-1 w-full">
              <div className={cn(textStyles.bodyMd, 'text-muted-fg')}>
                매칭 ISR 수
              </div>
              <div className={cn(textStyles.titleSm)}>
                {summary.matched_isr_count.toLocaleString()}
              </div>
            </Card>
          </div>

          <Card variant="strong">
            <div className="flex items-center justify-between mb-4">
              <h2 className={cn(textStyles.titleSm)}>연도별 총 보고 건수</h2>
              <div className={cn(textStyles.bodySm, 'text-muted-fg')}>
                기준: DEMO.FDA_DT
              </div>
            </div>
            <YearlyTotalChart data={summary.yearly_total} />
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="strong" className="md:col-span-1 w-full">
              <h2 className={cn(textStyles.titleSm, 'mb-4')}>Top PT</h2>
              <TopPtList items={topPts} />
            </Card>

            <Card variant="strong" className="md:col-span-2 w-full">
              <h2 className={cn(textStyles.titleSm, 'mb-4')}>
                Top5 PT 연도별 추이
              </h2>
              <TopPtTimeseriesChart
                years={timeseries.years}
                series={timeseries.series}
              />
            </Card>
          </div>

          <Card variant="muted">
            <div className={cn(textStyles.titleSm, 'mb-4')}>해석 시 주의</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                FAERS는 자발적 보고 데이터라 인과관계를 확정하지 않으며, 보고
                편향이 존재할 수 있어요.
              </li>
              <li>
                의심약(PS/SS) 필터를 끄면 병용약(C)까지 포함되어 보고 건수가
                증가할 수 있어요.
              </li>
              <li>
                동일 ISR에서 여러 PT가 함께 보고되면 각각 카운트에 포함됩니다.
              </li>
            </ul>
          </Card>
        </div>
      )}
    </PageLayout>
  );
}