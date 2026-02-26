export interface SbarItem {
  letter: string;
  word: string;
  label: string;
  question: string;
  color: string;
  badge: string;
}

export const SBAR_ITEMS: SbarItem[] = [
  {
    letter: 'S',
    word: 'Situation',
    label: '상황',
    question: '환자에게 어떤 일이 생기고 있나?',
    color: 'bg-blue-50 border-blue-200 text-blue-900',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    letter: 'B',
    word: 'Background',
    label: '배경',
    question: '의학적 배경이나 맥락은 어떠한가?',
    color: 'bg-violet-50 border-violet-200 text-violet-900',
    badge: 'bg-violet-100 text-violet-700',
  },
  {
    letter: 'A',
    word: 'Assessment',
    label: '평가',
    question: '내가 생각하기에 문제는 무엇인가?',
    color: 'bg-amber-50 border-amber-200 text-amber-900',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    letter: 'R',
    word: 'Recommendation',
    label: '권고',
    question: '어떻게 하면 좋다고 생각하나?',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    badge: 'bg-emerald-100 text-emerald-700',
  },
];
