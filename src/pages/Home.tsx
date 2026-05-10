import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PostCard, { Post } from '@/components/PostCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, Search, Sparkles } from 'lucide-react';

const samplePosts: Post[] = [
  {
    id: '1',
    title: 'The Illusion of the Separate Self',
    slug: 'illusion-separate-self',
    date: '2024-01-15',
    tldr: 'Direct experience reveals no solid, separate self - just awareness appearing as everything',
    tags: ['nondual', 'awareness', 'self-inquiry'],
    readingTime: 8,
    category: 'essays',
    excerpt: 'What we call "I" is just a collection of thoughts, sensations, and perceptions arising in awareness. There is no separate entity having these experiences...'
  },
  {
    id: '2',
    title: 'Phnom Penh: First 90 Days',
    slug: 'phnom-penh-first-90-days',
    date: '2024-01-10',
    tldr: "Living costs, visa runs, and finding rhythm in Cambodia's capital",
    tags: ['Cambodia', 'expat', 'digital-nomad'],
    readingTime: 5,
    category: 'travel',
    excerpt: 'Rent: $400/month for a decent 1BR in BKK1. Food: $3-8/day eating local. Visa: business visa on arrival, extend monthly...'
  },
  {
    id: '3',
    title: 'Building Remote Teams in SEA',
    slug: 'remote-teams-sea',
    date: '2024-01-08',
    tldr: 'Time zones, cultural bridges, and hiring in Thailand/Cambodia markets',
    tags: ['business', 'remote-work', 'hiring'],
    readingTime: 12,
    category: 'build-log',
    excerpt: "Southeast Asia offers incredible talent at 1/3 Western costs. Here's what I learned building distributed teams across Bangkok and Phnom Penh..."
  },
  {
    id: '4',
    title: 'Awareness Is Already Perfect',
    slug: 'awareness-already-perfect',
    date: '2024-01-05',
    tldr: 'Nothing needs to be added to awareness for it to be complete',
    tags: ['nondual', 'presence'],
    readingTime: 3,
    category: 'notes',
    excerpt: 'The seeking mind looks for completion in experience. But awareness itself lacks nothing. It is already whole, already perfect, already free...'
  },
  {
    id: '5',
    title: 'Bangkok vs Phnom Penh',
    slug: 'bangkok-vs-phnom-penh',
    date: '2024-01-03',
    tldr: 'Cost, infrastructure, and quality of life comparison for digital nomads',
    tags: ['Thailand', 'Cambodia', 'comparison'],
    readingTime: 6,
    category: 'notes',
    excerpt: 'Bangkok: Better infrastructure, higher costs. Phnom Penh: Raw energy, lower costs, fewer tourists. Both have their place...'
  },
  {
    id: '6',
    title: 'Q4 2023: Revenue, Lessons, Plans',
    slug: 'q4-2023-update',
    date: '2023-12-28',
    tldr: 'Hit $15K MRR, expanded to Cambodia, hired 3 engineers',
    tags: ['business', 'revenue', 'growth'],
    readingTime: 7,
    category: 'build-log',
    excerpt: 'Revenue grew 40% this quarter. The Cambodia expansion is working. Key lesson: hire slow, fire fast. Plans for 2024...'
  }
];

const categories = [
  { key: 'all', label: 'All' },
  { key: 'essays', label: 'Essays' },
  { key: 'notes', label: 'Notes' },
  { key: 'travel', label: 'Travel' },
  { key: 'build-log', label: 'Build Log' },
] as const;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

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
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, []);

  return (
    <div className="space-y-14">
      {/* Hero */}
      <header className="space-y-5 pt-4">
        <Badge variant="outline" className="bg-gold/10 text-gold border-gold/20">
          <Sparkles className="w-3 h-3 mr-1" /> Thinking in public
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
          Notes from the road: business, travel,
          <span className="text-gold"> and nondual seeing.</span>
        </h1>
        <p className="text-lg text-content-muted font-content max-w-2xl leading-relaxed">
          James — Phnom Penh ↔ Bangkok. Building ventures in Cambodia and Thailand.
          Clean processes, clear thinking, quiet discipline.
        </p>
      </header>

      {/* Now Section */}
      <Card className="p-6 bg-gradient-subtle border-gold/20">
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
          </span>
          <Badge variant="outline" className="bg-gold/10 text-gold border-gold/20">Now</Badge>
          <span className="text-xs text-content-muted">Updated Jan 15, 2024</span>
        </div>
        <p className="text-content font-content leading-relaxed m-0">
          Currently in Phnom Penh building a fintech product for SMEs.
          Exploring nondual awareness through direct investigation.
          Next: Bangkok for 2 weeks, then back to Cambodia.
        </p>
      </Card>

      {/* Featured Post */}
      {featured && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm uppercase tracking-widest text-content-muted font-medium">Featured</h2>
            <Link
              to={`/${featured.category}`}
              className="text-xs text-content-muted hover:text-gold transition-smooth"
            >
              View all {featured.category.replace('-', ' ')} →
            </Link>
          </div>
          <Link to={`/${featured.category}/${featured.slug}`} className="block group">
            <Card className="overflow-hidden border-border hover:shadow-elegant transition-smooth">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 bg-gradient-hero p-8 flex flex-col justify-between min-h-[200px]">
                  <Badge variant="outline" className="w-fit bg-background/10 text-white border-white/30 backdrop-blur">
                    {featured.category.replace('-', ' ')}
                  </Badge>
                  <div className="flex items-center gap-4 text-xs text-white/80 mt-6">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(featured.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readingTime} min</span>
                  </div>
                </div>
                <div className="md:col-span-3 p-8 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-gold transition-smooth leading-tight">
                    {featured.title}
                  </h3>
                  <p className="text-content-muted font-content leading-relaxed">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center text-gold text-sm font-medium pt-2">
                    Read essay <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-smooth" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </section>
      )}

      {/* Filters + Search */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Latest writing</h2>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, tags…"
              className="pl-9 h-9"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {categories.map((c) => {
            const active = filter === c.key;
            return (
              <Button
                key={c.key}
                variant={active ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter(c.key)}
                className={active ? 'bg-foreground text-background hover:bg-foreground/90' : 'text-content-muted'}
              >
                {c.label}
              </Button>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-content-muted">
            No posts match. Try clearing the filter.
          </div>
        )}
      </section>

      {/* Topics */}
      <section className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-sm uppercase tracking-widest text-content-muted font-medium">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(([tag, count]) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-gold hover:text-gold text-content-muted transition-smooth"
            >
              {tag} <span className="opacity-60">·{count}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
