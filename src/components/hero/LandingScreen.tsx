import React from 'react';
import { Header } from '../layout/Header';
import { BackgroundVideo } from './BackgroundVideo';
import { HeroStage } from './HeroStage';
import { HeroProse } from './HeroProse';

export const LandingScreen: React.FC = () => {
  return (
    <div id="home" className="landing-screen">
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
