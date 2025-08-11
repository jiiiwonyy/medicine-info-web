import { useEffect, useState } from 'react';

export function useScrollSpy(ids: string[], offsetTop = 72) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId((visible[0].target as HTMLElement).id);
      },
      {
        root: null,
        rootMargin: `-${offsetTop}px 0px -60% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, offsetTop]);

  return activeId;
}

export function scrollToId(id: string, offsetTop = 72) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offsetTop;
  window.scrollTo({ top: y, behavior: 'smooth' });
}
