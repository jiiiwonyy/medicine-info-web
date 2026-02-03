import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@/components/ui/Input';

describe('Input', () => {
  it('renders placeholder', () => {
    render(<Input placeholder="검색어" />);
    expect(screen.getByPlaceholderText('검색어')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Input aria-label="query" onChange={onChange} />);

    await user.type(screen.getByLabelText('query'), 'abc');
    expect(onChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input aria-label="query" disabled />);
    expect(screen.getByLabelText('query')).toBeDisabled();
  });

  it('applies error styles when hasError', () => {
    render(<Input aria-label="query" hasError />);
    const input = screen.getByLabelText('query');
    expect(input.className).toContain('border-danger');
  });
});
