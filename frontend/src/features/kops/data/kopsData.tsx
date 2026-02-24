import type * as React from 'react';

export type MenuCardItem = {
  emoji: string;
  title: string;
  desc: React.ReactNode;
  href: string;
  note?: React.ReactNode;
};

export const MENU_CARDS: MenuCardItem[] = [
  {
    emoji: '⚠️',
    title: '주의경보',
    desc: (
      <>
        환자안전과 관련하여{' '}
        <span className="font-semibold text-fg">
          반복적이거나 중대한 사고 위험
        </span>
        이 확인된 경우 발령되는 공식 알림으로, 유사 사례 예방을 위한 주의사항과
        대응 방안을 제시합니다.
        <br />
        지금까지 발령된 주의경보:{' '}
        <span className="font-semibold text-fg">총 53건</span>
      </>
    ),
    href: 'https://www.kops.or.kr/portal/aam/atent/atentAlarmCntrmsrList.do',
  },
  {
    emoji: '📌',
    title: '정보제공',
    desc: (
      <>
        환자안전과 관련된 최신 동향, 지침, 사례 등을 간략히 정리하여{' '}
        <span className="font-semibold text-fg">
          의료현장에서 바로 참고할 수 있는 자료
        </span>
        를 제공합니다.
      </>
    ),
    href: 'https://www.kops.or.kr/portal/ifm/infoProvdStdrList.do',
  },
  {
    emoji: '📊',
    title: '통계',
    desc: (
      <>
        환자안전사고{' '}
        <span className="font-semibold text-fg">
          보고 현황, 발생 추이, 유형별 통계자료
        </span>
        를 시각화하여 제공합니다.
      </>
    ),
    href: 'https://statistics.kops.or.kr/biWorks/dashBoardMain.do',
  },
  {
    emoji: '📂',
    title: '자료실',
    desc: (
      <>
        환자안전과 관련된{' '}
        <span className="font-semibold text-fg">
          보고서, 연구자료, 교육자료
        </span>{' '}
        등을 다운로드할 수 있습니다.
      </>
    ),
    href: 'https://www.kops.or.kr/portal/board/policyRsrch/boardList.do',
  },
];

export const REPORT_TYPES: string[] = [
  '자율보고',
  '의무보고',
  '환자안전 전담인력 보고',
  '환자안전위원회 보고',
];
