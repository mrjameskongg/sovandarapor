
## 1. Reusable image optimization helper

**New file: `src/lib/imageUpload.ts`**

- Install `browser-image-compression`.
- Export `optimizeImage(file)`:
  - If `file.size < 200 * 1024` → return original, no stats.
  - Detect transparency: if MIME is `image/png`, decode via canvas and scan alpha channel; if any pixel alpha < 255, keep PNG output, otherwise convert to JPG.
  - Compress with `browser-image-compression`: `maxWidthOrHeight: 1600`, `initialQuality: 0.8`, `fileType: 'image/jpeg'` or `'image/png'`, `useWebWorker: true`.
  - Return `{ file, originalSize, optimizedSize, skipped }`.
- Export `uploadToPostImages(file, folder)`:
  - Calls `optimizeImage`, uploads to `post-images` bucket at `${folder}/${crypto.randomUUID()}.${ext}`, returns `{ publicUrl, stats }`.
- Helper `formatSize(bytes)` returning `"1.2 MB"` / `"340 KB"`.

**Wire into existing upload sites** (replace inline `supabase.storage.from('post-images').upload` calls):

- `src/pages/admin/PostEditor.tsx` — featured image + gallery image uploads. Below each upload area, render a small `text-[11px] text-content-muted` line: `Original: X → Optimized: Y` (only when not skipped). Track per-upload stats in local state.
- `src/components/RichEditor.tsx` — inline image uploads inside posts (same bucket).
- New venture upload (see §2) also uses the helper.

## 2. Cambodia ventures: photo cards + admin manager

### Schema change (migration)

Add a `venture_images jsonb` column to `site_settings` with a default of `'{}'::jsonb`. No RLS changes needed (existing policies already cover the column).

### `src/lib/siteSettings.ts`

- Extend `fetchSettings`/`saveSettings` to include `venture_images: Record<string, string>`.
- Export a constant `VENTURES` (single source of truth used by both Cambodia page and admin):
  ```ts
  export const VENTURES = [
    { slug: 'princess-jenna', name: 'Princess Jenna Norodom', category: 'Media & Talent', role: 'Personal Manager', desc: '...' },
    { slug: 'brm-agro',       name: 'BRM Agro',               category: 'Rice',           role: 'Brand Strategy',  desc: '...' },
    { slug: 'moo-moo',        name: 'Moo Moo Farms',          category: 'Dairy',          role: 'Group Operations',desc: '...' },
    { slug: 'seekers',        name: 'Seekers Group',          category: 'Spirits & Hospitality', role: 'Brand & Storytelling', desc: '...' },
  ] as const;
  ```
- `SiteSettingsLoader` exposes `venture_images` via a small in-memory store + `getVentureImages()`, or pages re-fetch — the Cambodia page will fetch directly from Supabase to keep it simple.

### `src/pages/CountryPage.tsx`

- Remove Lucide icon imports and the `cambodiaVentures` local array. Import `VENTURES` from `siteSettings`.
- On mount (when `country === 'cambodia'`), fetch `venture_images` from `site_settings`.
- Render each card as: photo on top (`aspect-[4/3] object-cover`, wrapped in `overflow-hidden rounded-sm`, `transition-transform duration-700 group-hover:scale-105`), then existing label row, name (Cormorant), description (Source Serif). Keep the `grid md:grid-cols-2 gap-px bg-border` divider treatment, with `bg-background p-8 md:p-10` inner.
- Placeholder when no URL: `<div class="aspect-[4/3] bg-muted flex items-center justify-center"><span class="font-display text-content-muted text-2xl">{name}</span></div>`.
- Keep the "Read more" link to the category route and the existing typography.

### `src/pages/admin/Settings.tsx`

- New section "Ventures" below Categories.
- For each entry in `VENTURES`: thumbnail (current image or placeholder), venture name, an "Upload photo" / "Replace" button, and an inline `text-[11px] text-content-muted` stats line after upload.
- Uses `uploadToPostImages(file, 'ventures')` from the new helper.
- Updates `venture_images[slug]` in local state and persists via `saveSettings({ venture_images })` on Save (or immediately after upload — see Open question).

## Files

- New: `src/lib/imageUpload.ts`
- Edited: `src/pages/admin/PostEditor.tsx`, `src/components/RichEditor.tsx`, `src/pages/CountryPage.tsx`, `src/pages/admin/Settings.tsx`, `src/lib/siteSettings.ts`
- Migration: add `venture_images jsonb` to `site_settings`
- `package.json`: add `browser-image-compression`

## Open question

Should venture photo uploads save immediately when chosen, or only when the global "Save settings" button is pressed (matching how fonts/categories work today)? Default plan: persist immediately on upload so the photo is live without an extra click, while still letting the Save button cover any other edits.
