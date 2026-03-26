import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1" className="flex-1">💊 안전한 투약 전략</TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">💬 효과적인 의사소통</TabsTrigger>
        <TabsTrigger value="tab3" className="flex-1">📋 사례 학습</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="p-4 text-sm">안전한 투약 전략 내용입니다.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="p-4 text-sm">효과적인 의사소통 내용입니다.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="p-4 text-sm">사례 학습 내용입니다.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="domestic">
      <TabsList>
        <TabsTrigger value="domestic" className="flex-1">국내</TabsTrigger>
        <TabsTrigger value="international" className="flex-1">해외</TabsTrigger>
      </TabsList>
      <TabsContent value="domestic">
        <p className="p-4 text-sm">국내 이상사례 데이터입니다.</p>
      </TabsContent>
      <TabsContent value="international">
        <p className="p-4 text-sm">해외 이상사례 데이터입니다.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const FourTabs: Story = {
  name: '탭 4개',
  render: () => (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a" className="flex-1">개요</TabsTrigger>
        <TabsTrigger value="b" className="flex-1">효능·효과</TabsTrigger>
        <TabsTrigger value="c" className="flex-1">용법·용량</TabsTrigger>
        <TabsTrigger value="d" className="flex-1">주의사항</TabsTrigger>
      </TabsList>
      <TabsContent value="a"><p className="p-4 text-sm">개요 내용입니다.</p></TabsContent>
      <TabsContent value="b"><p className="p-4 text-sm">효능·효과 내용입니다.</p></TabsContent>
      <TabsContent value="c"><p className="p-4 text-sm">용법·용량 내용입니다.</p></TabsContent>
      <TabsContent value="d"><p className="p-4 text-sm">주의사항 내용입니다.</p></TabsContent>
    </Tabs>
  ),
};
