import React, { useEffect, useRef } from 'react';

const INTERACTIVE_SELECTOR = 'a, button:not([data-cursor="play"]), [role="button"]:not([data-cursor="play"]), input, textarea, select, .node-graph-node, [data-cursor="grab"]';

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
    let isMouseDown = false;

    document.body.classList.add('custom-cursor-active');

    const animateCursor = () => {
      cursorX += (targetX - cursorX) * 0.6;
      cursorY += (targetY - cursorY) * 0.6;
      cursor.style.transform = `translate3d(${cursorX.toFixed(2)}px, ${cursorY.toFixed(2)}px, 0)`;
      animationFrame = window.requestAnimationFrame(animateCursor);
    };

    const updateCursorState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;

      const isPlayTarget = Boolean(target.closest('[data-cursor="play"]'));
      const isInteractiveTarget = !isPlayTarget && Boolean(target.closest(INTERACTIVE_SELECTOR));

      cursor.classList.toggle('is-play', isPlayTarget);
      cursor.classList.toggle('is-interactive', isInteractiveTarget);
      cursor.classList.toggle('is-down', isMouseDown);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.classList.add('is-visible');
      updateCursorState(event.target);
    };

    const handlePointerDown = (event: PointerEvent) => {
      isMouseDown = true;
      cursor.classList.add('is-down');
      updateCursorState(event.target);
    };

    const handlePointerUp = (event: PointerEvent) => {
      isMouseDown = false;
      cursor.classList.remove('is-down');
      updateCursorState(event.target);
    };

    const handlePointerOver = (event: PointerEvent) => {
      updateCursorState(event.target);
    };

    const handlePointerLeave = () => {
      cursor.classList.remove('is-visible', 'is-play', 'is-interactive', 'is-down');
    };

    animationFrame = window.requestAnimationFrame(animateCursor);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointerover', handlePointerOver);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  return (
    <div className="cursor-follower" aria-hidden="true">
      <span ref={cursorRef} className="cursor-circle">
        {/* Play dial for Gatekeeper MIDI preview */}
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
