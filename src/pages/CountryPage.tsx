import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { formatDate, type CountryValue } from '@/lib/blog';
import { VENTURES, fetchVentureImages, type VentureImages } from '@/lib/siteSettings';
import Seo from '@/components/Seo';
import Plate from '@/components/editorial/Plate';
import ChapterDivider from '@/components/editorial/ChapterDivider';
import Colophon from '@/components/editorial/Colophon';
import heroBuddha from '@/assets/hero-buddha.jpg';
import featureTemple from '@/assets/feature-temple.jpg';
import mountainMist from '@/assets/mountain-mist.jpg';
import nondual2 from '@/assets/nondual-2.jpg';

interface CountryConfig {
  label: string;
  intro: string;
  image: string;
  imageAlt: string;
  imageLocation: string;
  imageDate: string;
}

const COUNTRY_CONFIG: Record<CountryValue, CountryConfig> = {
  cambodia: {
    label: 'Cambodia',
    intro: 'Operating in agriculture, dairy, spirits, and media. Building brands and businesses that can stand on a global stage from a Cambodian base.',
    image: heroBuddha, imageAlt: 'Buddha, Cambodia',
    imageLocation: 'Phnom Penh', imageDate: '2024',
  },
  thailand: {
    label: 'Thailand',
    intro: 'Notes from time spent across Bangkok, the north, and the islands. Work, observation, and the slow accumulation of a second home.',
    image: featureTemple, imageAlt: 'Temple light, Thailand',
    imageLocation: 'Bangkok', imageDate: '2023',
  },
  vietnam: {
    label: 'Vietnam',
    intro: 'Field reports from Saigon, Hanoi, and the country in between.',
    image: nondual2, imageAlt: 'Morning, Vietnam',
    imageLocation: 'Ho Chi Minh', imageDate: '2023',
  },
  france: {
    label: 'France',
    intro: 'Letters from the Old World. Where the work began and what it taught.',
    image: mountainMist, imageAlt: 'Mist, France',
    imageLocation: 'Provence', imageDate: '2022',
  },
};

interface Post {
  id: string; slug: string; title: string; subtitle: string | null;
  featured_image_url: string | null; category: string; published_at: string | null;
}

export default function CountryPage({ country }: { country: CountryValue }) {
  const cfg = COUNTRY_CONFIG[country];
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [ventureImages, setVentureImages] = useState<VentureImages>({});

  useEffect(() => {
    setLoading(true);
    (supabase.from('posts') as any)
      .select('id,slug,title,subtitle,featured_image_url,category,published_at')
      .eq('status', 'published')
      .eq('country', country)
      .order('published_at', { ascending: false })
      .then(({ data }: any) => { setPosts((data as Post[]) || []); setLoading(false); });
  }, [country]);

  useEffect(() => {
    if (country === 'cambodia') fetchVentureImages().then(setVentureImages);
  }, [country]);

  return (
    <>
      <Seo title={`${cfg.label} — Sovandarapor (James) Kong`} description={cfg.intro} />

      <header className="py-32 max-w-3xl">
        <p className="eyebrow-gold mb-6">§ Country · {cfg.label}</p>
        <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground">
          {cfg.label}.
        </h1>
        <p className="font-display italic font-light text-2xl text-content-muted mt-8 leading-[1.4]">
          {cfg.intro}
        </p>
      </header>

      {/* HERO PLATE */}
      <section className="pb-24 md:pb-32 border-t border-border pt-16">
        <Plate
          src={cfg.image}
          alt={cfg.imageAlt}
          plate="I"
          location={cfg.imageLocation}
          date={cfg.imageDate}
          ratio="portrait"
        />
      </section>

      {/* VENTURES — Cambodia only, chapter style */}
      {country === 'cambodia' && (
        <section className="border-t border-border">
          <header className="py-16">
            <p className="eyebrow-gold mb-4">§ Ventures</p>
            <h2 className="font-display font-light text-4xl md:text-6xl text-foreground">Built from the ground.</h2>
          </header>

          {VENTURES.map((v, i) => {
            const numerals = ['I', 'II', 'III', 'IV'];
            const flip = i % 2 === 1;
            const img = ventureImages[v.slug];
            return (
              <article key={v.slug} className="py-24 md:py-32 border-t border-border">
                <ChapterDivider numeral={numerals[i]} title={v.name} subtitle={`${v.category} · ${v.role}`} />

                <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
                  <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
                    <Plate
                      src={img}
                      alt={v.name}
                      plate={numerals[i]}
                      ratio={i % 2 === 0 ? 'portrait' : 'landscape'}
                      location={v.category}
                      placeholder={v.name}
                    />
                  </div>
                  <div className={`md:col-span-5 space-y-6 ${flip ? 'md:order-1 md:pr-4' : 'md:pl-4'} md:pt-8`}>
                    <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-gold">{v.role}</p>
                    <p className="font-content text-lg leading-[1.8] text-content reading">{v.desc}</p>
                    <p>
                      <Link to="/cambodia-work" className="font-ui text-[10px] uppercase tracking-[0.3em] text-foreground link-quiet">
                        All ventures →
                      </Link>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {/* NOTES — row-based list */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="flex items-end justify-between border-b border-border pb-6 mb-10">
          <div>
            <p className="eyebrow-gold mb-3">Notes from {cfg.label}</p>
            <h2 className="font-display font-light text-4xl md:text-5xl text-foreground">Field reports.</h2>
          </div>
          <Link to="/blog" className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted hover:text-gold">
            All writing →
          </Link>
        </div>

        {loading ? (
          <p className="py-12 text-center font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">Loading</p>
        ) : posts.length === 0 ? (
          <p className="py-12 text-center font-display italic text-content-muted">Notes from {cfg.label} coming soon.</p>
        ) : (
          <ul className="divide-y divide-border">
            {posts.map((p, i) => (
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
        )}
      </section>

      <Colophon />
    </>
  );
}
