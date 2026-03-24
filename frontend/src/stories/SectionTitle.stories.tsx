import type { Meta, StoryObj } from '@storybook/react-vite';
import SectionTitle from '@/components/ui/SectionTitle';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';

const meta: Meta<typeof SectionTitle> = {
  title: 'UI/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
  args: {
    children: '이상사례 보고 현황',
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <SectionTitle>기본 정보</SectionTitle>
      <SectionTitle>성분 및 함량</SectionTitle>
      <SectionTitle>효능·효과</SectionTitle>
      <SectionTitle>용법·용량</SectionTitle>
    </div>
  ),
};

// SectionNumberHeader를 같은 파일에 포함
export const NumberHeader: StoryObj<typeof SectionNumberHeader> = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SectionNumberHeader number={1} title="복용 방법" />
      <SectionNumberHeader number={2} title="주의사항 확인" />
      <SectionNumberHeader number={3} title="이상반응 모니터링" />
    </div>
  ),
};
