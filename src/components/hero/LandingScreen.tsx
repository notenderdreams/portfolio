import React from 'react';
import { Header } from '../layout/Header';
import { BackgroundVideo } from './BackgroundVideo';
import { HeroStage } from './HeroStage';
import { HeroProse } from './HeroProse';

interface LandingScreenProps {
  isActive?: boolean;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ isActive = false }) => {
  return (
    <div id="home" className={`landing-screen${isActive ? ' is-active' : ''}`}>
      {/* Background Animated Video Layer */}
      <BackgroundVideo />

      {/* Header Navigation */}
      <Header />

      {/* Hero Content */}
      <section id="top" className="container hero-section">
        <HeroStage />
        <HeroProse />
      </section>
    </div>
  );
};
