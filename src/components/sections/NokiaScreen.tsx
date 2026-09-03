import React, { useEffect, useRef, useState } from 'react';
import { siteMetadata } from '../../data/metadata';

interface HandPixel {
  col: number;
  row: number;
  isLeft: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
}

// Authentic 5x7 Retro Nokia Dot-Matrix Bitmap Font
const BITMAP_FONT: Record<string, string[]> = {
  c: [
    '00000',
    '00000',
    '01110',
    '10001',
    '10000',
    '10001',
    '01110',
  ],
  o: [
    '00000',
    '00000',
    '01110',
    '10001',
    '10001',
    '10001',
    '01110',
  ],
  n: [
    '00000',
    '00000',
    '11110',
    '10001',
    '10001',
    '10001',
    '10001',
  ],
  e: [
    '00000',
    '00000',
    '01110',
    '10001',
    '11111',
    '10000',
    '01110',
  ],
  t: [
    '00100',
    '00100',
    '11110',
    '00100',
    '00100',
    '00101',
    '00010',
  ],
  l: [
    '01100',
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
    '01110',
  ],
  s: [
    '00000',
    '00000',
    '01111',
    '10000',
    '01110',
    '00001',
    '11110',
  ],
  "'": [
    '00110',
    '00100',
    '01000',
    '00000',
    '00000',
    '00000',
    '00000',
  ],
  p: [
    '00000',
    '00000',
    '11110',
    '10001',
    '11110',
    '10000',
    '10000',
  ],
  i: [
    '00100',
    '00000',
    '01100',
    '00100',
    '00100',
    '00100',
    '01110',
  ],
  d: [
    '00010',
    '00010',
    '01110',
    '10001',
    '10001',
    '10001',
    '01111',
  ],
  '!': [
    '00100',
    '00100',
    '00100',
    '00100',
    '00100',
    '00000',
    '00100',
  ],
};

