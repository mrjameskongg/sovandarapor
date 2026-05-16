import { Link } from 'react-router-dom';
import { Crown, Wheat, Milk, Wine, ArrowUpRight } from 'lucide-react';
import { categorySlug } from '@/lib/blog';
import Seo from '@/components/Seo';

const ventures = [
  { icon: Crown, name: 'Princess Jenna Norodom', category: 'Media & Talent', role: 'Personal Manager', desc: 'Managing public presence, partnerships, and content strategy for Princess Jenna Norodom.' },
  { icon: Wheat, name: 'BRM Agro', category: 'Rice', role: 'Brand Strategy', desc: 'Building a premium rice brand for export — from origin story to packaging to international buyers.' },
  { icon: Milk, name: 'Moo Moo Farms', category: 'Dairy', role: 'Group Operations', desc: 'Turnaround work on a Cambodian dairy operation — supply, distribution, and a new web presence.' },
  { icon: Wine, name: 'Seekers Group', category: 'Spirits & Hospitality', role: 'Brand & Storytelling', desc: 'Spirits and hospitality concepts grounded in Cambodian terroir and craft.' },
];

export default function CambodiaWork() {
  return (
    <div className="space-y-20">
      <Seo
        title="Cambodia Work — Ventures by Sovandarapor (James) Kong"
        description="Operating in agriculture, dairy, spirits, and media — building Cambodian brands that can stand on a global stage."
      />
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Ventures</p>
        <h1 className="font-display text-5xl md:text-7xl font-light text-foreground leading-[0.95]">Cambodia work</h1>
        <p className="font-content text-lg text-content-muted max-w-2xl">
          Operating in agriculture, dairy, spirits, and media — building brands and businesses that can stand on a global stage from a Cambodian base.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-px bg-border">
        {ventures.map(v => {
          const Icon = v.icon;
          return (
            <div key={v.name} className="bg-background p-8 md:p-10 group">
              <div className="flex items-start justify-between mb-6">
                <Icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                <Link to={`/blog/category/${categorySlug(v.category)}`} className="text-[10px] uppercase tracking-[0.22em] text-content-muted hover:text-gold flex items-center gap-1">
                  Read more <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-content-muted mb-2">{v.category} · {v.role}</p>
              <h2 className="font-display text-3xl text-foreground mb-4">{v.name}</h2>
              <p className="font-content text-content-muted leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>

      <section className="border-t border-border pt-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-3">Approach</p>
        <h2 className="font-display text-4xl md:text-5xl font-light text-foreground max-w-3xl leading-tight">
          Build deeply local. Tell it globally.
        </h2>
      </section>
    </div>
  );
}
