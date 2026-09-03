import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../../styles/boot.css';

interface KernelBootProps {
  onReveal?: () => void;
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

export const KernelBoot: React.FC<KernelBootProps> = ({ onReveal, onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const equalsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const onRevealRef = useRef(onReveal);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onRevealRef.current = onReveal;
    onCompleteRef.current = onComplete;
  });

  // Lock body scroll while loader is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Run progress once on mount - never restarts on parent re-renders
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

    // Linear progress tween
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
          equalsEl.style.width = `${p * (TRACK_CHARS - 1)}ch`;
          arrowEl.style.transform = `translate3d(${p * (TRACK_CHARS - 1)}ch, 0, 0)`;
          arrowEl.style.opacity = '1';
        }
      },
      onComplete: () => {
        if (isCancelled) return;

        // 1. Switch from progress bar to Cargo "Finished" line
        setIsFinished(true);

        // 2. Hold on "Finished" line for 520ms so user clearly sees the Cargo result
        setTimeout(() => {
          if (isCancelled) return;
          setIsExiting(true);
          document.body.style.overflow = '';
          onRevealRef.current?.();

          // 3. Wait for 0.85s slide-up animation to finish before unmounting
          setTimeout(() => {
            if (isCancelled) return;
            onCompleteRef.current?.();
          }, 850);
        }, 520);
      },
    });

    return () => {
      isCancelled = true;
      tween.kill();
    };
  }, []);

  return (
    <aside
      className={`simple-loader-screen${isExiting ? ' is-exiting' : ''}`}
      aria-label="Loading portfolio"
    >
      {isFinished ? (
        <div className="cargo-finished-line">
          <span className="cargo-finished-tag">Finished</span>
          <span className="cargo-finished-details">`notenderdreams` portfolio [optimized] in 1.85s</span>
        </div>
      ) : (
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
      )}
    </aside>
  );
};
