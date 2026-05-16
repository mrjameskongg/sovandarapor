import { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  /** Optional JSON-LD blob (e.g. BlogPosting) injected as <script type="application/ld+json"> */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

const LD_ID = 'seo-page-jsonld';

/**
 * Lightweight SEO injector. Updates <title>, description, canonical,
 * Open Graph / Twitter tags, and an optional per-page JSON-LD block.
 * A sitewide Person JSON-LD block already lives in index.html.
 */
export default function Seo({ title, description, canonical, image, type = 'website', jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title;
    if (description) {
      upsertMeta('meta[name="description"]', 'name', 'description', description);
      upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
      upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    }
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type);
    if (image) {
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', image);
      upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    }
    const url = canonical || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : '');
    if (url) {
      upsertLink('canonical', url);
      upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
    }

    // Per-page JSON-LD
    const existing = document.getElementById(LD_ID);
    if (existing) existing.remove();
    if (jsonLd) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.id = LD_ID;
      s.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(s);
    }
    return () => {
      const el = document.getElementById(LD_ID);
      if (el) el.remove();
    };
  }, [title, description, canonical, image, type, JSON.stringify(jsonLd ?? null)]);
  return null;
}
