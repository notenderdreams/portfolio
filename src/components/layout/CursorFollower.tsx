import React, { useEffect, useRef, useState } from 'react';

type CursorAction = 'PLAY' | 'PAUSE' | 'CLICK' | 'DRAG' | null;

const PAUSE_SELECTOR = '[data-cursor="pause"], .about-music-control.is-playing';
const PLAY_SELECTOR = '[data-cursor="play"], video, .sound-preview, .landing-clip-preview, .about-story-video, .midi-preview, .about-music-control';
const DRAG_SELECTOR = '[data-cursor="grab"], [data-cursor="drag"], .workbench-draggable, .node-graph-node, [role="slider"]';
const CLICK_SELECTOR = '.work-item, .works-name-btn, [data-cursor="click"], [data-cursor="pointer"], .btn-hero-cta';

export const CursorFollower: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const [currentAction, setCurrentAction] = useState<CursorAction>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) return;

    const follower = followerRef.current;
    if (!follower) return;

    let targetX = -200;
    let targetY = -200;
    let cursorX = -200;
    let cursorY = -200;
    let animationFrame = 0;
    let isMouseDown = false;

    const animateCursor = () => {
      cursorX += (targetX - cursorX) * 0.65;
      cursorY += (targetY - cursorY) * 0.65;
      const downOffset = isMouseDown ? 1 : 0;
      follower.style.transform = `translate3d(${(cursorX + downOffset).toFixed(1)}px, ${(cursorY + downOffset).toFixed(1)}px, 0)`;
      animationFrame = window.requestAnimationFrame(animateCursor);
    };

    const updateCursorAction = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setCurrentAction(null);
        document.body.classList.remove('has-cursor-label');
        return;
      }

      // Check for PAUSE state
      if (target.closest(PAUSE_SELECTOR)) {
        setCurrentAction('PAUSE');
        document.body.classList.add('has-cursor-label');
        return;
      }

      // Check for PLAY state
      if (target.closest(PLAY_SELECTOR)) {
        setCurrentAction('PLAY');
        document.body.classList.add('has-cursor-label');
        return;
      }

      // Check for DRAG state
      if (target.closest(DRAG_SELECTOR)) {
        setCurrentAction('DRAG');
        document.body.classList.add('has-cursor-label');
        return;
      }

      // Check for CLICK state
      if (target.closest(CLICK_SELECTOR)) {
        setCurrentAction('CLICK');
        document.body.classList.add('has-cursor-label');
        return;
      }

      setCurrentAction(null);
      document.body.classList.remove('has-cursor-label');
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (event.pointerType === 'mouse' && event.buttons === 0 && isMouseDown) {
        isMouseDown = false;
        follower.classList.remove('is-down');
      }

      updateCursorAction(event.target);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      isMouseDown = true;
      follower.classList.add('is-down');
    };

    const handlePointerUp = () => {
      isMouseDown = false;
      follower.classList.remove('is-down');
    };

    const handlePointerOver = (event: PointerEvent) => {
      updateCursorAction(event.target);
    };

    const handlePointerLeave = () => {
      isMouseDown = false;
      setCurrentAction(null);
      document.body.classList.remove('has-cursor-label');
    };

    const handleBlur = () => {
      isMouseDown = false;
      follower.classList.remove('is-down');
      setCurrentAction(null);
      document.body.classList.remove('has-cursor-label');
    };

    animationFrame = window.requestAnimationFrame(animateCursor);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', handlePointerUp, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.body.classList.remove('has-cursor-label');
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      document.removeEventListener('pointerover', handlePointerOver);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div
      ref={followerRef}
      className={`follow-cursor-desktop${currentAction ? ' is-visible' : ''}`}
      aria-hidden="true"
    >
      <svg className="cursor-pixel-arrow" width="16" height="16" viewBox="0 0 16 16" shapeRendering="crispEdges">
        <path fill="#000" d="M0 0h1v1h-1zM0 1h2v1h-2zM0 2h1v1h-1zM2 2h1v1h-1zM0 3h1v1h-1zM4 3h1v1h-1zM0 4h1v1h-1zM6 4h1v1h-1zM0 5h1v1h-1zM8 5h1v1h-1zM0 6h1v1h-1zM10 6h1v1h-1zM0 7h1v1h-1zM12 7h1v1h-1zM0 8h1v1h-1zM14 8h1v1h-1zM0 9h1v1h-1zM7 9h6v1h-6zM0 10h1v1h-1zM4 10h1v1h-1zM8 10h1v1h-1zM0 11h1v1h-1zM3 11h1v1h-1zM5 11h1v1h-1zM9 11h1v1h-1zM0 12h1v1h-1zM2 12h1v1h-1zM6 12h1v1h-1zM10 12h1v1h-1zM0 13h2v1h-2zM7 13h1v1h-1zM11 13h1v1h-1zM0 14h1v1h-1zM8 14h4v1h-4z" />
        <path fill="#fff" d="M1 2h1v1h-1zM1 3h3v1h-3zM1 4h5v1h-5zM1 5h7v1h-7zM1 6h9v1h-9zM1 7h11v1h-11zM1 8h13v1h-13zM1 9h6v1h-6zM1 10h3v1h-3zM5 10h3v1h-3zM1 11h2v1h-2zM6 11h3v1h-3zM1 12h1v1h-1zM7 12h3v1h-3zM8 13h3v1h-3z" />
      </svg>
      <div className="cursor-pixel-badge">
        <span className="cursor-bracket">[</span>
        <span className="cursor-text">{currentAction || ''}</span>
        <span className="cursor-bracket">]</span>
      </div>
    </div>
  );
};
