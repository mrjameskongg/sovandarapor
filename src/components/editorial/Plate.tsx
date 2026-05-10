import { ReactNode } from 'react';

interface PlateProps {
  src?: string;
  alt?: string;
  plate: string; // e.g. "I", "II"
  location?: string;
  date?: string;
  caption?: string;
  ratio?: 'portrait' | 'landscape' | 'square' | 'cinema' | string;
  fullBleed?: boolean;
  children?: ReactNode;
  className?: string;
  placeholder?: string;
}

const ratioMap: Record<string, string> = {
  portrait: 'aspect-[4/5]',
  landscape: 'aspect-[3/2]',
  square: 'aspect-square',
  cinema: 'aspect-[16/9]',
};

export default function Plate({
  src, alt = '', plate, location, date, caption, ratio = 'landscape', fullBleed, className = '', placeholder,
}: PlateProps) {
  const ar = ratioMap[ratio] || ratio;
  return (
    <figure className={`${fullBleed ? 'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen' : ''} ${className}`}>
      <div className={`relative overflow-hidden grain ${ar}`}>
        {src ? (
          <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[900ms] ease-out hover:scale-[1.03]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-content-muted text-xs uppercase tracking-[0.3em] p-8 text-center">
            PLATE TK — {placeholder || 'photograph needed'}
          </div>
        )}
      </div>
      <figcaption className={`mt-4 ${fullBleed ? 'px-6 md:px-10 max-w-6xl mx-auto' : ''} flex flex-wrap gap-x-6 gap-y-1 font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted`}>
        <span className="text-gold">Plate {plate}</span>
        {location && <span>{location}</span>}
        {date && <span className="tabular">{date}</span>}
        {caption && <span className="normal-case tracking-normal italic font-content text-[12px] text-content-muted">{caption}</span>}
      </figcaption>
    </figure>
  );
}
