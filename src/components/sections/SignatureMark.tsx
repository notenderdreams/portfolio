import React from 'react';
import { DraggableWorkbenchItem } from './DraggableWorkbenchItem';

interface SignatureMarkProps {
  embedded?: boolean;
}

export const SignatureMark: React.FC<SignatureMarkProps> = ({ embedded = false }) => {
  return (
    <div
      className={`signature-section${embedded ? ' is-embedded' : ' scroll-reveal'}`}
      aria-label="Sajid Al Nahian signature and ESP badge"
    >
      <div className="signature-mark-group">
        <DraggableWorkbenchItem className="signature-mark-draggable">
          <div className="signature-mark">
            <img
              className="signature-image signature-image-base"
              src="/images/sign-bangla.webp"
              alt="Sajid Al Nahian written in Bengali calligraphy"
              draggable={false}
            />
            <img
              className="signature-image signature-image-glow"
              src="/images/sign-bangla.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
            />
          </div>
        </DraggableWorkbenchItem>

        {/* Pixelated Curly Braces Badge */}
        <DraggableWorkbenchItem className="signature-badge-draggable">
          <div className="signature-pixel-badge" title="ESP Mugdho">
            <svg
              viewBox="0 0 10 44"
              className="pixel-brace-svg pixel-brace-left"
              aria-hidden="true"
            >
              <rect x="6.5" y="0" width="3.5" height="1.8" fill="currentColor" />
              <rect x="4.8" y="1.8" width="2.2" height="1.8" fill="currentColor" />
              <rect x="3.4" y="3.6" width="1.8" height="2" fill="currentColor" />
              <rect x="2.4" y="5.6" width="1.6" height="2.4" fill="currentColor" />
              <rect x="2" y="8" width="1.5" height="9" fill="currentColor" />
              <rect x="1" y="17" width="1.6" height="2" fill="currentColor" />
              <rect x="0" y="19" width="1.8" height="2" fill="currentColor" />
              <rect x="0" y="21" width="1.8" height="2" fill="currentColor" />
              <rect x="1" y="23" width="1.6" height="2" fill="currentColor" />
              <rect x="2" y="25" width="1.5" height="9" fill="currentColor" />
              <rect x="2.4" y="34" width="1.6" height="2.4" fill="currentColor" />
              <rect x="3.4" y="36.4" width="1.8" height="2" fill="currentColor" />
              <rect x="4.8" y="38.4" width="2.2" height="1.8" fill="currentColor" />
              <rect x="6.5" y="40.2" width="3.5" height="1.8" fill="currentColor" />
            </svg>

            <img
              src="/images/esp-mugdho.webp"
              alt="ESP Mugdho"
              className="pixel-badge-img"
              draggable={false}
            />

            <svg
              viewBox="0 0 10 44"
              className="pixel-brace-svg pixel-brace-right"
              aria-hidden="true"
            >
              <rect x="0" y="0" width="3.5" height="1.8" fill="currentColor" />
              <rect x="3" y="1.8" width="2.2" height="1.8" fill="currentColor" />
              <rect x="4.8" y="3.6" width="1.8" height="2" fill="currentColor" />
              <rect x="6" y="5.6" width="1.6" height="2.4" fill="currentColor" />
              <rect x="6.5" y="8" width="1.5" height="9" fill="currentColor" />
              <rect x="7.4" y="17" width="1.6" height="2" fill="currentColor" />
              <rect x="8.2" y="19" width="1.8" height="2" fill="currentColor" />
              <rect x="8.2" y="21" width="1.8" height="2" fill="currentColor" />
              <rect x="7.4" y="23" width="1.6" height="2" fill="currentColor" />
              <rect x="6.5" y="25" width="1.5" height="9" fill="currentColor" />
              <rect x="6" y="34" width="1.6" height="2.4" fill="currentColor" />
              <rect x="4.8" y="36.4" width="1.8" height="2" fill="currentColor" />
              <rect x="3" y="38.4" width="2.2" height="1.8" fill="currentColor" />
              <rect x="0" y="40.2" width="3.5" height="1.8" fill="currentColor" />
            </svg>
          </div>
        </DraggableWorkbenchItem>
      </div>
    </div>
  );
};
