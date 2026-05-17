import Seo from '@/components/Seo';
import PullQuote from '@/components/editorial/PullQuote';
import Colophon from '@/components/editorial/Colophon';

const craft = [
  'Brand strategy',
  'Visual identity',
  'Storytelling',
  'Marketing',
  'Performance',
  'Web & product',
  'Content planning',
  'Pitch decks',
  'Cambodian cultural branding',
];

export default function BrandBuilding() {
  return (
    <>
      <Seo
        title="Craft — Sovandarapor (James) Kong"
        description="Disciplines I draw on to take a venture from idea to a brand people remember."
      />

      <header className="py-32 max-w-3xl">
        <p className="eyebrow-gold mb-6">§ Craft</p>
        <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground">
          The craft.
        </h1>
        <p className="font-display italic font-light text-2xl md:text-3xl text-content-muted mt-8">
          Disciplines I draw on.
        </p>
      </header>

      <ul className="border-t border-border">
        {craft.slice(0, 5).map((c, i) => (
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

      <PullQuote attribution="On the work">
        A brand isn&rsquo;t a logo. It&rsquo;s the residue a company leaves in someone&rsquo;s mind.
      </PullQuote>

      <ul className="border-t border-border">
        {craft.slice(5).map((c, i) => (
          <li key={c} className="border-b border-border py-6 md:py-8 grid grid-cols-12 items-baseline">
            <span className="col-span-1 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
              {String(i + 6).padStart(2, '0')}
            </span>
            <span className="col-span-11 font-display font-light text-3xl md:text-5xl text-foreground italic">
              {c}
            </span>
          </li>
        ))}
      </ul>

      <Colophon />
    </>
  );
}
