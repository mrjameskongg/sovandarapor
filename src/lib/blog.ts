import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const DEFAULT_CATEGORIES = [
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

// Backwards-compatible export (now mutable, hydrated from DB at boot)
export let CATEGORIES: string[] = [...DEFAULT_CATEGORIES];

export type Category = string;

export const COUNTRIES = [
  { value: 'cambodia', label: 'Cambodia' },
  { value: 'thailand', label: 'Thailand' },
  { value: 'vietnam',  label: 'Vietnam'  },
  { value: 'france',   label: 'France'   },
] as const;
export type CountryValue = typeof COUNTRIES[number]['value'];

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

export const setCategories = (next: string[]) => { CATEGORIES = next; };

// Hook to read the live categories list from site_settings.
export function useCategories() {
  const [cats, setCats] = useState<string[]>(CATEGORIES);
  useEffect(() => {
    supabase.from('site_settings' as any).select('categories').limit(1).maybeSingle()
      .then(({ data }: any) => {
        if (data?.categories?.length) {
          setCategories(data.categories);
          setCats(data.categories);
        }
      });
  }, []);
  return cats;
}
