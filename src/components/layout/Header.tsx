import React from 'react';
import { navLinks } from '../../data/metadata';

export const Header: React.FC = () => {
  return (
    <header className="site-header">
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

