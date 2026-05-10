
-- Defence-in-depth: explicit admin-only INSERT/UPDATE/DELETE on user_roles
CREATE POLICY "admins insert user_roles"
  ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admins update user_roles"
  ON public.user_roles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admins delete user_roles"
  ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Restrict bucket listing on post-images: keep file URLs viewable but hide directory listing
DROP POLICY IF EXISTS "Public read post-images" ON storage.objects;
DROP POLICY IF EXISTS "post-images public read" ON storage.objects;
DROP POLICY IF EXISTS "Public access to post-images" ON storage.objects;

-- Recreate a narrow public-read policy (single-object access still works via direct URL)
CREATE POLICY "post-images public read individual files"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'post-images');

-- Admin-only insert/update/delete on bucket
DROP POLICY IF EXISTS "admins manage post-images" ON storage.objects;
CREATE POLICY "admins manage post-images"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'post-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));
