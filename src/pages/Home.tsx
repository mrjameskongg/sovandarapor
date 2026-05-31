import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

import heroStreet from '@/assets/hero-buddha.jpg';
import featureBangkok from '@/assets/feature-bangkok.jpg';
import mountainMist from '@/assets/mountain-mist.jpg';

import Seo from '@/components/Seo';
import Colophon from '@/components/editorial/Colophon';
import InkShader from '@/components/InkShader';
import Marquee from '@/components/Marquee';
import { useScrollProgress } from '@/hooks/useScrollProgress';

gsap.registerPlugin(ScrollTrigger);

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
  { id: '3', title: 'Awareness Is Already Perfect', slug: 'awareness-already-perfect', date: '2024-01-05', tldr: 'Nothing needs to be added.', tags: ['nondual', 'presence'], readingTime: 3, category: 'notes', pillar: 'nondual', image: mountainMist },
];

const fmt = (d: string) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/* ─── Loading Intro ─── */
function LoadingIntro({ onComplete }: { onComplete: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduced ? 300 : 2200;
    const t = setTimeout(() => {
      if (!ref.current) return onComplete();
      gsap.to(ref.current, {
        opacity: 0,
        duration: reduced ? 0.3 : 1.1,
        ease: 'power3.inOut',
        onComplete,
      });
    }, delay);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div ref={ref} className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center">
      <InkShader className="absolute inset-0 w-full h-full" intensity={1.15} />
      <div className="relative z-10 text-center">
        <h1 className="font-display font-light text-5xl lg:text-7xl text-foreground mb-6">S.K.</h1>
        <p className="eyebrow">Scroll to discover</p>
      </div>
    </div>
  );
}

/* ─── Hero ─── */
function HeroSection({ scrollProgress }: { scrollProgress: number }) {
  return (
    <section className="relative -mx-6 md:-mx-10 -mt-10 md:-mt-16 min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden grain bg-background">
      <InkShader className="absolute inset-0 w-full h-full" intensity={0.95} scrollProgress={scrollProgress} />
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <p className="eyebrow-gold mb-6">Exploring awareness &amp; ventures in Southeast Asia</p>
        <h1 className="font-display font-light leading-[0.9] text-foreground break-words" style={{ fontSize: 'clamp(2.75rem, 11vw, 9rem)' }}>
          Sovandarapor
          <br />
          <span className="italic">Kong</span>
        </h1>
        <p className="eyebrow mt-10 opacity-70">Many appearances — one awareness</p>
      </div>
    </section>
  );
}


/* ─── Pinned Manifesto ─── */
function ManifestoSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current!,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
      tl.fromTo('.mf-many', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.2 });
      tl.fromTo('.mf-appearances', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2 }, 0.2);
      tl.fromTo('.mf-one', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.2 }, 0.4);
      tl.fromTo('.mf-awareness', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.2 }, 0.4);
      tl.to('.mf-group', { scale: 0.6, y: '-28vh', duration: 0.2 }, 0.7);
      tl.fromTo('.mf-body', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.15 }, 0.82);
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 min-h-[100dvh] flex flex-col items-center justify-center bg-background overflow-hidden px-6">
        <div className="mf-group text-center max-w-full">
          <div className="mf-many font-display font-light leading-[0.95] text-foreground" style={{ fontSize: 'clamp(3rem, 11vw, 11rem)' }}>
            MANY
          </div>
          <div className="mf-appearances font-display font-light italic leading-[0.95] text-gold break-words" style={{ fontSize: 'clamp(2.5rem, 11vw, 11rem)' }}>
            APPEARANCES
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 lg:gap-8 mt-4">
            <span className="mf-one font-display font-light leading-[0.95] text-foreground" style={{ fontSize: 'clamp(2rem, 7vw, 6rem)' }}>
              ONE
            </span>
            <span className="mf-awareness font-display font-light italic leading-[0.95] text-foreground" style={{ fontSize: 'clamp(2rem, 7vw, 6rem)' }}>
              AWARENESS
            </span>
          </div>
        </div>

        <div className="mf-body absolute bottom-16 lg:bottom-24 max-w-xl text-center px-6">
          <p className="font-content text-lg text-content-muted leading-relaxed">
            What we call reality is simply awareness appearing as form. There is no separation
            between the observer and the observed — only the seamless flow of experience,
            self-aware and complete.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Ink Divider ─── */
