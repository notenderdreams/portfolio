import React from 'react';
import { SectionLabel } from '../common/SectionLabel';
import { NokiaScreen } from './NokiaScreen';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="contact-section scroll-reveal">
      <SectionLabel label="05 / connect" />

      {/* Retro Nokia LCD Screen React Component (Wide Rectangular) */}
      <div className="contact-nokia-wrap">
        <NokiaScreen />
      </div>
    </section>
  );
};
