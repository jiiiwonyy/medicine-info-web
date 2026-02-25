import type { Medicine } from '@/types/medicine';

export type MedicineResultColumn = {
  key: keyof Medicine;
  label: string;
  width: string;
  maxWidth: string;
  clamp?: boolean;
  title?: boolean;
};

export const MEDICINE_RESULT_COLUMNS: MedicineResultColumn[] = [
  {
    key: 'product_name',
    label: '제품명',
    width: 'w-[200px]',
    maxWidth: 'max-w-[200px]',
    clamp: true,
  },
  {
    key: 'product_name_eng',
    label: '제품영문명',
    width: 'w-[180px]',
    maxWidth: 'max-w-[180px]',
    clamp: true,
  },
  {
    key: 'main_ingredient',
    label: '주성분',
    width: 'w-[200px]',
    maxWidth: 'max-w-[200px]',
    clamp: true,
  },
  {
    key: 'efficacy',
    label: '효능',
    width: 'w-[250px]',
    maxWidth: 'max-w-[250px]',
    clamp: true,
    title: true,
  },
  {
    key: 'company_name',
    label: '회사명',
    width: 'w-[150px]',
    maxWidth: 'max-w-[150px]',
  },
];
