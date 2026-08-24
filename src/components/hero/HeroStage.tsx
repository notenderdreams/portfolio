import React from 'react';
import { CreativeWorkbench } from '../sections/CreativeWorkbench';

export const HeroStage: React.FC = () => {
  return (
    <div className="hero-stage">
      {/* Reserved left flank; annotations temporarily hidden */}
      <div className="hero-flank hero-flank-left" aria-hidden="true" />

      {/* Center collage assembled from live, independent components */}
      <div className="letterbox-wrapper">
        <CreativeWorkbench embedded />
      </div>

      {/* Reserved right flank; annotations temporarily hidden */}
      <div className="hero-flank hero-flank-right" aria-hidden="true" />
    </div>
  );
};
