import React, { useEffect, useState } from 'react';
import { FilmGrain } from './components/layout/FilmGrain';
import { CursorFollower } from './components/layout/CursorFollower';
import { KernelBoot } from './components/boot/KernelBoot';
import { LandingScreen } from './components/hero/LandingScreen';
import { SelectedWorks } from './components/sections/SelectedWorks';
import { AboutSection } from './components/sections/AboutSection';
import { OriginSection } from './components/sections/OriginSection';
import { ToolboxSection } from './components/sections/ToolboxSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

export const App: React.FC = () => {
  const [isBooted, setIsBooted] = useState(false);
  const [isLandingActive, setIsLandingActive] = useState(false);
  useScrollReveal('.scroll-reveal');

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

      {/* Main Sections */}
      <main>
        <AboutSection />
        <OriginSection />
        <SelectedWorks />
        <ToolboxSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default App;
