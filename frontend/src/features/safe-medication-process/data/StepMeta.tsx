import type { StepMeta } from '../types';

export const STEPS: StepMeta[] = [
  {
    key: 'prescribing',
    title: '처방',
    badge: 'Step 1',
    theme: {
      border: 'border-danger-200',
      headerBg: 'bg-danger-50',
      headerText: 'text-fg',
      chip: 'bg-danger-200/40 border-danger-200',
      chipText: 'text-fg',
      dot: 'bg-danger-200',
      focusRing: 'focus:ring-danger/20',
    },
  },
  {
    key: 'administration',
    title: '투여',
    badge: 'Step 2',
    theme: {
      border: 'border-success-200',
      headerBg: 'bg-success-50',
      headerText: 'text-fg',
      chip: 'bg-success-200/40 border-success-200',
      chipText: 'text-fg',
      dot: 'bg-success-200',
      focusRing: 'focus:ring-success/20',
    },
  },
  {
    key: 'monitoring',
    title: '관찰',
    badge: 'Step 3',
    theme: {
      border: 'border-primary-200',
      headerBg: 'bg-primary-50',
      headerText: 'text-fg',
      chip: 'bg-primary-200/40 border-primary-200',
      chipText: 'text-fg',
      dot: 'bg-primary-200',
      focusRing: 'focus:ring-primary/20',
    },
  },
];
