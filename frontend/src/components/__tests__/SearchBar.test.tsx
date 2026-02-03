import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '@/components/SearchBar';

describe('SearchBar', () => {
  it('calls onSearch when Enter is pressed', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(
      <SearchBar
        id="search"
        value=""
        onChange={() => {}}
        onSearch={onSearch}
        placeholder="검색"
      />,
    );

    const input = screen.getByPlaceholderText('검색');
    await user.type(input, '{Enter}');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when button is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(
      <SearchBar
        id="search"
        value=""
        onChange={() => {}}
        onSearch={onSearch}
        placeholder="검색"
      />,
    );

    await user.click(screen.getByRole('button', { name: '검색' }));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
