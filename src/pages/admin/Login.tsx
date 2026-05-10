import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginError = { message: string; code?: string };

export default function AdminLogin() {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [passphrase, setPassphrase] = useState('');
  const [busy, setBusy] = useState(false);
  const [loginError, setLoginError] = useState<LoginError | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user && isAdmin) nav('/admin', { replace: true });
  }, [user, isAdmin, loading, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setLoginError(null);
    setSuccess(null);

    try {
      const { data, error } = await supabase.functions.invoke('admin-unlock', {
        body: { passphrase },
      });
      if (error) throw new Error(error.message ?? 'Unlock failed');
      if (!data?.token_hash || !data?.email) {
        throw new Error(data?.error ?? 'Invalid passphrase');
      }

      const { error: verifyErr } = await supabase.auth.verifyOtp({
        token_hash: data.token_hash,
        type: 'magiclink',
      });
      if (verifyErr) throw verifyErr;

      setSuccess('Unlocked, redirecting...');
      setTimeout(() => nav('/admin', { replace: true }), 600);
    } catch (err: any) {
      setLoginError({ message: err?.message ?? 'Unknown error', code: err?.code });
    } finally {
      setBusy(false);
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
          </div>
        )}

        {success && (
          <div className="mb-5 border border-gold/60 bg-gold/5 rounded-md p-4 text-sm text-foreground">
            {success}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <Label htmlFor="passphrase">Passphrase</Label>
            <Input
              id="passphrase"
              type="password"
              required
              autoFocus
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="mt-2"
              autoComplete="current-password"
            />
          </div>
          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? '...' : 'Unlock'}
          </Button>
        </form>

        <p className="mt-8 text-[11px] text-content-muted text-center leading-relaxed">
          Editor access by passphrase only.
        </p>
      </div>
    </div>
  );
}
