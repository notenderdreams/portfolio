import React from 'react';
import { socialLinks } from '../../data/metadata';
import { SectionLabel } from '../common/SectionLabel';
import { NokiaScreen } from './NokiaScreen';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="contact-section scroll-reveal">
      <div className="container contact-block">
        <SectionLabel label="04 / connect" />
      </div>

      {/* Retro Nokia LCD Screen React Component (Wide Rectangular) */}
      <div className="contact-nokia-wrap">
        <NokiaScreen />
      </div>

      {/* Social Links placed after the Nokia section */}
      <div className="container contact-links-wrap">
        <div className="contact-links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
