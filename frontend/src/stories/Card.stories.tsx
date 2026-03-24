import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '@/components/ui/Card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'muted', 'primary', 'strong'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: '기본 카드입니다.',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    padding: 'md',
    children: '테두리 카드입니다.',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: '그림자 카드입니다.',
  },
};

export const Muted: Story = {
  args: {
    variant: 'muted',
    padding: 'md',
    children: '회색 배경 카드입니다.',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    padding: 'md',
    children: '파랑 강조 카드입니다.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      {(['default', 'outlined', 'elevated', 'muted', 'primary', 'strong'] as const).map(
        (variant) => (
          <Card key={variant} variant={variant} padding="md">
            <p className="font-medium capitalize">{variant}</p>
            <p className="text-sm text-muted-fg mt-1">카드 내용이 여기에 들어갑니다.</p>
          </Card>
        ),
      )}
    </div>
  ),
};
