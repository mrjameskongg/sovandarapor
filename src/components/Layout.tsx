import { ReactNode } from 'react';
import Navigation from './Navigation';
import { ThemeProvider } from 'next-themes';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-4xl mx-auto px-6 py-8">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;