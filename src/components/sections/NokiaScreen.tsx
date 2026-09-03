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

interface PixelCube {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  vRotX: number;
  vRotY: number;
  vRotZ: number;
}

// 8 vertices of a unit cube
const CUBE_VERTICES: [number, number, number][] = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];

// 12 edges connecting the vertices
const CUBE_EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 0], // back face
  [4, 5], [5, 6], [6, 7], [7, 4], // front face
  [0, 4], [1, 5], [2, 6], [3, 7], // cross struts
];

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
  h: [
    '10000',
    '10000',
    '10110',
    '11001',
    '10001',
    '10001',
    '10001',
  ],
  a: [
    '00000',
    '00000',
    '01110',
    '00001',
    '01111',
    '10001',
    '01111',
  ],
  v: [
    '00000',
    '00000',
    '10001',
    '10001',
    '10001',
    '01010',
    '00100',
  ],
  '?': [
    '01110',
    '10001',
    '00010',
    '00100',
    '00100',
    '00000',
    '00100',
  ],
  ' ': [
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
    '00000',
  ],
  u: [
    '00000',
    '00000',
    '10001',
    '10001',
    '10001',
    '10001',
    '01111',
  ],
  y: [
    '00000',
    '00000',
    '10001',
    '10001',
    '01111',
    '00001',
    '01110',
  ],
  r: [
    '00000',
    '00000',
    '10110',
    '11001',
    '10000',
    '10000',
    '10000',
  ],
  w: [
    '00000',
    '00000',
    '10001',
    '10001',
    '10101',
    '10101',
    '01010',
  ],
  k: [
    '10000',
    '10010',
    '10100',
    '11000',
    '10100',
    '10010',
    '10001',
  ],
};

function drawBitmapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  startX: number,
  startY: number,
  pxSize: number,
  effectiveSize: number,
  dissolveRatio: number = 1,
  seedOffset: number = 0
) {
  const charWidth = 5;
  const charGap = 1;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === ' ') continue;
    const bitmap = BITMAP_FONT[ch];
    if (!bitmap) continue;

    const charX = startX + i * (charWidth + charGap) * pxSize;

    for (let r = 0; r < 7; r++) {
      const rowStr = bitmap[r];
      const py = startY + r * pxSize;

      for (let c = 0; c < 5; c++) {
        if (rowStr[c] === '1') {
          if (dissolveRatio < 1) {
            const hash = Math.sin((i * 37 + r * 13 + c * 7 + seedOffset) * 12.9898) * 43758.5453;
            const frac = hash - Math.floor(hash);
            if (frac > dissolveRatio) continue;
          }
          const px = charX + c * pxSize;
          ctx.fillRect(px, py, effectiveSize, effectiveSize);
        }
      }
    }
  }
}

