import { useEffect, RefObject } from 'react';

export function useParallax(targetRef: RefObject<HTMLElement>, speed = 0.05) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 800) {
            el.style.transform = `translateY(${scrollY * speed}px) scale(${1 + scrollY * 0.0001})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetRef, speed]);
}
