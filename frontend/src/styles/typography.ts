export const textStyles = {
  /* Display (홈 Hero 정도만 사용) */
  displayLg:
    'text-[clamp(2.25rem,2rem+1vw,2.75rem)] leading-[1.15] font-extrabold tracking-[-0.02em]',
  displayMd:
    'text-[clamp(2rem,1.75rem+0.8vw,2.5rem)] leading-[1.18] font-extrabold tracking-[-0.02em]',

  /* Page / Section */
  titleXl:
    'text-[clamp(1.75rem,1.6rem+0.6vw,2rem)] leading-[1.2] font-bold tracking-[-0.01em]',
  titleLg: 'text-[1.5rem] leading-[1.25] font-bold tracking-[-0.01em]', // 24px
  titleMd: 'text-[1.25rem] leading-[1.3] font-semibold', // 20px
  titleSm: 'text-[1.125rem] leading-[1.35] font-semibold', // 18px

  /* Headings */
  headingLg: 'text-[1.125rem] leading-[1.4] font-semibold', // 18px
  headingMd: 'text-[1rem] leading-[1.45] font-semibold', // 16px
  headingSm: 'text-[0.9375rem] leading-[1.45] font-medium', // 15px

  /* Body */
  bodyLg: 'text-[1.0625rem] leading-[1.6]', // 17px (읽기용)
  bodyMd: 'text-[1rem] leading-[1.5]', // 16px ← 기본
  bodySm: 'text-[0.875rem] leading-[1.5]', // 14px
  bodyXs: 'text-[0.8125rem] leading-[1.5]', // 13px

  /* UI */
  uiLg: 'text-[1rem] leading-[1.3] font-semibold', // 버튼 큰거
  uiMd: 'text-[0.875rem] leading-[1.3] font-semibold', // 일반 버튼
  uiSm: 'text-[0.8125rem] leading-[1.3] font-medium',

  /* Caption */
  captionMd: 'text-[0.75rem] leading-[1.4]', // 12px
  captionSm: 'text-[0.6875rem] leading-[1.4]', // 11px
} as const;
