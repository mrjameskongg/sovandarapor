import { MapPin, Briefcase, Globe, Mail, Linkedin, ArrowUpRight, BookOpen } from 'lucide-react';

const experience = [
  {
    role: 'Brand Consultant',
    company: 'BRM Agro',
    type: 'Contract',
    period: 'Jan 2026 — Present',
    location: 'Phnom Penh, Cambodia · Hybrid',
    description: 'Leading brand strategy for an agribusiness operating across Cambodia. Positioning, narrative, and go-to-market for agricultural products.',
    tags: ['Brand Strategy', 'Agribusiness', 'Cambodia'],
  },
  {
    role: 'Personal Manager',
    company: 'NCJ — Princess Jenna Norodom',
    type: 'Full-time',
    period: 'Jan 2024 — Mar 2025',
    location: 'Phnom Penh, Cambodia · On-site',
    description: 'Managed the career and brand positioning of Princess Jenna Norodom. Negotiated multi-tier ambassador contracts, directed social strategy, and acted as the main liaison between the Royal Palace, corporate partners, and media.',
    tags: ['Brand Strategy', 'Influencer Marketing', 'Negotiation', 'PR'],
  },
  {
    role: 'Content Ecosystem Operation',
    company: 'TikTok (ByteDance)',
    type: 'Full-time',
    period: 'Oct 2022 — Nov 2023',
    location: 'Bangkok, Thailand',
    description: 'Ran TikTok\'s content ecosystem for Cambodia. Grew the creator base, analyzed audience insights, and shipped cross-border campaigns including push notifications and music activations.',
    tags: ['Content Strategy', 'Digital Marketing', 'Creator Partnerships'],
  },
  {
    role: 'Sales Operations Executive',
    company: 'Eatigo',
    type: 'Full-time',
    period: 'Oct 2021 — Oct 2022',
    location: 'Bangkok, Thailand · On-site',
    description: 'Built and managed restaurant partner relationships, coordinated sales and marketing campaigns, and used performance data to inform market growth decisions.',
    tags: ['Sales Operations', 'B2B Sales', 'Partnerships'],
  },
  {
    role: 'Sales Operations Analyst — Intern',
    company: 'Manatal',
    type: 'Internship',
    period: 'Feb 2021 — Jun 2021',
    location: 'Bangkok, Thailand',
    description: 'Cut my teeth on B2B SaaS sales operations: pipeline analytics, lead routing, and CRM hygiene for a recruitment software company.',
    tags: ['SaaS', 'Analytics', 'CRM'],
  },
];

