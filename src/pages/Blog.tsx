import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useCategories, formatDate } from '@/lib/blog';
import Seo from '@/components/Seo';
import Colophon from '@/components/editorial/Colophon';

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
    <>
      <Seo
        title="Journal — Sovandarapor (James) Kong"
        description="Notes, essays and field reports on building businesses, brands and a life in Cambodia and Southeast Asia."
      />

      <header className="py-32 max-w-3xl">
        <p className="eyebrow-gold mb-6">§ Journal</p>
        <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground">
          Writing.
        </h1>
        <p className="font-display italic font-light text-2xl md:text-3xl text-content-muted mt-8">
          Notes, essays, and field reports.
        </p>
      </header>

      {/* FILTERS */}
      <section className="border-t border-border py-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-ui text-[10px] uppercase tracking-[0.3em]">
            <button onClick={() => setCat('all')}
              className={`transition-colors duration-300 pb-1 ${cat === 'all' ? 'text-gold border-b border-gold' : 'text-content-muted hover:text-foreground'}`}>
              All
            </button>
            {categories.map((c, i) => (
              <div key={c} className="flex items-center gap-x-6">
                <span className="text-content-muted opacity-40">·</span>
                <button onClick={() => setCat(c)}
                  className={`transition-colors duration-300 pb-1 ${cat === c ? 'text-gold border-b border-gold' : 'text-content-muted hover:text-foreground'}`}>
                  {c}
                </button>
              </div>
            ))}
          </div>
          <div className="w-full md:w-72">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full bg-transparent border-0 border-b border-border focus:border-gold outline-none py-2 font-ui text-[11px] uppercase tracking-[0.3em] text-foreground placeholder:text-content-muted transition-colors"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <p className="py-20 text-center font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">Loading</p>
      ) : filtered.length === 0 ? (
        <p className="py-20 text-center font-display italic text-content-muted">Nothing here yet.</p>
      ) : (
        <>
          {/* FEATURED — Lead essay layout */}
          {featured && (
            <section className="relative py-24 md:py-32 border-t border-border">
              <Link to={`/blog/${featured.slug}`} className="block group">
                <div className="grid md:grid-cols-12 gap-y-12 md:gap-x-12">
                  {featured.featured_image_url && (
                    <div className="md:col-span-8 relative grain overflow-hidden">
                      <img
                        src={featured.featured_image_url}
                        alt={featured.title}
                        loading="lazy" decoding="async"
                        className="w-full aspect-[4/5] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <div className={`${featured.featured_image_url ? 'md:col-span-4 md:pt-24 md:-ml-32' : 'md:col-span-12'} relative md:z-10`}>
                    <p className="eyebrow-gold mb-4">Lead · 01</p>
                    <h2 className="font-display font-light text-5xl md:text-7xl leading-[1] text-foreground group-hover:text-gold transition-colors duration-500">
                      {featured.title}
                    </h2>
                  </div>
                  <div className="md:col-start-6 md:col-span-5 md:pt-8">
                    <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mb-6 tabular">
                      <span className="text-gold">{featured.category}</span>
                      <span className="opacity-40">·</span>
                      <span>{formatDate(featured.published_at)}</span>
                    </div>
                    {featured.subtitle && (
                      <p className="font-content text-lg leading-[1.8] text-content">{featured.subtitle}</p>
                    )}
                    <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-foreground mt-8 link-quiet">
                      Continue reading →
                    </p>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* THE COLLECTION — row-based list */}
          {rest.length > 0 && (
            <section className="py-24 md:py-32 border-t border-border">
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6 mb-10">
                <div>
                  <p className="eyebrow-gold mb-3">Index · 02</p>
                  <h2 className="font-display font-light text-5xl md:text-6xl text-foreground">The Collection</h2>
                </div>
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
                  {String(rest.length).padStart(2, '0')} Entries
                </p>
              </div>

              <ul className="divide-y divide-border">
                {rest.map((p, i) => (
                  <li key={p.id}>
                    <Link to={`/blog/${p.slug}`} className="grid grid-cols-12 gap-4 items-baseline py-6 md:py-8 group">
                      <span className="col-span-1 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="col-span-7 md:col-span-6 font-display font-light text-2xl md:text-4xl leading-[1.1] text-foreground group-hover:text-gold transition-colors duration-500">
                        {p.title}
                      </h3>
                      <span className="col-span-4 md:col-span-3 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">
                        {p.category}
                      </span>
                      <span className="col-span-12 md:col-span-2 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted text-right tabular">
                        {formatDate(p.published_at)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}

      <Colophon />
    </>
  );
}
