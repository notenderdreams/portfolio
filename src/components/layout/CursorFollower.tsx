import React, { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button:not([data-cursor="play"]), [role="button"]:not([data-cursor="play"]), input, textarea, select';

export const CursorFollower: React.FC = () => {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let targetX = -100;
    let targetY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let animationFrame = 0;

    document.body.classList.add('custom-cursor-active');

    const animateCursor = () => {
      cursorX += (targetX - cursorX) * 0.22;
      cursorY += (targetY - cursorY) * 0.22;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      animationFrame = window.requestAnimationFrame(animateCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add('is-visible');
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      const isInteractive = target instanceof Element && target.closest(INTERACTIVE_SELECTOR);
      const isPlayTarget = target instanceof Element && target.closest('[data-cursor="play"]');
      cursor.classList.toggle('is-interactive', Boolean(isInteractive));
      cursor.classList.toggle('is-play', Boolean(isPlayTarget));
    };

    const handlePointerLeave = () => {
      cursor.classList.remove('is-visible');
      cursor.classList.remove('is-interactive', 'is-play');
    };

    animationFrame = window.requestAnimationFrame(animateCursor);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="cursor-follower" aria-hidden="true">
      <span ref={cursorRef} className="cursor-circle">
        <svg className="cursor-play-copy" viewBox="0 0 100 100">
          <defs>
            <path
              id="cursor-play-path"
              d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            />
          </defs>
          <text>
            <textPath href="#cursor-play-path" startOffset="1%">
              CLICK TO PLAY · CLICK TO PLAY ·
            </textPath>
          </text>
        </svg>
        <svg className="cursor-headphones" viewBox="0 0 24 24">
          <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <path d="M4 14a2 2 0 0 1 2-2h1v7H6a2 2 0 0 1-2-2v-3ZM20 14a2 2 0 0 0-2-2h-1v7h1a2 2 0 0 0 2-2v-3Z" />
        </svg>
      </span>
    </div>
  );
};
