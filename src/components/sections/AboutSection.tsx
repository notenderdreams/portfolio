import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteMetadata } from '../../data/metadata';
import { SectionLabel } from '../common/SectionLabel';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const introTargets = [
        section.querySelector('.section-label'),
        section.querySelector('.about-profile-grid'),
      ].filter((target): target is Element => target !== null);

      gsap.fromTo(
        introTargets,
        { autoAlpha: 0, y: 28, filter: 'blur(14px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.15,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform,filter',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true,
          },
        }
      );

      const bioEl = section.querySelector('.about-bio-fullwidth');
      const bioSentences = section.querySelectorAll('.bio-sentence');

      if (bioEl && bioSentences.length > 0) {
        gsap.fromTo(
          bioSentences,
          { autoAlpha: 0, y: 22, filter: 'blur(10px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.05,
            stagger: 0.14,
            ease: 'power3.out',
            clearProps: 'opacity,visibility,transform,filter',
            scrollTrigger: {
              trigger: bioEl,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => section.classList.add('is-revealed'),
        onLeaveBack: () => section.classList.remove('is-revealed'),
      });
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <SectionLabel label="01 / profile" />

      <div className="container about-container">
        <div className="about-profile-grid">
          {/* Left Column: Portrait Photograph */}
          <figure className="about-portrait-col">
            <div className="about-portrait-frame">
              <img
                src="/images/nahian.webp"
                alt="Sajid Al Nahian"
                className="about-portrait-img"
                loading="lazy"
              />
            </div>
            <figcaption className="about-portrait-caption">
              <span className="caption-text">fig. 01 — notenderdreams</span>
            </figcaption>
          </figure>

          {/* Right Column: Person Information & Narrative */}
          <div className="about-info-col">
            <header className="about-profile-header">
              <h2 className="about-name">
                <span className="reveal-mask">
                  <span className="reveal-text">{siteMetadata.name}</span>
                </span>
              </h2>
              <div className="about-role-tag">
                <span className="reveal-mask">
                  <span className="reveal-text reveal-delay-1">
                    low-level software, 3D environment art &amp; electronic music
                  </span>
                </span>
              </div>
            </header>

            <dl className="about-details-list">
              <div className="about-detail-item reveal-item reveal-delay-2">
                <dt>AGE</dt>
                <dd>{siteMetadata.age}</dd>
              </div>
              <div className="about-detail-item reveal-item reveal-delay-3">
                <dt>INSTITUTION</dt>
                <dd>{siteMetadata.university}</dd>
              </div>
              <div className="about-detail-item reveal-item reveal-delay-4">
                <dt>DEGREE</dt>
                <dd>{siteMetadata.degree}</dd>
              </div>
              <div className="about-detail-item reveal-item reveal-delay-5">
                <dt>STANDING</dt>
                <dd>{siteMetadata.term}</dd>
              </div>
              <div className="about-detail-item reveal-item reveal-delay-6">
                <dt>LOCATION</dt>
                <dd>
                  {siteMetadata.locationBangla} ({siteMetadata.location})
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Full-width Bio Paragraph below profile grid */}
        <div className="about-bio-text about-bio-fullwidth">
          <p className="bio-narrative-paragraph">
            <span className="bio-sentence">
              I'm a CSE undergraduate from Dhaka who builds software from first principles.
            </span>{' '}
            <span className="bio-sentence">
              Outside of that, most of my time goes into listening to and making music along with 3D environment art and photography.
            </span>{' '}
            <span className="bio-sentence">
              I like to experiment constantly without boxing myself into one lane.
            </span>{' '}
            <span className="bio-sentence">
              If something's genuinely interesting, I'm all in.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