const stories = [
  {
    place: 'TikTok · ByteDance',
    when: 'Bangkok, 2022–2023',
    headline: 'Building a country\'s content ecosystem from a Bangkok desk.',
    teaser: 'What it actually takes to grow creators in a market the algorithm doesn\'t understand yet — and the politics of being the "Cambodia person" inside a giant.',
  },
  {
    place: 'Damrei Angkor Hotel',
    when: 'Siem Reap',
    headline: 'Hotellerie at the foot of the temples.',
    teaser: 'Front-of-house lessons that no business book teaches: reading a guest in three seconds, why housekeeping runs the building, and the quiet economics of a small hotel.',
  },
  {
    place: 'Moo Moo Farms',
    when: 'Cambodia',
    headline: 'Built the website. Learned the farm.',
    teaser: 'A small project that became a study in translating a real-world operation — cows, milk, distribution — into something that fits inside a browser.',
  },
  {
    place: 'BRM Agro',
    when: 'Phnom Penh, 2026 →',
    headline: 'Brand strategy for Cambodian agriculture.',
    teaser: 'How you build a brand for a sector that\'s historically had none. Notes from inside the work.',
  },
  {
    place: 'Eatigo',
    when: 'Bangkok, 2021–2022',
    headline: 'Selling restaurants on a discount they didn\'t want to give.',
    teaser: 'Field notes from running sales ops in Thai F&B — and what marketplaces look like from the supply side.',
  },
  {
    place: 'Manatal',
    when: 'Bangkok, 2021',
    headline: 'First job. SaaS sales ops, observed up close.',
    teaser: 'The internship that taught me how a B2B funnel actually moves — and what good operators do differently.',
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
              James
              <span className="italic font-normal text-gold"> Kong.</span>
            </h1>
            <p className="font-content text-base text-content-muted italic">
              Sovandarapor (James) Kong
            </p>
            <p className="font-content text-xl text-content-muted leading-relaxed max-w-xl">
              Brand strategist and operator. Writing from the seam between Cambodia and Thailand.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-content-muted">
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Phnom Penh / Bangkok</span>
              <span className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> EN · KM · TH · FR</span>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 border border-border rounded-sm -z-10" />
              <div className="absolute -bottom-3 -right-3 w-2/3 h-2/3 bg-gold/10 -z-10" />
              <img
                src="/profile-photo.jpg"
                alt="James Kong"
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
            I'm Sovandarapor Kong — James, for short. I work on brand and operations across
            Cambodia and Thailand, write about what I'm learning, and move slowly through
            Southeast Asia.
          </p>
          <p>
            My path runs through hotellerie in Siem Reap, SaaS sales ops in Bangkok, TikTok's
            creator ecosystem for Cambodia, and managing the public brand of a Cambodian princess.
            These days it's brand strategy for agribusiness, a few independent projects, and writing.
          </p>
          <p>
            This site is where I think in public. Travel logistics, business notes, nondual
            reflections, short takes on whatever I'm chewing on. No grand theory — just direct
            experience, written down before I forget it.
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
          <p className="text-xs text-content-muted mt-3 font-content italic">
            Brand, ops, and platforms across SEA.
          </p>
        </div>
        <div className="md:col-span-9 space-y-0">
          {experience.map((job, i) => (
            <div key={job.company} className="group grid md:grid-cols-12 gap-4 py-7 border-t border-border last:border-b">
              <div className="md:col-span-3 text-xs uppercase tracking-[0.2em] text-content-muted tabular space-y-1">
                <div><span className="text-gold mr-2">{String(i + 1).padStart(2, '0')}</span>{job.period}</div>
                <div className="text-[10px] normal-case tracking-normal text-content-muted/80 font-content not-italic">{job.location}</div>
              </div>
              <div className="md:col-span-9 space-y-2">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-foreground group-hover:text-gold transition-smooth">
                    {job.role}
                  </h3>
                  <p className="text-sm text-content-muted italic font-content">{job.company} · {job.type}</p>
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

      {/* Work Stories */}
      <section className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ III</p>
          <h2 className="font-display text-3xl text-foreground mt-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Work Stories
          </h2>
          <p className="text-xs text-content-muted mt-3 font-content italic">
            The CV is the headline. These are the chapters.
          </p>
        </div>
        <div className="md:col-span-9 grid sm:grid-cols-2 gap-px bg-border">
          {stories.map((s, i) => (
            <article key={s.place} className="group bg-background p-7 space-y-4 hover:bg-accent transition-smooth cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.22em] text-gold tabular">
                  Ch. {String(i + 1).padStart(2, '0')}
                </span>
                <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.2em] text-content-muted">{s.place}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-content-muted/70 font-content">{s.when}</p>
              </div>
              <h3 className="font-display text-xl md:text-2xl leading-snug text-foreground group-hover:text-gold transition-smooth">
                {s.headline}
              </h3>
              <p className="font-content text-base text-content leading-relaxed">
                {s.teaser}
              </p>
              <p className="text-[10px] uppercase tracking-[0.22em] text-content-muted/70 italic font-content">
                Story coming soon
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Now */}
      <section className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ IV</p>
          <h2 className="font-display text-3xl text-foreground mt-2">Now</h2>
        </div>
        <div className="md:col-span-9 grid sm:grid-cols-3 gap-px bg-border">
          {[
            { label: 'Building', body: 'Brand strategy for BRM Agro and a couple of independent projects across Cambodia.' },
            { label: 'Exploring', body: 'Nondual awareness through direct looking. Less reading, more seeing.' },
            { label: 'Where', body: 'Phnom Penh as home base. Bangkok regularly. Siem Reap when I need quiet.' },
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
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ V</p>
          <h2 className="font-display text-3xl text-foreground mt-2">Preoccupations</h2>
        </div>
        <div className="md:col-span-9 flex flex-wrap gap-x-5 gap-y-2">
          {[
            'Brand strategy', 'Southeast Asian business', 'Creator economies',
            'Hospitality', 'Agribusiness', 'Nondual awareness',
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
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ VI</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-2 leading-tight">
            Write back.
          </h2>
          <p className="font-content text-lg text-content-muted mt-4 max-w-md">
            I read everything and reply to the thoughtful ones. Telegram for quicker exchanges
            once we've already met.
          </p>
        </div>
        <div className="md:col-span-7 space-y-px bg-border">
          <a href="mailto:james@example.com" className="group flex items-center justify-between gap-4 p-6 bg-background hover:bg-accent transition-smooth">
            <span className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-gold" />
              <span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-content-muted">Email</span>
                <span className="font-display text-xl text-foreground">james@example.com</span>
              </span>
            </span>
            <ArrowUpRight className="w-5 h-5 text-content-muted group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
          </a>
          <a href="https://www.linkedin.com/in/sovandarapor-kong" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 p-6 bg-background hover:bg-accent transition-smooth">
            <span className="flex items-center gap-4">
              <Linkedin className="w-5 h-5 text-gold" />
              <span>
                <span className="block text-[11px] uppercase tracking-[0.22em] text-content-muted">Network</span>
                <span className="font-display text-xl text-foreground">LinkedIn / Sovandarapor Kong</span>
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
