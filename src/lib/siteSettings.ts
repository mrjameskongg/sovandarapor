import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { setCategories, DEFAULT_CATEGORIES } from '@/lib/blog';

export interface SiteFonts {
  display: string;
  content: string;
  ui: string;
}

export const DEFAULT_FONTS: SiteFonts = {
  display: 'Cormorant Garamond',
  content: 'Source Serif Pro',
  ui: 'Inter',
};

export const FONT_OPTIONS = {
  display: ['Cormorant Garamond', 'Spectral', 'Playfair Display', 'EB Garamond', 'Fraunces', 'Cardo'],
  content: ['Source Serif Pro', 'Lora', 'Crimson Pro', 'Merriweather', 'Spectral', 'Vollkorn'],
  ui:      ['Inter', 'IBM Plex Sans', 'Work Sans', 'Manrope', 'DM Sans'],
} as const;

export interface Venture {
  slug: string;
  name: string;
  category: string;
  role: string;
  desc: string;
}

export const VENTURES: Venture[] = [
  { slug: 'princess-jenna', name: 'Princess Jenna Norodom', category: 'Media & Talent',         role: 'Personal Manager',     desc: 'Managing public presence, partnerships, and content strategy for Princess Jenna Norodom.' },
  { slug: 'brm-agro',       name: 'BRM Agro',               category: 'Rice',                   role: 'Brand Strategy',       desc: 'Building a premium rice brand for export, from origin story to packaging to international buyers.' },
  { slug: 'moo-moo',        name: 'Moo Moo Farms',          category: 'Dairy',                  role: 'Group Operations',     desc: 'Turnaround work on a Cambodian dairy operation. Supply, distribution, and a new web presence.' },
  { slug: 'seekers',        name: 'Seekers Group',          category: 'Spirits & Hospitality',  role: 'Brand & Storytelling', desc: 'Spirits and hospitality concepts grounded in Cambodian terroir and craft.' },
];

export type VentureImages = Record<string, string>;

const FONT_LINK_ID = 'site-fonts-link';

export function applyFonts(fonts: SiteFonts) {
  const families = [
    `${fonts.display.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400`,
    `${fonts.content.replace(/ /g, '+')}:ital,wght@0,300;0,400;0,500;0,600;1,400`,
    `${fonts.ui.replace(/ /g, '+')}:wght@400;500;600`,
  ];
  const href = `https://fonts.googleapis.com/css2?${families.map(f => `family=${f}`).join('&')}&display=swap`;

  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = href;

  const root = document.documentElement;
  root.style.setProperty('--font-display', `'${fonts.display}', 'Cormorant Garamond', Georgia, serif`);
  root.style.setProperty('--font-content', `'${fonts.content}', Georgia, serif`);
  root.style.setProperty('--font-ui',      `'${fonts.ui}', system-ui, sans-serif`);
}

export function SiteSettingsLoader() {
  useEffect(() => {
    applyFonts(DEFAULT_FONTS);
    supabase.from('site_settings' as any).select('fonts,categories').limit(1).maybeSingle()
      .then(({ data }: any) => {
        if (data?.fonts) applyFonts({ ...DEFAULT_FONTS, ...data.fonts });
        if (data?.categories?.length) setCategories(data.categories);
      });
  }, []);
  return null;
}

// Used by Settings page
export async function fetchSettings() {
  const { data } = await supabase.from('site_settings' as any).select('*').limit(1).maybeSingle();
  return data as any;
}

export async function saveSettings(patch: { fonts?: SiteFonts; categories?: string[]; venture_images?: VentureImages }) {
  const existing = await fetchSettings();
  if (!existing) {
    const { error } = await supabase.from('site_settings' as any).insert({
      fonts: patch.fonts ?? DEFAULT_FONTS,
      categories: patch.categories ?? [...DEFAULT_CATEGORIES],
      venture_images: patch.venture_images ?? {},
    } as any);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('site_settings' as any).update(patch as any).eq('id', existing.id);
    if (error) throw error;
  }
}

export async function fetchVentureImages(): Promise<VentureImages> {
  const s = await fetchSettings();
  return (s?.venture_images as VentureImages) || {};
}
