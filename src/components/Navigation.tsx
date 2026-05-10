import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { COUNTRIES } from '@/lib/blog';

const navItems = [
  { name: 'Index', path: '/' },
  { name: 'Profile', path: '/profile' },
  { name: 'Nondual', path: '/nondual' },
  // Countries dropdown is rendered separately
  { name: 'Craft', path: '/brand-building' },
  { name: 'Journal', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const countryPaths = COUNTRIES.map(c => `/${c.value}`);

const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileCountriesOpen, setMobileCountriesOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const onEnter = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  const countriesActive = countryPaths.includes(location.pathname) || location.pathname === '/cambodia-work';

  const linkClass = (active: boolean) =>
    `font-ui text-[10px] uppercase tracking-[0.3em] transition-opacity duration-300 ${
      active ? 'text-foreground opacity-100' : 'text-foreground opacity-50 hover:opacity-100'
    }`;

  // Insert Countries between Nondual and Craft on desktop
  const desktopBefore = navItems.slice(0, 3);
  const desktopAfter  = navItems.slice(3);

  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="font-ui text-[10px] uppercase tracking-[0.4em] text-foreground link-quiet">
            Sovandarapor Kong
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {desktopBefore.map((item) => (
              <Link key={item.path} to={item.path} className={linkClass(location.pathname === item.path)}>
                {item.name}
              </Link>
            ))}

            <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                className={`${linkClass(countriesActive)} flex items-center gap-1`}
              >
                Countries
                <ChevronDown className="w-3 h-3 opacity-60" strokeWidth={1.5} />
              </button>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ease-out ${
                  open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="min-w-[160px] bg-background/95 backdrop-blur-md border border-border py-2">
                  {COUNTRIES.map(c => {
                    const active = location.pathname === `/${c.value}`;
                    return (
                      <Link
                        key={c.value}
                        to={`/${c.value}`}
                        className={`block px-4 py-2 font-ui text-[10px] uppercase tracking-[0.3em] transition-opacity duration-200 ${
                          active ? 'text-foreground opacity-100' : 'text-foreground opacity-60 hover:opacity-100'
                        }`}
                      >
                        {c.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {desktopAfter.map((item) => (
              <Link key={item.path} to={item.path} className={linkClass(location.pathname === item.path)}>
                {item.name}
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
          {desktopBefore.map((item) => (
            <Link key={item.path} to={item.path}
              className={`font-ui text-[10px] uppercase tracking-[0.3em] ${
                location.pathname === item.path ? 'text-foreground' : 'text-content-muted'
              }`}>
              {item.name}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setMobileCountriesOpen(o => !o)}
            className={`font-ui text-[10px] uppercase tracking-[0.3em] flex items-center gap-1 ${
              countriesActive ? 'text-foreground' : 'text-content-muted'
            }`}
          >
            Countries
            <ChevronDown className={`w-3 h-3 transition-transform ${mobileCountriesOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
          </button>

          {desktopAfter.map((item) => (
            <Link key={item.path} to={item.path}
              className={`font-ui text-[10px] uppercase tracking-[0.3em] ${
                location.pathname === item.path ? 'text-foreground' : 'text-content-muted'
              }`}>
              {item.name}
            </Link>
          ))}

          {mobileCountriesOpen && (
            <div className="basis-full pl-3 mt-1 flex flex-col gap-2 border-l border-border">
              {COUNTRIES.map(c => (
                <Link key={c.value} to={`/${c.value}`}
                  onClick={() => setMobileCountriesOpen(false)}
                  className={`font-ui text-[10px] uppercase tracking-[0.3em] ${
                    location.pathname === `/${c.value}` ? 'text-foreground' : 'text-content-muted'
                  }`}>
                  {c.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
