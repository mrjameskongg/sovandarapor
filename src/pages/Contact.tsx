import Seo from '@/components/Seo';
import Plate from '@/components/editorial/Plate';
import Colophon from '@/components/editorial/Colophon';
import deskNotes from '@/assets/desk-notes.jpg';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact — Sovandarapor (James) Kong"
        description="Write directly. Phnom Penh, Bangkok, everywhere."
      />

      <section className="py-16 md:py-24 max-w-3xl mx-auto px-2">
        <Plate
          src={deskNotes}
          alt="A working desk"
          plate="I"
          location="A working desk"
          date="2024"
          ratio="portrait"
        />
      </section>

      <section className="py-32 md:py-48 text-center border-t border-border">
        <p className="eyebrow-gold mb-8">§ Write</p>
        <a
          href="mailto:ksovandarapor@gmail.com"
          className="font-display font-light italic text-4xl md:text-7xl text-foreground hover:text-gold transition-colors duration-500 break-words"
        >
          ksovandarapor@gmail.com
        </a>
        <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mt-10 tabular">
          Phnom Penh · Bangkok · Everywhere · written by hand
        </p>
        <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mt-3">
          <a
            href="https://www.linkedin.com/in/sovandarapor-kong-788a531b1/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet"
          >
            LinkedIn
          </a>
        </p>
      </section>

      <Colophon />
    </>
  );
}
