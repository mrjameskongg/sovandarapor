import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard, { Post } from '@/components/PostCard';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search, ArrowDown } from 'lucide-react';
import heroStreet from '@/assets/hero-street.jpg';
import featureTemple from '@/assets/feature-temple.jpg';
import deskNotes from '@/assets/desk-notes.jpg';
import mountainMist from '@/assets/mountain-mist.jpg';

const samplePosts: Post[] = [
  { id: '1', title: 'The Illusion of the Separate Self', slug: 'illusion-separate-self', date: '2024-01-15', tldr: 'Direct experience reveals no solid, separate self — just awareness appearing as everything.', tags: ['nondual', 'awareness', 'self-inquiry'], readingTime: 8, category: 'essays', excerpt: 'What we call "I" is just a collection of thoughts, sensations, and perceptions arising in awareness. There is no separate entity having these experiences — only experience, knowing itself.' },
  { id: '2', title: 'Phnom Penh: First 90 Days', slug: 'phnom-penh-first-90-days', date: '2024-01-10', tldr: "Living costs, visa runs, and finding rhythm in Cambodia's capital.", tags: ['Cambodia', 'expat', 'digital-nomad'], readingTime: 5, category: 'travel', excerpt: 'Rent: $400/month for a decent 1BR in BKK1. Food: $3–8/day eating local. Visa: business visa on arrival, extend monthly. Notes from three months on the ground.' },
  { id: '3', title: 'Building Remote Teams in SEA', slug: 'remote-teams-sea', date: '2024-01-08', tldr: 'Time zones, cultural bridges, and hiring in Thailand and Cambodia.', tags: ['business', 'remote-work', 'hiring'], readingTime: 12, category: 'build-log', excerpt: "Southeast Asia offers incredible talent at a third of Western costs. Here's what I learned building distributed teams across Bangkok and Phnom Penh." },
  { id: '4', title: 'Awareness Is Already Perfect', slug: 'awareness-already-perfect', date: '2024-01-05', tldr: 'Nothing needs to be added to awareness for it to be complete.', tags: ['nondual', 'presence'], readingTime: 3, category: 'notes', excerpt: 'The seeking mind looks for completion in experience. But awareness itself lacks nothing.' },
  { id: '5', title: 'Bangkok vs Phnom Penh', slug: 'bangkok-vs-phnom-penh', date: '2024-01-03', tldr: 'Cost, infrastructure, and quality of life for the long-stay nomad.', tags: ['Thailand', 'Cambodia', 'comparison'], readingTime: 6, category: 'notes', excerpt: 'Bangkok: better infrastructure, higher costs. Phnom Penh: raw energy, lower costs, fewer tourists.' },
  { id: '6', title: 'Q4 2023 — Revenue, Lessons, Plans', slug: 'q4-2023-update', date: '2023-12-28', tldr: 'Hit $15K MRR, expanded to Cambodia, hired three engineers.', tags: ['business', 'revenue', 'growth'], readingTime: 7, category: 'build-log', excerpt: 'Revenue grew 40% this quarter. The Cambodia expansion is working. Key lesson: hire slow, fire fast.' },
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'essays', label: 'Essays' },
  { key: 'notes', label: 'Notes' },
  { key: 'travel', label: 'Travel' },
  { key: 'build-log', label: 'Build Log' },
] as const;

