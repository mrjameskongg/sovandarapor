import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RingExpansionProps {
  className?: string;
  /** Number of rings emitted across the scroll */
  ringCount?: number;
  /** RGB channel separation distance in px at max */
  separation?: number;
  /** Base stroke width */
  strokeWidth?: number;
}

/**
 * Canvas 2D ring expansion with RGB channel separation,
 * driven by GSAP ScrollTrigger. Blends with background via `screen`.
 */
export default function RingExpansion({
  className = '',
  ringCount = 12,
  separation = 14,
  strokeWidth = 1.25,
}: RingExpansionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let maxR = 0;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
      maxR = Math.hypot(width, height) * 0.6;
    };

    const draw = () => {
      const p = progressRef.current.value; // 0..1
      ctx.clearRect(0, 0, width, height);

      // Subtle vignette glow at center
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.5);
      glow.addColorStop(0, 'rgba(201, 162, 39, 0.08)');
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // RGB separation scales with progress (0 at top → max mid-scroll → eases off)
      const sepEase = Math.sin(p * Math.PI); // 0→1→0
      const sep = separation * sepEase;

      for (let i = 0; i < ringCount; i++) {
        // Each ring has its own phase offset; progress pushes them outward
        const phase = (i / ringCount + p) % 1;
        const radius = phase * maxR;
        const alpha = Math.pow(1 - phase, 1.6) * 0.7;
        if (alpha <= 0.01) continue;

        ctx.lineWidth = strokeWidth;

        // Red channel — shifted left
        ctx.strokeStyle = `rgba(255, 80, 80, ${alpha})`;
        ctx.beginPath();
        ctx.arc(cx - sep, cy, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Green channel — shifted up-right (gold-leaning)
        ctx.strokeStyle = `rgba(120, 255, 180, ${alpha})`;
        ctx.beginPath();
        ctx.arc(cx + sep * 0.6, cy - sep * 0.5, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Blue channel — shifted right
        ctx.strokeStyle = `rgba(110, 160, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(cx + sep, cy + sep * 0.4, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    resize();
    draw();

    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener('resize', onResize);

    let st: ScrollTrigger | null = null;
    if (!reduced) {
      st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          gsap.to(progressRef.current, {
            value: self.progress,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: true,
            onUpdate: draw,
          });
        },
      });
    } else {
      progressRef.current.value = 0.5;
      draw();
    }

    return () => {
      window.removeEventListener('resize', onResize);
      st?.kill();
    };
  }, [ringCount, separation, strokeWidth]);

  return (
    <div
      ref={wrapperRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{ mixBlendMode: 'screen' }}
        className="w-full h-full"
      />
    </div>
  );
}
