import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Wheat, Milk, Wine, ArrowUpRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { categorySlug, formatDate, type CountryValue } from '@/lib/blog';

interface CountryConfig {
  label: string;
  intro: string;
}

// Edit these intros freely. They live in code, not in the DB.
const COUNTRY_CONFIG: Record<CountryValue, CountryConfig> = {
  cambodia: {
    label: 'Cambodia',
    intro:
      'Operating in agriculture, dairy, spirits, and media. Building brands and businesses that can stand on a global stage from a Cambodian base.',
  },
  thailand: {
    label: 'Thailand',
    intro:
      'Notes from time spent across Bangkok, the north, and the islands. Work, observation, and the slow accumulation of a second home.',
  },
  vietnam: {
    label: 'Vietnam',
    intro: 'Field reports from Saigon, Hanoi, and the country in between.',
  },
  france: {
    label: 'France',
    intro: 'Letters from the Old World. Where the work began and what it taught.',
  },
};

const cambodiaVentures = [
  { icon: Crown, name: 'Princess Jenna Norodom', category: 'Media & Talent', role: 'Personal Manager', desc: 'Managing public presence, partnerships, and content strategy for Princess Jenna Norodom.' },
  { icon: Wheat, name: 'BRM Agro', category: 'Rice', role: 'Brand Strategy', desc: 'Building a premium rice brand for export, from origin story to packaging to international buyers.' },
  { icon: Milk, name: 'Moo Moo Farms', category: 'Dairy', role: 'Group Operations', desc: 'Turnaround work on a Cambodian dairy operation. Supply, distribution, and a new web presence.' },
  { icon: Wine, name: 'Seekers Group', category: 'Spirits & Hospitality', role: 'Brand & Storytelling', desc: 'Spirits and hospitality concepts grounded in Cambodian terroir and craft.' },
];

interface Post {
  id: string; slug: string; title: string; subtitle: string | null;
  featured_image_url: string | null; category: string; published_at: string | null;
}

export default function CountryPage({ country }: { country: CountryValue }) {
  const cfg = COUNTRY_CONFIG[country];
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase.from('posts')
      .select('id,slug,title,subtitle,featured_image_url,category,published_at')
      .eq('status', 'published')
      .eq('country' as any, country)
      .order('published_at', { ascending: false })
      .then(({ data }) => { setPosts((data as Post[]) || []); setLoading(false); });
  }, [country]);

  return (
    <div className="space-y-20">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Country</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground leading-[0.95]">{cfg.label}</h1>
        <p className="font-content text-lg text-content-muted max-w-2xl">{cfg.intro}</p>
      </header>

      {country === 'cambodia' && (
        <section className="space-y-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Ventures</p>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {cambodiaVentures.map(v => {
              const Icon = v.icon;
              return (
                <div key={v.name} className="bg-background p-8 md:p-10 group">
                  <div className="flex items-start justify-between mb-6">
                    <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                    <Link to={`/blog/category/${categorySlug(v.category)}`} className="text-[10px] uppercase tracking-[0.22em] text-content-muted hover:text-gold flex items-center gap-1">
                      Read more <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-content-muted mb-2">{v.category} · {v.role}</p>
                  <h2 className="font-display text-3xl text-foreground mb-4">{v.name}</h2>
                  <p className="font-content text-content-muted leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="space-y-8">
        <div className="flex items-end justify-between border-b border-border pb-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Notes from {cfg.label}</p>
          <Link to="/blog" className="text-[10px] uppercase tracking-[0.22em] text-content-muted hover:text-gold">All writing</Link>
        </div>

        {loading ? (
          <div className="text-content-muted">Loading…</div>
        ) : posts.length === 0 ? (
          <div className="font-content italic text-content-muted py-10">Notes from {cfg.label} coming soon.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {posts.map(p => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="group">
                {p.featured_image_url && (
                  <div className="overflow-hidden rounded-sm mb-5">
                    <img src={p.featured_image_url} alt={p.title}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-content-muted mb-3">
                  <span className="text-gold">{p.category}</span>
                  <span className="tabular">{formatDate(p.published_at)}</span>
                </div>
                <h3 className="font-display text-2xl text-foreground group-hover:text-gold transition-colors leading-tight">{p.title}</h3>
                {p.subtitle && <p className="font-content text-content-muted mt-3 line-clamp-2">{p.subtitle}</p>}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
