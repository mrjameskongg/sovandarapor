import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';
import { categorySlug, formatDate } from '@/lib/blog';

interface Post {
  id: string; slug: string; title: string; subtitle: string | null;
  featured_image_url: string | null; category: string; tags: string[];
  content_html: string; gallery_urls: string[]; author_name: string | null;
  published_at: string | null; seo_title: string | null; seo_description: string | null;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [related, setRelated] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').maybeSingle()
      .then(({ data }) => {
        if (!data) { setNotFound(true); setLoading(false); return; }
        setPost(data as Post);
        document.title = (data.seo_title || data.title) + ' — James';
        const meta = document.querySelector('meta[name="description"]') || (() => {
          const m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); return m;
        })();
        meta.setAttribute('content', data.seo_description || data.subtitle || data.title);
        // related
        supabase.from('posts').select('id,slug,title,subtitle,featured_image_url,category,tags,published_at,content_html,gallery_urls,author_name,seo_title,seo_description')
          .eq('status', 'published').eq('category', data.category).neq('id', data.id).limit(3)
          .then(({ data: rel }) => setRelated((rel as Post[]) || []));
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-content-muted py-20 text-center">Loading…</div>;
  if (notFound || !post) return (
    <div className="py-20 text-center">
      <h1 className="font-display text-4xl text-foreground mb-3">Post not found</h1>
      <Link to="/blog" className="text-gold underline">Back to journal</Link>
    </div>
  );

  return (
    <article className="space-y-12">
      <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-content-muted hover:text-foreground">
        <ArrowLeft className="w-3 h-3" /> Back to journal
      </Link>

      <header className="space-y-6 max-w-3xl">
        <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-content-muted">
          <Link to={`/blog/category/${categorySlug(post.category)}`} className="text-gold hover:underline">{post.category}</Link>
          <span className="opacity-40">/</span>
          <span className="tabular">{formatDate(post.published_at)}</span>
          {post.author_name && <><span className="opacity-40">/</span><span>{post.author_name}</span></>}
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground leading-[0.95]">{post.title}</h1>
        {post.subtitle && <p className="font-content text-2xl text-content-muted leading-relaxed">{post.subtitle}</p>}
      </header>

      {post.featured_image_url && (
        <img src={post.featured_image_url} alt={post.title} className="w-full aspect-[16/9] object-cover rounded-sm" />
      )}

      <div className="prose max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: post.content_html }} />

      {post.gallery_urls?.length > 0 && (
        <section className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Gallery</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {post.gallery_urls.map(u => (
              <img key={u} src={u} alt="" className="w-full aspect-square object-cover rounded-sm" />
            ))}
          </div>
        </section>
      )}

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-6 text-xs text-content-muted">
          {post.tags.map(t => <span key={t}>#{t}</span>)}
        </div>
      )}

      {related.length > 0 && (
        <section className="border-t border-border pt-12 space-y-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Related</p>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map(r => (
              <Link key={r.id} to={`/blog/${r.slug}`} className="group">
                {r.featured_image_url && <img src={r.featured_image_url} alt="" className="w-full aspect-[4/3] object-cover rounded-sm mb-3" />}
                <h3 className="font-display text-xl text-foreground group-hover:text-gold">{r.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
