import { useEffect, useState } from 'react';

/** Slim gold progress bar pinned to the top of the viewport. */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, h.scrollTop / total)) : 0);
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[70] h-px bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gold origin-left"
        style={{
          transform: `scaleX(${progress})`,
          transition: 'transform 120ms linear',
        }}
      />
    </div>
  );
}
