import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import heroStreet from '@/assets/hero-buddha.jpg';
import featureBangkok from '@/assets/feature-bangkok.jpg';
import mountainMist from '@/assets/mountain-mist.jpg';
import Masthead from '@/components/editorial/Masthead';
import Colophon from '@/components/editorial/Colophon';
import Seo from '@/components/Seo';
import InkShader from '@/components/InkShader';
import { useReveal } from '@/hooks/useReveal';

type Pillar = 'nondual' | 'countries' | 'craft';

interface Post {
  id: string; title: string; slug: string; date: string; tldr: string;
  tags: string[]; readingTime: number;
  category: 'essays' | 'notes' | 'travel';
  pillar: Pillar;
  excerpt?: string; image?: string;
}

const samplePosts: Post[] = [
  { id: '1', title: 'The Illusion of the Separate Self', slug: 'illusion-separate-self', date: '2024-01-15', tldr: 'Direct experience reveals no solid, separate self.', tags: ['nondual', 'awareness', 'self-inquiry'], readingTime: 8, category: 'essays', pillar: 'nondual', excerpt: 'What we call "I" is just a collection of thoughts, sensations, and perceptions arising in awareness.', image: featureBangkok },
  { id: '2', title: 'Phnom Penh — First 90 Days', slug: 'phnom-penh-first-90-days', date: '2024-01-10', tldr: "Living costs, visa runs, and finding rhythm in Cambodia's capital.", tags: ['Cambodia', 'expat'], readingTime: 5, category: 'travel', pillar: 'countries', excerpt: 'Notes from three months on the ground.', image: heroStreet },
  { id: '4', title: 'Awareness Is Already Perfect', slug: 'awareness-already-perfect', date: '2024-01-05', tldr: 'Nothing needs to be added.', tags: ['nondual', 'presence'], readingTime: 3, category: 'notes', pillar: 'nondual' },
];

