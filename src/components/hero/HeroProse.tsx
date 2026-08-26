import React from 'react';
import { siteMetadata } from '../../data/metadata';
import { useDynamicDate } from '../../hooks/useDynamicDate';
import { useDhakaTime } from '../../hooks/useDhakaTime';

export const HeroProse: React.FC = () => {
  const formattedDate = useDynamicDate();
  const dhakaTime = useDhakaTime();

  return (
    <>
      {/* Quiet Metadata Row directly below image */}
      <div className="hero-meta-row">
        <span>
          {siteMetadata.locationBangla} ({siteMetadata.location})
        </span>
        <span id="archive-hero-date">{formattedDate}</span>
        <span id="dhaka-time">{dhakaTime}</span>
      </div>

      {/* Tracked All-Caps Block Prose */}
      <div className="all-caps-prose">{siteMetadata.heroProse}</div>
    </>
  );
};
