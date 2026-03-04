import type { HamCategory } from '../types';

export const HAM_CATEGORIES: HamCategory[] = [
  {
    key: 'electrolytes',
    label: '① 고농도 전해질',
    items: [
      'KCl(K+ 40mEq/20mL)',
      'NaCl(Na+ 40mEq/20mL)',
      'Phosten(potassium phosphate 136.1 mg/20mL)',
      'Magnesin 50%(magnesium sulfate 10g/20mL)',
    ],
  },
  {
    key: 'anticoagulants',
    label: '② 혈액응고 억제제',
    items: [
      'Warfarin',
      '헤파린 주사제: Heparin(25,000unit/5mL), Heparin (20,000unit/20mL)',
    ],
  },
  {
    key: 'antineoplastics',
    label: '③ 항암제',
    items: [
      '세포독성 항악성종양제(예: Tegafur/uracil, Doxifluridine, Capecitabine, TS-1, Topotecan, Temozolomide, Cyclophospamide, Methotrexate, Mercaptopurine 등)',
      '표적치료를 위한 경구 항악성 종양제(예: Imatinib, Dasatinib, Nilotinib, Gefitinib, Erlotinib, Lapatinib, Sorafenib, Sunitinib, Pazopanib, Everolimus, Crizotinib 등)',
    ],
  },
  {
    key: 'diabetes',
    label: '④ 당뇨병용제(인슐린주사제 등)',
    items: [
      '초속효성 인슐린: Insulin lispro, Insulin aspart, Insulin glulisine',
      '속효성 인슐린: Regular human insulin',
      '중간형 인슐린: Human insulin NPH',
      '혼합형 인슐린: Human isophan insulin/regular insulin(N/R) 70/30, insulin lispro protamin/insulin lispro, insulin degludec/insulin aspart',
      '지속형 인슐린: insulin glargine, Insulin delemir, Insulin degludec',
    ],
  },
  {
    key: 'immunosuppressants',
    label: '⑤ 면역억제제',
    items: [
      'Azathioprine',
      'Cyclosporine(전신작용 약제)',
      'Tacrolimus',
      'Mycophenolate',
      'Mizoribine',
      'Everolimus',
      'Sirolimus 등',
    ],
  },
  {
    key: 'sedatives',
    label: '⑥ 중등도진정의약품',
    items: ['마약', '향정신성의약품'],
  },
];
