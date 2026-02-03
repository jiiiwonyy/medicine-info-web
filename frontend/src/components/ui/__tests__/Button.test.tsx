import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '@/components/ui/Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>검색</Button>);
    expect(screen.getByRole('button', { name: '검색' })).toBeInTheDocument();
  });

  it('defaults type to button', () => {
    render(<Button>기본</Button>);
    expect(screen.getByRole('button', { name: '기본' })).toHaveAttribute(
      'type',
      'button',
    );
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>클릭</Button>);

    await user.click(screen.getByRole('button', { name: '클릭' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        비활성
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: '비활성' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('is disabled and aria-busy when loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} isLoading>
        로딩
      </Button>,
    );

    const btn = screen.getByRole('button', { name: '로딩' });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute('aria-busy', 'true');

    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="secondary" size="sm">
        옵션
      </Button>,
    );
    const btn = screen.getByRole('button', { name: '옵션' });

    expect(btn.className).toContain('bg-surface');
    expect(btn.className).toContain('h-9');
  });
});
