import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../../styles/boot.css';

interface KernelBootProps {
  onComplete: () => void;
}

interface PreloadItem {
  path: string;
}

const ASSETS_TO_PRELOAD: PreloadItem[] = [
  { path: '/images/viewer.webp' },
  { path: '/images/pro-pic.webp' },
  { path: '/images/nahian.webp' },
  { path: '/images/gatekeeper-midi.webp' },
  { path: '/images/sign-bangla.webp' },
  { path: '/images/node-graph.webp' },
  { path: '/images/esp-mugdho.webp' },
  { path: '/images/landing_poster.webp' },
  { path: '/images/photo-manipulation-falling.webp' },
  { path: '/images/photo-manipulation-car.webp' },
  { path: '/images/nokia-connecting-screen.webp' },
  { path: '/images/projects/voidcrate_home.webp' },
  { path: '/images/projects/voidcrate_assets.webp' },
  { path: '/images/projects/voidcrate_projects.webp' },
  { path: '/video/landing_bg.webm' },
];

const TRACK_CHARS = 26;
const EQUALS_STRING = '='.repeat(TRACK_CHARS + 2);

export const KernelBoot: React.FC<KernelBootProps> = ({ onComplete }) => {
  const [isTextFading, setIsTextFading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const equalsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  // Lock body scroll while loader is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Perfectly smooth, zero-lag, constant-velocity progression
  useEffect(() => {
    let isCancelled = false;
    const equalsEl = equalsRef.current;
    const arrowEl = arrowRef.current;
    if (!equalsEl || !arrowEl) return;

    // Defer network image preloads to avoid blocking frame 0
    const triggerPreloads = () => {
      document.fonts.ready.catch(() => {});
      ASSETS_TO_PRELOAD.forEach((item) => {
        const img = new Image();
        img.src = item.path;
      });
    };
    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(triggerPreloads);
    } else {
      setTimeout(triggerPreloads, 50);
    }

    const progressObj = { value: 0 };

    // Initial position: 0ch width, arrow at 0ch, starts instantly
    equalsEl.style.width = '0ch';
    arrowEl.style.transform = 'translate3d(0ch, 0, 0)';
    arrowEl.style.opacity = '1';

    // Linear ease ('none'): moves immediately from millisecond 0 with constant steady speed
    const tween = gsap.to(progressObj, {
      value: 1,
      duration: 1.85,
      ease: 'none',
      onUpdate: () => {
        if (isCancelled || !equalsEl || !arrowEl) return;
        const p = progressObj.value;

        if (p >= 0.995) {
          equalsEl.style.width = `${TRACK_CHARS}ch`;
          arrowEl.style.transform = `translate3d(${TRACK_CHARS - 1}ch, 0, 0)`;
          arrowEl.style.opacity = '0';
        } else {
          // Continuous sub-pixel advance in lockstep
          equalsEl.style.width = `${p * (TRACK_CHARS - 1)}ch`;
          arrowEl.style.transform = `translate3d(${p * (TRACK_CHARS - 1)}ch, 0, 0)`;
          arrowEl.style.opacity = '1';
        }
      },
      onComplete: () => {
        if (isCancelled) return;

        // Stage 1: Hold on 100% full bar for 160ms, then evaporate text
        setTimeout(() => {
          if (isCancelled) return;
          setIsTextFading(true);

          // Stage 2: 220ms later, dissolve the dark screen into the hero stage
          setTimeout(() => {
            if (isCancelled) return;
            setIsExiting(true);

            // Stage 3: Complete and unmount after dissolve finishes
            setTimeout(() => {
              if (isCancelled) return;
              onComplete();
            }, 750);
          }, 220);
        }, 160);
      },
    });

    return () => {
      isCancelled = true;
      tween.kill();
    };
  }, [onComplete]);

  return (
    <aside
      className={`simple-loader-screen${isTextFading ? ' is-text-fading' : ''}${
        isExiting ? ' is-exiting' : ''
      }`}
      aria-label="Loading portfolio"
    >
      <div className="simple-loader-row">
        <span className="simple-loader-label">loading</span>
        <span className="cargo-bar-container">
          <span className="cargo-bracket-edge">[</span>
          <span className="cargo-track">
            <span ref={equalsRef} className="cargo-equals-stream" aria-hidden="true">
              {EQUALS_STRING}
            </span>
            <span ref={arrowRef} className="cargo-arrow-glide" aria-hidden="true">
              &gt;
            </span>
          </span>
          <span className="cargo-bracket-edge">]</span>
        </span>
      </div>
    </aside>
  );
};
