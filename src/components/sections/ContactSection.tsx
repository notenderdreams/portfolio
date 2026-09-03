import React from 'react';
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
    </section>
  );
};
