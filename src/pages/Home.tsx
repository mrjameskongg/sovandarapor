import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroStreet from '@/assets/hero-buddha.jpg';
import featureTemple from '@/assets/feature-temple.jpg';
import mountainMist from '@/assets/mountain-mist.jpg';
import Masthead from '@/components/editorial/Masthead';
import Colophon from '@/components/editorial/Colophon';
import Seo from '@/components/Seo';

type Pillar = 'nondual' | 'countries' | 'craft';

interface Post {
  id: string; title: string; slug: string; date: string; tldr: string;
  tags: string[]; readingTime: number;
  category: 'essays' | 'notes' | 'travel' | 'build-log';
  pillar: Pillar;
  excerpt?: string; image?: string;
}

const samplePosts: Post[] = [
  { id: '1', title: 'The Illusion of the Separate Self', slug: 'illusion-separate-self', date: '2024-01-15', tldr: 'Direct experience reveals no solid, separate self.', tags: ['nondual', 'awareness', 'self-inquiry'], readingTime: 8, category: 'essays', pillar: 'nondual', excerpt: 'What we call "I" is just a collection of thoughts, sensations, and perceptions arising in awareness.', image: featureTemple },
  { id: '2', title: 'Phnom Penh — First 90 Days', slug: 'phnom-penh-first-90-days', date: '2024-01-10', tldr: "Living costs, visa runs, and finding rhythm in Cambodia's capital.", tags: ['Cambodia', 'expat'], readingTime: 5, category: 'travel', pillar: 'countries', excerpt: 'Notes from three months on the ground.', image: heroStreet },
  { id: '3', title: 'Building Remote Teams in SEA', slug: 'remote-teams-sea', date: '2024-01-08', tldr: 'Time zones, cultural bridges, hiring across Thailand and Cambodia.', tags: ['business', 'remote-work'], readingTime: 12, category: 'build-log', pillar: 'craft', excerpt: '' },
  { id: '4', title: 'Awareness Is Already Perfect', slug: 'awareness-already-perfect', date: '2024-01-05', tldr: 'Nothing needs to be added.', tags: ['nondual', 'presence'], readingTime: 3, category: 'notes', pillar: 'nondual' },
  { id: '5', title: 'Bangkok vs Phnom Penh', slug: 'bangkok-vs-phnom-penh', date: '2024-01-03', tldr: 'Cost, infrastructure, quality of life.', tags: ['Thailand', 'Cambodia'], readingTime: 6, category: 'notes', pillar: 'countries' },
  { id: '6', title: 'Q4 2023 — Revenue, Lessons, Plans', slug: 'q4-2023-update', date: '2023-12-28', tldr: '$15K MRR, expanded to Cambodia.', tags: ['business', 'revenue'], readingTime: 7, category: 'build-log', pillar: 'craft' },
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

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sorted = useMemo(() => [...samplePosts].sort((a, b) => +new Date(b.date) - +new Date(a.date)), []);
  const featured = sorted[0];
  const archive = sorted.slice(1);

  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    samplePosts.forEach((p) => p.tags.forEach((t) => map.set(t, (map.get(t) || 0) + 1)));
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
  }, []);

  const maxCount = Math.max(...allTags.map(([, c]) => c));

  return (
    <>
      <Seo
        title="Sovandarapor (James) Kong — Notes from the Road"
        description="Essays and notes on nondual awareness, travel, and building businesses across Cambodia, Thailand, Vietnam and France."
        image={heroStreet}
      />
      {/* FULL-BLEED HERO */}
      <section className="relative -mx-6 md:-mx-10 -mt-10 md:-mt-16 h-screen min-h-[640px] overflow-hidden grain">
        <img
          src={heroStreet}
          alt="Phnom Penh, after the rain"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: `translate3d(0, ${scrollY * 0.25}px, 0) scale(${1 + scrollY * 0.0002})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80" />

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
            Plate I · Phnom Penh, after the rain · 14.5896° N · 104.9165° E
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
                  src={featured.image || featureTemple}
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

      {/* IMAGE-ONLY SECTION — full viewport */}
      <section className="relative -mx-6 md:-mx-10 h-screen overflow-hidden grain my-16">
        <img src={featureTemple} alt="Temple silhouette at dusk" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <p className="font-display italic font-light text-3xl md:text-6xl text-paper/85 max-w-4xl text-center leading-[1.2]">
            The road doesn't change you. It just stops you pretending.
          </p>
        </div>
        <p className="absolute bottom-6 left-6 md:left-12 font-ui text-[10px] uppercase tracking-[0.3em] text-paper/60">
          Plate II · Siem Reap · 2024
        </p>
      </section>

      {/* COMPANION THREAD — Nondual */}
      <section className="relative -mx-6 md:-mx-10 my-16 bg-secondary py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <Link to="/nondual" className="md:col-span-5 block group grain overflow-hidden">
            <img
              src={nondual1}
              alt="Window of light, quiet interior"
              loading="lazy"
              className="w-full aspect-[4/5] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
            />
          </Link>
          <div className="md:col-span-7">
            <p className="eyebrow-gold mb-5">§ Companion thread · 02b</p>
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.05] text-foreground">
              The other half<br /><span className="italic">of the work.</span>
            </h2>
            <p className="font-content text-lg leading-[1.8] text-content mt-8 max-w-xl">
              Nondual awareness is the lens behind everything else on this site.
              Less reaction. Wider view. The same attention I bring to building
              a rice export brand or hiring an engineer.
            </p>
            <Link
              to="/nondual"
              className="inline-block font-ui text-[10px] uppercase tracking-[0.3em] text-foreground link-quiet mt-8 border-b border-gold pb-1"
            >
              Read the longer view →
            </Link>
          </div>
        </div>
      </section>

      {/* ARCHIVE — typographic index */}
      <section className="py-24 md:py-32">
        <div className="flex items-end justify-between border-b border-border pb-6 mb-12">
          <div>
            <p className="eyebrow-gold mb-3">Index · 02</p>
            <h2 className="font-display font-light text-5xl md:text-6xl text-foreground">The collection</h2>
          </div>
          <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular hidden sm:block">
            {String(archive.length).padStart(2, '0')} entries
          </p>
        </div>

        <ul className="divide-y divide-border">
          {archive.map((p, i) => (
            <li key={p.id}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                className="relative">
              <Link to={`/${p.category}/${p.slug}`}
                    className="grid grid-cols-12 gap-4 items-baseline py-6 md:py-8 group">
                <span className="col-span-1 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="col-span-7 md:col-span-7 font-display font-light text-2xl md:text-4xl leading-[1.1] text-foreground group-hover:text-gold transition-colors duration-500">
                  {p.title}
                </h3>
                <span className="col-span-2 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted hidden md:block">
                  {p.category}
                </span>
                <span className="col-span-2 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted text-right tabular">
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
      </section>

      {/* DIPTYCH — desk + mist */}
      <section className="grid md:grid-cols-12 gap-6 md:gap-10 my-24">
        <div className="md:col-span-7">
          <Plate src={deskNotes} alt="Field notebook, fountain pen, riel notes" plate="III" location="Boeung Keng Kang" date="Jan 2024" ratio="landscape" />
        </div>
        <div className="md:col-span-5 md:pt-32">
          <Plate src={mountainMist} alt="Misty mountain ridges at dawn" plate="IV" location="Mondulkiri" date="Dec 2023" ratio="portrait" />
        </div>
      </section>

      {/* TOPICS — typographic cloud, varied size */}
      <section className="py-24 md:py-32 border-t border-border">
        <p className="eyebrow-gold mb-10">By subject · 03</p>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          {allTags.map(([tag, count]) => {
            const ratio = count / maxCount;
            const size = 16 + ratio * 36;
            return (
              <button
                key={tag}
                className="font-display font-light text-content-muted hover:text-gold transition-colors duration-500 italic"
                style={{ fontSize: `${size}px`, lineHeight: 1.1 }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </section>

      <Colophon />
    </>
  );
};

export default Home;
