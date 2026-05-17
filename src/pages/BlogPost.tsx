import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { categorySlug, formatDate } from '@/lib/blog';
import Colophon from '@/components/editorial/Colophon';
import Seo from '@/components/Seo';
import DOMPurify from 'dompurify';

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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').maybeSingle()
      .then(({ data }) => {
        if (!data) { setNotFound(true); setLoading(false); return; }
        setPost(data as Post);
        document.title = (data.seo_title || data.title) + ' — James Kong';
        const meta = document.querySelector('meta[name="description"]') || (() => {
          const m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); return m;
        })();
        meta.setAttribute('content', data.seo_description || data.subtitle || data.title);
        supabase.from('posts').select('id,slug,title,subtitle,featured_image_url,category,tags,published_at,content_html,gallery_urls,author_name,seo_title,seo_description')
          .eq('status', 'published').eq('category', data.category).neq('id', data.id).limit(2)
          .then(({ data: rel }) => setRelated((rel as Post[]) || []));
        setLoading(false);
      });
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(1, h.scrollTop / total) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (loading) return <div className="py-32 text-center font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">Loading</div>;
  if (notFound || !post) return (
    <div className="py-32 text-center">
      <h1 className="font-display font-light text-5xl text-foreground mb-6">Not found.</h1>
      <Link to="/blog" className="font-ui text-[10px] uppercase tracking-[0.3em] text-gold link-quiet">Back to journal</Link>
    </div>
  );

  return (
    <>
      <Seo
        title={`${post.seo_title || post.title} — James Kong`}
        description={post.seo_description || post.subtitle || post.title}
        image={post.featured_image_url || undefined}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.seo_description || post.subtitle || undefined,
          image: post.featured_image_url || undefined,
          datePublished: post.published_at || undefined,
          url: typeof window !== 'undefined' ? window.location.href.split('?')[0] : undefined,
          author: {
            '@type': 'Person',
            name: post.author_name || 'Sovandarapor (James) Kong',
          },
          mainEntityOfPage: typeof window !== 'undefined' ? window.location.href.split('?')[0] : undefined,
        }}
      />
      {/* Reading progress hairline */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-px bg-transparent">
        <div className="h-full bg-gold transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* COVER PAGE */}
      {post.featured_image_url && (
        <section className="relative -mx-6 md:-mx-10 -mt-10 md:-mt-16 h-[85vh] min-h-[600px] overflow-hidden grain">
          <img src={post.featured_image_url} alt={post.title} fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
          <p className="absolute bottom-6 left-6 md:left-12 font-ui text-[10px] uppercase tracking-[0.3em] text-foreground/70">
            Plate I · {post.category}
          </p>
        </section>
      )}

      <article className="pt-16 md:pt-24">
        {/* TITLE */}
        <header className="max-w-4xl mx-auto text-center mb-20 px-2">
          <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-gold mb-8">
            <Link to={`/blog/category/${categorySlug(post.category)}`} className="link-quiet">{post.category}</Link>
          </p>
          <h1 className="font-display font-light text-5xl md:text-8xl leading-[0.95] text-foreground">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="font-display italic font-light text-2xl md:text-3xl text-content-muted mt-10 leading-snug">
              {post.subtitle}
            </p>
          )}
          <div className="hairline w-24 mx-auto my-12" />
          <div className="flex items-center justify-center gap-5 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
            <span>{formatDate(post.published_at)}</span>
            {post.author_name && <><span className="opacity-40">·</span><span>{post.author_name}</span></>}
          </div>
        </header>

        {/* BODY */}
        <div
          className="prose reading max-w-[62ch] mx-auto px-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content_html, { USE_PROFILES: { html: true } }) }}
        />

        {/* GALLERY — varied sizes */}
        {post.gallery_urls?.length > 0 && (
          <section className="mt-24 max-w-5xl mx-auto space-y-6">
            <p className="eyebrow-gold text-center mb-8">Plates</p>
            {post.gallery_urls.map((u, i) => (
              <figure key={u} className={i % 3 === 0 ? '' : i % 3 === 1 ? 'md:px-16' : 'md:px-32'}>
                <img src={u} alt="" loading="lazy" decoding="async" className="w-full grain" />
                <figcaption className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mt-3">
                  Plate {String(i + 2).padStart(2, '0')}
                </figcaption>
              </figure>
            ))}
          </section>
        )}

        {/* TAGS */}
        {post.tags?.length > 0 && (
          <div className="max-w-[62ch] mx-auto mt-24 pt-8 border-t border-border font-content italic text-content-muted text-base">
            Filed under: {post.tags.map((t, i) => (
              <span key={t}>{i > 0 && ', '}{t}</span>
            ))}
          </div>
        )}

        {/* CONTINUE */}
        {related.length > 0 && (
          <section className="mt-32 border-t border-border pt-12 max-w-5xl mx-auto">
            <p className="eyebrow-gold mb-10">Read Next</p>
            <div className="grid md:grid-cols-2 gap-12">
              {related.slice(0, 2).map((r) => (
                <Link key={r.id} to={`/blog/${r.slug}`} className="group flex gap-6 items-start">
                  {r.featured_image_url && (
                    <img src={r.featured_image_url} alt="" loading="lazy" decoding="async" className="w-32 aspect-[4/5] object-cover grain shrink-0" />
                  )}
                  <div>
                    <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mb-3">{r.category}</p>
                    <h3 className="font-display font-light text-2xl md:text-3xl leading-tight text-foreground group-hover:text-gold transition-colors duration-500">
                      {r.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Colophon />
      </article>
    </>
  );
}