function InkDivider({ label }: { label?: string }) {
  return (
    <div className="relative h-[50vh] bg-background overflow-hidden grain">
      <InkShader className="absolute inset-0 w-full h-full" intensity={0.65} />
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="eyebrow opacity-60">{label}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Marquee Section ─── */
function MarqueeSection() {
  const items = ['Essays', 'Notes', 'Travel', 'Build Log', 'Awareness', 'Presence', 'Inquiry'];
  return (
    <section className="py-20 bg-background border-y border-border/60">
      <div className="mb-6 px-6 lg:px-10">
        <p className="eyebrow-gold">Perspective · Perception · Future</p>
      </div>
      <Marquee items={items} speed={28} />
      <Marquee items={[...items].reverse()} speed={38} reverse className="mt-4" />
    </section>
  );
}

/* ─── Featured Grid + Modal ─── */
function FeaturedSection({ posts }: { posts: Post[] }) {
  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mb-16">
        <p className="eyebrow-gold mb-4">Featured Writing</p>
        <h2 className="font-display font-light text-4xl lg:text-6xl text-foreground">
          Selected <span className="italic">Works</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/60">
        {posts.map((post, i) => (
          <button
            key={post.id}
            type="button"
            onClick={() => setSelected(post)}
            className="group text-left bg-background p-8 lg:p-12 hover:bg-muted/40 transition-colors duration-500"
          >
            <span className="eyebrow">
              {String(i + 1).padStart(2, '0')} — {post.category}
            </span>
            <h3 className="font-display font-light text-2xl lg:text-3xl text-foreground mt-4 mb-3 group-hover:text-gold transition-colors duration-500">
              {post.title}
            </h3>
            <p className="font-content text-[15px] text-content-muted leading-relaxed mb-5">
              {post.tldr}
            </p>
            <div className="flex items-center gap-4 eyebrow opacity-70">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readingTime} min</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {fmt(post.date)}</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-sm flex items-start justify-center overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div className="w-full max-w-3xl px-6 lg:px-10 py-24" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="eyebrow text-content-muted hover:text-foreground transition-colors mb-12 flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Close
            </button>

            <span className="eyebrow-gold">{selected.category}</span>
            <h2 className="font-display font-light text-4xl lg:text-5xl text-foreground mt-4 mb-6 leading-[1.05]">
              {selected.title}
            </h2>

            <div className="flex items-center gap-4 mb-10 eyebrow">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {selected.readingTime} min</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {fmt(selected.date)}</span>
            </div>

            <p className="font-display italic font-light text-2xl text-gold leading-snug mb-10 border-l border-gold pl-6">
              {selected.tldr}
            </p>

            <p className="font-content text-lg text-content leading-[1.85]">
              {selected.excerpt || selected.tldr}
            </p>

            <div className="mt-12 flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="eyebrow px-3 py-1 border border-border text-content-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              to={`/${selected.category}/${selected.slug}`}
              className="mt-12 inline-flex items-center gap-2 eyebrow text-foreground hover:text-gold transition-colors link-sweep"
            >
              Read the full piece <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Recent Posts ─── */
function RecentPostsSection({ posts }: { posts: Post[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.post-item').forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="mb-16 flex items-end justify-between">
        <div>
          <p className="eyebrow-gold mb-4">Recent Entries</p>
          <h2 className="font-display font-light text-4xl lg:text-6xl text-foreground">
            The <span className="italic">Journal</span>
          </h2>
        </div>
        <Link
          to="/blog"
          className="hidden sm:flex items-center gap-2 eyebrow text-content-muted hover:text-gold transition-colors duration-300 link-sweep"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="divide-y divide-border/60">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/${post.category}/${post.slug}`}
            className="post-item group block py-8 lg:py-10"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <span className="eyebrow opacity-70">
                  {post.category} · {post.readingTime} min
                </span>
                <h3 className="font-display font-light text-2xl lg:text-3xl text-foreground mt-2 group-hover:text-gold transition-colors duration-500 leading-tight">
                  {post.title}
                </h3>
                <p className="font-content text-[15px] text-content-muted leading-relaxed mt-2 max-w-2xl">
                  {post.tldr}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-content-muted group-hover:text-gold group-hover:translate-x-1 transition-all duration-300 mt-2 shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── Page ─── */
const Home = () => {
  const [loading, setLoading] = useState(true);
  const scrollProgress = useScrollProgress();

  const sorted = useMemo(
    () => [...samplePosts].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [],
  );

  return (
    <>
      <Seo
        title="Nondual Awareness, Travel & Business in Southeast Asia — James Kong"
        description="Essays and notes on nondual awareness, travel, and building businesses in Southeast Asia."
        image={heroStreet}
      />

      {loading && <LoadingIntro onComplete={() => setLoading(false)} />}

      <HeroSection scrollProgress={scrollProgress} />
      <ManifestoSection />
      <InkDivider label="Many appearances — one awareness" />
      <MarqueeSection />
      <FeaturedSection posts={sorted.slice(0, 4)} />
      <RecentPostsSection posts={sorted.slice(0, 6)} />

      <Colophon />
    </>
  );
};

export default Home;
