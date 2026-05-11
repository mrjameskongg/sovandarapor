import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Search, ArrowUpRight } from 'lucide-react';
import { useCategories, categorySlug, formatDate } from '@/lib/blog';
import Seo from '@/components/Seo';

interface Post {
  id: string; slug: string; title: string; subtitle: string | null;
  featured_image_url: string | null; category: string; tags: string[];
  published_at: string | null;
}

export default function Blog() {
  const categories = useCategories();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<string>('all');

  useEffect(() => {
    supabase.from('posts')
      .select('id,slug,title,subtitle,featured_image_url,category,tags,published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .then(({ data }) => { setPosts((data as Post[]) || []); setLoading(false); });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(p => {
      if (cat !== 'all' && p.category !== cat) return false;
      if (!q) return true;
      return p.title.toLowerCase().includes(q) ||
        (p.subtitle || '').toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
    });
  }, [posts, query, cat]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="space-y-16">
      <Seo title="Journal — Sovandarapor (James) Kong" description="Notes, essays and field reports on building businesses, brands and a life in Cambodia and Southeast Asia." />
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Journal</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground leading-[0.95]">Writing</h1>
        <p className="font-content text-lg text-content-muted max-w-2xl">
          Notes, essays, and field reports on building businesses, brands, and a life in Cambodia.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <button onClick={() => setCat('all')}
            className={`text-xs uppercase tracking-[0.2em] py-1 ${cat === 'all' ? 'text-foreground border-b border-gold' : 'text-content-muted hover:text-foreground'}`}>All</button>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`text-xs uppercase tracking-[0.2em] py-1 ${cat === c ? 'text-foreground border-b border-gold' : 'text-content-muted hover:text-foreground'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search…"
            className="pl-6 h-9 bg-transparent border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-gold text-sm" />
        </div>
      </div>

      {loading ? (
        <div className="text-content-muted">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 font-display italic text-content-muted">Nothing here yet.</div>
      ) : (
        <>
          {featured && (
            <Link to={`/blog/${featured.slug}`} className="block group">
              <div className="grid md:grid-cols-12 gap-8">
                {featured.featured_image_url && (
                  <div className="md:col-span-7 overflow-hidden rounded-sm">
                    <img src={featured.featured_image_url} alt={featured.title}
                      fetchPriority="high" decoding="async"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}
                <div className={`${featured.featured_image_url ? 'md:col-span-5' : 'md:col-span-12'} flex flex-col justify-center`}>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">Featured · {featured.category}</p>
                  <h2 className="font-display text-4xl md:text-5xl text-foreground group-hover:text-gold transition-colors">{featured.title}</h2>
                  {featured.subtitle && <p className="font-content text-lg text-content-muted mt-4">{featured.subtitle}</p>}
                  <p className="text-xs text-content-muted mt-6 tabular">{formatDate(featured.published_at)}</p>
                </div>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 border-t border-border pt-12">
              {rest.map(p => (
                <Link key={p.id} to={`/blog/${p.slug}`} className="group">
                  {p.featured_image_url && (
                    <div className="overflow-hidden rounded-sm mb-5">
                      <img src={p.featured_image_url} alt={p.title}
                        loading="lazy" decoding="async"
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-content-muted mb-3">
                    <Link to={`/blog/category/${categorySlug(p.category)}`} onClick={e => e.stopPropagation()} className="text-gold hover:underline">{p.category}</Link>
                    <span className="tabular">{formatDate(p.published_at)}</span>
                  </div>
                  <h3 className="font-display text-2xl text-foreground group-hover:text-gold transition-colors leading-tight">{p.title}</h3>
                  {p.subtitle && <p className="font-content text-content-muted mt-3 line-clamp-2">{p.subtitle}</p>}
                  <div className="mt-4 flex items-center gap-1 text-xs text-content-muted group-hover:text-gold">
                    Read <ArrowUpRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
