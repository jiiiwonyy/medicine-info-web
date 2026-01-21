import { useMemo, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import { useFaersSummaryQuery, useFaersTimeseriesQuery } from '@/hooks/useFaers';
import { useFaersSuggestQuery } from '@/api/fda';
import { useDebounce } from '@/hooks/useDebounce';
import FdaSearchBar from '../components/fda/FdaSearchBar';
import YearRangeFilter from '../components/fda/YearRangeFilter';
import TopPtList from '../components/fda/TopPtList';
import YearlyTotalChart from '../components/fda/YearlyTotalChart';
import TopPtTimeseriesChart from '../components/fda/TopPtTimeseriesChart';
import FdaSuggestModal from '../components/fda/FdaSuggestModal';
import { useEffect } from 'react';

export default function FdaPage() {
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 300);

  const [selectedDrug, setSelectedDrug] = useState<string>('');
  const [top, setTop] = useState(5);
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

  // 입력이 바뀌면(선택값과 달라지면) 다시 선택 해제
  useEffect(() => {
    if (!q.trim()) {
      setSelectedDrug('');
      setSuggestOpen(false);
      return;
    }
    if (selectedDrug && q.trim().toLowerCase() !== selectedDrug.toLowerCase()) {
      setSelectedDrug('');
    }
  }, [q]);

  // 디바운스된 값이 있고 선택이 아직 없으면 모달 자동 오픈(원치 않으면 '검색' 버튼에서만 열도록 변경 가능)
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
    top,
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
          onSubmit={() => setSuggestOpen(true)} // 검색 버튼은 '후보 보기'로
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
            setQ(drug); // 입력창도 선택값으로 고정
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

            <label className="flex items-center gap-2 text-sm">
              Top
              <select
                className="border rounded px-2 py-1"
                value={top}
                onChange={(e) => setTop(Number(e.target.value))}
              >
                {[3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              PT 표시
            </label>
          </div>
        </div>
      </div>

      {/* 상태 */}
      {!selectedDrug && (
        <div className="text-sm text-gray-600">
          약물명을 입력하면 후보를 선택할 수 있어요. 선택 후 연도별 보고 건수와 주요 PT 추이를 볼 수 있어요.
        </div>
      )}

      {loading && <div className="text-sm text-gray-600">불러오는 중…</div>}

      {error && (
        <div className="text-sm text-red-600">
          데이터를 불러오지 못했어요. (검색어/서버 상태를 확인해줘)
        </div>
      )}

      {/* 결과 */}
      {summary && timeseries && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border p-4">
              <div className="text-xs text-gray-500">선택 약물</div>
              <div className="text-lg font-semibold">{summary.drug}</div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="text-xs text-gray-500">매칭 ISR 수</div>
              <div className="text-lg font-semibold">
                {summary.matched_isr_count.toLocaleString()}
              </div>
            </div>
            <div className="rounded-xl border p-4">
              <div className="text-xs text-gray-500">Top PT 개수</div>
              <div className="text-lg font-semibold">{top}</div>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">연도별 총 보고 건수</h2>
              <div className="text-xs text-gray-500">기준: DEMO.FDA_DT</div>
            </div>
            <YearlyTotalChart data={summary.yearly_total} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border p-4">
              <h2 className="font-semibold mb-3">Top PT</h2>
              <TopPtList items={topPts.slice(0, top)} />
            </div>

            <div className="lg:col-span-2 rounded-xl border p-4">
              <h2 className="font-semibold mb-3">Top PT 연도별 추이</h2>
              <TopPtTimeseriesChart years={timeseries.years} series={timeseries.series} />
            </div>
          </div>

          <div className="rounded-xl border p-4 text-sm text-gray-700 leading-relaxed">
            <div className="font-semibold mb-2">해석 시 주의</div>
            <ul className="list-disc pl-5 space-y-1">
              <li>FAERS는 자발적 보고 데이터라 인과관계를 확정하지 않으며, 보고 편향이 존재할 수 있어요.</li>
              <li>의심약(PS/SS) 필터를 끄면 병용약(C)까지 포함되어 보고 건수가 증가할 수 있어요.</li>
              <li>동일 ISR에서 여러 PT가 함께 보고되면 각각 카운트에 포함됩니다.</li>
            </ul>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

