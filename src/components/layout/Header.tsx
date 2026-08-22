import React from 'react';
import { siteMetadata, navLinks } from '../../data/metadata';

export const Header: React.FC = () => {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top">
        {siteMetadata.brandMark}
      </a>
      <nav className="site-nav" aria-label="Main Navigation">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};
