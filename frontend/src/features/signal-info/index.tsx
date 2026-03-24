import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useSignalInfos } from '@/features/signal-info/hooks/useSignalInfos';
import type { SignalInfoTabKey } from '@/features/signal-info/types';
import SignalInfoInfoTab from '@/features/signal-info/components/SignalInfoTab';
import SignalInfoPublishTab from '@/features/signal-info/components/SignalInfoPublishTab';

export default function SignalInfoPage() {
  const s = useSignalInfos();

  return (
    <PageLayout title="의약품 이상반응(실마리) 정보">
      <Tabs
        value={s.activeTab}
        onValueChange={(val) => s.setActiveTab(val as SignalInfoTabKey)}
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

        <TabsContent value="info" className="mt-0">
          <SignalInfoInfoTab />
        </TabsContent>

        <TabsContent value="publish" className="mt-0">
          <SignalInfoPublishTab
            total={s.total}
            qInput={s.qInput}
            setQInput={s.setQInput}
            isLoading={s.isLoading}
            isError={s.isError}
            actionError={s.actionError}
            onSearch={s.onSearch}
            displayItems={s.displayItems}
            hasMore={s.hasMore}
            loadMore={s.loadMore}
            isFetchingMore={s.isFetchingMore}
            onView={s.onView}
            onDownload={s.onDownload}
          />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
