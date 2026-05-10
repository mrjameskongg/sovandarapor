import { Link } from 'react-router-dom';
import Plate from '@/components/editorial/Plate';
import PullQuote from '@/components/editorial/PullQuote';
import ChapterDivider from '@/components/editorial/ChapterDivider';
import Marginalia from '@/components/editorial/Marginalia';
import Colophon from '@/components/editorial/Colophon';

const ventures = [
  {
    name: 'Princess Jenna Norodom',
    category: 'Talent · Media · Royal Brand',
    role: 'Personal Manager · 2024 — 2025',
    body: 'Worked closely with Princess Jenna Norodom on talent management, media positioning, storytelling, production, and public image — operating inside Cambodia\'s entertainment, royal, and cultural ecosystem.',
    body2: 'A study in how identity, lineage, and modern media can be reframed for a generation that reads everything through a screen.',
    highlights: ['Talent representation', 'Brand positioning', 'Media & PR', 'Cultural production'],
    label: 'Practice',
    placeholder: 'portrait of HRH Jenna Norodom',
  },
  {
    name: 'BRM Agro',
    category: 'Agriculture · Rice · Export',
    role: 'Brand Strategy · 2026 → Present',
    body: 'A Cambodian rice and agriculture group rooted in Kampong Thom. Multiple house brands moving from local farms to international markets — the United States, Europe, and beyond.',
    body2: 'The work is about translating a paddy field into a label, a label into a shelf, a shelf into a story.',
    highlights: ['White King Elephant', 'Diamond', 'King White Elephant'],
    label: 'Brands',
    placeholder: 'rice fields, Kampong Thom',
  },
  {
    name: 'Moo Moo Farms',
    category: 'Dairy · Food · Turnaround',
    role: 'Group Operations · 2024 → Present',
    body: 'Cambodia\'s first dairy farm, founded around 2015 and acquired by our group in 2024. Inherited 100+ underfed cows; rebuilding the farm, the herd, and the operation.',
    body2: 'On track for ~600 cows in 2025 and ~1,000 by end of 2026 — a slow national project, measured in bodies and grass.',
    highlights: ['Acquired 2024', '~600 cows in 2025', '~1,000 cows by 2026'],
    label: 'Trajectory',
    placeholder: 'a Holstein at Moo Moo Farms',
  },
  {
    name: 'Seekers Group',
    category: 'Spirits · Hospitality · Lifestyle',
    role: 'Brand & Storytelling · Ongoing',
    body: 'A Cambodian spirits and beverage group building a portfolio of premium, lifestyle-driven brands rooted in modern Cambodian identity.',
    body2: "Drinks designed not for tourists, but for the Cambodian and regional class that's coming next.",
    highlights: ['Seekers', 'Jason Kong', 'Chanthy (upcoming)', 'Wild Bond'],
    label: 'Brands',
    placeholder: 'a single bottle on a marble bar',
  },
];

const craft = [
  'Marketing strategy',
  'Graphic design',
  'Social campaigns',
  'Brand positioning',
  'Content planning',
  'Pitch decks',
  'Product storytelling',
  'Cambodian cultural branding',
  'Export communication',
];

