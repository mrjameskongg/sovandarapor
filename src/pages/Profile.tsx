import { Card } from '@/components/ui/card';
import { MapPin, Briefcase, Globe, Mail, Linkedin, ArrowUpRight } from 'lucide-react';

const experience = [
  {
    role: 'Co-Founder',
    company: 'SEA Payments (Stealth)',
    period: '2024 — Now',
    description: 'Building digital payment infrastructure for SMEs in Cambodia and Thailand. Product, ops, regulatory, hiring — the full stack.',
    tags: ['Fintech', 'Southeast Asia', 'Startups'],
  },
  {
    role: 'Head of Operations',
    company: 'Regional Marketplace Platform',
    period: '2021 — 2024',
    description: 'Ran ops across 3 countries. Grew supply side 4×, cut unit costs by 40%. Built the remote-first ops team from scratch.',
    tags: ['Operations', 'Remote Teams', 'Marketplaces'],
  },
  {
    role: 'Product Manager',
    company: 'Singapore Fintech',
    period: '2018 — 2021',
    description: 'Led lending product from 0 to $50M annual disbursal. Owned roadmap, pricing, and compliance handoffs.',
    tags: ['Product', 'Lending', 'B2B'],
  },
  {
    role: 'Business Analyst → Product Owner',
    company: 'Regional Bank',
    period: '2015 — 2018',
    description: 'Digital transformation team. Shipped mobile banking features, learned how large institutions actually move.',
    tags: ['Banking', 'Digital', 'Enterprise'],
  },
];

const Profile = () => {
  return (
    <div className="space-y-24">
      {/* Masthead */}
      <header className="space-y-10">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-content-muted border-y border-border py-3">
          <span>Profile · Portfolio</span>
          <span>No. 01</span>
        </div>

        <div className="grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7 space-y-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">The author</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] text-foreground">
              Sovandarapor
              <span className="italic font-normal text-gold"> Kong.</span>
            </h1>
            <p className="font-content text-xl text-content-muted leading-relaxed max-w-xl">
              Builder, operator, wanderer. Writing from the seam between Cambodia and Thailand.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-content-muted">
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Phnom Penh / Bangkok</span>
              <span className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> EN · KM · TH</span>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 border border-border rounded-sm -z-10" />
              <div className="absolute -bottom-3 -right-3 w-2/3 h-2/3 bg-gold/10 -z-10" />
              <img
                src="/profile-photo.jpg"
                alt="Sovandarapor Kong"
                className="w-full aspect-[4/5] object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700 shadow-elegant"
              />
              <p className="text-[10px] uppercase tracking-[0.25em] text-content-muted mt-3 text-right">— Portrait, 2024</p>
            </div>
          </div>
        </div>
      </header>

      {/* Bio */}
      <section className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ I</p>
          <h2 className="font-display text-3xl text-foreground mt-2">About</h2>
        </div>
        <div className="md:col-span-9 space-y-5 font-content text-lg leading-relaxed text-content max-w-2xl">
          <p className="first-letter:font-display first-letter:text-6xl first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-gold first-letter:leading-none">
            I'm Sovandarapor Kong — Sovan, for short. I build businesses in Cambodia and Thailand,
            write about what I'm learning, and move slowly through Southeast Asia.
          </p>
          <p>
            This site is where I think in public. Nondual reflections, travel logistics, business
            building, short takes on whatever I'm chewing on. No grand theory — just direct experience,
            written down before I forget it.
          </p>
          <p>
            Before going independent, I worked in product and operations roles across fintech and
            marketplace companies. I prefer the clarity of owning the full stack — decisions,
            consequences, and the occasional win.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ II</p>
          <h2 className="font-display text-3xl text-foreground mt-2 flex items-center gap-2">
            <Briefcase className="w-5 h-5" /> Practice
          </h2>
        </div>
        <div className="md:col-span-9 space-y-0">
          {experience.map((job, i) => (
            <div key={job.company} className="group grid md:grid-cols-12 gap-4 py-7 border-t border-border last:border-b">
              <div className="md:col-span-2 text-xs uppercase tracking-[0.2em] text-content-muted tabular">
                <span className="text-gold mr-2">{String(i + 1).padStart(2, '0')}</span>
                {job.period}
              </div>
              <div className="md:col-span-10 space-y-2">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground group-hover:text-gold transition-smooth">
                    {job.role}
                  </h3>
                  <p className="text-sm text-content-muted italic font-content">{job.company}</p>
                </div>
                <p className="font-content text-base text-content leading-relaxed max-w-2xl">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-[11px] uppercase tracking-[0.18em] text-content-muted">
                  {job.tags.map((tag) => <span key={tag}>· {tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Now */}
      <section className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ III</p>
          <h2 className="font-display text-3xl text-foreground mt-2">Now</h2>
        </div>
        <div className="md:col-span-9 grid sm:grid-cols-3 gap-px bg-border">
          {[
            { label: 'Building', body: 'Fintech for Cambodian and Thai SMEs. Live with first pilot customers.' },
            { label: 'Exploring', body: 'Nondual awareness through direct looking. Less reading, more seeing.' },
            { label: 'Where', body: 'Phnom Penh as home base. Bangkok monthly. Siem Reap for quiet weeks.' },
          ].map((b) => (
            <div key={b.label} className="bg-background p-6 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gold">{b.label}</p>
              <p className="font-content text-base text-content leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ IV</p>
          <h2 className="font-display text-3xl text-foreground mt-2">Preoccupations</h2>
        </div>
        <div className="md:col-span-9 flex flex-wrap gap-x-5 gap-y-2">
          {[
            'Nondual awareness', 'Southeast Asian business', 'Fintech infrastructure',
            'Remote team building', 'Product design', 'Meditation retreats',
            'Cambodian history', 'Thai street food', 'Clean writing', 'Slow travel',
          ].map((interest) => (
            <span key={interest} className="font-display text-2xl md:text-3xl text-content-muted hover:text-gold transition-smooth cursor-default">
              {interest}<span className="text-gold/60">.</span>
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="grid md:grid-cols-12 gap-12 border-t border-border pt-16">
        <div className="md:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ V</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-2 leading-tight">
            Write back.
          </h2>
          <p className="font-content text-lg text-content-muted mt-4 max-w-md">
            I read everything and reply to the thoughtful ones. Telegram for quicker exchanges
            once we've already met.
          </p>
        </div>
        <div className="md:col-span-7 space-y-px bg-border">
          <a href="mailto:sovan@example.com" className="group flex items-center justify-between gap-4 p-6 bg-background hover:bg-accent transition-smooth">
            <span className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gold" />
              <span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-content-muted">Email</span>
                <span className="font-display text-xl text-foreground">sovan@example.com</span>
              </span>
            </span>
            <ArrowUpRight className="w-5 h-5 text-content-muted group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
          </a>
          <a href="#" className="group flex items-center justify-between gap-4 p-6 bg-background hover:bg-accent transition-smooth">
            <span className="flex items-center gap-4">
              <Linkedin className="w-5 h-5 text-gold" />
              <span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-content-muted">Network</span>
                <span className="font-display text-xl text-foreground">LinkedIn / Sovandarapor</span>
              </span>
            </span>
            <ArrowUpRight className="w-5 h-5 text-content-muted group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Profile;
