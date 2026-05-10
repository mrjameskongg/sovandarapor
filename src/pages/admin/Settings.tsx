import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X, Pencil, Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  applyFonts, fetchSettings, saveSettings,
  FONT_OPTIONS, DEFAULT_FONTS, VENTURES, type SiteFonts, type VentureImages,
} from '@/lib/siteSettings';
import { DEFAULT_CATEGORIES, setCategories } from '@/lib/blog';
import { uploadToPostImages, statsLine } from '@/lib/imageUpload';

export default function AdminSettings() {
  const [fonts, setFonts] = useState<SiteFonts>(DEFAULT_FONTS);
  const [categories, setCats] = useState<string[]>([...DEFAULT_CATEGORIES]);
  const [newCat, setNewCat] = useState('');
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editVal, setEditVal] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings().then(s => {
      if (s?.fonts) setFonts({ ...DEFAULT_FONTS, ...s.fonts });
      if (s?.categories?.length) setCats(s.categories);
      setLoading(false);
    });
  }, []);

  const updateFont = (k: keyof SiteFonts, v: string) => {
    const next = { ...fonts, [k]: v };
    setFonts(next);
    applyFonts(next); // live preview
  };

  const onSave = async () => {
    setSaving(true);
    try {
      await saveSettings({ fonts, categories });
      setCategories(categories);
      applyFonts(fonts);
      toast({ title: 'Settings saved' });
    } catch (e: any) {
      toast({ title: 'Save failed', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const addCat = () => {
    const v = newCat.trim();
    if (!v) return;
    if (categories.includes(v)) return toast({ title: 'Already exists', variant: 'destructive' });
    setCats([...categories, v]);
    setNewCat('');
  };

  const removeCat = (i: number) => setCats(categories.filter((_, idx) => idx !== i));
  const startEdit = (i: number) => { setEditIdx(i); setEditVal(categories[i]); };
  const commitEdit = () => {
    if (editIdx === null) return;
    const v = editVal.trim();
    if (!v) return;
    setCats(categories.map((c, i) => i === editIdx ? v : c));
    setEditIdx(null);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-content-muted">Loading…</div>;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 z-20 bg-background/90 backdrop-blur">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2 text-sm text-content-muted hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <Button size="sm" onClick={onSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />Save settings
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-10 py-12 space-y-16">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Site</p>
          <h1 className="font-display text-4xl text-foreground">Settings</h1>
        </div>

        {/* FONTS */}
        <section className="space-y-6">
          <div className="border-b border-border pb-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Typography</p>
            <h2 className="font-display text-2xl text-foreground mt-1">Fonts</h2>
            <p className="text-sm text-content-muted mt-2">Changes preview live. Click Save to make permanent.</p>
          </div>

          {(['display', 'content', 'ui'] as const).map(role => (
            <div key={role} className="grid md:grid-cols-3 gap-4 items-center">
              <Label className="capitalize">{role} font</Label>
              <select
                value={fonts[role]}
                onChange={e => updateFont(role, e.target.value)}
                className="md:col-span-2 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {FONT_OPTIONS[role].map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
          ))}

          <div className="border border-border p-6 mt-4 space-y-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-content-muted">Preview</p>
            <p className="font-display text-3xl text-foreground">The quiet work of making things.</p>
            <p className="font-content text-content text-base">A printed Cambodian field notebook by way of Apartamento and The Gentlewoman.</p>
            <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-content-muted">Index, Profile, Journal, Contact</p>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="space-y-5">
          <div className="border-b border-border pb-3">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">Taxonomy</p>
            <h2 className="font-display text-2xl text-foreground mt-1">Categories</h2>
          </div>

          <div className="border border-border divide-y divide-border">
            {categories.map((c, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2">
                {editIdx === i ? (
                  <>
                    <Input value={editVal} onChange={e => setEditVal(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && commitEdit()}
                      className="h-8 flex-1" />
                    <button onClick={commitEdit} className="p-1 hover:bg-accent rounded"><Check className="w-4 h-4" /></button>
                    <button onClick={() => setEditIdx(null)} className="p-1 hover:bg-accent rounded"><X className="w-4 h-4" /></button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 font-content">{c}</span>
                    <button onClick={() => startEdit(i)} className="p-1 hover:bg-accent rounded text-content-muted hover:text-foreground"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => removeCat(i)} className="p-1 hover:bg-accent rounded text-content-muted hover:text-destructive"><X className="w-4 h-4" /></button>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input value={newCat} onChange={e => setNewCat(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCat()}
              placeholder="New category name" />
            <Button variant="outline" onClick={addCat}><Plus className="w-4 h-4 mr-1" />Add</Button>
          </div>
          <p className="text-xs text-content-muted">Removing a category does not affect existing posts already filed under it.</p>
        </section>
      </main>
    </div>
  );
}
