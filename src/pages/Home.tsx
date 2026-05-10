import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard, { Post } from '@/components/PostCard';
import { Input } from '@/components/ui/input';
import { ArrowRight, Search } from 'lucide-react';

const samplePosts: Post[] = [
  {
    id: '1',
    title: 'The Illusion of the Separate Self',
    slug: 'illusion-separate-self',
    date: '2024-01-15',
    tldr: 'Direct experience reveals no solid, separate self — just awareness appearing as everything.',
    tags: ['nondual', 'awareness', 'self-inquiry'],
    readingTime: 8,
    category: 'essays',
    excerpt: 'What we call "I" is just a collection of thoughts, sensations, and perceptions arising in awareness. There is no separate entity having these experiences — only experience, knowing itself.'
  },
  {
    id: '2',
    title: 'Phnom Penh: First 90 Days',
    slug: 'phnom-penh-first-90-days',
    date: '2024-01-10',
    tldr: "Living costs, visa runs, and finding rhythm in Cambodia's capital.",
    tags: ['Cambodia', 'expat', 'digital-nomad'],
    readingTime: 5,
    category: 'travel',
    excerpt: 'Rent: $400/month for a decent 1BR in BKK1. Food: $3–8/day eating local. Visa: business visa on arrival, extend monthly. Notes from three months on the ground.'
  },
  {
    id: '3',
    title: 'Building Remote Teams in SEA',
    slug: 'remote-teams-sea',
    date: '2024-01-08',
    tldr: 'Time zones, cultural bridges, and hiring in Thailand and Cambodia.',
    tags: ['business', 'remote-work', 'hiring'],
    readingTime: 12,
    category: 'build-log',
    excerpt: "Southeast Asia offers incredible talent at a third of Western costs. Here's what I learned building distributed teams across Bangkok and Phnom Penh."
  },
  {
    id: '4',
    title: 'Awareness Is Already Perfect',
    slug: 'awareness-already-perfect',
    date: '2024-01-05',
    tldr: 'Nothing needs to be added to awareness for it to be complete.',
    tags: ['nondual', 'presence'],
    readingTime: 3,
    category: 'notes',
    excerpt: 'The seeking mind looks for completion in experience. But awareness itself lacks nothing. It is already whole, already perfect, already free.'
  },
  {
    id: '5',
    title: 'Bangkok vs Phnom Penh',
    slug: 'bangkok-vs-phnom-penh',
    date: '2024-01-03',
    tldr: 'Cost, infrastructure, and quality of life for the long-stay nomad.',
    tags: ['Thailand', 'Cambodia', 'comparison'],
    readingTime: 6,
    category: 'notes',
    excerpt: 'Bangkok: better infrastructure, higher costs. Phnom Penh: raw energy, lower costs, fewer tourists. Both have their place.'
  },
  {
    id: '6',
    title: 'Q4 2023 — Revenue, Lessons, Plans',
    slug: 'q4-2023-update',
    date: '2023-12-28',
    tldr: 'Hit $15K MRR, expanded to Cambodia, hired three engineers.',
    tags: ['business', 'revenue', 'growth'],
    readingTime: 7,
    category: 'build-log',
    excerpt: 'Revenue grew 40% this quarter. The Cambodia expansion is working. Key lesson: hire slow, fire fast. Plans for 2024.'
  }
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

  const sorted = useMemo(
    () => [...samplePosts].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    []
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rest.filter((p) => {
      const inCat = filter === 'all' || p.category === filter;
      if (!inCat) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.tldr.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [rest, filter, query]);

  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    samplePosts.forEach((p) => p.tags.forEach((t) => map.set(t, (map.get(t) || 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 12);
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="space-y-24">
      {/* Masthead */}
      <header className="space-y-10">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-content-muted border-y border-border py-3">
          <span>Vol. 01 · Issue 12</span>
          <span className="hidden sm:inline">{today}</span>
          <span>Phnom Penh / Bangkok</span>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-8 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">A field notebook</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light leading-[0.95] text-foreground">
              Quiet notes on
              <span className="italic font-normal text-gold"> business, </span>
              the road, and
              <span className="italic font-normal"> what's already here.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:border-l md:border-border md:pl-8 space-y-4">
            <p className="font-content text-lg text-content-muted leading-relaxed">
              Sovandarapor Kong writes from Southeast Asia — building ventures in Cambodia and Thailand,
              traveling slowly, looking directly.
            </p>
            <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-medium text-foreground link-sweep">
              About the author <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Now strip */}
      <section className="grid md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-foreground">Currently</span>
          </div>
          <p className="text-xs text-content-muted mt-2 tabular">Updated Jan 15, 2024</p>
        </div>
        <p className="md:col-span-9 font-display text-2xl md:text-3xl leading-snug font-light text-foreground">
          In Phnom Penh, building a fintech for Southeast Asian SMEs.
          Reading less, looking more. Bangkok next, then back to Cambodia.
        </p>
      </section>

      {/* Featured */}
      {featured && (
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-2">Lead essay</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">This week's reading</h2>
            </div>
            <Link to={`/${featured.category}`} className="hidden md:inline-flex text-xs uppercase tracking-[0.2em] text-content-muted hover:text-gold transition-smooth">
              All {featured.category.replace('-', ' ')} →
            </Link>
          </div>

          <Link to={`/${featured.category}/${featured.slug}`} className="block group">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 border-t border-foreground pt-10">
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-content-muted">
                  <span className="text-gold">{featured.category}</span>
                  <span className="opacity-40">/</span>
                  <span className="tabular">{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
                  <span className="opacity-40">/</span>
                  <span>{featured.readingTime} min</span>
                </div>
                <div className="aspect-[4/5] w-full bg-gradient-hero rounded-sm relative overflow-hidden">
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, hsl(var(--gold) / 0.4), transparent 60%)' }} />
                  <div className="absolute bottom-6 left-6 right-6 text-paper">
                    <span className="font-display italic text-2xl text-paper/90">"{featured.tldr}"</span>
                  </div>
                  <div className="absolute top-6 left-6 font-display text-paper/70 text-sm tracking-widest">— Plate I</div>
                </div>
              </div>
              <div className="md:col-span-7 md:pt-4">
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.05] text-foreground group-hover:text-gold transition-smooth">
                  {featured.title}
                </h3>
                <div className="hairline my-8" />
                <p className="font-content text-lg md:text-xl text-content leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground mt-8 link-sweep w-fit">
                  Continue reading <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Archive */}
      <section className="space-y-10">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold mb-2">Archive</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">The collection</h2>
          </div>
          <div className="relative w-full max-w-xs hidden sm:block">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the archive…"
              className="pl-6 h-9 bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-gold text-sm"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {categories.map((c) => {
            const active = filter === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`text-xs uppercase tracking-[0.2em] py-1 transition-smooth ${
                  active ? 'text-foreground border-b border-gold' : 'text-content-muted hover:text-foreground'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-x-12 gap-y-2 md:grid-cols-2">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-content-muted font-display italic text-lg">
            Nothing here yet. Try clearing the filter.
          </div>
        )}
      </section>

      {/* Topics cloud */}
      <section className="border-t border-border pt-10">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold">Index</p>
            <h2 className="font-display text-2xl md:text-3xl text-foreground mt-2">By subject</h2>
          </div>
          <div className="md:col-span-9 flex flex-wrap gap-x-5 gap-y-3">
            {allTags.map(([tag, count]) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="font-display text-xl md:text-2xl text-content-muted hover:text-gold transition-smooth"
              >
                {tag}
                <sup className="text-[10px] ml-1 text-content-muted/70 tabular">{count}</sup>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
