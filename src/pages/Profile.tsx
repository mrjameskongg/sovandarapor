import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Globe, Mail, Linkedin } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-10 py-4">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="shrink-0">
          <img
            src="/profile-photo.jpg"
            alt="Sovandarapor Kong"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-2 border-gold/30 shadow-lg"
            width={192}
            height={192}
          />
        </div>
        <div className="text-center md:text-left space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Sovandarapor Kong
          </h1>
          <p className="text-lg text-content-muted font-content">
            Builder. Operator. Wanderer. Writing from Southeast Asia.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-content-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              Phnom Penh / Bangkok
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              English, Khmer, Thai
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">About</h2>
        <div className="prose prose-lg text-content font-content leading-relaxed space-y-4">
          <p>
            I'm Sovandarapor Kong — Sovan for short. I build businesses in Cambodia and Thailand,
            write about what I'm learning, and move slowly through Southeast Asia. Born in Cambodia,
            educated abroad, now back in the region making things happen.
          </p>
          <p>
            This site is where I think in public. Nondual reflections, travel logistics, business
            building, short takes on whatever I'm chewing on. No grand theory — just direct experience
            written down before I forget it.
          </p>
          <p>
            Before going independent, I worked in product and operations roles across fintech and
            marketplace companies. The corporate path was fine, but I prefer the clarity of owning
            the full stack — decisions, consequences, and the occasional win.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Briefcase className="w-5 h-5" />
          Experience
        </h2>
        <div className="space-y-4">
          {[
            {
              role: 'Co-Founder',
              company: 'SEA Payments (Stealth)',
              period: '2024 — Present',
              description: 'Building digital payment infrastructure for SMEs in Cambodia and Thailand. Product, ops, regulatory, hiring — the full stack.',
              tags: ['Fintech', 'Southeast Asia', 'Startups'],
            },
            {
              role: 'Head of Operations',
              company: 'Regional Marketplace Platform',
              period: '2021 — 2024',
              description: 'Ran ops across 3 countries. Grew supply side 4x, cut unit costs by 40%. Built the remote-first ops team from scratch.',
              tags: ['Operations', 'Remote Teams', 'Marketplaces'],
            },
            {
              role: 'Product Manager',
              company: 'Singapore Fintech',
              period: '2018 — 2021',
              description: 'Led lending product from 0 to $50M annual disbursal. Owned roadmap, pricing, compliance handoffs.',
              tags: ['Product', 'Lending', 'B2B'],
            },
            {
              role: 'Business Analyst → Product Owner',
              company: 'Regional Bank',
              period: '2015 — 2018',
              description: 'Digital transformation team. Shipped mobile banking features, learned how large institutions actually move.',
              tags: ['Banking', 'Digital', 'Enterprise'],
            },
          ].map((job) => (
            <Card key={job.company} className="p-5 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="font-semibold text-foreground">{job.role}</h3>
                <span className="text-xs text-content-muted font-medium">{job.period}</span>
              </div>
              <p className="text-sm text-content-muted font-medium">{job.company}</p>
              <p className="text-sm text-content font-content leading-relaxed">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* What I'm Working On */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Now</h2>
        <Card className="p-5 space-y-3">
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Building</h3>
            <p className="text-sm text-content-muted font-content">
              Fintech product for Cambodian and Thai SMEs. Helping businesses move from cash-only
              to digital-first. Live with first pilot customers.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Exploring</h3>
            <p className="text-sm text-content-muted font-content">
              Nondual awareness through direct looking. Less reading, more seeing what's actually
              here. Occasional meditation retreats when schedule allows.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Location</h3>
            <p className="text-sm text-content-muted font-content">
              Phnom Penh as home base. Bangkok monthly for meetings. Ho Chi Minh City on exploratory
              trips. Siem Reap for quiet writing weeks.
            </p>
          </div>
        </Card>
      </section>

      {/* Interests */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Nondual awareness',
            'Southeast Asian business',
            'Fintech infrastructure',
            'Remote team building',
            'Product design',
            'Meditation retreats',
            'Cambodian history',
            'Thai street food',
            'Clean writing',
            'Slow travel',
          ].map((interest) => (
            <Badge key={interest} variant="outline" className="text-sm px-3 py-1">
              {interest}
            </Badge>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Get in Touch</h2>
        <p className="text-content-muted font-content">
          Best way to reach me is email. I read everything and reply to the thoughtful ones.
          Telegram for quicker exchanges if we've already met.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:sovan@example.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-smooth"
          >
            <Mail className="w-4 h-4" />
            sovan@example.com
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-smooth"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
        <p className="text-xs text-content-muted">
          No recruiters, no agency pitches. If you're building something interesting in Southeast Asia
          or want to talk shop about awareness, I'd love to hear from you.
        </p>
      </section>
    </div>
  );
};

export default Profile;