const Home = () => {
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sorted = useMemo(() => [...samplePosts].sort((a, b) => +new Date(b.date) - +new Date(a.date)), []);
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter((p) => {
      const inCat = filter === 'all' || p.category === filter;
      if (!inCat) return false;
      if (!q) return true;
      return p.title.toLowerCase().includes(q) || p.tldr.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
    });
  }, [rest, filter, query]);

  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    samplePosts.forEach((p) => p.tags.forEach((t) => map.set(t, (map.get(t) || 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <>
      {/* FULL-BLEED CINEMATIC HERO — breaks out of Layout's container */}
      <section className="relative -mx-6 md:-mx-10 -mt-10 md:-mt-16 h-screen min-h-[640px] overflow-hidden">
        <img
          src={heroStreet}
          alt="A lone figure walks a neon-lit street in Southeast Asia at dusk"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translate3d(0, ${scrollY * 0.4}px, 0) scale(${1 + scrollY * 0.0004})` }}
        />
        {/* gradient washes */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />
        {/* film grain */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '2px 2px' }} />

        {/* top meta bar */}
        <div className="absolute top-0 inset-x-0 z-10 px-6 md:px-12 pt-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/70">
          <span>Vol. 01 · Issue 12</span>
          <span className="hidden sm:inline">{today}</span>
          <span>14.5896° N · 104.9165° E</span>
        </div>

        {/* hero copy */}
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-20 md:pb-28 max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-8">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-gold">
              <span className="w-8 h-px bg-gold" />
              <span>A field notebook</span>
            </div>
            <h1 className="font-display text-[14vw] md:text-[9vw] lg:text-[8rem] xl:text-[10rem] font-light leading-[0.88] text-white">
              Quiet notes,
              <br />
              <span className="italic font-normal text-gold">loud places.</span>
            </h1>
            <p className="font-content text-lg md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              Sovandarapor Kong writes from Southeast Asia — building ventures in Cambodia
              and Thailand, traveling slowly, looking directly.
            </p>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* CONTENT BELOW HERO */}
      <div className="space-y-32 pt-24">
        {/* Manifesto strip */}
        <section className="grid md:grid-cols-12 gap-8 items-start border-y border-border py-12">
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-foreground">Currently</span>
            </div>
            <p className="text-xs text-content-muted mt-2 tabular">Phnom Penh · Jan 15</p>
          </div>
          <p className="md:col-span-9 font-display text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-light text-foreground">
            Building a fintech for Southeast Asian SMEs.
            <span className="text-content-muted"> Reading less, looking more.</span>
          </p>
        </section>

        {/* Featured — image-led */}
        {featured && (
          <section>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">Lead essay · 01</p>
                <h2 className="font-display text-4xl md:text-5xl text-foreground">This week's reading</h2>
              </div>
            </div>

            <Link to={`/${featured.category}/${featured.slug}`} className="block group">
              <div className="grid md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-7 relative overflow-hidden rounded-sm">
                  <img
                    src={featureTemple}
                    alt={featured.title}
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 text-paper/80 text-[10px] uppercase tracking-[0.3em] font-display">
                    Plate I
                  </div>
                </div>
                <div className="md:col-span-5 md:pt-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-content-muted mb-6">
                      <span className="text-gold">{featured.category}</span>
                      <span className="opacity-40">/</span>
                      <span className="tabular">{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                      <span className="opacity-40">/</span>
                      <span>{featured.readingTime} min</span>
                    </div>
                    <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.02] text-foreground group-hover:text-gold transition-smooth">
                      {featured.title}
                    </h3>
                    <div className="hairline my-8" />
                    <p className="font-content text-lg text-content leading-relaxed">{featured.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground mt-10 link-sweep w-fit">
                    Continue reading <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Wide cinematic break */}
        <section className="relative -mx-6 md:-mx-10 h-[60vh] min-h-[420px] overflow-hidden">
          <img src={mountainMist} alt="Misty mountain ridges at dawn" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          <div className="relative z-10 h-full flex items-center justify-center px-6">
            <blockquote className="font-display italic text-3xl md:text-5xl lg:text-6xl font-light text-foreground text-center max-w-4xl leading-[1.15]">
              "The road doesn't change you. It just stops you
              <span className="text-gold"> pretending."</span>
            </blockquote>
          </div>
        </section>

        {/* Archive */}
        <section className="space-y-10">
          <div className="flex items-end justify-between border-b border-border pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Archive · 02</p>
              <h2 className="font-display text-4xl md:text-5xl text-foreground">The collection</h2>
            </div>
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the archive…" className="pl-6 h-9 bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-gold text-sm" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {categories.map((c) => (
              <button key={c.key} onClick={() => setFilter(c.key)} className={`text-xs uppercase tracking-[0.2em] py-1 transition-smooth ${filter === c.key ? 'text-foreground border-b border-gold' : 'text-content-muted hover:text-foreground'}`}>
                {c.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-x-12 gap-y-2 md:grid-cols-2">
              {filtered.map((post, i) => <PostCard key={post.id} post={post} index={i + 1} />)}
            </div>
          ) : (
            <div className="text-center py-16 text-content-muted font-display italic text-lg">Nothing here yet.</div>
          )}
        </section>

        {/* Desk image — atmosphere break */}
        <section className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 relative overflow-hidden rounded-sm">
            <img src={deskNotes} alt="Field notebook, fountain pen, riel notes, and espresso" loading="lazy" className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="md:col-span-5 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Practice · 03</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight text-foreground">
              Written in the open.
            </h2>
            <p className="font-content text-lg text-content-muted leading-relaxed">
              Every essay, every number, every misstep — published while the ink is still wet.
              No retrofitting. No inspirational gloss.
            </p>
            <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-medium text-foreground link-sweep">
              About the author <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Topics */}
        <section className="border-t border-border pt-12">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Index · 04</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mt-2">By subject</h2>
            </div>
            <div className="md:col-span-9 flex flex-wrap gap-x-5 gap-y-3">
              {allTags.map(([tag, count]) => (
                <button key={tag} onClick={() => setQuery(tag)} className="font-display text-2xl md:text-3xl text-content-muted hover:text-gold transition-smooth">
                  {tag}<sup className="text-[10px] ml-1 text-content-muted/70 tabular">{count}</sup>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
