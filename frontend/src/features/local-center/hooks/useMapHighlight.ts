import { useEffect } from 'react';

type RegionGroups = Record<string, string>;

type Options = {
  rootSelector?: string;
  activeRegion: string | null;
  regionGroups: RegionGroups;
};

export function useMapHighlight({
  rootSelector = '.interactive-map',
  activeRegion,
  regionGroups,
}: Options) {
  useEffect(() => {
    document
      .querySelectorAll(`${rootSelector} [data-active="true"]`)
      .forEach((el) => el.removeAttribute('data-active'));

    if (!activeRegion) return;

    const ids = Object.keys(regionGroups).filter(
      (key) => regionGroups[key] === activeRegion,
    );

    ids.forEach((id) => {
      const targets = document.querySelectorAll<SVGElement>(
        `${rootSelector} #${CSS.escape(id)}`,
      );

      targets.forEach((root) => {
        if (root.matches('path, polygon, polyline')) {
          root.setAttribute('data-active', 'true');
          return;
        }

        root
          .querySelectorAll<SVGElement>('path, polygon, polyline')
          .forEach((shape) => shape.setAttribute('data-active', 'true'));
      });
    });
  }, [rootSelector, activeRegion, regionGroups]);
}
