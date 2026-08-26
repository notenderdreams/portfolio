import React from 'react';
import { siteMetadata } from '../../data/metadata';
import { SectionLabel } from '../common/SectionLabel';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="container section-spacer about-section scroll-reveal">
      <SectionLabel label="01 / about &amp; profile" />

      <div className="about-profile-grid">
        {/* Left Column: Portrait Photograph */}
        <figure className="about-portrait-col">
          <div className="about-portrait-frame">
            <img
              src="/images/nahian.jpg"
              alt="Sajid Al Nahian"
              className="about-portrait-img"
              loading="lazy"
            />
          </div>
          <figcaption className="about-portrait-caption">
            <span className="caption-text">fig. 01 — him</span>
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
                  systems programming · 3d graphics · audio dsp
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

          <div className="about-bio-text">
            <p className="reveal-item reveal-delay-7">
              I am a CSE undergraduate from Dhaka, building software from first principles. My work
              gravitates toward <b>systems programming</b>, <b>real-time audio DSP</b>, and{' '}
              <b>computer graphics</b>.
            </p>
            <blockquote className="about-quote reveal-item reveal-delay-8">
              &ldquo;Computers are fast, but memory is slow. Understanding the hardware is the only
              way to make things truly sing.&rdquo;
            </blockquote>
            <p className="reveal-item reveal-delay-9">
              When not staring at disassembly or GDB, I explore 3D worldbuilding in Unreal Engine 5,
              compose ambient soundscapes in Ableton, and experiment with film print emulation in
              DaVinci Resolve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
