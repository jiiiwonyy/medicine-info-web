import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableWrap,
  THead,
  TBody,
  Tr,
  Th,
  Td,
} from '@/components/ui/Table';

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <TableWrap>
      <Table>
        <THead>
          <Tr>
            <Th>약품명</Th>
            <Th>성분</Th>
            <Th align="center">보고 건수</Th>
            <Th align="right">비율</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>타이레놀</Td>
            <Td>아세트아미노펜</Td>
            <Td align="center">123</Td>
            <Td align="right">12.3%</Td>
          </Tr>
          <Tr>
            <Td>이부프로펜</Td>
            <Td>이부프로펜</Td>
            <Td align="center">89</Td>
            <Td align="right">8.9%</Td>
          </Tr>
          <Tr>
            <Td>아스피린</Td>
            <Td>아세틸살리실산</Td>
            <Td align="center">56</Td>
            <Td align="right">5.6%</Td>
          </Tr>
        </TBody>
      </Table>
    </TableWrap>
  ),
};

export const Dense: Story = {
  render: () => (
    <TableWrap>
      <Table>
        <THead>
          <Tr>
            <Th density="dense">이상반응</Th>
            <Th density="dense" align="center">
              건수
            </Th>
            <Th density="dense" align="center">
              중증도
            </Th>
          </Tr>
        </THead>
        <TBody>
          {['구역', '두통', '발진', '소화불량', '어지러움'].map((item, i) => (
            <Tr key={item}>
              <Td density="dense">{item}</Td>
              <Td density="dense" align="center">
                {(i + 1) * 7}
              </Td>
              <Td density="dense" align="center">
                {i % 2 === 0 ? '경증' : '중등도'}
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </TableWrap>
  ),
};
