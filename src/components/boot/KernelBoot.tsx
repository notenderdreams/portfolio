import React, { useEffect, useRef, useState } from 'react';
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

const BAR_WIDTH = 26;

export const KernelBoot: React.FC<KernelBootProps> = ({ onComplete }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const hasFinishedRef = useRef(false);
  const totalCount = ASSETS_TO_PRELOAD.length + 1; // +1 for fonts

  const finishBoot = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    // Small pause on 100% full bar before curtain slides up
    setTimeout(() => {
      setIsExiting(true);
      // Wait for upward slide animation to finish before unmounting
      setTimeout(() => {
        onComplete();
      }, 750);
    }, 200);
  };

  // Lock body scroll while loader is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Preload assets and advance the progress bar smoothly
  useEffect(() => {
    let isCancelled = false;

    // Trigger preloading
    document.fonts.ready.catch(() => {});
    ASSETS_TO_PRELOAD.forEach((item) => {
      const img = new Image();
      img.src = item.path;
    });

    const runProgress = async () => {
      await new Promise((r) => setTimeout(r, 60));
      if (isCancelled) return;

      setLoadedCount(1);
      await new Promise((r) => setTimeout(r, 60));
      if (isCancelled) return;

      for (let i = 0; i < ASSETS_TO_PRELOAD.length; i++) {
        if (isCancelled) return;
        setLoadedCount(i + 2);
        await new Promise((r) => setTimeout(r, 55));
      }

      if (isCancelled) return;
      finishBoot();
    };

    runProgress();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Generate Cargo progress bar: [=======>       ]
  // Arrow in green, equal signs in white
  const renderCargoBar = () => {
    const ratio = totalCount > 0 ? Math.min(Math.max(loadedCount / totalCount, 0), 1) : 0;
    const filled = Math.round(ratio * BAR_WIDTH);

    if (filled <= 0) {
      return (
        <span className="cargo-progress-track">
          <span className="cargo-bracket-edge">[</span>
          <span className="cargo-arrow">&gt;</span>
          <span className="cargo-spaces">{' '.repeat(BAR_WIDTH - 1)}</span>
          <span className="cargo-bracket-edge">]</span>
        </span>
      );
    }

    if (filled >= BAR_WIDTH) {
      return (
        <span className="cargo-progress-track">
          <span className="cargo-bracket-edge">[</span>
          <span className="cargo-equals">{'='.repeat(BAR_WIDTH)}</span>
          <span className="cargo-bracket-edge">]</span>
        </span>
      );
    }

    const equalsCount = filled - 1;
    const spacesCount = BAR_WIDTH - filled;

    return (
      <span className="cargo-progress-track">
        <span className="cargo-bracket-edge">[</span>
        {equalsCount > 0 && <span className="cargo-equals">{'='.repeat(equalsCount)}</span>}
        <span className="cargo-arrow">&gt;</span>
        {spacesCount > 0 && <span className="cargo-spaces">{' '.repeat(spacesCount)}</span>}
        <span className="cargo-bracket-edge">]</span>
      </span>
    );
  };

  return (
    <aside
      className={`simple-loader-screen${isExiting ? ' is-slide-up' : ''}`}
      aria-label="Loading portfolio"
    >
      <div className="simple-loader-center">
        <div className="simple-loader-label">loading...</div>
        <div className="simple-loader-bar">{renderCargoBar()}</div>
      </div>
    </aside>
  );
};
