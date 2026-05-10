import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPassword() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setError(error.message); return; }
    setSuccess('Password updated. Redirecting...');
    setTimeout(() => nav('/admin', { replace: true }), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gold mb-2">Editor</p>
          <h1 className="font-display text-3xl text-foreground">Reset password</h1>
        </div>

        {!ready && (
          <p className="text-sm text-content-muted text-center">
            Waiting for recovery link... open this page from the email you received.
          </p>
        )}

        {error && (
          <div className="mb-5 border border-destructive/60 bg-destructive/5 rounded-md p-4 text-sm text-destructive">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-5 border border-gold/60 bg-gold/5 rounded-md p-4 text-sm text-foreground">
            {success}
          </div>
        )}

        {ready && (
          <form onSubmit={submit} className="space-y-5">
            <div>
              <Label htmlFor="password">New password</Label>
              <Input id="password" type="password" required minLength={6} value={password}
                onChange={(e) => setPassword(e.target.value)} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" required minLength={6} value={confirm}
                onChange={(e) => setConfirm(e.target.value)} className="mt-2" />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? '...' : 'Update password'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
