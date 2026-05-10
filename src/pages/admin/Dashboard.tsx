import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, ExternalLink, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/blog';

interface Row {
  id: string; title: string; slug: string; status: string; category: string;
  published_at: string | null; updated_at: string;
}

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('posts')
      .select('id,title,slug,status,category,published_at,updated_at')
      .order('updated_at', { ascending: false });
    if (error) toast({ title: 'Load failed', description: error.message, variant: 'destructive' });
    setRows((data as Row[]) || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const del = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (error) return toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    toast({ title: 'Deleted' });
    load();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <Link to="/admin" className="font-display text-xl text-foreground">Editor</Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs uppercase tracking-[0.2em] text-content-muted hover:text-foreground">View site</Link>
            <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">All posts</p>
            <h1 className="font-display text-4xl text-foreground">Blog</h1>
          </div>
          <Link to="/admin/posts/new">
            <Button><Plus className="w-4 h-4 mr-2" />New post</Button>
          </Link>
        </div>

        {loading ? <div className="text-content-muted">Loading…</div> : rows.length === 0 ? (
          <div className="border border-dashed border-border rounded-sm p-16 text-center">
            <p className="text-content-muted mb-4">No posts yet.</p>
            <Link to="/admin/posts/new"><Button>Write your first post</Button></Link>
          </div>
        ) : (
          <div className="border border-border rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-[11px] uppercase tracking-[0.2em] text-content-muted">
                <tr>
                  <th className="text-left px-4 py-3">Title</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Updated</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.id} className="border-t border-border hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium text-foreground">{r.title}</td>
                    <td className="px-4 py-3 text-content-muted hidden md:table-cell">{r.category}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm ${r.status === 'published' ? 'bg-gold/15 text-gold' : 'bg-muted text-content-muted'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-content-muted text-xs hidden md:table-cell">{formatDate(r.updated_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        {r.status === 'published' && (
                          <Link to={`/blog/${r.slug}`} target="_blank" className="p-2 hover:bg-accent rounded" title="View">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        )}
                        <Link to={`/admin/posts/${r.id}`} className="p-2 hover:bg-accent rounded" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => del(r.id, r.title)} className="p-2 hover:bg-accent rounded text-destructive" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
