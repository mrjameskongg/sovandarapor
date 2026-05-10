import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

type LoginError = { message: string; code?: string; raw?: unknown };

export default function AdminLogin() {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  // Signup removed for security — admin accounts must be provisioned in the backend.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [loginError, setLoginError] = useState<LoginError | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [reachable, setReachable] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getSession()
      .then(({ error }) => { if (!cancelled) setReachable(!error); })
      .catch(() => { if (!cancelled) setReachable(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!loading && user && isAdmin) nav('/admin', { replace: true });
  }, [user, isAdmin, loading, nav]);

  const maskedSupabase = (() => {
    try {
      const host = new URL(import.meta.env.VITE_SUPABASE_URL).host;
      const sub = host.split('.')[0];
      const masked = sub.length > 4 ? `xxxx-${sub.slice(-4)}` : 'xxxx';
      return `${masked}.supabase.co`;
    } catch { return 'unknown'; }
  })();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setLoginError(null);
    setSuccess(null);

    const timeoutId = window.setTimeout(() => {
      setLoginError({
        message: 'Connection slow or blocked. Check your internet, or your Supabase URL config may be wrong.',
        code: 'TIMEOUT',
      });
    }, 5000);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.clearTimeout(timeoutId);
      setSuccess('Signed in, redirecting...');
      setTimeout(() => nav('/admin', { replace: true }), 1000);
    } catch (err: any) {
      window.clearTimeout(timeoutId);
      setLoginError({ message: err?.message ?? 'Unknown error', code: err?.code ?? err?.status?.toString(), raw: err });
    } finally {
      setBusy(false);
    }
  };

  const copyError = async () => {
    if (!loginError) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify({
        message: loginError.message,
        code: loginError.code,
        raw: loginError.raw,
        origin: window.location.origin,
        supabase: maskedSupabase,
      }, null, 2));
      toast({ title: 'Copied' });
    } catch {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  const forgot = async () => {
    const target = window.prompt('Enter your account email:', email);
    if (!target) return;
    setResetMsg(null);
    const { error } = await supabase.auth.resetPasswordForEmail(target, {
      redirectTo: `${window.location.origin}/admin/reset-password`,
    });
    if (error) {
      setLoginError({ message: error.message, code: (error as any).code });
    } else {
      setResetMsg('Check your email for a reset link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Editor</p>
          <h1 className="font-display text-3xl text-foreground">Sign in</h1>
        </div>

        {loginError && (
          <div className="mb-5 border border-destructive/60 bg-destructive/5 rounded-md p-4 text-sm">
            <p className="text-destructive font-medium leading-snug">{loginError.message}</p>
            {loginError.code && (
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-destructive/80">Code: {loginError.code}</p>
            )}
            <button type="button" onClick={copyError}
              className="mt-3 text-[11px] uppercase tracking-[0.2em] text-content-muted hover:text-gold underline-offset-4 hover:underline">
              Tap to copy details
            </button>
          </div>
        )}

        {success && (
          <div className="mb-5 border border-gold/60 bg-gold/5 rounded-md p-4 text-sm text-foreground">
            {success}
          </div>
        )}

        {resetMsg && (
          <div className="mb-5 border border-gold/60 bg-gold/5 rounded-md p-4 text-sm text-foreground">
            {resetMsg}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? '...' : mode === 'signin' ? 'Sign in' : 'Sign up'}
          </Button>
        </form>

        {mode === 'signin' && (
          <button onClick={forgot} type="button"
            className="mt-4 w-full text-xs uppercase tracking-[0.2em] text-content-muted hover:text-gold">
            Forgot password?
          </button>
        )}

        <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
          className="mt-6 w-full text-xs uppercase tracking-[0.2em] text-content-muted hover:text-gold">
          {mode === 'signin' ? 'First time? Create the admin account' : 'Have an account? Sign in'}
        </button>

        <p className="mt-8 text-[11px] text-content-muted text-center leading-relaxed">
          The first account created becomes the site admin. Later sign-ups have no privileges.
        </p>

        <div className="mt-6 pt-4 border-t border-border/60 text-[10px] text-content-muted text-center leading-relaxed space-y-1">
          <p>Origin: {typeof window !== 'undefined' ? window.location.origin : ''}</p>
          <p>Backend: {reachable === null ? 'checking...' : reachable ? '\u2713 reachable' : '\u2717 unreachable'}</p>
          <p>Project: {maskedSupabase}</p>
        </div>
      </div>
    </div>
  );
}
