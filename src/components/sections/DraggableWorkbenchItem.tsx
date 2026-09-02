import React, { useEffect, useRef, useState } from 'react';

interface DraggableWorkbenchItemProps {
  children: React.ReactNode;
  className?: string;
  softLimit?: number;
}

const DRAG_THRESHOLD = 4;

export const DraggableWorkbenchItem: React.FC<DraggableWorkbenchItemProps> = ({
  children,
  className = '',
  softLimit = 180,
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const resetDrag = () => {
    startRef.current = null;
    setIsDragging(false);
    setOffset({ x: 0, y: 0 });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    // Immediately acquire pointer capture so all subsequent moves and releases route here
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore if pointer capture is unsupported or already active
    }

    startRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = startRef.current;
    if (!start || start.pointerId !== event.pointerId) return;

    // Failsafe: if mouse button was released without a pointerup event, cancel drag immediately
    if (event.pointerType === 'mouse' && event.buttons === 0) {
      handlePointerUp(event);
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const distance = Math.hypot(deltaX, deltaY);

    if (!isDragging && distance < DRAG_THRESHOLD) return;

    if (!isDragging) {
      setIsDragging(true);
    }

    const limit = Math.min(softLimit, Math.min(window.innerWidth, window.innerHeight) * 0.22);
    const resistedDistance = distance <= limit
      ? distance
      : Math.min(limit * 1.18, limit + (distance - limit) * 0.14);
    const resistance = distance === 0 ? 1 : resistedDistance / distance;

    setOffset({
      x: start.offsetX + deltaX * resistance,
      y: start.offsetY + deltaY * resistance,
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (startRef.current && startRef.current.pointerId === event.pointerId) {
      try {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Ignore release capture errors
      }
      resetDrag();
    }
  };

  const handleLostPointerCapture = () => {
    resetDrag();
  };

  // Global bulletproof safety listener on window
  useEffect(() => {
    const handleGlobalPointerUp = (event: PointerEvent) => {
      if (startRef.current && startRef.current.pointerId === event.pointerId) {
        resetDrag();
      }
    };

    const handleGlobalBlur = () => {
      if (startRef.current) {
        resetDrag();
      }
    };

    window.addEventListener('pointerup', handleGlobalPointerUp, { passive: true });
    window.addEventListener('pointercancel', handleGlobalPointerUp, { passive: true });
    window.addEventListener('blur', handleGlobalBlur);
    window.addEventListener('contextmenu', handleGlobalBlur);

    return () => {
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
      window.removeEventListener('blur', handleGlobalBlur);
      window.removeEventListener('contextmenu', handleGlobalBlur);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`workbench-draggable${isDragging ? ' is-dragging' : ''}${className ? ` ${className}` : ''}`}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onLostPointerCapture={handleLostPointerCapture}
      onDragStart={(e) => e.preventDefault()}
      data-cursor="grab"
    >
      {children}
    </div>
  );
};
