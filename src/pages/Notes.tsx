import PostCard, { Post } from '@/components/PostCard';
import Seo from '@/components/Seo';

const notePosts: Post[] = [
  {
    id: '1',
    title: 'Awareness Is Already Perfect',
    slug: 'awareness-already-perfect',
    date: '2024-01-15',
    tldr: 'Nothing needs to be added to awareness for it to be complete',
    tags: ['nondual', 'presence'],
    readingTime: 3,
    category: 'notes',
    excerpt: 'The seeking mind looks for completion in experience. But awareness itself lacks nothing. It is already whole, already perfect, already free. The search for enlightenment is the veil over what is already present.'
  },
  {
    id: '2',
    title: 'Bangkok vs Phnom Penh for Digital Nomads',
    slug: 'bangkok-vs-phnom-penh',
    date: '2024-01-12',
    tldr: 'Cost, infrastructure, and quality of life comparison',
    tags: ['Thailand', 'Cambodia', 'comparison', 'digital-nomad'],
    readingTime: 4,
    category: 'notes',
    excerpt: 'Bangkok: $1200/month, excellent infrastructure, great food scene. Phnom Penh: $600/month, improving rapidly, fewer tourists. Both cities have their advantages depending on what you prioritize.'
  },
  {
    id: '3',
    title: 'Hiring Engineers in Southeast Asia',
    slug: 'hiring-engineers-sea',
    date: '2024-01-10',
    tldr: 'Salary ranges, platforms, and red flags when building tech teams',
    tags: ['business', 'hiring', 'tech'],
    readingTime: 5,
    category: 'notes',
    excerpt: 'Senior developers: $2-4K/month in Bangkok, $1-2.5K in Phnom Penh. Use TopDev (Thailand) and Slash (Cambodia). Always do technical interviews, even for senior roles. Cultural fit matters more than you think.'
  },
  {
    id: '4',
    title: 'The Witness Is Not Separate',
    slug: 'witness-not-separate',
    date: '2024-01-08',
    tldr: 'Even the observer is just another appearance in awareness',
    tags: ['nondual', 'witness'],
    readingTime: 2,
    category: 'notes',
    excerpt: 'First you notice you are the witness of thoughts and experiences. Then you notice the witness itself is witnessed. What witnesses the witness? The question dissolves when you see there was never a separate witness at all.'
  },
  {
    id: '5',
    title: 'Visa Strategies for Thailand/Cambodia',
    slug: 'visa-strategies-th-kh',
    date: '2024-01-05',
    tldr: 'Legal ways to stay long-term in both countries',
    tags: ['visa', 'Thailand', 'Cambodia', 'expat'],
    readingTime: 6,
    category: 'notes',
    excerpt: 'Thailand: DTV visa for remote workers ($400, 5 years). Cambodia: Business visa ($35/month extensions). Both allow multiple entries. Always use official channels and keep all paperwork.'
  },
  {
    id: '6',
    title: 'Present Moment Awareness',
    slug: 'present-moment-awareness',
    date: '2024-01-03',
    tldr: 'The present moment is not a slice of time but timeless presence',
    tags: ['nondual', 'presence', 'time'],
    readingTime: 3,
    category: 'notes',
    excerpt: 'The present moment is not between the past and future. It is the timeless background in which the appearance of time arises. Past and future are present experiences - memories and anticipations happening now.'
  }
];

const Notes = () => {
  return (
    <div className="space-y-8">
      <Seo
        title="Notes — Sovandarapor (James) Kong"
        description="Short takes on nondual awareness, hiring engineers in Southeast Asia, and life between Bangkok and Phnom Penh."
      />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Notes</h1>
        <p className="text-content-muted font-content text-lg leading-relaxed">
          Short takes, quick insights, and practical observations. 
          Unpolished thoughts on everything from nondual awareness 
          to building startups in Southeast Asia.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {notePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Notes;