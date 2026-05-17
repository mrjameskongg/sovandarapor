import Seo from '@/components/Seo';
import Plate from '@/components/editorial/Plate';
import PullQuote from '@/components/editorial/PullQuote';
import ChapterDivider from '@/components/editorial/ChapterDivider';
import Colophon from '@/components/editorial/Colophon';
import mountainMist from '@/assets/mountain-mist.jpg';
import heroStreet from '@/assets/hero-street.jpg';
import featureTemple from '@/assets/feature-temple.jpg';
import nondual2 from '@/assets/nondual-2.jpg';

interface Chapter {
  numeral: string;
  city: string;
  country: string;
  date: string;
  body: string;
  body2: string;
  image: string;
  placeholder: string;
}

const chapters: Chapter[] = [
  {
    numeral: 'II',
    city: 'Phnom Penh',
    country: 'Cambodia',
    date: '2024 — Present',
    body: 'The capital wakes early and stays loud until the rain comes. I keep a small flat off Norodom and most of my work happens between a courtyard table and a phone. The river is ten minutes away when I forget what the city is doing.',
    body2: 'Phnom Penh rewards patience. The infrastructure is uneven, the people are not. Most things take a second visit. Almost everything is cheaper than it should be, and somehow that makes you spend less.',
    image: heroStreet,
    placeholder: 'street scene, Phnom Penh',
  },
  {
    numeral: 'III',
    city: 'Bangkok',
    country: 'Thailand',
    date: 'Quarterly',
    body: 'Bangkok is the older sibling. Trains that arrive on time, hospitals that work, food that holds steady from a 30-baht plate to a tasting menu. I come for two or three weeks at a stretch when I need the city to do some of the thinking for me.',
    body2: 'It costs roughly twice what Phnom Penh costs. The trade is the friction Bangkok removes. Some months that trade is worth it. Most months I miss the dust.',
    image: featureTemple,
    placeholder: 'a quiet temple, Bangkok',
  },
  {
    numeral: 'IV',
    city: 'Ho Chi Minh',
    country: 'Vietnam',
    date: 'Occasional',
    body: 'Saigon moves on motorbikes and second-wave coffee. The engineering talent runs deep and the founders are younger than you expect. I go when I want to be reminded that ambition has different accents in this region.',
    body2: 'A different kind of energy than Bangkok or Phnom Penh — less polished, more impatient. The food alone is worth a flight.',
    image: nondual2,
    placeholder: 'morning light, Saigon',
  },
];

export default function Travel() {
  return (
    <>
      <Seo
        title="Travel — Sovandarapor (James) Kong"
        description="Notes from where the work happens. Phnom Penh, Bangkok, Ho Chi Minh, and the road between them."
      />

      <header className="py-32 max-w-3xl">
        <p className="eyebrow-gold mb-6">§ Travel</p>
        <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground">
          The road.
        </h1>
        <p className="font-display italic font-light text-2xl md:text-3xl text-content-muted mt-8">
          Notes from where the work happens.
        </p>
      </header>

      {/* INTRO PLATE */}
      <section className="pb-24 md:pb-32 border-t border-border pt-16">
        <Plate
          src={mountainMist}
          alt="Misty mountain ridges at dawn, Mondulkiri"
          plate="I"
          location="Mondulkiri"
          date="2023"
          ratio="portrait"
        />
      </section>

      <PullQuote attribution="On the road">
        The road doesn&rsquo;t change you. It just stops you pretending.
      </PullQuote>

      {chapters.map((c, i) => {
        const flip = i % 2 === 1;
        return (
          <article key={c.city} className="py-24 md:py-32 border-t border-border">
            <ChapterDivider numeral={c.numeral} title={c.city} subtitle={c.country + ' · ' + c.date} />

            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start mt-8">
              <div className={`md:col-span-7 ${flip ? 'md:order-2' : ''}`}>
                <Plate
                  src={c.image}
                  alt={c.placeholder}
                  plate={c.numeral}
                  location={c.city}
                  date={c.date.split('—')[0].trim()}
                  ratio="portrait"
                  placeholder={c.placeholder}
                />
              </div>
              <div className={`md:col-span-5 space-y-6 ${flip ? 'md:order-1 md:pr-4' : 'md:pl-4'} md:pt-8`}>
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-gold">{c.country}</p>
                <p className="font-content text-lg leading-[1.8] text-content reading">{c.body}</p>
                <p className="font-content italic text-content-muted text-base leading-relaxed">{c.body2}</p>
              </div>
            </div>
          </article>
        );
      })}

      <Colophon />
    </>
  );
}
