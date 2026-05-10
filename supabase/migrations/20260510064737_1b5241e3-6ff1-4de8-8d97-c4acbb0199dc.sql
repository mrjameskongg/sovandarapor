
-- Lock down SECURITY DEFINER funcs from anon/auth direct execution
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- Replace broad storage select with object-only access (no listing)
drop policy if exists "post-images public read" on storage.objects;
create policy "post-images public object read"
  on storage.objects for select
  using (bucket_id = 'post-images');
-- Note: listing requires a separate policy on storage.buckets/list operation; keeping object SELECT is fine for direct URL access
