import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Index', path: '/' },
  { name: 'Profile', path: '/profile' },
  { name: 'Nondual', path: '/nondual' },
  { name: 'Journal', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const linkClass = (active: boolean) =>
    `nav-link font-ui text-[10px] uppercase tracking-[0.3em] transition-opacity duration-300 ${
      active ? 'is-active text-foreground opacity-100' : 'text-foreground opacity-60 hover:opacity-100'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55 border-b border-border/70">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="font-ui text-[10px] uppercase tracking-[0.4em] text-foreground link-quiet">
            Sovandarapor (James) Kong
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className={linkClass(isActive(item.path))}>
                <span className="nav-link-label">{item.name}</span>
              </Link>
            ))}
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

        <div className="md:hidden pb-3 -mt-1 flex flex-wrap gap-x-5 gap-y-2 items-center">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}
              className={`nav-link font-ui text-[10px] uppercase tracking-[0.3em] ${
                isActive(item.path) ? 'is-active text-foreground' : 'text-content-muted'
              }`}>
              <span className="nav-link-label">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
