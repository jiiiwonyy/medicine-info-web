import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@/components/ui/Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '저장',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: '취소',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: '더보기',
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: '검색',
  },
};

export const Loading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: '저장 중...',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: '비활성화',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="primary" size="sm">
        Small
      </Button>
      <Button variant="primary" isLoading>
        Loading
      </Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
    </div>
  ),
};
