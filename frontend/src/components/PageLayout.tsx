interface PageLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10 text-fg leading-relaxed">
      {title && (
        <h2 className="text-2xl font-bold border-b-2 pb-2 mb-8 border-primary">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
