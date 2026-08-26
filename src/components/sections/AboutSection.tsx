import React from 'react';
import { siteMetadata } from '../../data/metadata';
import { SectionLabel } from '../common/SectionLabel';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="container section-spacer scroll-reveal">
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
            <span>fig. 01 — him</span>
          </figcaption>
        </figure>

        {/* Right Column: Person Information & Narrative */}
        <div className="about-info-col">
          <header className="about-profile-header">
            <h2 className="about-name">{siteMetadata.name}</h2>
            <div className="about-role-tag">systems programming · 3d graphics · audio dsp</div>
          </header>

          <dl className="about-details-list">
            <div className="about-detail-item">
              <dt>AGE</dt>
              <dd>{siteMetadata.age}</dd>
            </div>
            <div className="about-detail-item">
              <dt>INSTITUTION</dt>
              <dd>{siteMetadata.university}</dd>
            </div>
            <div className="about-detail-item">
              <dt>DEGREE</dt>
              <dd>{siteMetadata.degree}</dd>
            </div>
            <div className="about-detail-item">
              <dt>STANDING</dt>
              <dd>{siteMetadata.term}</dd>
            </div>
            <div className="about-detail-item">
              <dt>LOCATION</dt>
              <dd>{siteMetadata.locationBangla} ({siteMetadata.location})</dd>
            </div>
          </dl>

          <div className="about-bio-text">
            <p>
              I am a CSE undergraduate from Dhaka, building software from first principles. My work
              gravitates toward <b>systems programming</b>, <b>real-time audio DSP</b>, and{' '}
              <b>computer graphics</b>.
            </p>
            <blockquote className="about-quote">
              &ldquo;Computers are fast, but memory is slow. Understanding the hardware is the only way to
              make things truly sing.&rdquo;
            </blockquote>
            <p>
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
