import React, { useRef, useState } from 'react';

interface DraggableWorkbenchItemProps {
  children: React.ReactNode;
  className?: string;
  softLimit?: number;
}

const DRAG_THRESHOLD = 6;

export const DraggableWorkbenchItem: React.FC<DraggableWorkbenchItemProps> = ({
  children,
  className = '',
  softLimit = 180,
}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startRef = useRef<{
    pointerId: number;
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

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

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (!isDragging && Math.hypot(deltaX, deltaY) < DRAG_THRESHOLD) return;

    if (!isDragging) {
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }

    const distance = Math.hypot(deltaX, deltaY);
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
    if (startRef.current?.pointerId !== event.pointerId) return;
    startRef.current = null;
    setIsDragging(false);
    setOffset({ x: 0, y: 0 });
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      className={`workbench-draggable${isDragging ? ' is-dragging' : ''}${className ? ` ${className}` : ''}`}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </div>
  );
};
