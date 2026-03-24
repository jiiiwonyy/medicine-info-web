import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer from '@/components/ui/Footer';

const meta: Meta<typeof Footer> = {
  title: 'UI/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
