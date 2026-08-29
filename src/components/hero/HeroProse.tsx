import React from 'react';
import { useDhakaTime } from '../../hooks/useDhakaTime';

export const HeroProse: React.FC = () => {
  const dhakaTime = useDhakaTime();

  return (
    <div className="hero-meta-row">
      <span>
        DHAKA, BD
      </span>
      <span id="archive-hero-date">08 29 26</span>
      <span id="dhaka-time">{dhakaTime}</span>
    </div>
  );
};
