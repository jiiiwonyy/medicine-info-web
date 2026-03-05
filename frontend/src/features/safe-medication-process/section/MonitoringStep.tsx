import * as React from 'react';
import type { StepTheme } from '../types';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';
import { FinalBlock } from '../components/FlowLayout';
import { Card } from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  MdShowChart,
  MdSettings,
  MdSecurity,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from 'react-icons/md';

const CONSIDERATIONS = [
  {
    icon: <MdShowChart size={28} className="text-primary" />,
    title: '약물의 효과 확인',
    desc: '투여된 약물이 기대했던 치료적 효과(Therapeutic Effect)를 나타내고 있는지 환자의 생체 징후와 증상을 통해 확인합니다.',
  },
  {
    icon: <MdSettings size={28} className="text-amber-500" />,
    title: '적절한 사용 여부',
    desc: '약물이 처방된 용법과 용량에 따라 적절한 경로로 사용되고 있는지, 환자가 복용 가이드라인을 준수하는지 관찰합니다.',
  },
  {
    icon: <MdSecurity size={28} className="text-blue-500" />,
    title: '환자 위해 방지',
    desc: '약물로 인한 부작용이나 과민 반응이 발생하지 않는지, 위해를 가할 가능성이 있는 징후를 조기에 포착합니다.',
  },
];

function ConsiderationSection() {
  return (
    <section>
      <SectionTitle className="mb-4">1. 관찰 단계 핵심 고려사항</SectionTitle>
      <Card variant="outlined" padding="lg" className="shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONSIDERATIONS.map((item) => (
            <div key={item.title} className="flex flex-col gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-surface-muted border border-border/60">
                {item.icon}
              </div>
              <h4 className={cn(textStyles.titleSm, 'text-fg')}>
                {item.title}
              </h4>
              <p
                className={cn(
                  textStyles.bodyMd,
                  'text-muted-fg leading-relaxed',
                )}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

const ERROR_PIE_DATA = [
  { name: '부작용 관찰 부족', value: 30, fill: 'rgb(var(--danger))' },
  {
    name: '약물 미중단(Course 완료 후)',
    value: 25,
    fill: 'rgb(var(--warning))',
  },
  { name: '약물 조기 중단(완료 전)', value: 20, fill: 'rgb(var(--info))' },
  {
    name: '수치 미측정/추적 관찰 소홀',
    value: 10,
    fill: 'rgb(var(--success))',
  },
  { name: '의사소통 오류', value: 15, fill: 'rgb(var(--muted-fg))' },
];

const ERROR_CAUSES = [
  {
    label: '부작용 관찰 부족',
    desc: '투약 후 초기 반응 및 지연 반응에 대한 모니터링 소홀',
  },
  {
    label: '약물 중단 시점의 판단 오류',
    desc: '효과가 없거나 복용 완료 시점임에도 약물을 지속하거나, 반대로 임의로 조기 중단',
  },
  {
    label: '모니터링 누락',
    desc: '약물 혈중 농도 측정 또는 관련 랩 수치 추적 관찰 실패',
  },
  {
    label: '의사소통 오류',
    desc: '관찰 내용의 인계 누락 및 의료진 간 정보 불일치',
  },
];

function ErrorAnalysisSection() {
  return (
    <section>
      <SectionTitle className="mb-4">
        2. 관찰 단계 투약오류 원인 분석
      </SectionTitle>
      <Card variant="outlined" padding="lg" className="shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* 도넛 차트 */}
          <div className="w-full md:w-72 shrink-0 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ERROR_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={68}
                  outerRadius={108}
                  dataKey="value"
                  paddingAngle={2}
                  startAngle={90}
                  endAngle={-270}
                >
                  {ERROR_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | string | undefined) => [
                    `${value ?? ''}%`,
                    '',
                  ]}
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '14px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 오른쪽 원인 목록 */}
          <div className="flex-1 min-w-0">
            <h4 className={cn(textStyles.titleSm, 'text-fg mb-4')}>
              사고를 부르는 &apos;관찰의 빈틈&apos;
            </h4>
            <ol className="space-y-8">
              {ERROR_CAUSES.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span
                    className="shrink-0 mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white"
                    style={{
                      backgroundColor: ERROR_PIE_DATA[idx]?.fill ?? '#6b7280',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <p
                      className={cn(textStyles.bodyMd, 'font-semibold text-fg')}
                    >
                      {item.label}
                    </p>
                    <p
                      className={cn(textStyles.bodySm, 'text-muted-fg mt-0.5')}
                    >
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Card>
    </section>
  );
}

const FINAL_CHECKS = [
  {
    icon: '✏️',
    label: '부작용 관찰',
    desc: '현재 환자의 신체 반응에 특이점이 없는가?',
  },
  {
    icon: '📢',
    label: '환자 설명 및 참여',
    desc: '환자가 약물의 목적을 알고 능동적으로 반응을 말해주는가?',
  },
  {
    icon: '💬',
    label: '의사소통 확인',
    desc: '관찰 결과가 기록되고 적절한 의료진에게 전달되었는가?',
  },
];

function FinalCheckContent({ theme }: { theme: StepTheme }) {
  const [checked, setChecked] = React.useState<boolean[]>(
    FINAL_CHECKS.map(() => false),
  );

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <div>
      <p
        className={cn(
          textStyles.titleSm,
          theme.headerText,
          'text-center font-semibold mb-6',
        )}
      >
        &quot;병실을 나서기 전, 이 세 가지만큼은 반드시 기억하세요.&quot;
      </p>
      <div className="space-y-3">
        {FINAL_CHECKS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => toggle(idx)}
            className={cn(
              'w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-colors',
              checked[idx]
                ? 'border-primary/40 bg-primary/5'
                : 'border-border bg-surface hover:bg-surface-muted',
            )}
          >
            <span className="text-xl shrink-0">
              {checked[idx] ? (
                <MdCheckBox
                  size={22}
                  className={cn(
                    checked[idx] ? 'text-primary' : 'text-muted-fg',
                  )}
                />
              ) : (
                <MdCheckBoxOutlineBlank size={22} className="text-muted-fg" />
              )}
            </span>
            <span className="text-lg shrink-0">{item.icon}</span>
            <span className={cn(textStyles.bodyMd, 'text-fg')}>
              <span className="font-semibold">{item.label}:</span> {item.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MonitoringStep({ theme }: { theme: StepTheme }) {
  return (
    <div className="space-y-10">
      <ConsiderationSection />
      <ErrorAnalysisSection />

      {/* Final Check */}
      <FinalBlock
        title="투약 안전 최종 점검 (Final Check)"
        theme={theme}
        className="max-w-6xl"
      >
        <FinalCheckContent theme={theme} />
      </FinalBlock>
    </div>
  );
}
