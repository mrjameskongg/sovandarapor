import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { categoryFromSlug, categorySlug, formatDate } from '@/lib/blog';

export default function BlogCategory() {
  const { slug } = useParams();
  const category = slug ? categoryFromSlug(slug) : null;
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    supabase.from('posts').select('id,slug,title,subtitle,featured_image_url,category,published_at')
      .eq('status', 'published').eq('category', category)
      .order('published_at', { ascending: false })
      .then(({ data }) => { setPosts(data || []); setLoading(false); });
  }, [category]);

  if (!category) return <Navigate to="/blog" replace />;

  return (
    <div className="space-y-12">
      <header className="space-y-3 border-b border-border pb-8">
        <Link to="/blog" className="text-[11px] uppercase tracking-[0.2em] text-content-muted hover:text-gold">← All writing</Link>
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Category</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground leading-[0.95]">{category}</h1>
      </header>

      {loading ? <div className="text-content-muted">Loading…</div> :
        posts.length === 0 ? <div className="font-display italic text-content-muted py-12">No posts in this category yet.</div> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map(p => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="group">
              {p.featured_image_url && (
                <div className="overflow-hidden rounded-sm mb-4">
                  <img src={p.featured_image_url} alt={p.title} className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              )}
              <p className="text-[10px] uppercase tracking-[0.22em] text-content-muted mb-2 tabular">{formatDate(p.published_at)}</p>
              <h3 className="font-display text-2xl text-foreground group-hover:text-gold">{p.title}</h3>
              {p.subtitle && <p className="font-content text-content-muted mt-2 line-clamp-2">{p.subtitle}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
