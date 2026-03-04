import * as React from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/shared/cn';
import { textStyles } from '@/styles/typography';

export interface BulletListItem {
  text: string | ReactNode;
  subItems?: string[];
}

type BulletItemInput = string | ReactNode | BulletListItem;

function isBulletListItem(item: unknown): item is BulletListItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    !Array.isArray(item) &&
    !React.isValidElement(item) &&
    'text' in item
  );
}

interface BulletListProps {
  items: BulletItemInput[];
}

export default function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => {
        const text = isBulletListItem(item) ? item.text : item;
        const subItems = isBulletListItem(item) ? item.subItems : undefined;

        return (
          <li
            key={i}
            className={cn(
              textStyles.bodyMd,
              'flex gap-4 text-fg leading-relaxed items-start',
            )}
          >
            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-fg" />
            <div className="min-w-0 flex-1">
              <span>{text}</span>
              {subItems && subItems.length > 0 && (
                <ul className="mt-1.5 space-y-1 pl-1">
                  {subItems.map((sub, j) => (
                    <li
                      key={j}
                      className={cn(
                        textStyles.bodyMd,
                        'flex gap-2 leading-relaxed',
                      )}
                    >
                      <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-bg border border-fg" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
