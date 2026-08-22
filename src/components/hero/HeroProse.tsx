import React from 'react';
import { siteMetadata } from '../../data/metadata';
import { useDynamicDate } from '../../hooks/useDynamicDate';

export const HeroProse: React.FC = () => {
  const formattedDate = useDynamicDate();

  return (
    <>
      {/* Quiet Metadata Row directly below image */}
      <div className="hero-meta-row">
        <span>
          {siteMetadata.locationJapanese} ({siteMetadata.location})
        </span>
        <span id="archive-hero-date">{formattedDate}</span>
        <span>archived by sajid</span>
      </div>

      {/* Tracked All-Caps Block Prose */}
      <div className="all-caps-prose">{siteMetadata.heroProse}</div>
    </>
  );
};
