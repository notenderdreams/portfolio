import React, { useEffect } from 'react';
import { FilmGrain } from './components/layout/FilmGrain';
import { CursorFollower } from './components/layout/CursorFollower';
import { LandingScreen } from './components/hero/LandingScreen';
import { SelectedWorks } from './components/sections/SelectedWorks';
import { AboutSection } from './components/sections/AboutSection';
import { ToolboxSection } from './components/sections/ToolboxSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

export const App: React.FC = () => {
  useScrollReveal('.scroll-reveal');

  useEffect(() => {
    // Globally prevent native HTML5 ghost image dragging to ensure the custom cursor and custom dragging stay flawless
    const preventNativeDrag = (e: DragEvent) => {
      e.preventDefault();
    };
    window.addEventListener('dragstart', preventNativeDrag);
    return () => window.removeEventListener('dragstart', preventNativeDrag);
  }, []);

  return (
    <>
      {/* Film Grain Layer */}
      <FilmGrain />
      <CursorFollower />

      {/* Landing Screen with Animated Video Background */}
      <LandingScreen />

      {/* Main Sections */}
      <main>
        <AboutSection />
        <SelectedWorks />
        <ToolboxSection />
        <ContactSection />
      </main>

      {/* Quiet Footer */}
      <Footer />
    </>
  );
};

export default App;
