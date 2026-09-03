import React from 'react';
import { siteMetadata } from '../../data/metadata';
import { useDynamicDate } from '../../hooks/useDynamicDate';

export const Footer: React.FC = () => {
  const formattedDate = useDynamicDate();

  return (
    <footer className="site-footer-wrap">
      <div className="container site-footer">
        <div>archived by {siteMetadata.name}</div>
        <div id="archive-date">{formattedDate}</div>
      </div>
    </footer>
  );
};
