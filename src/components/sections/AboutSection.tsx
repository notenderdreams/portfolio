import React from 'react';
import { SectionLabel } from '../common/SectionLabel';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="container section-spacer scroll-reveal">
      <SectionLabel label="02 / about &amp; note" />
      <div className="about-block">
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
    </section>
  );
};
