import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';

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
}

const PostCard = ({ post }: PostCardProps) => {
  const categoryColors = {
    essays: 'bg-gold/10 text-gold',
    notes: 'bg-slate/10 text-slate',
    travel: 'bg-primary/10 text-primary',
    'build-log': 'bg-muted-foreground/10 text-muted-foreground'
  };

  return (
    <article className="group">
      <Link to={`/${post.category}/${post.slug}`} className="block">
        <div className="border border-border rounded-lg p-6 hover:shadow-card transition-smooth bg-card">
          <div className="flex items-start justify-between mb-3">
            <Badge variant="secondary" className={categoryColors[post.category]}>
              {post.category.replace('-', ' ')}
            </Badge>
            <div className="flex items-center text-xs text-content-muted gap-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime}m
              </div>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-gold transition-smooth">
            {post.title}
          </h3>
          
          <p className="text-content-muted text-sm font-medium mb-3 italic">
            TL;DR: {post.tldr}
          </p>
          
          {post.excerpt && (
            <p className="text-content font-content text-sm leading-relaxed mb-4">
              {post.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default PostCard;