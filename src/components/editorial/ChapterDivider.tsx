interface ChapterDividerProps {
  numeral: string;       // "I", "II", ...
  title: string;
  subtitle?: string;
}

export default function ChapterDivider({ numeral, title, subtitle }: ChapterDividerProps) {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-start py-24">
      <p className="font-ui text-[10px] uppercase tracking-[0.4em] text-gold mb-8">Chapter {numeral}</p>
      <h2 className="font-display font-light text-6xl md:text-8xl leading-[0.95] text-foreground max-w-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="font-content italic text-xl text-content-muted mt-8 max-w-2xl">{subtitle}</p>
      )}
      <div className="hairline mt-16 w-32" />
    </section>
  );
}
