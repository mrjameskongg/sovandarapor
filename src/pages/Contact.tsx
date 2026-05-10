import { Mail, Linkedin, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="space-y-16">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Contact</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground leading-[0.95]">Get in touch</h1>
        <p className="font-content text-lg text-content-muted max-w-2xl">
          For collaborations, brand work, or a quiet introduction — write directly.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-px bg-border">
        <a href="mailto:james@example.com" className="bg-background p-8 group">
          <Mail className="w-6 h-6 text-gold mb-4" strokeWidth={1.5} />
          <p className="text-[11px] uppercase tracking-[0.22em] text-content-muted mb-2">Email</p>
          <p className="font-display text-xl text-foreground group-hover:text-gold">james@example.com</p>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-background p-8 group">
          <Linkedin className="w-6 h-6 text-gold mb-4" strokeWidth={1.5} />
          <p className="text-[11px] uppercase tracking-[0.22em] text-content-muted mb-2">LinkedIn</p>
          <p className="font-display text-xl text-foreground group-hover:text-gold">Sovandarapor (James) Kong</p>
        </a>
        <div className="bg-background p-8">
          <MapPin className="w-6 h-6 text-gold mb-4" strokeWidth={1.5} />
          <p className="text-[11px] uppercase tracking-[0.22em] text-content-muted mb-2">Based</p>
          <p className="font-display text-xl text-foreground">Phnom Penh · Bangkok</p>
        </div>
      </div>
    </div>
  );
}
