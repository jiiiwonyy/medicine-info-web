import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

describe('Tabs', () => {
  it('uncontrolled: defaultValue로 초기 탭이 보인다', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>

        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText('Content A')).toBeInTheDocument();
    expect(screen.queryByText('Content B')).not.toBeInTheDocument();
  });

  it('uncontrolled: Trigger 클릭 시 탭이 전환된다', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>

        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(screen.getByText('Content B')).toBeInTheDocument();
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
  });

  it('controlled: value/onValueChange가 있으면 외부 상태로만 바뀐다', () => {
    const onValueChange = vi.fn();

    const { rerender } = render(
      <Tabs value="a" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'B' }));
    expect(onValueChange).toHaveBeenCalledWith('b');

    // controlled라서 value를 바꿔주기 전까진 화면이 그대로여야 함
    expect(screen.getByText('Content A')).toBeInTheDocument();
    expect(screen.queryByText('Content B')).not.toBeInTheDocument();

    // 부모가 value를 b로 바꿨다고 가정
    rerender(
      <Tabs value="b" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );

    expect(screen.getByText('Content B')).toBeInTheDocument();
    expect(screen.queryByText('Content A')).not.toBeInTheDocument();
  });

  it('Trigger에 data-state가 active/inactive로 반영된다', () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    const a = screen.getByRole('tab', { name: 'A' });
    const b = screen.getByRole('tab', { name: 'B' });

    expect(a).toHaveAttribute('data-state', 'active');
    expect(b).toHaveAttribute('data-state', 'inactive');

    fireEvent.click(b);
    expect(a).toHaveAttribute('data-state', 'inactive');
    expect(b).toHaveAttribute('data-state', 'active');
  });
});

describe('Tabs (guard clauses)', () => {
  it('TabsTrigger는 Tabs 밖에서 쓰면 throw 한다', () => {
    expect(() => render(<TabsTrigger value="a">A</TabsTrigger>)).toThrow(
      'TabsTrigger must be used within a Tabs component',
    );
  });

  it('TabsContent는 Tabs 밖에서 쓰면 throw 한다', () => {
    expect(() => render(<TabsContent value="a">Content</TabsContent>)).toThrow(
      'TabsContent must be used within a Tabs component',
    );
  });
});
