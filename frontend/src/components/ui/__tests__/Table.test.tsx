import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  TableWrap,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  TableContent,
} from '@/components/ui/Table';

describe('Table', () => {
  it('기본 렌더가 된다', () => {
    render(
      <TableWrap>
        <Table>
          <THead>
            <Tr>
              <Th>헤더</Th>
            </Tr>
          </THead>
          <TBody>
            <Tr>
              <Td>바디</Td>
            </Tr>
          </TBody>
        </Table>
      </TableWrap>,
    );

    expect(screen.getByText('헤더')).toBeInTheDocument();
    expect(screen.getByText('바디')).toBeInTheDocument();
  });

  it('TableWrap: scroll=true면 overflow-x-auto 클래스가 들어간다', () => {
    const { container } = render(
      <TableWrap scroll>
        <div>inner</div>
      </TableWrap>,
    );

    const wrap = container.firstElementChild as HTMLElement;
    expect(wrap.className).toContain('overflow-x-auto');
  });

  it('TableWrap: scroll=false면 overflow-x-auto가 없다', () => {
    const { container } = render(
      <TableWrap scroll={false}>
        <div>inner</div>
      </TableWrap>,
    );

    const wrap = container.firstElementChild as HTMLElement;
    expect(wrap.className).not.toContain('overflow-x-auto');
  });

  it('Th: align 옵션이 적용된다', () => {
    render(
      <Table>
        <THead>
          <Tr>
            <Th align="center">C</Th>
            <Th align="right">R</Th>
          </Tr>
        </THead>
      </Table>,
    );

    expect(screen.getByText('C').className).toContain('text-center');
    expect(screen.getByText('R').className).toContain('text-right');
  });

  it('Td: nowrap=true면 whitespace-nowrap, 아니면 wrap 클래스가 적용된다', () => {
    render(
      <Table>
        <TBody>
          <Tr>
            <Td nowrap>NW</Td>
            <Td>WRAP</Td>
          </Tr>
        </TBody>
      </Table>,
    );

    expect(screen.getByText('NW').className).toContain('whitespace-nowrap');
    expect(screen.getByText('WRAP').className).toContain('whitespace-normal');
  });

  it('TableContent: 내부 p 스타일 리셋 클래스가 적용된다', () => {
    const { container } = render(
      <TableContent>
        <p>hi</p>
      </TableContent>,
    );

    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain('[&_p]:m-0');
    expect(screen.getByText('hi')).toBeInTheDocument();
  });
});
