import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Cambodia Work', path: '/cambodia-work' },
    { name: 'Brand Building', path: '/brand-building' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/75 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="w-9 h-9 rounded-full border border-foreground/80 flex items-center justify-center font-display text-sm font-semibold group-hover:bg-foreground group-hover:text-background transition-smooth">
              SK
            </span>
            <span className="hidden sm:block">
              <span className="font-display text-lg leading-none block text-foreground">Sovandarapor</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-content-muted">Notebook</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-xs uppercase tracking-[0.18em] transition-smooth ${
                    active ? 'text-foreground' : 'text-content-muted hover:text-foreground'
                  }`}
                >
                  {item.name}
                  {active && <span className="absolute -bottom-2 left-0 right-0 h-px bg-gold" />}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 p-0 rounded-full"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4 -mt-1">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[11px] uppercase tracking-[0.18em] ${
                    active ? 'text-gold' : 'text-content-muted'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
