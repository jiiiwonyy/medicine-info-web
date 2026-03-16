export const domesticData = [
  { name: '2020', reports: 259089 },
  { name: '2021', reports: 539441 },
  { name: '2022', reports: 315867 },
  { name: '2023', reports: 268148 },
  { name: '2024', reports: 253486 },
];

export const reporterData2023 = [
  { name: '지역의약품안전센터', value: 185825, fill: '#0284c7' }, // Sky 600
  { name: '제약회사', value: 69177, fill: '#38bdf8' }, // Sky 400
  { name: '의료전문가', value: 6820, fill: '#7dd3fc' }, // Sky 300
  { name: '기타', value: 6108, fill: '#cbd5e1' }, // Slate 300
  { name: '환자/소비자', value: 218, fill: '#94a3b8' }, // Slate 400
];

export const reporterData2024 = [
  { name: '지역의약품안전센터', value: 170433, fill: '#0284c7' },
  { name: '제약회사', value: 75241, fill: '#38bdf8' },
  { name: '의료전문가', value: 6251, fill: '#7dd3fc' },
  { name: '기타', value: 1425, fill: '#cbd5e1' },
  { name: '환자/소비자', value: 136, fill: '#94a3b8' },
];

export const regionalTableData = [
  {
    year: '2023',
    inHouse: 135147,
    regTotal: 50678,
    regMedical: 50494,
    regConsumer: 1,
    regPharma: 4,
    regOther: 179,
    total: 185825,
  },
  {
    year: '2024',
    inHouse: 121975,
    regTotal: 48458,
    regMedical: 48113,
    regConsumer: 3,
    regPharma: 5,
    regOther: 337,
    total: 170433,
  },
];

export const originalReporterData = [
  {
    year: '2023',
    doctor: 56109,
    pharmacist: 34626,
    nurse: 134841,
    otherMed: 13747,
    lawyer: 7,
    consumer: 24882,
    otherOrg: 2587,
    unknown: 1349,
    total: 268148,
  },
  {
    year: '2024',
    doctor: 62098,
    pharmacist: 36606,
    nurse: 117380,
    otherMed: 13115,
    lawyer: 6,
    consumer: 23314,
    otherOrg: 749,
    unknown: 218,
    total: 253486,
  },
];

export const reportTypeData = [
  {
    year: '2023',
    spontaneous: 207537,
    clinicalTrial: 2007,
    individualPatient: 63,
    pms: 17851,
    postClinical: 587,
    specialSurvey: 14,
    testOther: 27368,
    unknown: 19,
    other: 12702,
    total: 268148,
  },
  {
    year: '2024',
    spontaneous: 185470,
    clinicalTrial: 3362,
    individualPatient: 34,
    pms: 22051,
    postClinical: 165,
    specialSurvey: 3,
    testOther: 29527,
    unknown: 27,
    other: 12847,
    total: 253486,
  },
];

export const efficacyGroupData = [
  {
    rank: 1,
    year2023: { group: '해열.진통.소염제', reports: 34644, ratio: 12.9 },
    year2024: { group: '항악성종양제', reports: 31748, ratio: 12.5 },
  },
  {
    rank: 2,
    year2023: { group: 'X선조영제', reports: 27604, ratio: 10.3 },
    year2024: { group: '해열.진통.소염제', reports: 31228, ratio: 12.3 },
  },
  {
    rank: 3,
    year2023: { group: '항악성종양제', reports: 26145, ratio: 9.8 },
    year2024: { group: 'X선조영제', reports: 27859, ratio: 11.0 },
  },
  {
    rank: 4,
    year2023: {
      group: '주로 그람양성, 음성균에 작용하는 것',
      reports: 24030,
      ratio: 9.0,
    },
    year2024: {
      group: '주로 그람양성, 음성균에 작용하는 것',
      reports: 18165,
      ratio: 7.2,
    },
  },
  {
    rank: 5,
    year2023: { group: '합성마약', reports: 16991, ratio: 6.3 },
    year2024: { group: '합성마약', reports: 12604, ratio: 5.0 },
  },
  {
    rank: 6,
    year2023: { group: '소화성궤양용제', reports: 7931, ratio: 3.0 },
    year2024: { group: '소화성궤양용제', reports: 7260, ratio: 2.9 },
  },
  {
    rank: 7,
    year2023: { group: '기타의 화학요법제', reports: 7466, ratio: 2.8 },
    year2024: { group: '기타의 화학요법제', reports: 6287, ratio: 2.5 },
  },
  {
    rank: 8,
    year2023: { group: '백신류', reports: 5965, ratio: 2.2 },
    year2024: { group: '백신류', reports: 5909, ratio: 2.3 },
  },
  {
    rank: 9,
    year2023: { group: '혈압강하제', reports: 5245, ratio: 2.0 },
    year2024: { group: '항원충제', reports: 5160, ratio: 2.0 },
  },
  {
    rank: 10,
    year2023: { group: '동맥경화용제', reports: 5135, ratio: 1.9 },
    year2024: { group: '진해거담제', reports: 4947, ratio: 2.0 },
  },
];
