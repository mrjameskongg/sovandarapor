import PostCard, { Post } from '@/components/PostCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const samplePosts: Post[] = [
  {
    id: '1',
    title: 'The Illusion of the Separate Self',
    slug: 'illusion-separate-self',
    date: '2024-01-15',
    tldr: 'Direct experience reveals no solid, separate self - just awareness appearing as everything',
    tags: ['nondual', 'awareness', 'self-inquiry'],
    readingTime: 8,
    category: 'essays',
    excerpt: 'What we call "I" is just a collection of thoughts, sensations, and perceptions arising in awareness. There is no separate entity having these experiences...'
  },
  {
    id: '2',
    title: 'Phnom Penh: First 90 Days',
    slug: 'phnom-penh-first-90-days',
    date: '2024-01-10',
    tldr: 'Living costs, visa runs, and finding rhythm in Cambodia\'s capital',
    tags: ['Cambodia', 'expat', 'digital-nomad'],
    readingTime: 5,
    category: 'travel',
    excerpt: 'Rent: $400/month for a decent 1BR in BKK1. Food: $3-8/day eating local. Visa: business visa on arrival, extend monthly...'
  },
  {
    id: '3',
    title: 'Building Remote Teams in SEA',
    slug: 'remote-teams-sea',
    date: '2024-01-08',
    tldr: 'Time zones, cultural bridges, and hiring in Thailand/Cambodia markets',
    tags: ['business', 'remote-work', 'hiring'],
    readingTime: 12,
    category: 'build-log',
    excerpt: 'Southeast Asia offers incredible talent at 1/3 Western costs. Here\'s what I learned building distributed teams across Bangkok and Phnom Penh...'
  },
  {
    id: '4',
    title: 'Awareness Is Already Perfect',
    slug: 'awareness-already-perfect',
    date: '2024-01-05',
    tldr: 'Nothing needs to be added to awareness for it to be complete',
    tags: ['nondual', 'presence'],
    readingTime: 3,
    category: 'notes',
    excerpt: 'The seeking mind looks for completion in experience. But awareness itself lacks nothing. It is already whole, already perfect, already free...'
  },
  {
    id: '5',
    title: 'Bangkok vs Phnom Penh',
    slug: 'bangkok-vs-phnom-penh',
    date: '2024-01-03',
    tldr: 'Cost, infrastructure, and quality of life comparison for digital nomads',
    tags: ['Thailand', 'Cambodia', 'comparison'],
    readingTime: 6,
    category: 'notes',
    excerpt: 'Bangkok: Better infrastructure, higher costs. Phnom Penh: Raw energy, lower costs, fewer tourists. Both have their place...'
  },
  {
    id: '6',
    title: 'Q4 2023: Revenue, Lessons, Plans',
    slug: 'q4-2023-update',
    date: '2023-12-28',
    tldr: 'Hit $15K MRR, expanded to Cambodia, hired 3 engineers',
    tags: ['business', 'revenue', 'growth'],
    readingTime: 7,
    category: 'build-log',
    excerpt: 'Revenue grew 40% this quarter. The Cambodia expansion is working. Key lesson: hire slow, fire fast. Plans for 2024...'
  }
];

const nowUpdate = `Currently in Phnom Penh building a fintech product for SMEs. 
Exploring nondual awareness through direct investigation.
Next: Bangkok for 2 weeks, then back to Cambodia.`;

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            Notes from the road: business, travel, and nondual seeing
          </h1>
          <p className="text-lg text-content-muted font-content">
            James (Phnom Penh ↔ Bangkok). Building new ventures in Cambodia/Thailand. 
            I like clean processes, clear thinking, and quiet discipline. 
            This site is where I think in public.
          </p>
        </div>
      </div>

      {/* Now Section */}
      <Card className="p-6 bg-gradient-subtle border-gold/20">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="bg-gold/10 text-gold">Now</Badge>
          <span className="text-xs text-content-muted">Updated Jan 15, 2024</span>
        </div>
        <div className="prose prose-sm">
          <p className="text-content font-content m-0 leading-relaxed">
            {nowUpdate}
          </p>
        </div>
      </Card>

      {/* Latest Posts */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-foreground">Latest</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {samplePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;