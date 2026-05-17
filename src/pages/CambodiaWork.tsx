import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Plate from '@/components/editorial/Plate';
import ChapterDivider from '@/components/editorial/ChapterDivider';
import Marginalia from '@/components/editorial/Marginalia';
import Colophon from '@/components/editorial/Colophon';
import { fetchVentureImages, type VentureImages } from '@/lib/siteSettings';

const ventures = [
  {
    slug: 'princess-jenna',
    name: 'Princess Jenna Norodom',
    category: 'Talent · Media · Royal Brand',
    role: 'Personal Manager · 2024 — 2025',
    body: 'Talent management, media positioning, storytelling, and production with Princess Jenna Norodom — operating inside Cambodia\'s entertainment, royal, and cultural ecosystem.',
    body2: 'A study in how identity, lineage, and modern media can be reframed for a generation that reads everything through a screen.',
    highlights: ['Representation', 'Brand positioning', 'Media & PR', 'Cultural production'],
    label: 'Practice',
    placeholder: 'portrait, HRH Jenna Norodom',
  },
  {
    slug: 'brm-agro',
    name: 'BRM Agro',
    category: 'Agriculture · Rice · Export',
    role: 'Brand Strategy · 2026 → Present',
    body: 'A Cambodian rice and agriculture group rooted in Kampong Thom. Multiple house brands moving from local farms to international markets.',
    body2: 'The work is about translating a paddy field into a label, a label into a shelf, a shelf into a story.',
    highlights: ['White King Elephant', 'Diamond', 'King White Elephant'],
    label: 'Brands',
    placeholder: 'rice fields, Kampong Thom',
  },
  {
    slug: 'moo-moo',
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
    slug: 'seekers',
    name: 'Seekers Group',
    category: 'Spirits · Hospitality · Lifestyle',
    role: 'Brand & Storytelling · Ongoing',
    body: 'A Cambodian spirits and beverage group building a portfolio of premium, lifestyle-driven brands rooted in modern Cambodian identity.',
    body2: 'Drinks designed not for tourists, but for the Cambodian and regional class that\'s coming next.',
    highlights: ['Seekers', 'Jason Kong', 'Chanthy (upcoming)', 'Wild Bong'],
    label: 'Brands',
    placeholder: 'a single bottle on a marble bar',
  },
];

export default function CambodiaWork() {
  const [ventureImages, setVentureImages] = useState<VentureImages>({});
  useEffect(() => { fetchVentureImages().then(setVentureImages); }, []);

  return (
    <>
      <Seo
        title="Cambodia Work — Sovandarapor (James) Kong"
        description="Built from the ground. Ventures in agriculture, dairy, spirits, and media — building Cambodian brands that can stand globally."
      />

      <header className="py-32 max-w-3xl">
        <p className="eyebrow-gold mb-6">§ Ventures</p>
        <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground">
          Cambodia work.
        </h1>
        <p className="font-display italic font-light text-2xl md:text-3xl text-content-muted mt-8">
          Built from the ground.
        </p>
      </header>

      {ventures.map((v, i) => {
        const numerals = ['I', 'II', 'III', 'IV'];
        const flip = i % 2 === 1;
        return (
          <article key={v.slug} className="py-24 md:py-32 border-t border-border">
            <ChapterDivider numeral={numerals[i]} title={v.name} subtitle={v.category} />

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
              <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
                <Plate
                  src={ventureImages[v.slug]}
                  alt={v.name}
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

                <Marginalia label={v.label}>{v.highlights.join(' · ')}</Marginalia>

                <p className="pt-4">
                  <Link to="/profile" className="font-ui text-[10px] uppercase tracking-[0.3em] text-foreground link-quiet">
                    Read profile →
                  </Link>
                </p>
              </div>
            </div>
          </article>
        );
      })}

      <Colophon />
    </>
  );
}
