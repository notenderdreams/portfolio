import React from 'react';

interface SignatureMarkProps {
  embedded?: boolean;
}

export const SignatureMark: React.FC<SignatureMarkProps> = ({ embedded = false }) => {
  return (
    <section
      className={`signature-section${embedded ? ' is-embedded' : ' scroll-reveal'}`}
      aria-label="Sajid Al Nahian signature"
    >
      <div className="signature-mark">
        <img
          className="signature-image signature-image-base"
          src="/images/sign-bangla.png"
          alt="Sajid Al Nahian written in Bengali calligraphy"
        />
        <img
          className="signature-image signature-image-glow"
          src="/images/sign-bangla.png"
          alt=""
          aria-hidden="true"
        />
      </div>
    </section>
  );
};
