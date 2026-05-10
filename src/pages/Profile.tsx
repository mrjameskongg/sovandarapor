import { MapPin, Globe, Mail, Linkedin, ArrowUpRight, Wheat, Milk, Wine, Crown, Palette, Megaphone, FileText, Sparkles, LineChart, Languages } from 'lucide-react';

const ventures = [
  {
    icon: Crown,
    name: 'Princess Jenna Norodom',
    category: 'Talent · Media · Royal Brand',
    role: 'Personal Manager',
    period: '2024 — 2025',
    body: 'Worked closely with Princess Jenna Norodom on talent management, media positioning, storytelling, production, and public image — operating inside Cambodia\'s entertainment, royal, and cultural ecosystem.',
    highlights: ['Talent representation', 'Brand positioning', 'Media & PR', 'Cambodian cultural production'],
  },
  {
    icon: Wheat,
    name: 'BRM Agro',
    category: 'Agriculture · Rice · Export',
    role: 'Brand Strategy',
    period: '2026 → Present',
    body: 'A Cambodian rice and agriculture group rooted in Kampong Thom. Multiple house brands moving from local farms to international markets — the United States, Europe, and beyond.',
    highlights: ['White King Elephant', 'Diamond', 'King White Elephant'],
    label: 'Brands',
  },
  {
    icon: Milk,
    name: 'Moo Moo Farms',
    category: 'Dairy · Food · Turnaround',
    role: 'Group Operations',
    period: '2024 → Present',
    body: 'Cambodia\'s first dairy farm, founded around 2015 and acquired by our group in 2024. Inherited 100+ underfed cows; rebuilding the farm, the herd, and the operation. On track for ~600 cows in 2025 and ~1,000 by end of 2026.',
    highlights: ['Acquired 2024', '~600 cows in 2025', '~1,000 cows by 2026', 'National dairy ambitions'],
    label: 'Trajectory',
  },
  {
    icon: Wine,
    name: 'Seekers Group',
    category: 'Spirits · Hospitality · Lifestyle',
    role: 'Brand & Storytelling',
    period: 'Ongoing',
    body: 'A Cambodian spirits and beverage group building a portfolio of premium, lifestyle-driven brands rooted in modern Cambodian identity.',
    highlights: ['Seekers', 'Jason Kong', 'Chanthy (upcoming)', 'Wild Bond'],
    label: 'Brands',
  },
];

const craft = [
  { icon: LineChart, label: 'Marketing strategy' },
  { icon: Palette, label: 'Graphic design' },
  { icon: Megaphone, label: 'Social media campaigns' },
  { icon: Sparkles, label: 'Brand positioning' },
  { icon: FileText, label: 'Content planning' },
  { icon: FileText, label: 'Pitch decks' },
  { icon: Sparkles, label: 'Product storytelling' },
  { icon: Crown, label: 'Cambodian cultural branding' },
  { icon: Globe, label: 'Export & international communication' },
];

