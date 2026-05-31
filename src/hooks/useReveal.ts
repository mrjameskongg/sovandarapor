import { useEffect, useRef } from 'react';

/**
 * Adds `is-visible` class when element enters viewport.
 * Pair with `.reveal` CSS for a subtle fade-up.
 * Respects prefers-reduced-motion (immediately visible).
 */
export function useReveal<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.classList.add('is-visible');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-visible');
            io.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12, ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
