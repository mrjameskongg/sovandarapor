import { Link } from 'react-router-dom';
import Seo from '@/components/Seo';
import Colophon from '@/components/editorial/Colophon';
import nondualHero from '@/assets/nondual-1.jpg';

const articles = [
  {
    slug: 'youve-already-known',
    title: "You've Already Known. You Just Didn't Have the Word for It.",
    teaser:
      'Most people argue about God without ever defining it. Here\u2019s the real definition \u2014 and why you\u2019ve already touched it without knowing.',
    date: '2026-05-16',
  },
];

const Nondual = () => {
  return (
    <>
      <Seo
        title="Nondual — James Kong"
        description="A quiet corner of the internet for the thing that keeps happening to you — and the old, sharp minds who already understood it."
      />

      {/* DOORWAY — quiet intro */}
      <section className="min-h-[80vh] flex items-center justify-center py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-10">
          <p className="eyebrow-gold">A quiet corner</p>
          <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground tracking-[-0.02em]">
            Nondual
          </h1>

          <div className="hairline w-16 mx-auto" />

          <div className="font-content text-[19px] md:text-[20px] leading-[1.8] text-content space-y-6">
            <p>Some moments don&rsquo;t have words yet.</p>
            <p>
              This section is where I sit with those moments &mdash; and with the
              very old, very sharp minds who already had names for them.
            </p>
            <p className="text-content-muted">
              No religion. No framework. No 5-step plan.
            </p>
            <p>Just the thing that keeps happening, looked at honestly.</p>
            <p className="font-display italic text-xl md:text-2xl text-content-muted pt-4">
              Start with the first piece below.
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLE LIST */}
      <section className="max-w-2xl mx-auto px-2 pb-32">
        <div className="flex items-center gap-6 mb-12">
          <p className="eyebrow-gold whitespace-nowrap">The pieces</p>
          <span className="hairline flex-1" />
        </div>

        <ul className="space-y-16">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link to={`/nondual/${a.slug}`} className="group block">
                <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular mb-4">
                  {new Date(a.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <h2 className="font-display font-light text-3xl md:text-5xl leading-[1.1] text-foreground group-hover:text-gold transition-colors duration-500">
                  {a.title}
                </h2>
                <p className="font-content text-[18px] md:text-[19px] leading-[1.75] text-content-muted mt-5 max-w-xl">
                  {a.teaser}
                </p>
                <p className="font-ui text-[11px] uppercase tracking-[0.3em] text-gold mt-6 link-quiet">
                  Read &rarr;
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Colophon />
    </>
  );
};

export default Nondual;
