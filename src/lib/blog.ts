export const CATEGORIES = [
  'Personal Philosophy',
  'Cambodia',
  'Business',
  'Brand Building',
  'Agriculture',
  'Dairy',
  'Rice',
  'Spirits & Hospitality',
  'Media & Talent',
  'Design & Marketing',
] as const;

export type Category = typeof CATEGORIES[number];

export const slugify = (s: string) =>
  s.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);

export const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

export const categorySlug = (c: string) => c.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
export const categoryFromSlug = (slug: string) =>
  CATEGORIES.find((c) => categorySlug(c) === slug);
