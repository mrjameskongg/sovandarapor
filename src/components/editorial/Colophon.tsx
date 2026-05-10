export default function Colophon() {
  return (
    <section className="border-t border-border pt-10 mt-32 max-w-3xl mx-auto">
      <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Colophon</p>
      <div className="grid sm:grid-cols-3 gap-8 font-content text-[13px] leading-relaxed text-content-muted italic">
        <p>
          Set in <span className="not-italic">Cormorant Garamond</span> for display and{' '}
          <span className="not-italic">Source Serif Pro</span> for reading. Labels in{' '}
          <span className="not-italic">Inter</span>.
        </p>
        <p>
          Photographs made on a Fuji X100V and a Ricoh GR IIIx, between Phnom Penh,
          Kampong Thom, and Bangkok.
        </p>
        <p>
          Written by hand from a small desk in Boeung Keng Kang. Published while the
          ink is still wet.
        </p>
      </div>
    </section>
  );
}
