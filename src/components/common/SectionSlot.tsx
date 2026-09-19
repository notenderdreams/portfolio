import React, { useEffect, useRef } from 'react';

interface SectionSlotProps {
  id: string;
  minHeight: number;
  onNearViewport?: () => void;
}

export const SectionSlot: React.FC<SectionSlotProps> = ({ id, minHeight, onNearViewport }) => {
  const slotRef = useRef<HTMLDivElement>(null);
  const onNearViewportRef = useRef(onNearViewport);

  useEffect(() => {
    onNearViewportRef.current = onNearViewport;
  });

  useEffect(() => {
    const el = slotRef.current;
    if (!el) return;

    // Generous rootMargin so if user scrolls near this section, it triggers immediately
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onNearViewportRef.current?.();
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '1000px 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id={id}
      ref={slotRef}
      className="section-lazy-slot"
      style={{ minHeight: `${minHeight}px` }}
      aria-hidden="true"
    />
  );
};