const Profile = () => {
  return (
    <div className="space-y-32">
      {/* ─────────────────────── 1. HERO ─────────────────────── */}
      <header className="space-y-12">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-content-muted border-y border-border py-3">
          <span>Profile · Cambodia</span>
          <span>Entrepreneur · Brand Builder</span>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-7">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold flex items-center gap-3">
              <span className="w-8 h-px bg-gold" /> Phnom Penh, Cambodia
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[0.95] text-foreground">
              Building brands,
              <br />
              stories, and
              <br />
              <span className="italic font-normal text-gold">businesses</span> from Cambodia.
            </h1>
            <p className="font-content text-xl text-content-muted leading-relaxed max-w-2xl">
              I'm James — Sovandarapor Kong. I work across agriculture, food, beverage, media,
              and brand development in Cambodia. From managing talent and creating campaigns
              to helping grow rice, dairy, and spirits brands, my work is rooted in Cambodia's
              next chapter.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.2em] text-content-muted pt-2">
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Phnom Penh · Bangkok</span>
              <span className="flex items-center gap-2"><Languages className="w-3.5 h-3.5" /> EN · KM · TH · FR</span>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute -inset-3 border border-border rounded-sm -z-10" />
              <div className="absolute -bottom-3 -right-3 w-2/3 h-2/3 bg-gold/10 -z-10" />
              <img
                src="/profile-photo.jpg"
                alt="James Kong"
                className="w-full aspect-[4/5] object-cover rounded-sm shadow-elegant"
              />
              <p className="text-[10px] uppercase tracking-[0.25em] text-content-muted mt-3 text-right">
                — James Kong, Cambodia
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────────────────── 2. PHILOSOPHY ─────────────────────── */}
      <section className="grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ I</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground mt-2 leading-tight">Philosophy</h2>
          <p className="text-xs text-content-muted mt-3 font-content italic">A worldview, not a religion.</p>
        </div>
        <div className="md:col-span-9 space-y-6 max-w-2xl">
          <p className="font-display text-2xl md:text-3xl font-light leading-snug text-foreground">
            I try to see life from a wider angle — beyond identity, role, or status.
          </p>
          <div className="hairline" />
          <p className="font-content text-lg text-content leading-relaxed">
            Nondual thinking shapes how I approach business, relationships, and pressure.
            It gives me a kind of clarity and detachment that's useful in negotiation,
            in long projects, in difficult quarters. Less reaction. Wider view.
          </p>
          <p className="font-content text-lg text-content-muted leading-relaxed">
            It's not the headline of my work. It's the lens behind it.
          </p>
        </div>
      </section>

      {/* ─────────────────────── 3. CAMBODIA WORK ─────────────────────── */}
      <section className="space-y-12">
        <div className="grid md:grid-cols-12 gap-12 items-end border-b border-border pb-6">
          <div className="md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ II</p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-2 leading-tight">
              Cambodia work & ventures.
            </h2>
          </div>
          <p className="md:col-span-5 font-content text-base text-content-muted italic md:text-right">
            Four chapters across talent, agriculture, dairy, and spirits.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {ventures.map((v, i) => {
            const Icon = v.icon;
            return (
              <article key={v.name} className="bg-background p-8 md:p-10 space-y-6 group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-smooth">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-gold tabular">
                        {String.fromCharCode(65 + i)} · {v.period}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-content-muted mt-1">
                        {v.category}
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-3xl md:text-4xl font-medium leading-tight text-foreground">
                  {v.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-content-muted">{v.role}</p>

                <p className="font-content text-base text-content leading-relaxed">{v.body}</p>

                {v.highlights && (
                  <div className="pt-4 border-t border-border space-y-2">
                    {v.label && (
                      <p className="text-[10px] uppercase tracking-[0.25em] text-content-muted">
                        {v.label}
                      </p>
                    )}
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {v.highlights.map((h) => (
                        <li key={h} className="font-display text-base text-foreground">
                          {h}<span className="text-gold/60">.</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────── 4. BRAND BUILDING / CRAFT ─────────────────────── */}
      <section className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ III</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-2 leading-tight">
            Brand building & creative work.
          </h2>
          <p className="font-content text-lg text-content-muted mt-6 leading-relaxed">
            My work isn't only operations. It's marketing, design, storytelling, and growth —
            translating Cambodian businesses into something the world can read.
          </p>
        </div>

        <div className="md:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {craft.map(({ icon: Icon, label }) => (
            <div key={label} className="bg-background p-6 flex items-start gap-4 group hover:bg-accent transition-smooth">
              <Icon className="w-4 h-4 text-gold mt-1 shrink-0" />
              <p className="font-display text-lg leading-snug text-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────── 5. OVERALL STORY ─────────────────────── */}
      <section className="relative -mx-6 md:-mx-10 px-6 md:px-10 py-20 md:py-28 bg-gradient-hero text-paper">
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold">§ IV · The thread</p>
          <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.05] text-paper">
            Building from Cambodia.
          </h2>
          <div className="grid md:grid-cols-2 gap-10 pt-4">
            <p className="font-content text-lg leading-relaxed text-paper/85">
              My story is about using creativity, business, culture, and strategy to help
              local brands become stronger, more visible, and more respected — at home,
              and abroad.
            </p>
            <p className="font-content text-lg leading-relaxed text-paper/70 italic">
              Talent. Rice. Dairy. Spirits. Different sectors, one thread: Cambodia's next
              chapter — built deliberately.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────── 6. CONTACT ─────────────────────── */}
      <section className="grid md:grid-cols-12 gap-12 border-t border-border pt-16">
        <div className="md:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">§ V</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mt-2 leading-tight">
            Get in touch.
          </h2>
          <p className="font-content text-lg text-content-muted mt-4 max-w-md">
            For brand work, partnerships across Cambodian agriculture, F&B, and spirits,
            or to talk about building something here.
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
                <span className="font-display text-xl text-foreground">LinkedIn / Sovandarapor (James) Kong</span>
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
