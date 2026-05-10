import { ReactNode } from 'react';
import Navigation from './Navigation';
import { ThemeProvider } from 'next-themes';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-background relative">
        <Navigation />
        <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
          {children}
        </main>
        <footer className="relative z-10 border-t border-border mt-24">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">
            <span>© {new Date().getFullYear()} Sovandarapor Kong · Phnom Penh</span>
            <span className="tabular">Vol. 01 · Issue 12</span>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
