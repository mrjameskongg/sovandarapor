import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RichEditor } from '@/components/RichEditor';
import { useCategories, slugify, COUNTRIES, type CountryValue, DEFAULT_CATEGORIES } from '@/lib/blog';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Eye, Save, Send, Upload, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface PostForm {
  title: string; subtitle: string; slug: string; category: string;
  tags: string; featured_image_url: string; featured_image_size: number | null;
  content_html: string;
  gallery_urls: string[]; seo_title: string; seo_description: string;
  status: 'draft' | 'published'; published_at: string | null; author_name: string;
  country: CountryValue | '';
}

const empty: PostForm = {
  title: '', subtitle: '', slug: '', category: DEFAULT_CATEGORIES[0], tags: '',
  featured_image_url: '', featured_image_size: null, content_html: '', gallery_urls: [],
  seo_title: '', seo_description: '', status: 'draft', published_at: null, author_name: 'James',
  country: '',
};

export default function PostEditor() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();
  const isNew = !id || id === 'new';
  const [form, setForm] = useState<PostForm>(empty);
  const categories = useCategories();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);
  const featRef = useRef<HTMLInputElement>(null);
  const galRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNew) return;
    supabase.from('posts').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error) { toast({ title: 'Load failed', description: error.message, variant: 'destructive' }); return; }
      if (data) setForm({
        title: data.title, subtitle: data.subtitle || '', slug: data.slug,
        category: data.category, tags: (data.tags || []).join(', '),
        featured_image_url: data.featured_image_url || '', featured_image_size: null,
        content_html: data.content_html || '',
        gallery_urls: data.gallery_urls || [], seo_title: data.seo_title || '',
        seo_description: data.seo_description || '', status: data.status as any,
        published_at: data.published_at, author_name: data.author_name || 'James',
        country: ((data as any).country as CountryValue) || '',
      });
      setSlugTouched(true);
      setLoading(false);
    });
  }, [id, isNew]);

  const update = (k: keyof PostForm, v: any) => setForm(f => ({
    ...f, [k]: v,
    ...(k === 'title' && !slugTouched ? { slug: slugify(v) } : {}),
  }));

  const uploadImage = async (file: File, folder = 'featured'): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const path = `${folder}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('post-images').upload(path, file);
    if (error) { toast({ title: 'Upload failed', description: error.message, variant: 'destructive' }); return null; }
    return supabase.storage.from('post-images').getPublicUrl(path).data.publicUrl;
  };

  const onFeat = async (f: File) => {
    const url = await uploadImage(f, 'featured');
    if (url) setForm(s => ({ ...s, featured_image_url: url, featured_image_size: f.size }));
  };
  const onGallery = async (files: FileList) => {
    const urls: string[] = [];
    for (const f of Array.from(files)) {
      const u = await uploadImage(f, 'gallery');
      if (u) urls.push(u);
    }
    setForm(s => ({ ...s, gallery_urls: [...s.gallery_urls, ...urls] }));
  };

  const save = async (status?: 'draft' | 'published') => {
    if (!form.title.trim()) return toast({ title: 'Title required', variant: 'destructive' });
    if (!form.slug.trim()) return toast({ title: 'Slug required', variant: 'destructive' });
    setSaving(true);
    const finalStatus = status || form.status;
    const payload = {
      title: form.title, subtitle: form.subtitle || null, slug: form.slug,
      category: form.category, tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      featured_image_url: form.featured_image_url || null, content_html: form.content_html,
      gallery_urls: form.gallery_urls, seo_title: form.seo_title || null,
      seo_description: form.seo_description || null, status: finalStatus,
      author_name: form.author_name, author_id: user?.id || null,
      country: form.country || null,
      published_at: finalStatus === 'published' ? (form.published_at || new Date().toISOString()) : form.published_at,
    } as any;
    const op = isNew
      ? supabase.from('posts').insert(payload).select('id').single()
      : supabase.from('posts').update(payload).eq('id', id!).select('id').single();
    const { data, error } = await op;
    setSaving(false);
    if (error) return toast({ title: 'Save failed', description: error.message, variant: 'destructive' });
    toast({ title: finalStatus === 'published' ? 'Published' : 'Saved as draft' });
    if (isNew && data) nav(`/admin/posts/${data.id}`, { replace: true });
    else setForm(s => ({ ...s, status: finalStatus, published_at: payload.published_at }));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-content-muted">Loading…</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-20 bg-background/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-3">
          <Link to="/admin" className="flex items-center gap-2 text-sm text-content-muted hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPreview(p => !p)}>
              <Eye className="w-4 h-4 mr-2" />{preview ? 'Edit' : 'Preview'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => save('draft')} disabled={saving}>
              <Save className="w-4 h-4 mr-2" />Save draft
            </Button>
            <Button size="sm" onClick={() => save('published')} disabled={saving}>
              <Send className="w-4 h-4 mr-2" />{form.status === 'published' ? 'Update' : 'Publish'}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-10 py-10">
        {preview ? (
          <article className="prose max-w-none">
            {form.featured_image_url && <img src={form.featured_image_url} alt="" className="w-full aspect-[16/9] object-cover rounded-sm mb-8" />}
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{form.category}</p>
            <h1 className="font-display text-5xl text-foreground mt-3">{form.title}</h1>
            {form.subtitle && <p className="font-content text-2xl text-content-muted mt-3">{form.subtitle}</p>}
            <div className="hairline my-8" />
            <div dangerouslySetInnerHTML={{ __html: form.content_html }} />
          </article>
        ) : (
          <div className="space-y-8">
            <div>
              <Label>Title</Label>
              <Input value={form.title} onChange={e => update('title', e.target.value)} placeholder="Your post title" className="mt-2 text-xl font-display" />
            </div>

            <div>
              <Label>Subtitle</Label>
              <Input value={form.subtitle} onChange={e => update('subtitle', e.target.value)} placeholder="Short description" className="mt-2" />
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={e => { setSlugTouched(true); update('slug', slugify(e.target.value)); }} className="mt-2 font-mono text-sm" />
                <p className="text-xs text-content-muted mt-1">/blog/{form.slug || '...'}</p>
              </div>
              <div>
                <Label>Category</Label>
                <select value={form.category} onChange={e => update('category', e.target.value)}
                  className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <Label>Country</Label>
                <select value={form.country} onChange={e => update('country', e.target.value as CountryValue | '')}
                  className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option value="">None</option>
                  {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input value={form.tags} onChange={e => update('tags', e.target.value)} placeholder="cambodia, branding, agriculture" className="mt-2" />
              </div>
              <div>
                <Label>Author</Label>
                <Input value={form.author_name} onChange={e => update('author_name', e.target.value)} className="mt-2" />
              </div>
            </div>

            <div>
              <Label>Featured image</Label>
              {form.featured_image_url ? (
                <div className="mt-2 w-full max-w-md space-y-2">
                  <div className="relative">
                    <img src={form.featured_image_url} alt="" className="w-full aspect-[16/9] object-cover rounded-sm border border-border" />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button type="button" onClick={() => featRef.current?.click()}
                        title="Replace"
                        className="bg-background/90 border border-border rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.2em] hover:bg-foreground hover:text-background">
                        Replace
                      </button>
                      <button type="button" onClick={() => setForm(s => ({ ...s, featured_image_url: '', featured_image_size: null }))}
                        title="Remove"
                        className="bg-background/90 border border-border rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {form.featured_image_size != null && (
                    <p className="text-xs text-content-muted tabular">
                      {(form.featured_image_size / 1024).toFixed(1)} KB
                    </p>
                  )}
                </div>
              ) : (
                <button onClick={() => featRef.current?.click()} className="mt-2 border-2 border-dashed border-border rounded-sm p-10 w-full max-w-md text-center hover:border-gold hover:text-gold transition-colors text-content-muted">
                  <Upload className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm">Click to upload featured image</span>
                </button>
              )}
              <input ref={featRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && onFeat(e.target.files[0])} />
            </div>

            <div>
              <Label>Content</Label>
              <div className="mt-2">
                <RichEditor value={form.content_html} onChange={html => update('content_html', html)} />
              </div>
            </div>

            <div>
              <Label>Image gallery (optional)</Label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                {form.gallery_urls.map(u => (
                  <div key={u} className="relative">
                    <img src={u} alt="" className="aspect-square object-cover rounded-sm border border-border" />
                    <button onClick={() => setForm(s => ({ ...s, gallery_urls: s.gallery_urls.filter(x => x !== u) }))}
                      className="absolute top-1 right-1 bg-background/90 rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button onClick={() => galRef.current?.click()} className="aspect-square border-2 border-dashed border-border rounded-sm flex items-center justify-center text-content-muted hover:border-gold hover:text-gold">
                  <Upload className="w-5 h-5" />
                </button>
              </div>
              <input ref={galRef} type="file" accept="image/*" multiple className="hidden" onChange={e => e.target.files && onGallery(e.target.files)} />
            </div>

            <div className="border-t border-border pt-8 space-y-5">
              <p className="text-[11px] uppercase tracking-[0.3em] text-gold">SEO</p>
              <div>
                <Label>SEO title</Label>
                <Input value={form.seo_title} onChange={e => update('seo_title', e.target.value)} placeholder="Defaults to post title" className="mt-2" />
              </div>
              <div>
                <Label>SEO description (under 160 chars)</Label>
                <Textarea value={form.seo_description} onChange={e => update('seo_description', e.target.value)} maxLength={160} className="mt-2" />
                <p className="text-xs text-content-muted mt-1">{form.seo_description.length}/160</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
