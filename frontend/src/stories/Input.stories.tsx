import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from '@/components/ui/Input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
  },
};

export const WithError: Story = {
  args: {
    placeholder: '약품명 입력',
    hasError: true,
    defaultValue: '잘못된 입력',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 입력',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: '타이레놀',
    placeholder: '약품명 입력',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-fg">기본</label>
        <Input placeholder="검색어를 입력하세요" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-fg">값 있음</label>
        <Input defaultValue="타이레놀" placeholder="약품명 입력" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-fg">에러</label>
        <Input hasError defaultValue="잘못된 입력" placeholder="약품명 입력" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-muted-fg">비활성화</label>
        <Input disabled placeholder="비활성화된 입력" />
      </div>
    </div>
  ),
};
