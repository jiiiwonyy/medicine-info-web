import type { Meta, StoryObj } from '@storybook/react-vite';
import Callout from '@/components/ui/Callout';

const meta: Meta<typeof Callout> = {
  title: 'UI/Callout',
  component: Callout,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'success', 'danger', 'note'],
    },
    dense: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: '안내',
    children: '이 약은 식후 30분에 복용하시기 바랍니다.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '주의',
    children: '임산부 또는 수유 중인 환자는 복용 전 의사와 상담하세요.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: '금기',
    children: '페니실린 계열 항생제에 과민반응이 있는 환자는 복용하지 마세요.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: '확인',
    children: '처방전이 성공적으로 등록되었습니다.',
  },
};

export const Note: Story = {
  args: {
    variant: 'note',
    title: '참고',
    children: '이 정보는 의약품 허가 사항 기준으로 작성되었습니다.',
  },
};

export const Dense: Story = {
  args: {
    variant: 'info',
    dense: true,
    children: '간략한 안내 메시지입니다.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      <Callout variant="info" title="안내">
        복용 방법을 확인하세요.
      </Callout>
      <Callout variant="warning" title="주의">
        부작용이 발생할 수 있습니다.
      </Callout>
      <Callout variant="danger" title="금기">
        이 성분에 알레르기가 있는 경우 복용 금지입니다.
      </Callout>
      <Callout variant="success" title="완료">
        처방이 완료되었습니다.
      </Callout>
      <Callout variant="note" title="참고">
        추가 정보를 확인하세요.
      </Callout>
    </div>
  ),
};
