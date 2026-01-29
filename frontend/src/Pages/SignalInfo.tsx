import { useEffect, useMemo, useState } from 'react';
import PageLayout from '@/components/PageLayout';
import {
  fetchSignalInfos,
  fetchSignalInfoDownloadUrl,
  fetchSignalInfoViewUrl,
} from '@/api/signalInfo';
import type { SignalInfoItem } from '@/types/signalInfo';
import Spinner from '@/components/Spinner';

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
      <div className="sticky top-0 z-40 -mx-4 px-4 pt-2 pb-4 bg-white/90 backdrop-blur">
        <div className="w-full rounded-2xl bg-gray-100 p-1 flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={[
              'flex-1 rounded-2xl py-2 text-sm font-semibold transition',
              activeTab === 'info'
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-600 hover:text-gray-900',
            ].join(' ')}
          >
            ℹ️ 정보
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('publish')}
            className={[
              'flex-1 rounded-2xl py-2 text-sm font-semibold transition',
              activeTab === 'publish'
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-600 hover:text-gray-900',
            ].join(' ')}
          >
            📰 발행 현황
          </button>
        </div>
      </div>

      {/* =========================
          ℹ️ INFO TAB
         ========================= */}
      {activeTab === 'info' && (
        <>
          <div className="flex justify-center items-end mb-12 relative h-72">
            <div className="absolute bottom-0 w-72 h-72 bg-sky-900 rounded-full" />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(16rem-20px)] text-center text-white z-30">
              <p className="font-semibold text-lg">부작용</p>
              <p className="text-sm opacity-90">Side Effect</p>
            </div>

            <div className="absolute bottom-0 w-56 h-56 bg-sky-700 rounded-full" />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(12rem-20px)] text-center text-white z-30">
              <p className="font-semibold text-base">이상사례</p>
              <p className="text-sm opacity-90">Adverse Event</p>
            </div>

            <div className="absolute bottom-0 w-40 h-40 bg-sky-400 rounded-full" />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[calc(5rem-20px)] text-center text-white z-30">
              <p className="font-semibold text-sm">약물이상반응</p>
              <p className="text-xs opacity-90">Adverse Drug Reaction</p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="border rounded-lg p-4 bg-sky-50">
              <h2 className="text-2xl font-bold mb-4">약물이상반응이란?</h2>
              <h3 className="text-lg font-semibold mb-2">
                부작용 (Side Effect)
              </h3>
              <p>
                의약품 등을 정상적인 용량에 따라 투여할 경우 발생하는 모든
                의도되지 않은 효과
              </p>
              <br />
              <h3 className="text-lg font-semibold mb-2">
                이상사례 (AE, Adverse Event)
              </h3>
              <p>
                의약품 등의 투여·사용 중 발생한 바람직하지 않고 의도되지 아니한
                징후 (sign), 증상(symptom) 또는 질병을 말하며, 해당 의약품 등과
                반드시 인과관계를 가져야 하는 것은 아닙니다.
              </p>
              <br />
              <h3 className="text-lg font-semibold mb-2">
                의약품 이상반응 (ADR, Adverse Drug Reaction)
              </h3>
              <p>
                의약품을 정상적인 용량·용법에 따라 사용했음에도 불구하고
                발생하는 원하지 않는 해롭거나 예기치 못한 반응을 말합니다.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                예시: 발진, 어지럼증, 간수치 상승, 심각한 경우 사망까지 이어질
                수 있음
              </p>
              <br />
            </div>

            <div className="border rounded-lg p-4 bg-sky-50">
              <br />
              <h3 className="text-lg font-semibold mb-2">
                실마리정보 (Signal)
              </h3>
              <p>
                약물과 이상사례 간 새로운 잠재적 인과관계 또는 알려진 관계의
                새로운 측면을 제시하는 것으로, 분석할 만한 가치가 있는
                정보입니다. 관계가 유해한 것에 국한하지 않습니다.
              </p>
              <br />
              <h3 className="text-lg font-semibold mb-3">실마리 소식지</h3>
              <p className="mb-6">
                KAERS(한국의약품안전관리원 이상사례 보고시스템)를 통해
                수집·분석된 실마리정보를 바탕으로, 식품의약품안전처가 안전성
                검토 및 후속 조치를 진행한 결과를 정리하여 의료인과 국민에게
                제공하는 소식지입니다.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3">실마리정보 확인 경로</h3>
          <ol className="list-decimal pl-6 mb-6 space-y-1">
            <li>
              한국의약품안전관리원(KIDS) 홈페이지 접속 → 상단 메뉴에서{' '}
              <strong>“안전정보공개”</strong> 선택
            </li>
            <li>
              안전정보공개 메뉴 안의 <strong>[KIDS 실마리정보 알리미]</strong>{' '}
              클릭 → 의약품안전나라 연동
            </li>
            <li>
              의약품안전나라 사이트 이동 → 실마리정보 알리미에서 최신 정보 확인
            </li>
          </ol>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://nedrug.mfds.go.kr/bbs/3"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition"
            >
              🔗 의약품안전나라 실마리정보 바로가기
            </a>
            <a
              href="https://www.drugsafe.or.kr/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition"
            >
              🔗 한국의약품안전관리원 소식지 바로가기
            </a>
          </div>
        </>
      )}

      {/* =========================
          📰 PUBLISH TAB
         ========================= */}
      {activeTab === 'publish' && (
        <>
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
        </>
      )}
    </PageLayout>
  );
}
