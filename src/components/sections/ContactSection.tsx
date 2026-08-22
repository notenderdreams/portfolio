import React from 'react';
import { siteMetadata, socialLinks } from '../../data/metadata';
import { SectionLabel } from '../common/SectionLabel';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="container contact-block scroll-reveal">
      <SectionLabel label="04 / connect" />
      <a href={`mailto:${siteMetadata.email}`} className="contact-email">
        {siteMetadata.email}
      </a>
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
    </section>
  );
};
