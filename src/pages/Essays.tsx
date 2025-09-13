import PostCard, { Post } from '@/components/PostCard';

const essayPosts: Post[] = [
  {
    id: '1',
    title: 'The Illusion of the Separate Self',
    slug: 'illusion-separate-self',
    date: '2024-01-15',
    tldr: 'Direct experience reveals no solid, separate self - just awareness appearing as everything',
    tags: ['nondual', 'awareness', 'self-inquiry'],
    readingTime: 8,
    category: 'essays',
    excerpt: 'What we call "I" is just a collection of thoughts, sensations, and perceptions arising in awareness. There is no separate entity having these experiences. Through careful investigation, we can see that the self is more like a process than a thing - a continuous flow of experiences without a central experiencer.'
  },
  {
    id: '2',
    title: 'Building in Public: Lessons from Southeast Asia',
    slug: 'building-public-sea',
    date: '2024-01-12',
    tldr: 'Transparency, community, and growth while building startups across Thailand and Cambodia',
    tags: ['business', 'transparency', 'community'],
    readingTime: 10,
    category: 'essays',
    excerpt: 'Building in public means sharing your journey - the wins, failures, and everything in between. In Southeast Asia\'s startup ecosystem, this transparency creates unexpected opportunities and authentic connections that traditional business development never could.'
  },
  {
    id: '3',
    title: 'The Practice of Not-Knowing',
    slug: 'practice-not-knowing',
    date: '2024-01-08',
    tldr: 'How embracing uncertainty leads to deeper understanding and creative breakthroughs',
    tags: ['nondual', 'creativity', 'uncertainty'],
    readingTime: 6,
    category: 'essays',
    excerpt: 'The mind\'s need to know, to categorize, to make sense of everything, often blocks deeper seeing. What happens when we rest in not-knowing? When we allow questions to remain unanswered? A different kind of intelligence emerges - one that works with uncertainty rather than against it.'
  }
];

const Essays = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Essays</h1>
        <p className="text-content-muted font-content text-lg leading-relaxed">
          Long-form explorations of nondual awareness, building businesses, 
          and navigating life between Bangkok and Phnom Penh. 
          Each piece is an attempt to think clearly about what matters.
        </p>
      </div>

      <div className="grid gap-8">
        {essayPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Essays;