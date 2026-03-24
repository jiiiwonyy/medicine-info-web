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
