import React from 'react';
import { topThoughts } from '../../data/thoughts';
import { DoodleIcon } from './DoodleIcon';

export const TopThoughts: React.FC = () => {
  const { left, right } = topThoughts;

  return (
    <div className="hero-top-thoughts" aria-hidden="true">
      <div className={`top-thought thought-left ${left.tiltClass || ''}`}>
        <span>{left.text}</span>
        <DoodleIcon src={left.doodleSrc} className={left.doodleClass} />
      </div>
      <div className={`top-thought thought-right ${right.tiltClass || ''}`}>
        <DoodleIcon src={right.doodleSrc} className={right.doodleClass} />
        <span>{right.text}</span>
      </div>
    </div>
  );
};
