import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Colophon from '@/components/editorial/Colophon';

interface Note {
  slug: string;
  title: string;
  date: string;
}

const notes: Note[] = [
  {
    slug: 'awareness-already-perfect',
    title: 'Awareness Is Already Perfect',
    date: '2024-01-15',
  },
];

export default function Notes() {
  return (
    <>
      <Seo
        title="Notes — Sovandarapor (James) Kong"
        description="Short takes. When a single line will do."
      />

      <header className="py-32 max-w-3xl">
        <p className="eyebrow-gold mb-6">§ Notes</p>
        <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground">
          Short takes.
        </h1>
        <p className="font-display italic font-light text-2xl md:text-3xl text-content-muted mt-8">
          When a single line will do.
        </p>
      </header>

      <ul className="border-t border-border">
        {notes.map((n, i) => (
          <li key={n.slug} className="border-b border-border">
            <Link to={`/notes/${n.slug}`} className="grid grid-cols-12 gap-4 items-baseline py-8 md:py-10 group">
              <span className="col-span-2 md:col-span-1 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="col-span-10 md:col-span-9 font-display font-light text-2xl md:text-4xl leading-[1.1] text-foreground group-hover:text-gold transition-colors duration-500">
                {n.title}
              </h2>
              <span className="col-span-12 md:col-span-2 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted text-right tabular">
                {new Date(n.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Colophon />
    </>
  );
}
