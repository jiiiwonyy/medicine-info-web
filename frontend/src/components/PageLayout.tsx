import { textStyles } from '@/styles/typography';
import { cn } from '@/shared/cn';

interface PageLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <section
      className={cn('max-w-7xl mx-auto px-4 py-10 leading-relaxed', 'text-fg')}
    >
      {title && (
        <h2
          className={cn(
            textStyles.pageTitle,
            'border-b-2 pb-2 mb-8 border-primary-200',
          )}
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
