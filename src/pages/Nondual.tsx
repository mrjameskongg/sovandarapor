import { Link } from 'react-router-dom';
import nondual1 from '@/assets/nondual-1.jpg';
import nondual2 from '@/assets/nondual-2.jpg';
import Colophon from '@/components/editorial/Colophon';

const linkedNotes = [
  { num: 'I',   title: 'The Illusion of the Separate Self', slug: 'illusion-separate-self', date: '2024-01-15' },
  { num: 'II',  title: 'Awareness Is Already Perfect',      slug: 'awareness-already-perfect', date: '2024-01-05' },
  { num: 'III', title: 'Looking Without a Looker',          slug: 'looking-without-a-looker',  date: '2023-12-18' },
];

const reading = [
  { title: 'I Am That',            author: 'Nisargadatta Maharaj', year: 1973 },
  { title: 'The Open Secret',      author: 'Tony Parsons',         year: 2003 },
  { title: 'The Way of Liberation', author: 'Adyashanti',           year: 2012 },
];

const Nondual = () => {
  return (
    <>
      {/* HERO — full-bleed plate */}
      <section className="relative -mx-6 md:-mx-10 -mt-10 md:-mt-16 h-screen min-h-[640px] overflow-hidden grain">
        <img
          src={nondual1}
          alt="A single window of light in a quiet interior"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />
        <p className="absolute bottom-6 left-6 md:left-12 font-ui text-[10px] uppercase tracking-[0.3em] text-paper/75">
          Plate I · <span className="italic normal-case tracking-normal text-paper/85 font-content">What is already here.</span>
        </p>
      </section>

      {/* SINGLE-LINE INVOCATION */}
      <section className="min-h-[80vh] flex items-center justify-center py-32 max-w-4xl mx-auto text-center">
        <p className="font-display font-light italic text-3xl md:text-5xl lg:text-6xl leading-[1.2] text-foreground">
          Awareness is not something I do.
          <br />
          It&rsquo;s what&rsquo;s looking right now.
        </p>
      </section>

      {/* THREE MOVEMENTS */}
      <section className="max-w-2xl mx-auto py-16 space-y-24">
        <div>
          <p className="eyebrow-gold mb-4">§ I · Direct experience</p>
          <div className="font-content text-[19px] leading-[1.8] text-content space-y-5">
            <p>
              When I look for the one who is looking, I cannot find anything solid.
              There is seeing, hearing, the weight of the body in a chair, the sound
              of a fan. There is no separate watcher behind it, only the looking
              itself.
            </p>
            <p>
              This is not a belief. It&rsquo;s the result of stopping for long enough to
              check. Whatever is reading this sentence is the same thing that is
              already aware — present before the thought of &ldquo;me&rdquo; gets added on top.
              That noticing is what people mean by nondual. It is ordinary, and it
              is always available.
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow-gold mb-4">§ II · How it shows up in the work</p>
          <div className="font-content text-[19px] leading-[1.8] text-content space-y-5">
            <p>
              Less reaction. A meeting goes sideways and I don&rsquo;t spend the next
              two hours rehearsing it. A number drops and I look at the number,
              not at my self-image. Decisions get made on a longer time horizon
              because the urgency to defend a self has loosened.
            </p>
            <p>
              I&rsquo;m not detached. I still care, argue, push, and lose sleep over
              the rice harvest. The difference is that the caring isn&rsquo;t built on
              a fragile sense of who I am. The work gets to be the work.
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow-gold mb-4">§ III · How to look</p>
          <div className="font-content text-[19px] leading-[1.8] text-content space-y-5">
            <p>
              Sit, or stand, or keep walking. Notice that something is already
              aware of this sentence. Don&rsquo;t try to improve it, deepen it, or hold
              on to it. Just notice that the noticing is already happening, on its
              own, without your help.
            </p>
            <p>
              That&rsquo;s the whole invitation. Everything else is commentary.
            </p>
          </div>
        </div>
      </section>

      {/* PULL QUOTE — full-bleed B&W with overlay */}
      <section className="relative -mx-6 md:-mx-10 h-screen overflow-hidden grain my-24">
        <img src={nondual2} alt="Open horizon at dawn" className="absolute inset-0 w-full h-full object-cover grayscale" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <p className="font-display italic font-light text-3xl md:text-5xl lg:text-6xl text-paper/90 max-w-4xl text-center leading-[1.2]">
            &ldquo;There is no one separate from this. There never was.&rdquo;
          </p>
        </div>
        <p className="absolute bottom-6 left-6 md:left-12 font-ui text-[10px] uppercase tracking-[0.3em] text-paper/60">
          Plate II · Open horizon · Mondulkiri
        </p>
      </section>

      {/* READING LIST */}
      <section className="max-w-2xl mx-auto py-24">
        <p className="eyebrow-gold mb-10">A small bibliography</p>
        <ul className="space-y-8">
          {reading.map((b) => (
            <li key={b.title} className="border-b border-border pb-6">
              <p className="font-display font-light text-3xl md:text-4xl text-foreground leading-[1.1]">
                {b.title}
              </p>
              <p className="font-content italic text-content-muted mt-2">
                {b.author} <span className="font-ui not-italic text-[11px] uppercase tracking-[0.25em] ml-3 tabular">{b.year}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* LINKED NOTES — typographic index */}
      <section className="py-24 border-t border-border">
        <div className="flex items-end justify-between border-b border-border pb-6 mb-8">
          <div>
            <p className="eyebrow-gold mb-3">Linked notes</p>
            <h2 className="font-display font-light text-4xl md:text-5xl text-foreground">From the journal</h2>
          </div>
          <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular hidden sm:block">
            Tagged · nondual
          </p>
        </div>

        <ul className="divide-y divide-border">
          {linkedNotes.map((n) => (
            <li key={n.slug}>
              <Link to={`/blog/${n.slug}`} className="grid grid-cols-12 gap-4 items-baseline py-6 md:py-8 group">
                <span className="col-span-1 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted tabular">
                  {n.num}
                </span>
                <h3 className="col-span-9 font-display font-light text-2xl md:text-3xl leading-[1.15] text-foreground group-hover:text-gold transition-colors duration-500">
                  {n.title}
                </h3>
                <span className="col-span-2 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted text-right tabular">
                  {new Date(n.date).getFullYear()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* CLOSING LINE */}
      <section className="py-32 text-center">
        <p className="font-display font-light italic text-xl md:text-2xl text-content-muted">
          — Sovandarapor (James) Kong, Phnom Penh, written between meetings.
        </p>
      </section>

      <Colophon />
    </>
  );
};

export default Nondual;
