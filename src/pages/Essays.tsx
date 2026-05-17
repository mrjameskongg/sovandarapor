import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Colophon from '@/components/editorial/Colophon';

interface Essay {
  slug: string;
  title: string;
  date: string;
}

const essays: Essay[] = [
  {
    slug: 'illusion-separate-self',
    title: 'The Illusion of the Separate Self',
    date: '2024-01-15',
  },
];

export default function Essays() {
  return (
    <>
      <Seo
        title="Essays — Sovandarapor (James) Kong"
        description="Long-form essays. When something needs unpacking."
      />

      <header className="py-32 max-w-3xl">
        <p className="eyebrow-gold mb-6">§ Essays</p>
        <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground">
          Long-form.
        </h1>
        <p className="font-display italic font-light text-2xl md:text-3xl text-content-muted mt-8">
          When something needs unpacking.
        </p>
      </header>

      <ul className="border-t border-border">
        {essays.map((e, i) => (
          <li key={e.slug} className="border-b border-border">
            <Link to={`/essays/${e.slug}`} className="grid grid-cols-12 gap-4 items-baseline py-8 md:py-10 group">
              <span className="col-span-2 md:col-span-1 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="col-span-10 md:col-span-9 font-display font-light text-2xl md:text-4xl leading-[1.1] text-foreground group-hover:text-gold transition-colors duration-500">
                {e.title}
              </h2>
              <span className="col-span-12 md:col-span-2 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted text-right tabular">
                {new Date(e.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Colophon />
    </>
  );
}
