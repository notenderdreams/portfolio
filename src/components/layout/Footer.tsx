import React from 'react';
import { siteMetadata, socialLinks, competitiveLinks } from '../../data/metadata';
import { useDynamicDate } from '../../hooks/useDynamicDate';

export const Footer: React.FC = () => {
  const formattedDate = useDynamicDate();

  return (
    <footer className="editorial-footer-section" aria-label="Archive and Directory">
      <div className="editorial-footer-container">
        {/* Outer Architectural Crop Marks & Ticks */}
        <div className="crop-tick crop-tl" aria-hidden="true" />
        <div className="crop-tick crop-tr" aria-hidden="true" />
        <div className="crop-tick crop-bl" aria-hidden="true" />
        <div className="crop-tick crop-br" aria-hidden="true" />

        {/* Top and Bottom Hairline Framing Lines */}
        <div className="crop-line-top" aria-hidden="true" />
        <div className="crop-line-bottom" aria-hidden="true" />

        <div className="editorial-footer-inner">
          {/* Left Column: Brand Signature & Meta */}
          <div className="editorial-brand-col">
            <div className="editorial-brand-top">
              <div className="editorial-signature-block">
                <img
                  src="/images/sign-bangla.png"
                  alt="Sajid Al Nahian signature"
                  className="editorial-sign-bangla"
                  draggable={false}
                />
              </div>
            </div>

            <div className="editorial-brand-bottom">
              <div className="editorial-meta-line editorial-copyright">
                NOTENDERDREAMS &copy; {new Date().getFullYear()}
              </div>
              <div className="editorial-meta-line editorial-location">
                DHAKA &mdash; {formattedDate}
              </div>
            </div>
          </div>

          {/* Vertical Architectural Divider with Cross Ticks */}
          <div className="editorial-divider" aria-hidden="true">
            <span className="divider-tick-top" />
            <span className="divider-tick-bottom" />
          </div>

          {/* Right Directory: 4-Column Monospace Technical Grid */}
          <div className="editorial-directory-grid">
            {/* Column 1: Contact */}
            <div className="directory-column">
              <div className="column-heading">[CONTACT]</div>
              <ul className="column-list">
                <li>
                  <a href={`mailto:${siteMetadata.email}`} className="has-arrow">
                    <span className="arrow-icon">↗</span> {siteMetadata.email.toUpperCase()}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="has-arrow">
                    <span className="arrow-icon">↗</span> NOKIA SCREEN
                  </a>
                </li>
                <li>
                  <span className="has-arrow">
                    <span className="arrow-icon">↗</span> DHAKA, BD (UTC+6)
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 2: Socials */}
            <div className="directory-column">
              <div className="column-heading">[SOCIALS]</div>
              <ul className="column-list">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="has-arrow"
                    >
                      <span className="arrow-icon">↗</span> {link.label.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Code Handles */}
            <div className="directory-column">
              <div className="column-heading">[CODE HANDLES]</div>
              <ul className="column-list">
                {competitiveLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="has-arrow"
                    >
                      <span className="arrow-icon">↗</span> {link.label.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Navigation */}
            <div className="directory-column">
              <div className="column-heading">[NAVIGATION]</div>
              <ul className="column-list">
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#work">SELECTED WORKS</a></li>
                <li><a href="#about">CREATIVE WORKBENCH</a></li>
                <li><a href="#toolbox">TOOLBOX &amp; STACK</a></li>
                <li><a href="#contact">NOKIA CONNECT</a></li>
              </ul>
            </div>

            {/* Column 4: Selected Projects */}
            <div className="directory-column">
              <div className="column-heading">[SELECTED]</div>
              <ul className="column-list">
                <li><a href="#work">GATEKEEPER (DSP)</a></li>
                <li><a href="#work">AETHERIA (UE5)</a></li>
                <li><a href="#work">MONOLITH (KERNEL)</a></li>
                <li><a href="#work">CHROMA (ACES)</a></li>
                <li><a href="#work">SPECTRA (SYNTH)</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
