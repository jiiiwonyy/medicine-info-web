import * as React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card } from '@/components/ui/Card';
import Callout from '@/components/ui/Callout';
import {
  Table,
  TableWrap,
  TBody,
  Td,
  Th,
  THead,
  Tr,
} from '@/components/ui/Table';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

type WhoAreaKey = 'highRisk' | 'polypharmacy' | 'transition';

type HamCategoryKey =
  | 'electrolytes'
  | 'anticoagulants'
  | 'antineoplastics'
  | 'diabetes'
  | 'immunosuppressants'
  | 'sedatives';

type HamCategory = {
  key: HamCategoryKey;
  label: string; // "① 고농도 전해질" 형태
  items: string[]; // 종류(리스트)
};

const WHO_AREAS: Array<{
  key: WhoAreaKey;
  title: string;
  subtitle: string;
  bullets: string[];
}> = [
  {
    key: 'highRisk',
    title: '1. 고위험 상황 (High-risk situations)',
    subtitle:
      '특정 약물(고위험약물)에서 투약오류 및 그로 인한 위해 발생 위험이 높습니다.',
    bullets: [
      '고위험 상황을 인지하고 이해하는 것이 중요합니다.',
      '도구·기술은 고위험 경고 약물을 취급·투여하는 의료진을 지원할 수 있습니다.',
      '환자의 인식과 이해도를 높이는 데에도 기여할 수 있습니다.',
    ],
  },
  {
    key: 'polypharmacy',
    title: '2. 다약제 복용 (Polypharmacy)',
    subtitle:
      '다약제 복용에서는 정책, 절차 및 프로토콜의 표준화가 매우 중요합니다.',
    bullets: [
      '초기 처방 단계부터 정기적인 약물 검토에 이르기까지 적용됩니다.',
      '기술은 환자의 인식과 약물 사용 과정에 대한 이해를 향상시켜 유용한 지원 수단이 될 수 있습니다.',
    ],
  },
  {
    key: 'transition',
    title: '3. 치료 전환기 (Transition of care)',
    subtitle:
      '치료 전환 과정은 의사소통 오류의 가능성을 높여 심각한 투약오류로 이어질 수 있습니다.',
    bullets: [
      '효과적인 의사소통이 매우 중요합니다.',
      '치료 전·후 약물을 공식적으로 비교하는 절차(약물 조정, medication reconciliation)가 포함됩니다.',
    ],
  },
];

const HAM_CATEGORIES: HamCategory[] = [
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

function StatCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note?: string;
}) {
  return (
    <Card variant="outlined" padding="lg" className="shadow-sm">
      <div className={cn(textStyles.bodyMd, 'text-gray-600')}>{title}</div>
      <div className={cn(textStyles.titleLg, 'mt-2 text-gray-900')}>
        {value}
      </div>
      {note ? (
        <div className={cn(textStyles.bodyMd, 'text-gray-500')}>{note}</div>
      ) : null}
    </Card>
  );
}

