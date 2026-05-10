import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight } from 'lucide-react';

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  tldr: string;
  tags: string[];
  readingTime: number;
  category: 'essays' | 'notes' | 'travel' | 'build-log';
  excerpt?: string;
}

interface PostCardProps {
  post: Post;
  index?: number;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const PostCard = ({ post, index }: PostCardProps) => {
  return (
    <article className="group relative">
      <Link to={`/${post.category}/${post.slug}`} className="block">
        <div className="flex flex-col h-full pt-6">
          <div className="hairline mb-6" />
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-content-muted mb-5">
            <span className="flex items-center gap-3">
              {typeof index === 'number' && (
                <span className="tabular text-foreground/60">{String(index).padStart(2, '0')}</span>
              )}
              <span className="text-gold">{post.category.replace('-', ' ')}</span>
            </span>
            <span className="flex items-center gap-3 tabular">
              <span>{formatDate(post.date)}</span>
              <span className="opacity-40">/</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readingTime}m</span>
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-medium leading-[1.15] text-foreground group-hover:text-gold transition-smooth">
            {post.title}
          </h3>

          <p className="text-content-muted font-content text-base leading-relaxed mt-4 line-clamp-3">
            {post.excerpt || post.tldr}
          </p>

          <div className="flex items-center justify-between mt-6">
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-content-muted">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            <ArrowUpRight className="w-4 h-4 text-content-muted group-hover:text-gold group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
