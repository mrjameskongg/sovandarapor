
-- 1. Add country column to posts
ALTER TABLE public.posts
  ADD COLUMN IF NOT EXISTS country text;

ALTER TABLE public.posts
  DROP CONSTRAINT IF EXISTS posts_country_check;
ALTER TABLE public.posts
  ADD CONSTRAINT posts_country_check
  CHECK (country IS NULL OR country IN ('cambodia','thailand','vietnam','france'));

CREATE INDEX IF NOT EXISTS posts_country_idx ON public.posts (country);

-- 2. site_settings: single-row config
CREATE TABLE IF NOT EXISTS public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fonts jsonb NOT NULL DEFAULT jsonb_build_object(
    'display','Cormorant Garamond',
    'content','Source Serif Pro',
    'ui','Inter'
  ),
  categories text[] NOT NULL DEFAULT ARRAY[
    'Personal Philosophy','Cambodia','Business','Brand Building',
    'Agriculture','Dairy','Rice','Spirits & Hospitality',
    'Media & Talent','Design & Marketing'
  ]::text[],
  singleton boolean NOT NULL DEFAULT true UNIQUE,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "site_settings readable by all" ON public.site_settings;
CREATE POLICY "site_settings readable by all"
  ON public.site_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "admins insert site_settings" ON public.site_settings;
CREATE POLICY "admins insert site_settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "admins update site_settings" ON public.site_settings;
CREATE POLICY "admins update site_settings"
  ON public.site_settings FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP TRIGGER IF EXISTS site_settings_updated_at ON public.site_settings;
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed single row if empty
INSERT INTO public.site_settings DEFAULT VALUES
ON CONFLICT (singleton) DO NOTHING;