function Tabs({
  value,
  onChange,
  items,
}: {
  value: string;
  onChange: (v: string) => void;
  items: Array<{ key: string; label: string }>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange(it.key)}
            className={cn(
              textStyles.bodySm,
              'rounded-full border px-4 py-2 transition',
              active
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
            )}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

export default function MedicationSafety() {
  const [whoArea, setWhoArea] = React.useState<WhoAreaKey>('highRisk');

  const whoAreaData = React.useMemo(
    () => WHO_AREAS.find((a) => a.key === whoArea)!,
    [whoArea],
  );

  return (
    <PageLayout title="투약안전(Medication Safety)">
      <div className="flex flex-col gap-10 pb-10">
        <div className="flex flex-col gap-6">
          {/* A. Hero */}
          <Card variant="outlined" padding="lg" className="shadow-sm">
            <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
              <span className="font-semibold">투약안전(Medication Safety)</span>
              은 약물 사용에서 발생 가능한{' '}
              <span className="font-semibold">투약 오류</span>를 올바르게
              교정하여 예방하고자 하는 활동으로, 투약과정에서 발생할 수 있는
              사고나 오류의 제거로 정의됩니다(WHO, 2009).
            </p>
          </Card>

          {/* Emphasized Prevention Info */}
          <Callout
            variant="info"
            icon="💡"
            className="bg-primary-50 border-primary-200 text-primary-900"
          >
            <p className={cn(textStyles.bodyMd, 'leading-relaxed')}>
              투약오류 중{' '}
              <span className="font-bold border-b-2 border-primary-500">
                3분의 2가 예방 가능
              </span>
              한 것으로 보고되며(WHO, 2022), 투약은 치료 과정에서 가장 큰 영역을
              차지하는 동시에 많은 의료오류가 발생하는 분야이므로 예방 가능한
              투약오류를 줄이는 것이 중요합니다.
            </p>
          </Callout>
        </div>

        {/* B. Stats */}
        <section className="space-y-4">
          <div className={cn(textStyles.titleMd, 'flex items-center gap-2')}>
            <span
              className={cn(
                textStyles.uiLg,
                'flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600',
              )}
            >
              1
            </span>
            왜 중요한가?
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="예방 가능 비율"
              value="2/3"
              note="투약오류 중 3분의 2 예방 가능"
            />
            <StatCard
              title="입원 관련"
              value="6~7%"
              note="병원 입원의 6~7%가 투약오류와 관련"
            />
            <StatCard title="환자 경험" value="11%" note="투약 오류 경험" />
            <StatCard
              title="연간 사망(미국)"
              value="7,000명+"
              note="투약오류로 인한 연간 사망자 수"
            />
          </div>
        </section>

        {/* C. WHO 3 areas */}
        <section className="space-y-4">
          <div className={cn(textStyles.titleMd, 'flex items-center gap-2')}>
            <span
              className={cn(
                textStyles.uiLg,
                'flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600',
              )}
            >
              2
            </span>
            투약오류 예방을 위한 3가지 영역 (WHO)
          </div>
          <Card variant="outlined" padding="lg" className="shadow-sm space-y-6">
            <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
              세계보건기구(WHO)는 투약오류(MEs)를 예방하고 환자를 약물
              위해로부터 보호하기 위해 다음의{' '}
              <span className="font-semibold">세 가지 영역</span>을 우선적으로
              다룰 것을 권고합니다.
            </p>

            <div className="space-y-4">
              <Tabs
                value={whoArea}
                onChange={(v) => setWhoArea(v as WhoAreaKey)}
                items={[
                  { key: 'highRisk', label: '고위험 상황' },
                  { key: 'polypharmacy', label: '다약제 복용' },
                  { key: 'transition', label: '치료 전환기' },
                ]}
              />

              <div className="rounded-xl border border-border bg-muted p-5 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className={cn(textStyles.headingLg, 'mb-2 text-fg')}>
                  {whoAreaData.title}
                </div>
                <p
                  className={cn(
                    textStyles.bodyMd,
                    'mb-3 text-muted-fg leading-relaxed',
                  )}
                >
                  {whoAreaData.subtitle}
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  {whoAreaData.bullets.map((b) => (
                    <li key={b} className={cn(textStyles.bodyMd, 'text-fg')}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* D. High Alert Medication definition */}
        <section className="space-y-4">
          <div className={cn(textStyles.titleMd, 'flex items-center gap-2')}>
            <span
              className={cn(
                textStyles.uiLg,
                'flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600',
              )}
            >
              3
            </span>
            고위험약물(High Alert Medication)이란?
          </div>
          <Card variant="outlined" padding="lg" className="shadow-sm">
            <div className="space-y-4">
              <p className={cn(textStyles.bodyMd, 'text-fg leading-relaxed')}>
                오류 발생 시 환자와 직원의 안전에{' '}
                <span className="font-semibold text-danger-700 bg-danger-50 px-1 rounded">
                  치명적인 위해 또는 잠재적으로 높은 위험
                </span>
                을 초래할 가능성이 있거나, 치료역이 좁아 부작용이 발현될
                위험성이 높아, ‘처방, 보관, 조제, 이송, 투여, 폐기’ 시 특별한
                주의를 요하는 의약품입니다.
              </p>
            </div>
          </Card>
        </section>

        {/* E. HAM list explorer */}
        <section className="space-y-4">
          <div className={cn(textStyles.titleMd, 'flex items-center gap-2')}>
            <span
              className={cn(
                textStyles.uiLg,
                'flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-600',
              )}
            >
              4
            </span>
            고위험약물 종류
          </div>
          <Card
            variant="outlined"
            padding="none"
            className="shadow-sm overflow-hidden"
          >
            <TableWrap className="my-0">
              <Table className="border-0">
                <THead>
                  <Tr className="bg-gray-50/50">
                    <Th
                      className={cn(
                        textStyles.uiLg,
                        'w-[160px] text-center py-4 text-muted-fg font-medium',
                      )}
                    >
                      구분
                    </Th>
                    <Th
                      className={cn(
                        textStyles.uiLg,
                        'py-4 text-muted-fg font-medium',
                      )}
                    >
                      종류 및 예시
                    </Th>
                  </Tr>
                </THead>
                <TBody>
                  {HAM_CATEGORIES.map((cat) => (
                    <Tr
                      key={cat.key}
                      className="group hover:bg-muted/50 transition-colors"
                    >
                      <Th
                        className={cn(
                          'text-center align-middle bg-white group-hover:bg-muted/50 transition-colors',
                          textStyles.uiLg,
                          'text-gray-700',
                        )}
                      >
                        {cat.label.split(' ').slice(1).join(' ')}
                      </Th>
                      <Td
                        className={cn(
                          'py-4',
                          textStyles.bodyMd,
                          'text-gray-700',
                        )}
                      >
                        <ul className="list-disc pl-5 space-y-1.5">
                          {cat.items.map((item, idx) => (
                            <li
                              key={idx}
                              className={cn(
                                textStyles.bodyMd,
                                'text-gray-600 leading-relaxed',
                              )}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </Td>
                    </Tr>
                  ))}
                </TBody>
              </Table>
            </TableWrap>
          </Card>
        </section>
      </div>
    </PageLayout>
  );
}
