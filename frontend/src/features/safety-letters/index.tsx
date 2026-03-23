import PageLayout from '@/components/PageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { useSafetyLetters } from '@/features/safety-letters/hooks/useSafetyLetters';
import SafetyLetterInfoTab from '@/features/safety-letters/components/SafetyLetterInfoTab';
import SafetyLetterPublishTab from '@/features/safety-letters/components/SafetyLetterPublishTab';
import type { SafetyLetterTabKey } from '@/features/safety-letters/types';

export default function SafetyLetterPage() {
  const s = useSafetyLetters();

  return (
    <PageLayout title="의약품 안전성서한(속보)">
      <Tabs
        value={s.activeTab}
        onValueChange={(val) => s.setActiveTab(val as SafetyLetterTabKey)}
        className="w-full"
      >
        <div className="sticky top-0 z-40 -mx-4 px-4 pt-2 pb-4 bg-white/90 backdrop-blur">
          <TabsList className="w-full grid grid-cols-2 h-12">
            <TabsTrigger value="info">ℹ️ 정보</TabsTrigger>
            <TabsTrigger value="publish">📰 안전성 서한 확인</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="info">
          <SafetyLetterInfoTab />
        </TabsContent>

        <TabsContent value="publish">
          <SafetyLetterPublishTab
            qInput={s.qInput}
            setQInput={s.setQInput}
            q={s.q}
            rangeText={s.rangeText}
            items={s.items}
            total={s.total}
            offset={s.offset}
            limit={s.limit}
            isLoading={s.isLoading}
            isError={s.isError}
            viewError={s.viewError}
            onSearch={s.onSearch}
            onPrev={s.onPrev}
            onNext={s.onNext}
            onView={s.onView}
          />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
