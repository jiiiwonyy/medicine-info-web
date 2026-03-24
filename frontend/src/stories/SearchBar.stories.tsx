import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <SearchBar
        id="search"
        value={value}
        onChange={setValue}
        onSearch={() => alert(`검색: ${value}`)}
        placeholder="약품명을 입력하세요"
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('타이레놀');
    return (
      <SearchBar
        id="search-with-value"
        value={value}
        onChange={setValue}
        onSearch={() => alert(`검색: ${value}`)}
        placeholder="약품명을 입력하세요"
      />
    );
  },
};
