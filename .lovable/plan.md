## Goal

Remove the email + password login. Anyone who types the correct **secret passphrase** on `/admin/login` is granted admin access for that browser session. No signup. No Supabase auth required.

## How it works

1. You set a passphrase (stored as a Supabase secret, `ADMIN_PASSPHRASE`). It never ships in the frontend bundle.
2. The login page shows one field: **Passphrase**.
3. On submit, the page calls a new edge function `admin-unlock` that compares the entered value to `ADMIN_PASSPHRASE` (constant-time compare) and, if it matches, signs in as the existing admin user (`ksovandarapor`) and returns a real Supabase session.
4. The session is set in the browser via `supabase.auth.setSession(...)`. From there, all existing admin RLS, the `AdminGuard`, and the editor work unchanged.
5. To rotate access, just update the `ADMIN_PASSPHRASE` secret. Old sessions can be invalidated by signing out.

This keeps the existing Supabase admin user (and its RLS policies) intact, but hides the email/password from you. You only remember one phrase.

## Changes

**Backend**
- Add secret `ADMIN_PASSPHRASE` (you enter it once, securely).
- New edge function `admin-unlock` (public, no JWT required):
  - Reads passphrase from request body, compares to `ADMIN_PASSPHRASE`.
  - On match, uses the service role key to generate a session for the existing admin user (`f6bbafa1-3eb6-492f-aba5-cfc2a5dafd47`) via `auth.admin.generateLink` (magiclink) → exchange for tokens, or directly issue a session.
  - Returns `{ access_token, refresh_token }`.
  - On mismatch, returns 401 after a short delay (basic brute-force throttling).

**Frontend**
- `src/pages/admin/Login.tsx`: replace email + password form with a single **Passphrase** field. On submit, call the edge function, then `supabase.auth.setSession(...)`, then redirect to `/admin`. Keep the existing visible error block, gold accent, ivory background, Cormorant Garamond styling. No em dashes.
- Remove the "Forgot password" link and reset-password copy from the login page (the `/admin/reset-password` route can stay in place, just unused).

**Unchanged**
- `AdminGuard`, `useAuth`, all admin pages, RLS policies, the admin user row in `user_roles`.

## Security notes

- Passphrase lives only in the secret store and the edge function. It is never in the frontend bundle or git history.
- Use a long passphrase (4+ random words). I will recommend a length when you set it.
- Add basic rate-limiting in the edge function (sleep 1s on failure) to slow guessing.
- Anyone who learns the phrase gets admin. Treat it like a password — do not share it, do not paste it into chat. You can rotate it anytime by updating the secret.

## What I need from you to implement

1. Confirmation to proceed.
2. After confirmation, I will request the `ADMIN_PASSPHRASE` secret via the secure secrets form (do not type it in chat).
