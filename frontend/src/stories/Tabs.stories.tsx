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
        <TabsTrigger value="tab1">기본 정보</TabsTrigger>
        <TabsTrigger value="tab2">성분 정보</TabsTrigger>
        <TabsTrigger value="tab3">주의사항</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="p-4 text-sm">기본 정보 내용입니다.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="p-4 text-sm">성분 정보 내용입니다.</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="p-4 text-sm">주의사항 내용입니다.</p>
      </TabsContent>
    </Tabs>
  ),
};

export const TwoTabs: Story = {
  render: () => (
    <Tabs defaultValue="domestic">
      <TabsList>
        <TabsTrigger value="domestic">국내</TabsTrigger>
        <TabsTrigger value="international">해외</TabsTrigger>
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
