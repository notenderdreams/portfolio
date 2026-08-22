import React from 'react';
import { Header } from '../layout/Header';
import { BackgroundVideo } from './BackgroundVideo';
import { TopThoughts } from './TopThoughts';
import { HeroStage } from './HeroStage';
import { HeroProse } from './HeroProse';

export const LandingScreen: React.FC = () => {
  return (
    <div className="landing-screen">
      {/* Background Animated Video Layer */}
      <BackgroundVideo />

      {/* Header Navigation */}
      <Header />

      {/* Hero Content */}
      <section id="top" className="container hero-section">
        <TopThoughts />
        <HeroStage />
        <HeroProse />
      </section>
    </div>
  );
};
