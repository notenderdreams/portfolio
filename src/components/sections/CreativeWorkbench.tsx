import React from 'react';
import { LandingClip } from './LandingClip';
import { MidiPreview } from './MidiPreview';
import { NodeGraphPreview } from './NodeGraphPreview';
import { SignatureMark } from './SignatureMark';

interface CreativeWorkbenchProps {
  embedded?: boolean;
}

export const CreativeWorkbench: React.FC<CreativeWorkbenchProps> = ({ embedded = false }) => {
  return (
    <section
      className={`creative-workbench${embedded ? ' is-hero' : ' scroll-reveal'}`}
      aria-label="Creative workbench collage"
    >
      <div className="workbench-stage">
        <figure className="workbench-viewer">
          <img
            src="/images/viewer.png"
            alt="DaVinci Resolve viewer showing a motion-blurred dusk cityscape"
          />
        </figure>

        <div className="workbench-nodes">
          <NodeGraphPreview embedded />
        </div>

        <div className="workbench-midi">
          <MidiPreview embedded />
        </div>

        <figure className="workbench-portrait">
          <img
            src="/images/pro-pic.png"
            alt="Sajid photographing his reflection in a night-time garden"
          />
        </figure>

        <div className="workbench-clip">
          <LandingClip embedded />
        </div>

        <div className="workbench-signature">
          <SignatureMark embedded />
        </div>
      </div>
    </section>
  );
};