export const NokiaScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const copiedRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);
  const handPixelsRef = useRef<HandPixel[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });

  // Synthesize authentic 8-bit retro Nokia keypad click tone
  const playNokiaBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(1100, ctx.currentTime);
      osc.frequency.setValueAtTime(1650, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.065, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const handleScreenClick = () => {
    playNokiaBeep();
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(siteMetadata.email);
      setCopied(true);
      copiedRef.current = true;
      setTimeout(() => {
        setCopied(false);
        copiedRef.current = false;
      }, 2200);
    }
    window.location.href = `mailto:${siteMetadata.email}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load base artwork and sample dark pixels into discrete 1-bit grid cells
    const img = new Image();
    img.src = '/images/nokia-connecting-screen.jpg';

    img.onload = () => {
      const offscreen = document.createElement('canvas');
      const step = 16; // Sample resolution matching the artwork pixel blocks
      const cols = Math.floor(img.naturalWidth / step);
      const rows = Math.floor(img.naturalHeight / step);
      offscreen.width = cols;
      offscreen.height = rows;
      const octx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!octx) return;

      octx.drawImage(img, 0, 0, cols, rows);
      const imgData = octx.getImageData(0, 0, cols, rows).data;

      const pixels: HandPixel[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = (r * cols + c) * 4;
          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];

          // Detect dark pixel blocks
          if (red < 105 && green < 125 && blue < 90) {
            pixels.push({
              col: c,
              row: r,
              isLeft: c < 46,
            });
          }
        }
      }
      handPixelsRef.current = pixels;
    };

    // Initialize 36 floating square pixel dust particles
    const particles: Particle[] = [];
    for (let i = 0; i < 36; i++) {
      particles.push({
        x: 0.15 + Math.random() * 0.7,
        y: 0.2 + Math.random() * 0.55,
        vx: (Math.random() - 0.5) * 0.0004,
        vy: (Math.random() - 0.5) * 0.0004,
        size: Math.random() > 0.5 ? 5 : 3.5,
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;

    let animId = 0;

    const render = (time: number) => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) return;

      // 1. LCD olive green background
      ctx.fillStyle = '#8ba346';
      ctx.fillRect(0, 0, W, H);

      // 2. Compute exact square pixel size based on canvas height
      // Reference grid is ~48 rows
      const pxSize = Math.max(3, Math.floor(H / 48));
      const pixelGap = 1; // Authentic LCD dot-matrix gap
      const effectiveSize = Math.max(2, pxSize - pixelGap);
      const verticalOffset = Math.round((H - 48 * pxSize) / 2);

      const rightMinCol = 46;
      const rightMaxCol = 86;
      const rightHandWidth = (rightMaxCol - rightMinCol + 1) * pxSize;

      // Layout text: Line 1 "lets" on top, Line 2 "connect" (or "copied!") below
      // Both lines are left-aligned as if inside a bounding box
      const line1 = 'lets';
      const line2 = copiedRef.current ? 'copied!' : 'connect';
      const charWidth = 5;
      const charGap = 1;

      // The bounding box width is defined by the longest word ("connect" / "copied!" = 41 cols)
      const boxCols = Math.max(
        line1.length * charWidth + (line1.length - 1) * charGap,
        line2.length * charWidth + (line2.length - 1) * charGap
      );
      const boxWidth = boxCols * pxSize;

      // Center the bounding box horizontally on the canvas
      const boxStartX = Math.round((W - boxWidth) / 2);

      // Line 1 ("lets") on top (row 11), Line 2 ("connect") moved below (row 20)
      const textStartY1 = verticalOffset + 11 * pxSize;
      const textStartY2 = verticalOffset + 20 * pxSize;

      // Hands position: frame the bounding box with breathing room, anchoring outward
      const handGap = 3 * pxSize;
      const leftStartX = Math.min(0, boxStartX - (43 * pxSize) - handGap);
      const rightStartX = Math.max(W - rightHandWidth, boxStartX + boxWidth + handGap - (3 * pxSize));

      // Draw hand pixels with strict 1:1 SQUARE dimensions matching Nokia LCD matrix
      const pixels = handPixelsRef.current;
      ctx.fillStyle = '#161d0e';

      for (let i = 0; i < pixels.length; i++) {
        const p = pixels[i];
        let px = 0;
        const py = verticalOffset + p.row * pxSize;

        if (p.isLeft) {
          px = leftStartX + p.col * pxSize;
        } else {
          px = rightStartX + (p.col - rightMinCol) * pxSize;
        }

        // Draw pure square block with subtle LCD sub-pixel gap
        ctx.fillRect(px, py, effectiveSize, effectiveSize);
      }

      // 3. Render pixelated lines: "lets" and "connect" (left-aligned within the bounding box)
      ctx.fillStyle = isHoveredRef.current ? '#0c1206' : '#161d0e';

      // Draw Line 1: "lets" (left-aligned at boxStartX)
      for (let i = 0; i < line1.length; i++) {
        const ch = line1[i];
        const bitmap = BITMAP_FONT[ch];
        if (!bitmap) continue;

        const charX = boxStartX + i * (charWidth + charGap) * pxSize;

        for (let r = 0; r < 7; r++) {
          const rowStr = bitmap[r];
          const py = textStartY1 + r * pxSize;

          for (let c = 0; c < 5; c++) {
            if (rowStr[c] === '1') {
              const px = charX + c * pxSize;
              ctx.fillRect(px, py, effectiveSize, effectiveSize);
            }
          }
        }
      }

      // Draw Line 2: "connect" or "copied!" (left-aligned at boxStartX)
      for (let i = 0; i < line2.length; i++) {
        const ch = line2[i];
        const bitmap = BITMAP_FONT[ch];
        if (!bitmap) continue;

        const charX = boxStartX + i * (charWidth + charGap) * pxSize;

        for (let r = 0; r < 7; r++) {
          const rowStr = bitmap[r];
          const py = textStartY2 + r * pxSize;

          for (let c = 0; c < 5; c++) {
            if (rowStr[c] === '1') {
              const px = charX + c * pxSize;
              ctx.fillRect(px, py, effectiveSize, effectiveSize);
            }
          }
        }
      }

      // 4. Render animated floating square pixel dust
      const mouse = mouseRef.current;
      const t = time * 0.0012;
      ctx.fillStyle = '#161d0e';

      particlesRef.current.forEach((pt) => {
        pt.x += pt.vx + Math.sin(t + pt.phase) * 0.0002;
        pt.y += pt.vy + Math.cos(t + pt.phase) * 0.0002;

        if (pt.x < 0.04) pt.x = 0.96;
        if (pt.x > 0.96) pt.x = 0.04;
        if (pt.y < 0.15) pt.y = 0.75;
        if (pt.y > 0.8) pt.y = 0.2;

        let curX = pt.x * W;
        let curY = pt.y * H;

        // Mouse avoidance impulse
        if (mouse.active) {
          const dx = curX - mouse.x;
          const dy = curY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100 && dist > 0) {
            const force = (100 - dist) / 100;
            curX += (dx / dist) * force * 24;
            curY += (dy / dist) * force * 24;
          }
        }

        // Strict square pixel block
        const snapX = Math.round(curX / pxSize) * pxSize;
        const snapY = Math.round(curY / pxSize) * pxSize;
        ctx.fillRect(snapX, snapY, effectiveSize, effectiveSize);
      });

      // 5. Matrix subpixel grid overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.035)';
      for (let x = 0; x < W; x += pxSize) {
        ctx.fillRect(x, 0, 1, H);
      }
      for (let y = 0; y < H; y += pxSize) {
        ctx.fillRect(0, y, W, 1);
      }

      animId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    mouseRef.current = {
      x: (e.clientX - rect.left) * dpr,
      y: (e.clientY - rect.top) * dpr,
      active: true,
    };
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    isHoveredRef.current = true;
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
    setIsHovered(false);
    isHoveredRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className={`nokia-screen-display${isHovered ? ' is-hovered' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleScreenClick}
      role="button"
      tabIndex={0}
      aria-label={copied ? 'Email copied to clipboard' : 'Connect - click to contact sajid al nahian'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleScreenClick();
        }
      }}
    >
      {/* 100% Canvas Pixel Matrix (Hands + 'connect' Pixel Text) */}
      <canvas ref={canvasRef} className="nokia-canvas" />

      {/* Top Status Bar: notenderdreams carrier and battery meter */}
      <div className="nokia-status-bar" aria-hidden="true">
        <div className="nokia-signal-meter">
          <span className="nokia-bar bar-1" />
          <span className="nokia-bar bar-2" />
          <span className="nokia-bar bar-3" />
          <span className="nokia-bar bar-4" />
          <span className="nokia-carrier">notenderdreams</span>
        </div>

        <div className="nokia-battery-meter">
          <span className="nokia-battery-body">
            <span className="nokia-bat-fill" />
            <span className="nokia-bat-fill" />
            <span className="nokia-bat-fill" />
            <span className="nokia-bat-fill" />
          </span>
          <span className="nokia-battery-tip" />
        </div>
      </div>

      {/* CRT / LCD Matrix Scanlines & Subtle Glare Overlay */}
      <div className="nokia-screen-scanlines" aria-hidden="true" />
      <div className="nokia-screen-glare" aria-hidden="true" />
    </div>
  );
};
