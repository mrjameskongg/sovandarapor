import { ReactNode } from 'react';

export default function Marginalia({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="font-ui text-[11px] leading-relaxed text-content-muted border-l border-gold pl-4 my-6 md:my-0">
      {label && <p className="uppercase tracking-[0.25em] text-gold text-[10px] mb-2">{label}</p>}
      <div className="font-content italic text-[13px] text-content-muted">{children}</div>
    </aside>
  );
}
