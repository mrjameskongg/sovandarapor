import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const navItems = [
    { name: 'Index', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Nondual', path: '/nondual' },
    { name: 'Cambodia', path: '/cambodia-work' },
    { name: 'Craft', path: '/brand-building' },
    { name: 'Journal', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="font-ui text-[10px] uppercase tracking-[0.4em] text-foreground link-quiet">
            Sovandarapor Kong
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-ui text-[10px] uppercase tracking-[0.3em] transition-opacity duration-300 ${
                    active ? 'text-foreground opacity-100' : 'text-foreground opacity-50 hover:opacity-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-foreground opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        <div className="md:hidden pb-3 -mt-1 flex flex-wrap gap-x-5 gap-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-ui text-[10px] uppercase tracking-[0.3em] ${
                  active ? 'text-foreground' : 'text-content-muted'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
