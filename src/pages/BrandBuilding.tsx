import { Palette, PenTool, Megaphone, BarChart3, Camera, Layers } from 'lucide-react';

const skills = [
  { icon: PenTool, title: 'Brand strategy', desc: 'Positioning, narrative, voice, and visual direction for new and turnaround brands.' },
  { icon: Palette, title: 'Visual identity', desc: 'Logos, palettes, type systems, and design languages built to last and scale.' },
  { icon: Camera, title: 'Storytelling', desc: 'Founder stories, origin films, photo direction — content that earns attention without buying it.' },
  { icon: Megaphone, title: 'Marketing', desc: 'Go-to-market, partnerships, content engines, and channel strategy across web and social.' },
  { icon: BarChart3, title: 'Performance', desc: 'Data-driven campaigns, funnels, and reporting tied to real business outcomes.' },
  { icon: Layers, title: 'Web & product', desc: 'Sites, landing pages, and digital products that match the brand and convert.' },
];

export default function BrandBuilding() {
  return (
    <div className="space-y-20">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Craft</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground leading-[0.95]">Brand building</h1>
        <p className="font-content text-lg text-content-muted max-w-2xl">
          The disciplines I draw on to take a venture from idea to a brand people remember.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {skills.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="bg-background p-8">
              <Icon className="w-6 h-6 text-gold mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-2xl text-foreground mb-3">{s.title}</h3>
              <p className="font-content text-content-muted leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
