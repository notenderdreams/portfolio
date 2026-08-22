import React, { useRef } from 'react';
import { leftFlankThoughts, rightFlankThoughts } from '../../data/thoughts';
import { FlankThoughts } from './FlankThoughts';
import { useParallax } from '../../hooks/useParallax';

export const HeroStage: React.FC = () => {
  const bannerRef = useRef<HTMLImageElement>(null);
  useParallax(bannerRef, 0.05);

  return (
    <div className="hero-stage">
      {/* Left Side Flank Notes */}
      <FlankThoughts thoughts={leftFlankThoughts} side="left" />

      {/* Center Collage Image */}
      <div className="letterbox-wrapper">
        <img
          ref={bannerRef}
          className="letterbox-banner"
          src="/banner.png"
          alt="Artistic collage: shader nodes, soundscapes, cinematography, and Bengali calligraphy"
        />
      </div>

      {/* Right Side Flank Notes */}
      <FlankThoughts thoughts={rightFlankThoughts} side="right" />
    </div>
  );
};
