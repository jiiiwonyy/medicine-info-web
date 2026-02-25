export function extractDocNo(title: string) {
  const m = title.match(/\b(KSC|KSPC)[\s-]*\d{4}[-–]\d+\s*호\b/i);
  return m?.[0]?.replace(/\s+/g, ' ') ?? null;
}

export function trimDocNo(title: string) {
  const docNo = extractDocNo(title);
  if (!docNo) return title;
  return title
    .replace(docNo, '')
    .replace(/^[\s.\-–]+/, '')
    .trim();
}
