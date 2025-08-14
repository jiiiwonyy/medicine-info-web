import { useEffect, useState } from 'react';

type SpyOptions = {
  bandPercent?: number;
  bottomThreshold?: number;
};

export function useScrollSpy(
  ids: string[],
  offsetTop = 72,
  { bandPercent = 0.35, bottomThreshold = 2 }: SpyOptions = {},
) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!els.length) return;

    const pickActive = () => {
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight;
      const bandY = offsetTop + vh * bandPercent;

      if (Math.ceil(scrollY + vh) >= docH - bottomThreshold) {
        setActiveId(els[els.length - 1].id);
        return;
      }

      let best: { id: string; dist: number } | null = null;

      for (const el of els) {
        const rect = el.getBoundingClientRect();
        const visible = rect.bottom > offsetTop && rect.top < vh;
        if (!visible) continue;

        const sectionCenterAbs = rect.top + rect.height / 2 + scrollY;
        const bandAbs = scrollY + bandY;
        const dist = Math.abs(sectionCenterAbs - bandAbs);

        if (!best || dist < best.dist) best = { id: el.id, dist };
      }

      if (best) {
        setActiveId(best.id);
        return;
      }

      let fallback: { id: string; topAbs: number } | null = null;
      for (const el of els) {
        const topAbs = el.getBoundingClientRect().top + scrollY;
        if (topAbs <= scrollY + bandY) {
          if (!fallback || topAbs > fallback.topAbs)
            fallback = { id: el.id, topAbs };
        }
      }
      if (fallback) setActiveId(fallback.id);
    };

    const io = new IntersectionObserver(() => pickActive(), {
      root: null,
      rootMargin: `-${offsetTop}px 0px -70% 0px`,
      threshold: [0, 0.25, 0.5, 1],
    });

    els.forEach((el) => io.observe(el));

    const onScrollOrResize = () => pickActive();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    pickActive();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [ids, offsetTop, bandPercent, bottomThreshold]);

  return activeId;
}

export function scrollToId(id: string, offsetTop = 72) {
  const el = document.getElementById(id);
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const y = rect.top + window.scrollY;
  const vh = window.innerHeight;

  const isShort = rect.height < vh * 0.7;
  const centerOffset = isShort ? Math.max(0, (vh - rect.height) / 2) : 0;

  const target = Math.max(0, y - offsetTop - (isShort ? centerOffset : 8));
  window.scrollTo({ top: target, behavior: 'smooth' });
}
