import PageLayout from '@/components/PageLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import SafeMedicationSection from '@/features/error-reduction-strategy/section/SafeMedicationSection';
import CommunicationSection from '@/features/error-reduction-strategy/section/CommunicationSection';
import CaseStudySection from '@/features/error-reduction-strategy/section/CaseStudySection';

export default function ErrorReductionStrategyPage() {
  return (
    <PageLayout title="투약 오류 감소 전략">
      <Tabs defaultValue="safe-medication" className="mt-2">
        <TabsList className="w-full">
          <TabsTrigger value="safe-medication" className="flex-1">
            💊 안전한 투약 전략
          </TabsTrigger>
          <TabsTrigger value="communication" className="flex-1">
            💬 효과적인 의사소통
          </TabsTrigger>
          <TabsTrigger value="case-study" className="flex-1">
            📋 사례 학습
          </TabsTrigger>
        </TabsList>

        <TabsContent value="safe-medication" className="mt-6 pb-10">
          <SafeMedicationSection />
        </TabsContent>

        <TabsContent value="communication" className="mt-6 pb-10">
          <CommunicationSection />
        </TabsContent>

        <TabsContent value="case-study" className="mt-6 pb-10">
          <CaseStudySection />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
}
