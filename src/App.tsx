import React from 'react';
import { FilmGrain } from './components/layout/FilmGrain';
import { LandingScreen } from './components/hero/LandingScreen';
import { SelectedWorks } from './components/sections/SelectedWorks';
import { LandingClip } from './components/sections/LandingClip';
import { MidiPreview } from './components/sections/MidiPreview';
import { AboutSection } from './components/sections/AboutSection';
import { ToolboxSection } from './components/sections/ToolboxSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/layout/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

export const App: React.FC = () => {
  useScrollReveal('.scroll-reveal');

  return (
    <>
      {/* Film Grain Layer */}
      <FilmGrain />

      {/* Landing Screen with Animated Video Background */}
      <LandingScreen />

      {/* Main Sections */}
      <main>
        <LandingClip />
        <MidiPreview />
        <SelectedWorks />
        <AboutSection />
        <ToolboxSection />
        <ContactSection />
      </main>

      {/* Quiet Footer */}
      <Footer />
    </>
  );
};

export default App;
