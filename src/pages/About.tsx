import Plate from '@/components/editorial/Plate';
import PullQuote from '@/components/editorial/PullQuote';
import Colophon from '@/components/editorial/Colophon';
import deskNotes from '@/assets/desk-notes.jpg';
import portraitJames from '@/assets/portrait-james.jpg';

const About = () => {
  return (
    <>
      <header className="py-20 md:py-32 max-w-3xl">
        <p className="eyebrow-gold mb-8">About</p>
        <h1 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground">
          A field notebook,
          <br />
          <span className="italic">in the open.</span>
        </h1>
      </header>

      <div className="grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-5 md:order-2">
          <Plate src={portraitJames} alt="Sovandarapor Kong, Phnom Penh"
                 plate="I" location="Phnom Penh" date="2024"
                 ratio="portrait"
                 caption="Sovandarapor Kong, in formal Khmer dress." />
        </div>
        <div className="md:col-span-7 md:order-1 reading font-content text-lg leading-[1.8] text-content space-y-6">
          <p>
            James — Sovandarapor Kong — works between Phnom Penh and Bangkok. The
            day-to-day is operations, brand, and storytelling across four ventures
            in Cambodia: rice, dairy, spirits, and talent. The week-to-week is
            travel, reading, and writing.
          </p>
          <p>
            This site is a notebook, kept in public. Essays when something needs
            unpacking. Notes when a single line will do. Travel when a place earns
            it. A build log when a number worth showing has moved.
          </p>
          <p>
            There is no newsletter. No comments. No tracking. If you want to write,
            the address is at the bottom of the page.
          </p>
        </div>

        <aside className="md:col-span-7 md:col-start-1 md:order-3 md:pt-4 grid grid-cols-3 gap-8 font-ui text-[11px] uppercase tracking-[0.25em] text-content-muted">
          <div>
            <p className="text-gold text-[10px] mb-3">Based</p>
            <p className="font-content normal-case text-base text-foreground italic">
              Phnom Penh · Bangkok
            </p>
          </div>
          <div>
            <p className="text-gold text-[10px] mb-3">Languages</p>
            <p className="font-content normal-case text-base text-foreground italic">
              English · Khmer · Thai · Français
            </p>
          </div>
          <div>
            <p className="text-gold text-[10px] mb-3">Tools</p>
            <p className="font-content normal-case text-base text-foreground italic">
              Fuji X100V, Ricoh GR IIIx, paper, ink
            </p>
          </div>
        </aside>
      </div>

      <PullQuote>
        Build slowly. Write plainly. Look directly. The road takes care of the rest.
      </PullQuote>

      <div className="my-24">
        <Plate src={deskNotes} alt="A working desk in Boeung Keng Kang" plate="I"
               location="Boeung Keng Kang, Phnom Penh" date="Jan 2024"
               caption="The desk where most of this is written." />
      </div>

      <section className="py-24 text-center border-t border-border">
        <p className="eyebrow-gold mb-8">Write</p>
        <a href="mailto:james@example.com"
           className="font-display font-light italic text-4xl md:text-6xl text-foreground hover:text-gold transition-colors duration-500">
          james@example.com
        </a>
      </section>

      <Colophon />
    </>
  );
};

export default About;
