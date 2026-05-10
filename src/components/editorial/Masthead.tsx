interface MastheadProps {
  volume?: string;
  issue?: string;
  date?: string;
  coordinates?: string;
  light?: boolean;
}

export default function Masthead({
  volume = 'Vol. 01',
  issue = 'Issue 12',
  date,
  coordinates = '14.5896° N · 104.9165° E',
  light = false,
}: MastheadProps) {
  const today = date || new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const cls = light ? 'text-paper/70' : 'text-content-muted';
  return (
    <div className={`flex items-center justify-between font-ui text-[10px] uppercase tracking-[0.3em] tabular ${cls}`}>
      <span>{volume} · {issue}</span>
      <span className="hidden sm:inline">{today}</span>
      <span>{coordinates}</span>
    </div>
  );
}
