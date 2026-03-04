export interface HospitalInfo {
  name: string;
  phone: string;
  url: string;
}

export type CentersType = Record<string, HospitalInfo[]>;
export type RegionGroups = Record<string, string>;
