import { Card } from '@/components/ui/Card';

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`rounded bg-border animate-pulse ${className ?? ''}`} />
  );
}

export default function ChartsSkeleton() {
  return (
    <>
      {/* 연도별 보고 수 차트 */}
      <Card variant="strong">
        <SkeletonBlock className="w-28 h-3 mb-4" />
        <div className="flex items-end gap-2 h-[220px] px-2">
          {Array.from({ length: 14 }).map((_, i) => (
            <SkeletonBlock
              key={i}
              className="flex-1"
              style={{ height: `${30 + Math.round(Math.sin(i * 0.9 + 1) * 30 + 50)}%` } as React.CSSProperties}
            />
          ))}
        </div>
      </Card>

      {/* Top PT 목록 + 연도별 추이 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="strong" className="w-full">
          <SkeletonBlock className="w-20 h-4 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <SkeletonBlock className="h-3" style={{ width: `${55 + (i % 3) * 12}%` } as React.CSSProperties} />
                <SkeletonBlock className="w-10 h-3" />
              </div>
            ))}
          </div>
        </Card>

        <Card variant="strong" className="w-full md:col-span-2">
          <SkeletonBlock className="w-36 h-4 mb-4" />
          <SkeletonBlock className="h-[220px] w-full" />
        </Card>
      </div>
    </>
  );
}
