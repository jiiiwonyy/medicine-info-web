import type { Meta, StoryObj } from '@storybook/react-vite';
import SectionTitle from '@/components/ui/SectionTitle';
import SectionNumberHeader from '@/components/ui/SectionNumberHeader';
import SubTitle from '@/components/ui/SubTitle';
import ItemTitle from '@/components/ui/ItemTitle';

const meta: Meta<typeof SectionTitle> = {
  title: 'UI/Headings',
  component: SectionTitle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

// ─── SectionTitle (h3) ────────────────────────────────────────────────

export const Default: Story = {
  args: {
    children: '이상사례 보고 현황',
  },
};

export const SectionTitleExamples: Story = {
  name: 'SectionTitle — 주요 섹션 (h3)',
  render: () => (
    <div className="flex flex-col gap-6">
      <SectionTitle>기본 정보</SectionTitle>
      <SectionTitle>📌 지원 대상</SectionTitle>
      <SectionTitle>💰 지원 범위</SectionTitle>
      <SectionTitle>📝 신청 방법 및 절차</SectionTitle>
    </div>
  ),
};

// ─── SectionNumberHeader (h4) ────────────────────────────────────────

export const NumberHeaderExamples: StoryObj<typeof SectionNumberHeader> = {
  name: 'SectionNumberHeader — 번호 있는 소항목 (h4)',
  render: () => (
    <div className="flex flex-col gap-4">
      <SectionNumberHeader number={1} title="복용 방법" />
      <SectionNumberHeader number={2} title="주의사항 확인" />
      <SectionNumberHeader number={3} title="이상반응 모니터링" />
    </div>
  ),
};

// ─── SubTitle (h4) ───────────────────────────────────────────────────

export const SubTitleExamples: StoryObj<typeof SubTitle> = {
  name: 'SubTitle — 소항목 (h4)',
  render: () => (
    <div className="flex flex-col gap-4">
      <SubTitle>📄 주요 기능 안내</SubTitle>
      <SubTitle>🧾 복약지도서란?</SubTitle>
      <SubTitle className="text-primary-700">핵심 역할</SubTitle>
    </div>
  ),
};

// ─── ItemTitle (h5) ──────────────────────────────────────────────────

export const ItemTitleExamples: StoryObj<typeof ItemTitle> = {
  name: 'ItemTitle — 세부 항목 (h5)',
  render: () => (
    <div className="flex flex-col gap-3">
      <ItemTitle>진료비</ItemTitle>
      <ItemTitle>장해보상금</ItemTitle>
      <ItemTitle className="text-primary-700">보고 시스템</ItemTitle>
    </div>
  ),
};

// ─── 전체 계층 한눈에 ────────────────────────────────────────────────

export const HeadingHierarchy: Story = {
  name: '전체 계층 구조',
  render: () => (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <p className="text-xs text-muted-fg mb-1">h2 — PageLayout title (페이지 제목)</p>
        <p className="text-[clamp(1.75rem,1.6rem+0.6vw,2rem)] font-bold leading-tight">
          의약품 부작용 피해구제
        </p>
      </div>
      <div>
        <p className="text-xs text-muted-fg mb-2">h3 — SectionTitle (주요 섹션)</p>
        <SectionTitle>📌 지원 대상</SectionTitle>
      </div>
      <div>
        <p className="text-xs text-muted-fg mb-2">h4 — SubTitle (소항목)</p>
        <SubTitle>신청 경로</SubTitle>
      </div>
      <div>
        <p className="text-xs text-muted-fg mb-2">h4 — SectionNumberHeader (번호 소항목)</p>
        <SectionNumberHeader number={1} title="서류 제출" />
      </div>
      <div>
        <p className="text-xs text-muted-fg mb-2">h5 — ItemTitle (세부 항목)</p>
        <ItemTitle>공통 필수 서류</ItemTitle>
      </div>
    </div>
  ),
};
