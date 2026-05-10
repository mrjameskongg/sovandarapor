import { ReactNode } from 'react';

export default function PullQuote({ children, attribution }: { children: ReactNode; attribution?: string }) {
  return (
    <blockquote className="my-16 md:my-24 max-w-4xl mx-auto text-center">
      <div className="hairline mb-10" />
      <p className="font-display italic font-light text-3xl md:text-5xl leading-[1.2] text-foreground">
        {children}
      </p>
      {attribution && (
        <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted mt-8">— {attribution}</p>
      )}
      <div className="hairline mt-10" />
    </blockquote>
  );
}
