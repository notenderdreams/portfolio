import React, { useEffect, useRef } from 'react';
import { siteMetadata, socialLinks, competitiveLinks } from '../../data/metadata';
import { projects } from '../../data/projects';

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          window.dispatchEvent(new CustomEvent('footerReveal', { detail: { revealed: true } }));
        } else {
          el.classList.remove('is-revealed');
          window.dispatchEvent(new CustomEvent('footerReveal', { detail: { revealed: false } }));
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -20px 0px',
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="editorial-footer-section"
      aria-label="Archive and Directory"
    >
      {/* Animated Rising Background Panel */}
      <div className="editorial-footer-bg" aria-hidden="true" />

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
                  src="/images/sign-bangla.webp"
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
              <button
                type="button"
                className="editorial-reboot-btn"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'instant' });
                  window.dispatchEvent(new CustomEvent('rebootKernel'));
                }}
                title="Restart kernel boot sequence"
              >
                [reboot kernel]
              </button>
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
            <div className="directory-column directory-column-contact">
              <div className="column-heading">[CONTACT]</div>
              <ul className="column-list">
                <li>
                  <a href={`mailto:${siteMetadata.email}`} className="has-arrow is-email">
                    <span className="arrow-icon">↗</span> {siteMetadata.email.toLowerCase()}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${siteMetadata.secondaryEmail}`} className="has-arrow is-email">
                    <span className="arrow-icon">↗</span> {siteMetadata.secondaryEmail.toLowerCase()}
                  </a>
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

            {/* Column 4: Selected Projects */}
            <div className="directory-column">
              <div className="column-heading">[SELECTED]</div>
              <ul className="column-list">
                {projects.map((project) => (
                  <li key={project.id}>
                    <a
                      href={project.githubUrl || '#work'}
                      target={project.githubUrl ? '_blank' : undefined}
                      rel={project.githubUrl ? 'noopener noreferrer' : undefined}
                      className={project.githubUrl ? 'has-arrow' : undefined}
                    >
                      {project.githubUrl && <span className="arrow-icon">↗</span>} {project.title.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Navigation (Far Right) */}
            <div className="directory-column">
              <div className="column-heading">[NAVIGATION]</div>
              <ul className="column-list">
                <li>
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    HOME
                  </a>
                </li>
                <li><a href="#about">PROFILE</a></li>
                <li><a href="#origin">ORIGIN</a></li>
                <li><a href="#work">SELECTED WORKS</a></li>
                <li><a href="#toolbox">TOOLBOX</a></li>
                <li><a href="#contact">CONNECT</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
