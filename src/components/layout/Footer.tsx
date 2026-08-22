import React from 'react';
import { siteMetadata } from '../../data/metadata';
import { useDynamicDate } from '../../hooks/useDynamicDate';

export const Footer: React.FC = () => {
  const formattedDate = useDynamicDate();

  return (
    <footer className="site-footer">
      <div>archived by {siteMetadata.name}</div>
      <div id="archive-date">{formattedDate}</div>
    </footer>
  );
};