const PILLARS: { id: 'all' | Pillar; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'nondual', label: 'Nondual' },
  { id: 'countries', label: 'Countries' },
  { id: 'craft', label: 'Craft' },
];

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [pillar, setPillar] = useState<'all' | Pillar>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion.current) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const manifestoRef = useReveal<HTMLElement>();
  const featuredRef = useReveal<HTMLElement>();
  const marginaliaRef = useReveal<HTMLElement>();
  const collectionRef = useReveal<HTMLElement>();
  const subjectsRef = useReveal<HTMLElement>();
  const endNoteRef = useReveal<HTMLElement>();

  const sorted = useMemo(() => [...samplePosts].sort((a, b) => +new Date(b.date) - +new Date(a.date)), []);
  const featured = sorted[0];

  const filtered = useMemo(() => {
    return sorted.filter((p) => {
      if (pillar !== 'all' && p.pillar !== pillar) return false;
      if (activeTag && !p.tags.includes(activeTag)) return false;
      return true;
    });
  }, [sorted, pillar, activeTag]);

  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    samplePosts.forEach((p) => p.tags.forEach((t) => map.set(t, (map.get(t) || 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const maxCount = Math.max(...allTags.map(([, c]) => c));

  return (
    <>
      <Seo
        title="Nondual Awareness, Travel & Business in Southeast Asia — James Kong"
        description="Essays and notes on nondual awareness, travel, and building businesses in Southeast Asia."
        image={heroStreet}
      />
      {/* FULL-BLEED HERO */}
      <section className="relative -mx-6 md:-mx-10 -mt-10 md:-mt-16 h-screen min-h-[640px] overflow-hidden grain">
        <img
          src={heroStreet}
          alt="Siem Reap, Rain"
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translate3d(0, ${scrollY * 0.25}px, 0) scale(${1 + scrollY * 0.0002})` }}
        />
        <div className="absolute inset-0 hero-veil" />
        <InkShader className="absolute inset-0 w-full h-full" intensity={0.85} />

        <div className="absolute top-0 inset-x-0 z-10 px-6 md:px-12 pt-6">
          <Masthead light />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-16 md:pb-24 max-w-7xl mx-auto">
          <h1 className="font-display font-light text-[14vw] md:text-[10vw] lg:text-[9rem] leading-[0.88] text-paper max-w-5xl">
            Quiet notes,
            <br />
            <span className="italic font-light">loud places.</span>
          </h1>
          <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-paper/70 mt-10">
            Plate I · Siem Reap, Rain · 13.4125° N, 103.8670° E
          </p>
        </div>
      </section>

      {/* WHITE-SPACE MANIFESTO */}
      <section className="py-32 md:py-48 max-w-3xl mx-auto text-center">
        <p className="eyebrow-gold mb-10">Currently · Phnom Penh · May 2026</p>
        <p className="font-display font-light text-3xl md:text-5xl leading-[1.25] text-foreground">
          Building NhamTime, a restaurant booking app for Cambodia.
          <span className="block italic text-content-muted mt-3">Reading less, looking more.</span>
        </p>
      </section>

      {/* FEATURED — image-led, asymmetric, headline overlaps */}
      {featured && (
        <section className="relative pb-32">
          <Link to={`/${featured.category}/${featured.slug}`} className="block group">
            <div className="grid md:grid-cols-12 gap-y-12 md:gap-x-12">
              <div className="md:col-span-8 relative grain overflow-hidden">
                <img
                  src={featured.image || featureBangkok}
                  alt={featured.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="md:col-span-4 md:pt-24 relative md:-ml-32 md:z-10">
                <p className="eyebrow-gold mb-4">Lead essay · 01</p>
                <h2 className="font-display font-light text-5xl md:text-7xl leading-[1] text-foreground">
                  {featured.title}
                </h2>
              </div>
              <div className="md:col-start-6 md:col-span-5 md:pt-8">
                <div className="flex items-center gap-3 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mb-6 tabular">
                  <span className="text-gold">{featured.category}</span>
                  <span className="opacity-40">·</span>
                  <span>{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span className="opacity-40">·</span>
                  <span>{featured.readingTime} min</span>
                </div>
                <p className="font-content text-lg leading-[1.8] text-content">{featured.excerpt || featured.tldr}</p>
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-foreground mt-8 link-quiet">
                  Continue reading →
                </p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* SECTION 1 — MARGINALIA · 02A — Pullquote paired with Plate II */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <figure className="md:col-span-6 grain overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={featureBangkok}
                alt="Cityscape, Bangkok, 2024"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-4 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">
              PLATE II · BANGKOK · 2024
            </figcaption>
          </figure>
          <div className="md:col-span-6">
            <p className="eyebrow-gold mb-8">§ Marginalia · 02a</p>
            <blockquote>
              <p className="font-display italic font-light text-3xl md:text-5xl leading-[1.2] text-foreground">
                The road doesn&rsquo;t change you. It just stops you pretending.
              </p>
            </blockquote>
            <div className="hairline w-16 mt-10" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — INDEX · 02 — The Collection with pillar tabs */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6 mb-10">
          <div>
            <p className="eyebrow-gold mb-3">Index · 02</p>
            <h2 className="font-display font-light text-5xl md:text-6xl text-foreground">The Collection</h2>
          </div>
          <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
            {String(filtered.length).padStart(2, '0')} Entries
          </p>
        </div>

        {/* Tab filter */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10 font-ui text-[10px] uppercase tracking-[0.3em]">
          {PILLARS.map((t, i) => (
            <div key={t.id} className="flex items-center gap-x-6">
              <button
                type="button"
                onClick={() => setPillar(t.id)}
                className={`transition-colors duration-300 ${pillar === t.id ? 'text-gold border-b border-gold pb-1' : 'text-content-muted hover:text-foreground'}`}
              >
                {t.label}
              </button>
              {i < PILLARS.length - 1 && <span className="text-content-muted opacity-40">·</span>}
            </div>
          ))}
          {activeTag && (
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="ml-auto text-content-muted hover:text-gold transition-colors"
            >
              Clear tag: {activeTag} ×
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="font-content italic text-content-muted py-12 text-center">Nothing here yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((p, i) => (
              <li key={p.id}
                  onMouseEnter={() => setHoverIdx(i)}
                  onMouseLeave={() => setHoverIdx(null)}
                  className="relative">
                <Link to={`/${p.category}/${p.slug}`}
                      className="grid grid-cols-12 gap-4 items-baseline py-6 md:py-8 group">
                  <span className="col-span-1 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="col-span-7 md:col-span-6 font-display font-light text-2xl md:text-4xl leading-[1.1] text-foreground group-hover:text-gold transition-colors duration-500">
                    {p.title}
                  </h3>
                  <span className="col-span-4 md:col-span-3 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">
                    {p.pillar}
                  </span>
                  <span className="col-span-12 md:col-span-2 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted text-right tabular">
                    {new Date(p.date).getFullYear()}
                  </span>
                </Link>
                {hoverIdx === i && p.image && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-[110%] w-48 pointer-events-none">
                    <img src={p.image} alt="" loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover grain" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* SECTION 3 — BY SUBJECT · 03 — Tag cloud paired with Plate IV */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <p className="eyebrow-gold mb-5">By Subject · 03</p>
            <h2 className="font-display italic font-light text-4xl md:text-5xl text-foreground mb-10 leading-[1.15]">
              Wander by theme.
            </h2>
            <div className="flex flex-wrap items-baseline gap-x-7 gap-y-4">
              {allTags.map(([tag, count]) => {
                const ratio = count / maxCount;
                const size = 18 + ratio * 36;
                const isActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(isActive ? null : tag)}
                    className={`font-display font-light italic transition-colors duration-500 ${isActive ? 'text-gold' : 'text-content-muted hover:text-gold'}`}
                    style={{ fontSize: `${size}px`, lineHeight: 1.1 }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
            {activeTag && (
              <p className="mt-8 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">
                Filtering the collection above by &ldquo;{activeTag}&rdquo;.
              </p>
            )}
          </div>
          <figure className="md:col-span-5 order-1 md:order-2 grain overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={mountainMist}
                alt="Misty mountain ridges at dawn over Mondulkiri"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figcaption className="mt-4 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">
              Plate IV · Mondulkiri · Dec 2023
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SECTION 4 — END NOTE */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow-gold mb-8">§ End Note</p>
          <p className="font-display italic font-light text-3xl md:text-4xl text-foreground leading-[1.25]">
            Welcome. Take your time.
          </p>
          <div className="mt-12 flex items-center justify-center gap-x-10 font-ui text-[10px] uppercase tracking-[0.3em]">
            <Link to="/contact" className="text-foreground hover:text-gold transition-colors border-b border-gold pb-1">
              Subscribe
            </Link>
            <Link to="/contact" className="text-foreground hover:text-gold transition-colors border-b border-gold pb-1">
              Contact
            </Link>
          </div>
        </div>
      </section>

      <Colophon />
    </>
  );
};

export default Home;
