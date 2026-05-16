import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { categorySlug, formatDate } from '@/lib/blog';
import Seo from '@/components/Seo';

interface Post {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string;
  published_at: string | null;
}

const PILLARS = [
  {
    title: 'Nondual',
    description: 'The thing that keeps happening, looked at honestly.',
    to: '/nondual',
  },
  {
    title: 'Travel',
    description: 'What the road teaches you when you stop performing it.',
    to: '/cambodia',
  },
  {
    title: 'Building',
    description: 'Notes from building something honest in Southeast Asia.',
    to: '/brand-building',
  },
];

const Home = () => {
  const [latest, setLatest] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from('posts')
      .select('id,slug,title,subtitle,category,published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(5)
      .then(({ data }) => setLatest((data as Post[]) || []));
  }, []);

  const year = new Date().getFullYear();

  return (
    <>
      <Seo
        title="Nondual Awareness, Travel & Business in Southeast Asia — James Kong"
        description="Essays and notes on nondual awareness, travel, and building businesses in Southeast Asia."
      />

      {/* SECTION 1 — HERO */}
      <section className="min-h-[88vh] flex items-center justify-center px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-content-muted">
            Sovandarapor (James) Kong
          </p>
          <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[1.08] tracking-[-0.015em] text-foreground">
            Notes from Southeast Asia on Nondual Awareness, Travel, and Building.
          </h1>
          <p className="font-display italic text-xl md:text-2xl text-content-muted leading-[1.5]">
            A slow blog from Cambodia and Thailand.
          </p>
          <a
            href="#intro"
            className="inline-block pt-8 font-ui text-[10px] uppercase tracking-[0.35em] text-content-muted hover:text-gold transition-colors duration-500"
          >
            Read ↓
          </a>
        </div>
      </section>

      {/* SECTION 2 — SHORT INTRO */}
      <section id="intro" className="py-24 md:py-32">
        <div className="max-w-[42rem] mx-auto px-6">
          <p className="font-content text-[18px] md:text-[20px] leading-[1.8] text-content text-center">
            I&rsquo;m James. I live between Cambodia and Thailand. I write about three
            things: the quiet shift that happens when you stop searching, the road that
            taught me how to see, and the slow work of building something honest in
            Southeast Asia. If any of that lands, you&rsquo;ll feel at home here.
          </p>
        </div>
      </section>

      {/* SECTION 3 — THREE PILLARS */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-5xl mx-auto px-6">
          <p className="eyebrow-gold text-center mb-16">Three quiet rooms</p>
          <div className="grid md:grid-cols-3 gap-12 md:gap-10">
            {PILLARS.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className="group flex flex-col items-center text-center md:items-start md:text-left space-y-5"
              >
                <h2 className="font-display font-light text-4xl md:text-5xl leading-[1] text-foreground group-hover:text-gold transition-colors duration-500">
                  {p.title}
                </h2>
                <p className="font-content text-[17px] md:text-[18px] leading-[1.7] text-content-muted">
                  {p.description}
                </p>
                <span className="font-ui text-[10px] uppercase tracking-[0.35em] text-gold pt-2 link-quiet">
                  Enter →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — LATEST WRITING */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-[42rem] mx-auto px-6">
          <p className="eyebrow-gold mb-12">Latest writing</p>
          {latest.length === 0 ? (
            <p className="font-content italic text-content-muted">Nothing here yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {latest.map((p) => (
                <li key={p.id} className="py-8">
                  <Link to={`/blog/${p.slug}`} className="group block space-y-3">
                    <div className="flex items-center gap-4 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
                      <Link
                        to={`/blog/category/${categorySlug(p.category)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-gold hover:underline"
                      >
                        {p.category}
                      </Link>
                      <span className="opacity-40">·</span>
                      <span>{formatDate(p.published_at)}</span>
                    </div>
                    <h3 className="font-display font-light text-2xl md:text-3xl leading-[1.15] text-foreground group-hover:text-gold transition-colors duration-500">
                      {p.title}
                    </h3>
                    {p.subtitle && (
                      <p className="font-content text-[17px] leading-[1.7] text-content-muted">
                        {p.subtitle}
                      </p>
                    )}
                    <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-gold pt-1 link-quiet">
                      Read →
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* SECTION 5 — ABOUT / CLOSING */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-[42rem] mx-auto px-6 text-center space-y-10">
          <p className="font-display italic text-2xl md:text-3xl text-content">
            Welcome. Take your time.
          </p>
          <div className="flex items-center justify-center gap-8 font-ui text-[10px] uppercase tracking-[0.35em]">
            <Link to="/about" className="text-foreground link-quiet">About</Link>
            <span className="text-content-muted opacity-40">·</span>
            <Link to="/contact" className="text-foreground link-quiet">Contact</Link>
          </div>
        </div>
      </section>

      {/* FOOTER ROW (in addition to Layout footer) */}
      <section className="pt-16 pb-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">
          <span>© {year} Sovandarapor (James) Kong</span>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="link-quiet">
            Back to top ↑
          </a>
        </div>
      </section>
    </>
  );
};

export default Home;