function renderPixelCube(
  ctx: CanvasRenderingContext2D,
  cube: PixelCube,
  centerX: number,
  centerY: number,
  pxSize: number,
  effectiveSize: number,
  alpha: number
) {
  const S = cube.size * pxSize;

  const projVertices: [number, number][] = CUBE_VERTICES.map((v) => {
    // 3D rotation
    const y1 = v[1] * Math.cos(cube.rotX) - v[2] * Math.sin(cube.rotX);
    const z1 = v[1] * Math.sin(cube.rotX) + v[2] * Math.cos(cube.rotX);

    const x2 = v[0] * Math.cos(cube.rotY) + z1 * Math.sin(cube.rotY);

    const x3 = x2 * Math.cos(cube.rotZ) - y1 * Math.sin(cube.rotZ);
    const y3 = x2 * Math.sin(cube.rotZ) + y1 * Math.cos(cube.rotZ);

    return [centerX + x3 * S, centerY + y3 * S];
  });

  // Rasterize 12 cube edges onto LCD pixel grid
  CUBE_EDGES.forEach(([i1, i2]) => {
    const [x1, y1] = projVertices[i1];
    const [x2, y2] = projVertices[i2];
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const steps = Math.max(1, Math.ceil(dist / (pxSize * 0.9)));

    for (let s = 0; s <= steps; s++) {
      if (alpha < 1) {
        const hash = Math.sin((i1 * 19 + i2 * 31 + s * 17) * 12.9898) * 43758.5453;
        if (hash - Math.floor(hash) > alpha) continue;
      }
      const t = s / steps;
      const lx = x1 + (x2 - x1) * t;
      const ly = y1 + (y2 - y1) * t;
      const snapX = Math.round(lx / pxSize) * pxSize;
      const snapY = Math.round(ly / pxSize) * pxSize;
      ctx.fillRect(snapX, snapY, effectiveSize, effectiveSize);
    }
  });

  // Draw cube corner vertices
  projVertices.forEach(([vx, vy], idx) => {
    if (alpha < 1) {
      const hash = Math.sin((idx * 43) * 12.9898) * 43758.5453;
      if (hash - Math.floor(hash) > alpha) return;
    }
    const snapX = Math.round(vx / pxSize) * pxSize;
    const snapY = Math.round(vy / pxSize) * pxSize;
    ctx.fillRect(snapX, snapY, effectiveSize, effectiveSize);
  });
}

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

  // Animation lifecycle states
  const stageRef = useRef<'intro' | 'transitioning' | 'connected'>('intro');
  const transitionStartRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cubesRef = useRef<PixelCube[]>([]);

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

  const triggerTransition = () => {
    if (stageRef.current === 'connected' || stageRef.current === 'transitioning') return;
    stageRef.current = 'transitioning';
    transitionStartRef.current = performance.now();
  };

  const handleScreenClick = () => {
    playNokiaBeep();
    // Fast-forward to connected state if clicked during intro or transition
    if (stageRef.current !== 'connected') {
      stageRef.current = 'connected';
    }
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

  // Scroll visibility observer:
  // - Nokia Screen in intro stage shows "have an idea?" and floating pixel cubes.
  // - When scrolling down to the bottom and the footer animation triggers (.is-revealed),
  //   the screen transitions to "lets connect" and the connecting hands grow at that exact same time.
  // - Closing or scrolling past the footer does NOT snap the screen back to intro.
  // - The Nokia screen only resets back to its initial "have an idea?" state once the Nokia
  //   screen itself completely scrolls out of the viewport.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Listen to the moment the footer animation triggers
    const handleFooterReveal = (e: Event) => {
      const customEv = e as CustomEvent<{ revealed: boolean }>;
      if (customEv.detail?.revealed) {
        triggerTransition();
      }
      // When footer is closed/unrevealed, do NOT reset - remain in connected state as requested
    };

    window.addEventListener('footerReveal', handleFooterReveal);

    // Initial check in case page loaded already scrolled to footer
    const footerEl = document.querySelector('.editorial-footer-section');
    if (footerEl?.classList.contains('is-revealed')) {
      triggerTransition();
    }

    // Only reset to intro state when the Nokia screen itself leaves the viewport
    const containerObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio <= 0) {
          if (stageRef.current === 'connected' || stageRef.current === 'transitioning') {
            stageRef.current = 'intro';
          }
        }
      },
      {
        threshold: [0],
      }
    );
    containerObserver.observe(container);

    return () => {
      window.removeEventListener('footerReveal', handleFooterReveal);
      containerObserver.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load base artwork and sample dark pixels into discrete 1-bit grid cells
    const img = new Image();
    img.src = '/images/nokia-connecting-screen.webp';

    img.onload = () => {
      const offscreen = document.createElement('canvas');
      const step = 16;
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

    // Initialize floating pixel cubes for the intro (positioned in flanks away from central text)
    cubesRef.current = [
      { x: 0.14, y: 0.22, vx: 0.00014, vy: -0.00012, size: 4.2, rotX: 0.4, rotY: 0.2, rotZ: 0.1, vRotX: 0.012, vRotY: 0.018, vRotZ: 0.008 },
      { x: 0.86, y: 0.76, vx: -0.00016, vy: 0.00015, size: 4.6, rotX: 1.1, rotY: 0.8, rotZ: 0.3, vRotX: -0.015, vRotY: 0.02, vRotZ: 0.01 },
      { x: 0.18, y: 0.78, vx: 0.00013, vy: 0.00014, size: 3.5, rotX: 0.2, rotY: 1.5, rotZ: 0.5, vRotX: 0.018, vRotY: -0.012, vRotZ: 0.014 },
      { x: 0.82, y: 0.22, vx: -0.00015, vy: -0.00016, size: 3.8, rotX: 0.9, rotY: 0.3, rotZ: 0.7, vRotX: 0.014, vRotY: 0.016, vRotZ: -0.01 },
      { x: 0.50, y: 0.84, vx: 0.00012, vy: 0.00008, size: 3.2, rotX: 0.6, rotY: 0.9, rotZ: 0.2, vRotX: 0.02, vRotY: 0.01, vRotZ: 0.015 },
    ];

    // Initialize 72 floating square pixel dust particles (denser retro particulate field)
    const particles: Particle[] = [];
    for (let i = 0; i < 72; i++) {
      particles.push({
        x: 0.12 + Math.random() * 0.76,
        y: 0.16 + Math.random() * 0.68,
        vx: (Math.random() - 0.5) * 0.0006,
        vy: (Math.random() - 0.5) * 0.0006,
        size: Math.random() > 0.4 ? 5 : 3.5,
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

      // 2. Compute exact square pixel size based on canvas height (48 rows)
      const pxSize = Math.max(3, Math.floor(H / 48));
      const pixelGap = 1;
      const effectiveSize = Math.max(2, pxSize - pixelGap);
      const verticalOffset = Math.round((H - 48 * pxSize) / 2);

      const rightMinCol = 46;
      const rightMaxCol = 86;
      const rightHandWidth = (rightMaxCol - rightMinCol + 1) * pxSize;

      // Canonical hands resting anchors
      const handGap = 3 * pxSize;
      const boxCols = 41;
      const boxWidth = boxCols * pxSize;
      const baseStartX = Math.round((W - boxWidth) / 2);
      const leftStartX = Math.min(0, baseStartX - (43 * pxSize) - handGap);
      const rightStartX = Math.max(W - rightHandWidth, baseStartX + boxWidth + handGap - (3 * pxSize));

      // Compute exact middle center between left hand tip (~col 44) and right hand tip (~col 46)
      const leftHandEnd = leftStartX + 44 * pxSize;
      const rightHandStart = rightStartX;
      const midBetweenHands = (leftHandEnd + rightHandStart) / 2;

      // Line 1 on row 11, Line 2 on row 20
      const textStartY1 = verticalOffset + 11 * pxSize;
      const textStartY2 = verticalOffset + 20 * pxSize;

      const pixels = handPixelsRef.current;
      ctx.fillStyle = isHoveredRef.current ? '#0c1206' : '#161d0e';

      // Compute animation progress (faster 2000ms duration for energetic generation)
      let progress = 0;
      if (stageRef.current === 'connected') {
        progress = 1;
      } else if (stageRef.current === 'transitioning') {
        const elapsed = performance.now() - transitionStartRef.current;
        progress = Math.min(1, elapsed / 2000);
        if (progress >= 1) {
          stageRef.current = 'connected';
        }
      }

      // 3. Render floating 3D pixel cubes (active in intro, disperses during transition)
      if (progress < 0.38) {
        const cubeAlpha = Math.max(0, 1 - progress / 0.3);
        if (cubeAlpha > 0) {
          cubesRef.current.forEach((cube) => {
            cube.rotX += cube.vRotX;
            cube.rotY += cube.vRotY;
            cube.rotZ += cube.vRotZ;

            cube.x += cube.vx;
            cube.y += cube.vy;

            if (cube.x < 0.06) {
              cube.x = 0.06;
              cube.vx = Math.abs(cube.vx);
            } else if (cube.x > 0.94) {
              cube.x = 0.94;
              cube.vx = -Math.abs(cube.vx);
            }

            if (cube.y < 0.08) {
              cube.y = 0.08;
              cube.vy = Math.abs(cube.vy);
            } else if (cube.y > 0.92) {
              cube.y = 0.92;
              cube.vy = -Math.abs(cube.vy);
            }

            let cx = cube.x * W;
            let cy = cube.y * H;

            // Strict text exclusion zone: cubes bounce away so they never overlap or obscure "have an idea?"
            const textZoneMarginX = (cube.size * 1.6 + 22) * pxSize;
            const textZoneMarginY = (cube.size * 1.6 + 10) * pxSize;
            const textZoneLeft = midBetweenHands - textZoneMarginX;
            const textZoneRight = midBetweenHands + textZoneMarginX;
            const textZoneTop = verticalOffset + 11 * pxSize - textZoneMarginY;
            const textZoneBottom = verticalOffset + 27 * pxSize + textZoneMarginY;

            if (cx >= textZoneLeft && cx <= textZoneRight && cy >= textZoneTop && cy <= textZoneBottom) {
              const distLeft = cx - textZoneLeft;
              const distRight = textZoneRight - cx;
              const distTop = cy - textZoneTop;
              const distBottom = textZoneBottom - cy;
              const minDist = Math.min(distLeft, distRight, distTop, distBottom);

              if (minDist === distLeft) {
                cube.vx = -Math.abs(cube.vx);
                cx = textZoneLeft;
                cube.x = cx / W;
              } else if (minDist === distRight) {
                cube.vx = Math.abs(cube.vx);
                cx = textZoneRight;
                cube.x = cx / W;
              } else if (minDist === distTop) {
                cube.vy = -Math.abs(cube.vy);
                cy = textZoneTop;
                cube.y = cy / H;
              } else {
                cube.vy = Math.abs(cube.vy);
                cy = textZoneBottom;
                cube.y = cy / H;
              }
            }

            // Disperse outward when transition triggers
            if (progress > 0) {
              const dirX = cube.x < 0.5 ? -1 : 1;
              const dirY = cube.y < 0.5 ? -1 : 1;
              cx += dirX * progress * 90;
              cy += dirY * progress * 90;
            }

            renderPixelCube(ctx, cube, cx, cy, pxSize, effectiveSize, cubeAlpha);
          });
        }
      }

      // 4. Render hand pixels:
      // Left hand pixel blocks rise up from the bottom!
      // Right hand pixel blocks drop down from the top!
      if (stageRef.current === 'connected') {
        for (let i = 0; i < pixels.length; i++) {
          const p = pixels[i];
          let px = 0;
          const py = verticalOffset + p.row * pxSize;

          if (p.isLeft) {
            px = leftStartX + p.col * pxSize;
          } else {
            px = rightStartX + (p.col - rightMinCol) * pxSize;
          }

          ctx.fillRect(px, py, effectiveSize, effectiveSize);
        }
      } else if (stageRef.current === 'transitioning' && progress > 0.03) {
        // Energetic retro growth wave generating multiple square clusters simultaneously across the grid (~1.5s)
        const growT = Math.min(1, Math.max(0, (progress - 0.03) / 0.88));

        for (let i = 0; i < pixels.length; i++) {
          const p = pixels[i];
          let targetX = 0;
          const targetY = verticalOffset + p.row * pxSize;
          let dist = 0;

          if (p.isLeft) {
            targetX = leftStartX + p.col * pxSize;
            // Radial growth distance from bottom-left corner (wrist origin: col 0, row 47)
            dist = Math.hypot(p.col, 47 - p.row) / 54;
          } else {
            targetX = rightStartX + (p.col - rightMinCol) * pxSize;
            // Radial growth distance from top-right corner (wrist origin: col 86, row 0)
            dist = Math.hypot(86 - p.col, p.row) / 50;
          }

          // Dense stochastic multi-source matrix variation so many pixel squares generate simultaneously in parallel clusters
          const noise = (Math.sin(p.col * 0.55) * Math.cos(p.row * 0.55) + Math.sin((p.col * 0.3 + p.row * 0.4))) * 0.09;
          const hash = (((p.col * 41 + p.row * 23) % 29) / 29 - 0.5) * 0.12;
          const pixelThreshold = Math.max(0, dist * 0.82 + noise + hash);

          // Authentic retro Nokia LCD: pixels are binary discrete grid elements.
          // Pixels do NOT scale up in size. When the growing wave reaches a grid cell,
          // the pixel is immediately visible at full 1:1 square matrix block size.
          if (growT < pixelThreshold) continue;

          // Full-size visible retro pixel block
          ctx.fillRect(targetX, targetY, effectiveSize, effectiveSize);
        }
      }

      // 5. Render LCD Text (Centered exactly in the middle between the two hands):
      const charWidth = 5;
      const charGap = 1;

      // Helper to compute centered X position for any text string between the two hands
      const getCenteredX = (text: string) => {
        const textCols = text.length * charWidth + (text.length - 1) * charGap;
        const textPixelWidth = textCols * pxSize;
        return Math.round(midBetweenHands - textPixelWidth / 2);
      };

      // Intro: "have an" and "idea?"
      // Transition: "have an idea?" dissolves -> "lets connect" assembles
      // Connected: "lets" and "connect" (or "copied!")
      if (stageRef.current === 'intro') {
        drawBitmapText(ctx, 'have an', getCenteredX('have an'), textStartY1, pxSize, effectiveSize, 1, 10);
        drawBitmapText(ctx, 'idea?', getCenteredX('idea?'), textStartY2, pxSize, effectiveSize, 1, 20);
      } else if (stageRef.current === 'transitioning') {
        if (progress < 0.22) {
          const introDissolve = Math.max(0, 1 - progress / 0.16);
          drawBitmapText(ctx, 'have an', getCenteredX('have an'), textStartY1, pxSize, effectiveSize, introDissolve, 10);
          drawBitmapText(ctx, 'idea?', getCenteredX('idea?'), textStartY2, pxSize, effectiveSize, introDissolve, 20);
        }

        if (progress > 0.08) {
          const connectAssemble = Math.min(1, Math.max(0, (progress - 0.08) / 0.22));
          const line1 = 'lets';
          const line2 = copiedRef.current ? 'copied!' : 'connect';
          drawBitmapText(ctx, line1, getCenteredX(line1), textStartY1, pxSize, effectiveSize, connectAssemble, 30);
          drawBitmapText(ctx, line2, getCenteredX(line2), textStartY2, pxSize, effectiveSize, connectAssemble, 40);
        }
      } else {
        const line1 = 'lets';
        const line2 = copiedRef.current ? 'copied!' : 'connect';
        drawBitmapText(ctx, line1, getCenteredX(line1), textStartY1, pxSize, effectiveSize, 1, 30);
        drawBitmapText(ctx, line2, getCenteredX(line2), textStartY2, pxSize, effectiveSize, 1, 40);
      }

      // 6. Render animated floating square pixel dust
      const mouse = mouseRef.current;
      const t = time * 0.0012;

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

        // Avoid rendering particle dust directly over the central text
        if (
          curX >= midBetweenHands - 24 * pxSize &&
          curX <= midBetweenHands + 24 * pxSize &&
          curY >= verticalOffset + 9 * pxSize &&
          curY <= verticalOffset + 29 * pxSize
        ) {
          return;
        }

        const snapX = Math.round(curX / pxSize) * pxSize;
        const snapY = Math.round(curY / pxSize) * pxSize;
        ctx.fillRect(snapX, snapY, effectiveSize, effectiveSize);
      });

      // 7. Matrix subpixel grid overlay
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
      aria-label={
        copied
          ? 'Email copied to clipboard'
          : stageRef.current === 'intro'
            ? 'Nokia screen - have an idea? click to connect'
            : 'Connect - click to contact sajid al nahian'
      }
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