const Profile = () => {
  return (
    <>
      {/* HERO PORTRAIT — full bleed, full viewport */}
      <section className="relative -mx-6 md:-mx-10 -mt-10 md:-mt-16 h-screen min-h-[640px] overflow-hidden grain">
        <img
          src="/profile-photo.jpg"
          alt="Sovandarapor (James) Kong"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        <div className="absolute top-6 right-6 md:right-12 font-ui text-[10px] uppercase tracking-[0.3em] text-paper/70">
          Phnom Penh · 14.58° N
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 max-w-3xl">
          <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-paper/70 mb-6">A Profile</p>
          <h1 className="font-display font-light text-6xl md:text-9xl leading-[0.88] text-paper">
            Sovandarapor
            <br />
            <span className="italic">Kong.</span>
          </h1>
        </div>

        <p className="absolute bottom-4 right-6 md:right-12 font-ui text-[10px] uppercase tracking-[0.3em] text-paper/60">
          Plate I · Self · 2024
        </p>
      </section>

      {/* SHORT BIO — generous breath */}
      <section className="py-32 md:py-48 max-w-2xl mx-auto text-center px-2">
        <p className="font-content text-xl md:text-2xl leading-[1.7] text-foreground">
          James works across agriculture, food, beverage, media, and brand development
          in Cambodia. Talent management. Rice export. A dairy turnaround. A spirits
          house. <span className="italic text-content-muted">Different sectors, one thread.</span>
        </p>
        <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mt-12 tabular">
          EN · KM · TH · FR &nbsp;·&nbsp; Phnom Penh ↔ Bangkok
        </p>
      </section>

      {/* PHILOSOPHY — pull quote */}
      <PullQuote attribution="On the lens behind the work">
        I try to see life from a wider angle — beyond identity, role, or status.
        Less reaction. Wider view.
      </PullQuote>

      {/* THE FOUR CHAPTERS */}
      {ventures.map((v, i) => {
        const numerals = ['I', 'II', 'III', 'IV'];
        const flip = i % 2 === 1;
        return (
          <article key={v.name} className="py-24 md:py-32 border-t border-border">
            <ChapterDivider numeral={numerals[i]} title={v.name} subtitle={v.category} />

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
              <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
                <Plate
                  plate={numerals[i]}
                  ratio={i % 2 === 0 ? 'portrait' : 'landscape'}
                  placeholder={v.placeholder}
                  location={v.category.split('·')[0].trim()}
                  date={v.role.split('·').pop()?.trim()}
                />
              </div>

              <div className={`md:col-span-5 space-y-6 ${flip ? 'md:order-1 md:pr-4' : 'md:pl-4'} md:pt-8`}>
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-gold">{v.role}</p>
                <p className="font-content text-lg leading-[1.8] text-content reading">{v.body}</p>
                <p className="font-content italic text-content-muted text-base leading-relaxed">{v.body2}</p>

                <Marginalia label={v.label}>
                  {v.highlights.join(' · ')}
                </Marginalia>
              </div>
            </div>
          </article>
        );
      })}

      {/* CRAFT — vertical typographic list */}
      <section className="py-32 border-t border-border">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <p className="eyebrow-gold mb-4">§ V</p>
            <h2 className="font-display font-light text-5xl md:text-6xl leading-[1] text-foreground">
              The craft.
            </h2>
          </div>
          <p className="md:col-span-7 md:col-start-6 font-content italic text-lg text-content-muted leading-relaxed">
            Marketing, design, storytelling, growth — translating Cambodian businesses
            into something the world can read.
          </p>
        </div>

        <ul className="border-t border-border">
          {craft.map((c, i) => (
            <li key={c} className="border-b border-border py-6 md:py-8 grid grid-cols-12 items-baseline">
              <span className="col-span-1 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="col-span-11 font-display font-light text-3xl md:text-5xl text-foreground italic">
                {c}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* THREAD — full-bleed B&W image with overlay */}
      <section className="relative -mx-6 md:-mx-10 h-[80vh] overflow-hidden grain my-24">
        <div className="absolute inset-0 bg-muted flex items-center justify-center text-content-muted text-xs uppercase tracking-[0.3em]">
          PLATE TK — black-and-white street scene, Phnom Penh
        </div>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center">
          <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-paper/60 mb-8">§ VI · The thread</p>
          <h2 className="font-display font-light text-5xl md:text-7xl text-paper max-w-4xl leading-[1.05]">
            Building from <span className="italic">Cambodia.</span>
          </h2>
          <p className="font-content italic text-lg text-paper/70 mt-8 max-w-xl">
            Talent. Rice. Dairy. Spirits. One country's next chapter — built deliberately.
          </p>
        </div>
      </section>

      {/* CONTACT — large mailto */}
      <section className="py-32 text-center">
        <p className="eyebrow-gold mb-8">Write</p>
        <a
          href="mailto:james@example.com"
          className="font-display font-light italic text-4xl md:text-7xl text-foreground hover:text-gold transition-colors duration-500"
        >
          james@example.com
        </a>
        <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mt-10 tabular">
          Phnom Penh · Bangkok · written by hand
        </p>
        <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mt-3">
          <Link to="https://www.linkedin.com/in/sovandarapor-kong" className="link-quiet">LinkedIn</Link>
        </p>
      </section>

      <Colophon />
    </>
  );
};

export default Profile;
