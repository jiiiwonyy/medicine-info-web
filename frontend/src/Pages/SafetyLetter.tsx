import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/PageLayout';
import {
  fetchSafetyLetters,
  fetchSafetyLetterDownloadUrl,
} from '@/api/safetyLetters';
import type { SafetyLetter as SafetyLetterType } from '@/types/safetyLetter';

type TabKey = 'info' | 'publish';

export default function SafetyLetter() {
  const [activeTab, setActiveTab] = useState<TabKey>('info');

  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['safetyLetters', { q, offset, limit }],
    queryFn: () => fetchSafetyLetters({ q, offset, limit }),
    placeholderData: (previousData) => previousData,
    enabled: activeTab === 'publish',
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;

  const rangeText = useMemo(() => {
    if (activeTab !== 'publish') return '';
    if (total === 0) return '0 / 0';
    const start = offset + 1;
    const end = Math.min(offset + limit, total);
    return `${start} - ${end} / ${total}`;
  }, [activeTab, offset, limit, total]);

  const onSearch = () => {
    setOffset(0);
    setQ(qInput.trim());
  };

  const onDownload = async (letterId: number, fileIndex: number) => {
    const { url } = await fetchSafetyLetterDownloadUrl({ letterId, fileIndex });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <PageLayout title="의약품 안전성서한(속보)">
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
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
          <div className="font-semibold text-lg">
            의약품 안전성서한(속보)란?
          </div>

          <div className="mt-4">
            <p className="mb-6">
              식품의약품안전처가 의약품 사용 중 발생할 수 있는{' '}
              <span className="font-semibold">중대한 부작용</span>이나{' '}
              <span className="font-semibold">
                안전성과 관련된 새로운 정보 및 조치사항
              </span>
              을 의료 전문가와 일반인에게{' '}
              <span className="font-semibold">신속·명확하게 안내</span>하기 위해
              발행하는 공식 문서입니다.
            </p>

            <h3 className="text-xl font-semibold mb-2">최근 발행 현황</h3>
            <table className="w-full border-collapse border border-gray-300 mb-6 text-center">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-300 py-2 px-4">연도</th>
                  <th className="border border-gray-300 py-2 px-4">건수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 py-2 px-4">2025년</td>
                  <td className="border border-gray-300 py-2 px-4">1건</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 py-2 px-4">2024년</td>
                  <td className="border border-gray-300 py-2 px-4">4건</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 py-2 px-4">2023년</td>
                  <td className="border border-gray-300 py-2 px-4">17건</td>
                </tr>
                <tr className="bg-blue-100 font-semibold">
                  <td className="border border-gray-300 py-2 px-4">
                    최근 총계
                  </td>
                  <td className="border border-gray-300 py-2 px-4">22건</td>
                </tr>
              </tbody>
            </table>

            <h3 className="text-xl font-semibold mb-2">
              안전성 서한 확인 방법
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>메인 화면에서 바로 확인</li>
              <li>
                메뉴 경로:{' '}
                <span className="font-semibold">
                  고시/공고/알림 → 안전성 정보 → 안전성 서한(속보)
                </span>
              </li>
            </ul>
            <a
              href="https://nedrug.mfds.go.kr/pbp/CCBAC01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-sky-700 text-white font-semibold px-5 py-2 rounded hover:bg-sky-900 transition mb-8"
            >
              🔗 안전성 서한 바로가기
            </a>

            <h3 className="text-xl font-semibold mb-2">검색 예시</h3>
            <div className="border border-gray-300 bg-gray-50 p-4 rounded mb-2 text-sm">
              <p>
                검색창에서 <span className="font-semibold">“리도카인”</span>{' '}
                입력
              </p>
              <div className="bg-white border border-gray-300 rounded p-3 my-3">
                2009-01-20 | 리도카인 주사제 안전성 서한 <br />
                국소마취제 “리도카인 등 4개 성분” 함유 외용제제 관련 안전성서한
                배포
              </div>
              <p>
                상세내역 클릭 시 →{' '}
                <strong>제목 / 공개일자 / 상세정보 / PDF 다운로드</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          📰 PUBLISH TAB
         ========================= */}
      {activeTab === 'publish' && (
        <>
          {/* ✅ 검색바 */}
          <div className="flex gap-2 mb-4">
            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSearch();
              }}
              placeholder="제목/요약에서 검색 (예: 리도카인)"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
            <button
              onClick={onSearch}
              className="bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg hover:bg-sky-900 transition"
            >
              검색
            </button>
          </div>

          {/* ✅ 리스트 헤더 */}
          <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
            <div>
              검색어: {q ? <span className="font-semibold">{q}</span> : '-'}
            </div>
            <div>{rangeText}</div>
          </div>

          {/* ✅ 리스트 */}
          <div className="space-y-3">
            {isLoading && <div className="text-gray-600">불러오는 중...</div>}
            {isError && (
              <div className="text-red-600">목록을 불러오지 못했습니다.</div>
            )}

            {!isLoading && items.length === 0 && (
              <div className="text-gray-500 border border-dashed border-gray-300 rounded-lg p-6 text-center">
                검색 결과가 없습니다.
              </div>
            )}

            {items.map((it) => (
              <SafetyLetterCard key={it.id} item={it} onDownload={onDownload} />
            ))}
          </div>

          {/* ✅ 페이지네이션 */}
          <div className="flex justify-between mt-6">
            <button
              disabled={offset === 0}
              onClick={() => setOffset((v) => Math.max(0, v - limit))}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40"
            >
              이전
            </button>
            <button
              disabled={offset + limit >= total}
              onClick={() => setOffset((v) => v + limit)}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40"
            >
              다음
            </button>
          </div>
        </>
      )}
    </PageLayout>
  );
}

function SafetyLetterCard({
  item,
  onDownload,
}: {
  item: SafetyLetterType;
  onDownload: (letterId: number, fileIndex: number) => Promise<void>;
}) {
  const files = item.files ?? [];

  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-bold text-base break-words">{item.title}</div>
          <div className="text-sm text-gray-600 mt-1">
            {item.notice_date ?? '-'} · {item.department ?? '-'}
          </div>
        </div>
        <div className="text-xs text-gray-500 shrink-0">
          첨부 {files.length}개
        </div>
      </div>

      {item.summary && (
        <p className="text-sm text-gray-800 mt-3 whitespace-pre-line">
          {item.summary}
        </p>
      )}

      <div className="mt-3 space-y-2">
        {files.length === 0 ? (
          <div className="text-sm text-gray-500">첨부파일 없음</div>
        ) : (
          files.map((f, idx) => (
            <button
              key={`${item.id}-${idx}`}
              onClick={() => onDownload(item.id, idx)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
            >
              <span className="text-sm truncate">{f.original_name}</span>
              <span className="text-xs text-gray-500">
                {Math.round((f.size ?? 0) / 1024)} KB · 다운로드
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
