import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, MapPin, Building, Heart, Code } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-3xl space-y-8">
      {/* Main Bio */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">About</h1>
          <p className="text-lg text-content-muted font-content leading-relaxed">
            James (Phnom Penh ↔ Bangkok). Building new ventures in Cambodia/Thailand. 
            I like clean processes, clear thinking, and quiet discipline. 
            This site is where I think in public.
          </p>
        </div>

        <div className="prose prose-lg">
          <p className="text-content font-content leading-relaxed mb-6">
            Currently building a fintech product for small businesses across Southeast Asia. 
            Based primarily in Phnom Penh with regular trips to Bangkok, Ho Chi Minh City, 
            and wherever the work takes me.
          </p>
          
          <p className="text-content font-content leading-relaxed mb-6">
            Before this, I spent years in traditional tech roles - product management at scale-ups, 
            engineering at startups, consulting for enterprises. The work was good but something 
            was missing. Moving to Southeast Asia changed everything. The energy here is different. 
            People are building the future rather than optimizing the past.
          </p>

          <p className="text-content font-content leading-relaxed">
            This site is an experiment in thinking out loud. Notes on nondual awareness, 
            practical business building, travel logistics, and whatever else seems worth sharing. 
            No grand theories, just direct experience and honest reflection.
          </p>
        </div>
      </div>

      {/* Current Focus */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Building className="w-5 h-5" />
          Current Focus
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">Business</h3>
            <p className="text-content-muted text-sm font-content">
              Building payment infrastructure for SMEs in Cambodia and Thailand. 
              Helping businesses go from cash-only to digital-first operations.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Exploration</h3>
            <p className="text-content-muted text-sm font-content">
              Investigating the nature of awareness through direct experience. 
              Less reading about nonduality, more seeing what's actually here.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Location</h3>
            <p className="text-content-muted text-sm font-content flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Phnom Penh (primary) • Bangkok (monthly) • Ho Chi Minh City (exploring)
            </p>
          </div>
        </div>
      </Card>

      {/* Interests */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Interests
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            'Nondual awareness',
            'Southeast Asia business',
            'Clean code',
            'Minimalist design',
            'Direct experience',
            'Remote teams',
            'Fintech infrastructure',
            'Digital nomad life',
            'Meditation retreats',
            'Local food scenes'
          ].map((interest) => (
            <Badge key={interest} variant="secondary" className="text-sm">
              {interest}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Code className="w-5 h-5" />
          Tech Stack
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-foreground mb-2">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'TypeScript', 'PostgreSQL', 'Redis'].map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'Tailwind', 'Framer Motion'].map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Infrastructure</h3>
            <div className="flex flex-wrap gap-2">
              {['AWS', 'Docker', 'GitHub Actions', 'Vercel'].map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {['Linear', 'Figma', 'Cursor', 'Obsidian'].map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Contact */}
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Get in Touch</h2>
        <p className="text-content-muted font-content">
          Best way to reach me is email. I respond to everything thoughtful, 
          usually within 24 hours. Also available on Telegram for quicker exchanges.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="default" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            james@[domain].com
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            @james_sea_builds
          </Button>
        </div>
        <p className="text-xs text-content-muted">
          No cold outreach, please. But if you're building something interesting in SEA 
          or have genuine questions about nondual awareness, I'd love to hear from you.
        </p>
      </Card>
    </div>
  );
};

export default About;