import React, { useEffect, useRef, useState } from 'react';

type CursorAction = 'PLAY' | 'CLICK' | 'DRAG' | null;

const PLAY_SELECTOR = '[data-cursor="play"], video, .sound-preview, .landing-clip-preview, .about-story-video, .midi-preview';
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
      cursorX += (targetX - cursorX) * 0.55;
      cursorY += (targetY - cursorY) * 0.55;
      follower.style.transform = `translate3d(${cursorX.toFixed(1)}px, ${cursorY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      animationFrame = window.requestAnimationFrame(animateCursor);
    };

    const updateCursorAction = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        setCurrentAction(null);
        document.body.classList.remove('has-cursor-label');
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
      <span className="cursor-bracket">(</span>
      <span className="cursor-text">{currentAction || ''}</span>
      <span className="cursor-bracket">)</span>
    </div>
  );
};
