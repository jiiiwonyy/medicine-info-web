import { useEffect, useMemo, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import {
  fetchSignalInfos,
  fetchSignalInfoDownloadUrl,
  fetchSignalInfoViewUrl,
} from '@/api/signalInfo';
import type { SignalInfoItem } from '@/types/signalInfo';
import Spinner from '@/components/Spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

const LIMIT = 20;

function extractDocNo(title: string) {
  const m = title.match(/\b(KSC|KSPC)[\s-]*\d{4}[-–]\d+\s*호\b/i);
  return m?.[0]?.replace(/\s+/g, ' ') ?? null;
}

function trimDocNo(title: string) {
  const docNo = extractDocNo(title);
  if (!docNo) return title;
  return title
    .replace(docNo, '')
    .replace(/^[\s.\-–]+/, '')
    .trim();
}

type TabKey = 'info' | 'publish';

export default function SignalInfo() {
  // ===== 탭 =====
  const [activeTab, setActiveTab] = useState<TabKey>('info');

  // ===== 발행 현황(list) state =====
  const [q, setQ] = useState('');
  const [items, setItems] = useState<SignalInfoItem[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const hasMore = offset < total;

  const loadFirst = async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = await fetchSignalInfos({
        limit: LIMIT,
        offset: 0,
        q: q.trim() || undefined,
      });
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
      setOffset((data.items ?? []).length);
    } catch (e: any) {
      setErr(e?.message ?? '목록을 불러오지 못했어요.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setErr(null);
    try {
      const data = await fetchSignalInfos({
        limit: LIMIT,
        offset,
        q: q.trim() || undefined,
      });
      setItems((prev) => [...prev, ...(data.items ?? [])]);
      setTotal(data.total ?? 0);
      setOffset((prev) => prev + (data.items ?? []).length);
    } catch (e: any) {
      setErr(e?.message ?? '더 보기를 불러오지 못했어요.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ publish 탭으로 처음 이동할 때만 1회 로드
  useEffect(() => {
    if (activeTab !== 'publish') return;
    if (items.length > 0 || loading) return; // 이미 로드했으면 스킵
    loadFirst();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await loadFirst();
  };

  const onView = async (signalId: number) => {
    try {
      setErr(null);
      const { url } = await fetchSignalInfoViewUrl({ signalId });
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (e: any) {
      setErr(e?.message ?? '원문을 열 수 없어요.');
    }
  };

  const onDownload = async (signalId: number) => {
    try {
      setErr(null);
      const { url } = await fetchSignalInfoDownloadUrl({ signalId });
      window.location.href = url;
    } catch (e: any) {
      setErr(e?.message ?? '다운로드를 시작할 수 없어요.');
    }
  };

  const displayItems = useMemo(() => {
    return items.map((it) => ({
      ...it,
      docNo: extractDocNo(it.title),
      mainTitle: trimDocNo(it.title),
    }));
  }, [items]);

  return (
    <PageLayout title="의약품 이상반응(실마리) 정보">
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as TabKey)}
        className="w-full"
      >
        <div className="sticky top-0 z-40 -mx-4 px-4 pt-2 pb-4 bg-white/90 backdrop-blur">
          <TabsList className="w-full grid grid-cols-2 h-12">
            <TabsTrigger value="info" className="text-base">
              ℹ️ 정보
            </TabsTrigger>
            <TabsTrigger value="publish" className="text-base">
              📰 발행 현황
            </TabsTrigger>
          </TabsList>
        </div>

        {/* =========================
            ℹ️ INFO TAB
           ========================= */}
        <TabsContent value="info" className="mt-0">
          <div className="space-y-12">
            {/* Section 1: Definition */}
            <section className="bg-sky-50 rounded-2xl p-8 border border-sky-100">
              <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-sky-100">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    🔍 실마리정보 (Signal)
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    약물과 이상사례 간{' '}
                    <strong className="text-sky-700">
                      새로운 잠재적 인과관계
                    </strong>{' '}
                    또는 알려진 관계의 새로운 측면을 제시하는 정보로, 분석할
                    만한 가치가 있는 정보를 의미합니다. 관계가 반드시 유해한
                    것에만 국한되지는 않습니다.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-sky-100">
                  <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    📢 실마리 소식지
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    KAERS(한국의약품안전관리원 이상사례 보고시스템) 데이터를
                    분석하여, 식약처가 안전성 검토 및 조치를 진행한 결과를
                    <strong className="text-sky-700">
                      의료인과 국민에게 제공하는 공식 소식지
                    </strong>
                    입니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div>
                <div className="flex justify-center items-end mb-12 relative h-72">
                  <div className="absolute bottom-0 w-72 h-72 bg-gray-100 rounded-full border border-gray-200" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(16rem-20px)] text-center text-black z-30">
                    <p className="font-semibold text-lg">부작용</p>
                    <p className="text-sm opacity-90">Side Effect</p>
                  </div>

                  <div className="absolute bottom-0 w-56 h-56 bg-sky-100 rounded-full border border-gray-200" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(12rem-20px)] text-center text-black z-30">
                    <p className="font-semibold text-base">이상사례</p>
                    <p className="text-sm opacity-90">Adverse Event</p>
                  </div>

                  <div className="absolute bottom-0 w-40 h-40 bg-sky-600 rounded-full border border-gray-200" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(5rem-20px)] text-center text-white z-30">
                    <p className="font-semibold text-sm">약물이상반응</p>
                    <p className="text-xs opacity-90">Adverse Drug Reaction</p>
                  </div>
                </div>
              </div>

              {/* Definitions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-100 p-6 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-2">1. 부작용</h4>
                  <p className="text-sm text-gray-500 mb-1">Side Effect</p>
                  <p className="text-gray-700 leading-relaxed">
                    의약품 등을 정상적인 용량에 따라 투여할 경우 발생하는{' '}
                    <strong className="text-gray-900">
                      모든 의도되지 않은 효과
                    </strong>{' '}
                    (유익한 효과 포함)
                  </p>
                </div>

                <div className="bg-sky-100 p-6 rounded-xl border border-sky-100">
                  <h4 className="font-bold text-sky-900 mb-2">
                    2. 이상사례 (AE)
                  </h4>
                  <p className="text-sm text-sky-600 mb-1">Adverse Event</p>
                  <p className="text-gray-700 leading-relaxed">
                    의약품 투여 중 발생한 바람직하지 않은 징후, 증상, 질병.
                    <span className="block mt-1 text-sky-700">
                      *약물과 반드시 인과관계가 입증된 것은 아님
                    </span>
                  </p>
                </div>

                <div className="bg-sky-600 p-6 rounded-xl text-white shadow-md">
                  <h4 className="font-bold text-white mb-2">
                    3. 약물이상반응 (ADR)
                  </h4>
                  <p className="text-sm text-white mb-1">
                    Adverse Drug Reaction
                  </p>
                  <p className="text-white leading-relaxed">
                    정상적인 용법에도 불구하고 발생한 해롭고 예기치 못한 반응.
                    인과관계가 어느 정도 입증된 경우를 말함.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Check Path */}
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                실마리정보 확인 및 관련 사이트
              </h3>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                <h4 className="font-bold text-gray-800 mb-4">
                  📢 확인 경로 안내
                </h4>
                <ol className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      <strong>한국의약품안전관리원(KIDS)</strong> 홈페이지 접속
                      → 상단 메뉴 <strong>[안전정보공개]</strong> 선택
                    </p>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      안전정보공개 메뉴 내{' '}
                      <strong>[KIDS 실마리정보 알리미]</strong> 클릭 →
                      의약품안전나라 자동 연동
                    </p>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center text-sm font-bold">
                      3
                    </span>
                    <p className="text-gray-700 mt-0.5">
                      의약품안전나라 사이트에서{' '}
                      <strong>최신 실마리 정보 및 소식지 PDF</strong> 확인
                    </p>
                  </li>
                </ol>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://nedrug.mfds.go.kr/bbs/3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-sky-900 transition shadow-sm hover:shadow-md"
                >
                  <span>🔗</span> 의약품안전나라 실마리정보 바로가기
                </a>
                <a
                  href="https://www.drugsafe.or.kr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white text-gray-700 border border-gray-300 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition shadow-sm hover:shadow-md"
                >
                  <span>🏢</span> 한국의약품안전관리원 홈
                </a>
              </div>
            </section>
          </div>
        </TabsContent>

        {/* =========================
            📰 PUBLISH TAB
           ========================= */}
        <TabsContent value="publish" className="mt-0">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xl font-semibold">최근 발행 현황</h3>
            <p className="text-sm text-gray-600">
              총 <span className="font-semibold">{total}</span>건
            </p>
          </div>

          <form onSubmit={onSearch} className="flex gap-2 mb-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="제목 검색 (예: KSC, KSPC, 성분명 등)"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
            <button
              type="submit"
              className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition disabled:opacity-60"
              disabled={loading}
            >
              검색
            </button>
          </form>

          {err && (
            <div className="mb-4 border border-red-200 bg-red-50 text-red-700 rounded-lg p-3 text-sm">
              {err}
            </div>
          )}

          <div className="w-full mb-4 text-left rounded-lg overflow-hidden">
            <div className="space-y-3 mb-4">
              {displayItems.length === 0 && !loading ? (
                <div className="p-6 text-center text-gray-500 border rounded-2xl bg-gray-50">
                  검색 결과가 없어요.
                </div>
              ) : (
                displayItems.map((it: any) => (
                  <div
                    key={it.id}
                    className="border border-gray-300 rounded-2xl bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3"
                  >
                    {/* 제목 + 날짜 */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 leading-snug break-words">
                          {it.mainTitle}
                        </p>
                        {it.created_at && (
                          <p className="text-xs text-gray-500 mt-1">
                            등록: {new Date(it.created_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {/* 액션 */}
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          onClick={() => onView(it.id)}
                          className="px-3 py-1.5 rounded-xl bg-sky-700 text-white font-semibold hover:bg-sky-900 transition"
                        >
                          보기
                        </button>
                        <button
                          type="button"
                          onClick={() => onDownload(it.id)}
                          className="px-3 py-1.5 rounded-xl border border-gray-300 text-gray-800 font-semibold hover:bg-gray-50 transition"
                        >
                          다운로드
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-center">
            {hasMore ? (
              <button
                type="button"
                onClick={loadMore}
                disabled={loading}
                className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition disabled:opacity-60"
              >
                {loading ? <Spinner /> : '더 보기'}
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                {loading ? <Spinner /> : '마지막 항목이에요.'}
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
