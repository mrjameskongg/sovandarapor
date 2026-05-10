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

export async function saveSettings(patch: { fonts?: SiteFonts; categories?: string[] }) {
  const existing = await fetchSettings();
  if (!existing) {
    const { error } = await supabase.from('site_settings' as any).insert({
      fonts: patch.fonts ?? DEFAULT_FONTS,
      categories: patch.categories ?? [...DEFAULT_CATEGORIES],
    } as any);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('site_settings' as any).update(patch as any).eq('id', existing.id);
    if (error) throw error;
  }
}
