export type InteractDur = {
  유효성분1: string;
  유효성분2: string;
  비고?: string;
  허가사항?: string;
};

export type AgeDur = {
  성분명: string;
  연령기준: string;
  제형?: string;
  허가사항?: string;
};

export type PregDur = {
  성분명: string;
  임부금기등급: string;
  비고?: string;
  허가사항?: string;
};

export type DurData = {
  interactions: InteractDur[];
  age: AgeDur[];
  pregnancy: PregDur[];
};
