import React, { useEffect, useState } from 'react';
import { FilmGrain } from './components/layout/FilmGrain';
import { CursorFollower } from './components/layout/CursorFollower';
import { KernelBoot } from './components/boot/KernelBoot';
import { LandingScreen } from './components/hero/LandingScreen';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSectionLoader, SECTION_SPECS } from './hooks/useSectionLoader';
import { SectionSlot } from './components/common/SectionSlot';

export const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [isLandingActive, setIsLandingActive] = useState(false);
  useScrollReveal('.scroll-reveal');
  const { loadedMap, prioritizeUpTo } = useSectionLoader(true);

  useEffect(() => {
    // Reset scroll to top on refresh/load so bootloader always starts at the home stage
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Globally prevent native HTML5 ghost image dragging
    const preventNativeDrag = (e: DragEvent) => {
      e.preventDefault();
    };
    window.addEventListener('dragstart', preventNativeDrag);
    return () => window.removeEventListener('dragstart', preventNativeDrag);
  }, []);

  useEffect(() => {
    const handleReboot = () => {
      window.scrollTo(0, 0);
      setIsLandingActive(false);
      setIsBooted(false);
    };
    window.addEventListener('rebootKernel', handleReboot);
    return () => window.removeEventListener('rebootKernel', handleReboot);
  }, []);

  const handleReveal = React.useCallback(() => {
    setIsLandingActive(true);
  }, []);

  const handleComplete = React.useCallback(() => {
    setIsBooted(true);
  }, []);

  return (
    <>
      {/* Low-Level Kernel Boot Animation & Runtime Asset Preloader */}
      {!isBooted && (
        <KernelBoot
          onReveal={handleReveal}
          onComplete={handleComplete}
        />
      )}

      {/* Film Grain Layer */}
      <FilmGrain />
      <CursorFollower />

      {/* Landing Screen with Animated Video Background */}
      <LandingScreen isActive={isLandingActive} />

      {/* Main Sections (Loaded progressively section-by-section) */}
      <main>
        {SECTION_SPECS.map((spec) => {
          const LoadedComponent = loadedMap[spec.id];
          if (LoadedComponent) {
            return <LoadedComponent key={spec.id} />;
          }
          return (
            <SectionSlot
              key={spec.id}
              id={spec.id}
              minHeight={spec.minHeight}
              onNearViewport={() => prioritizeUpTo(spec.id)}
            />
          );
        })}
      </main>
    </>
  );
};

export default App;
