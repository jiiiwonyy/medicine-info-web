export interface IpassSubItem {
  ko: string;
  en: string;
}

export interface IpassBlock {
  key: string;
  letter: string;
  titleKo: string;
  titleEn: string;
  lineColor: string;
  badgeBg: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  items: IpassSubItem[];
}

export const IPASS_BLOCKS: IpassBlock[] = [
  {
    key: 'I',
    letter: 'I',
    titleKo: '질병 중증도',
    titleEn: 'Illness Severity',
    lineColor: 'bg-sky-300',
    badgeBg: 'bg-sky-500',
    accentText: 'text-sky-700',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-100',
    items: [
      { ko: '안정', en: 'Stable' },
      { ko: '감시자', en: 'Watcher' },
      { ko: '불안정', en: 'Unstable' },
    ],
  },
  {
    key: 'P',
    letter: 'P',
    titleKo: '환자 요약',
    titleEn: 'Patient Summary',
    lineColor: 'bg-indigo-300',
    badgeBg: 'bg-indigo-500',
    accentText: 'text-indigo-700',
    accentBg: 'bg-indigo-50',
    accentBorder: 'border-indigo-100',
    items: [
      { ko: '요약 진술', en: 'Summary statement' },
      {
        ko: '입원/치료 전환으로 인한 사건',
        en: 'Events leading to admission or care transition',
      },
      {
        ko: '병원 과정 또는 치료 계획',
        en: 'Hospital course or treatment plan',
      },
      { ko: '진행 중인 평가', en: 'Ongoing assessment' },
      { ko: '응급 계획', en: 'Contingency plan' },
    ],
  },
  {
    key: 'A',
    letter: 'A',
    titleKo: '조치 목록',
    titleEn: 'Action List',
    lineColor: 'bg-violet-300',
    badgeBg: 'bg-violet-500',
    accentText: 'text-violet-700',
    accentBg: 'bg-violet-50',
    accentBorder: 'border-violet-100',
    items: [
      { ko: '할 일 목록', en: 'To-do list' },
      { ko: '타임라인 및 책임자', en: 'Timelines and ownership' },
    ],
  },
  {
    key: 'S1',
    letter: 'S',
    titleKo: '상황 인식 및 응급 계획',
    titleEn: 'Situation Awareness & Contingency Planning',
    lineColor: 'bg-purple-300',
    badgeBg: 'bg-purple-500',
    accentText: 'text-purple-700',
    accentBg: 'bg-purple-50',
    accentBorder: 'border-purple-100',
    items: [
      {
        ko: '무슨 일이 일어나고 있는지 파악',
        en: "Know what's going on",
      },
      {
        ko: '일어날 수 있는 상황에 대한 계획',
        en: 'Plan for what might happen',
      },
    ],
  },
  {
    key: 'S2',
    letter: 'S',
    titleKo: '수신자 종합',
    titleEn: 'Synthesis by Receiver',
    lineColor: 'bg-fuchsia-300',
    badgeBg: 'bg-fuchsia-500',
    accentText: 'text-fuchsia-700',
    accentBg: 'bg-fuchsia-50',
    accentBorder: 'border-fuchsia-100',
    items: [
      {
        ko: '수신자가 들은 내용을 요약',
        en: 'Receiver summarizes what was heard',
      },
      { ko: '질문하기', en: 'Asks questions' },
      {
        ko: '주요 작업/할 일 항목 다시 말하기',
        en: 'Restates key actions/to-do items',
      },
    ],
  },
];
