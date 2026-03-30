import { Link, useLocation } from 'react-router-dom';
import { textStyles } from '@/styles/typography';
import { cn } from '@/shared/cn';
import { ROUTE_MAP } from '@/shared/routes';

interface PageLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  const { pathname } = useLocation();
  const route = ROUTE_MAP[pathname];

  return (
    <section className={cn('max-w-7xl mx-auto px-4 py-10', 'text-fg')}>
      {title && (
        <>
          {route && (
            <nav
              aria-label="breadcrumb"
              className="flex items-center gap-1.5 text-sm text-muted-fg mb-3"
            >
              <Link to="/" className="hover:text-fg transition-colors">
                홈
              </Link>
              <span aria-hidden>›</span>
              <span>{route.category}</span>
              <span aria-hidden>›</span>
              <span className="text-fg">{route.label}</span>
            </nav>
          )}
          <h2 className={cn(textStyles.titleXl, 'mb-8')}>{title}</h2>
          <div className="border-b border-border mb-8" />
        </>
      )}
      {children}
    </section>
  );
}
