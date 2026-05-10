import { ReactNode } from 'react';
import Navigation from './Navigation';
import { ThemeProvider } from 'next-themes';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background relative">
        <Navigation />
        <main className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">
          {children}
        </main>
        <footer className="relative z-10 border-t border-border mt-24">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-content-muted">
            <div className="flex items-center gap-3">
              <span className="font-display text-base text-foreground">SK</span>
              <span>© {new Date().getFullYear()} Sovandarapor Kong</span>
            </div>
            <div className="flex items-center gap-5 uppercase tracking-widest">
              <span>Phnom Penh</span>
              <span className="opacity-40">/</span>
              <span>Bangkok</span>
              <span className="opacity-40">/</span>
              <span>Everywhere</span>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
