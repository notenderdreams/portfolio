import React, { useEffect, useRef } from 'react';

export const LandingClip: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const slowPlayback = () => {
      video.defaultPlaybackRate = 0.5;
      video.playbackRate = 0.5;
    };

    slowPlayback();
    video.addEventListener('loadedmetadata', slowPlayback);

    return () => video.removeEventListener('loadedmetadata', slowPlayback);
  }, []);

  return (
    <section className="landing-clip-section scroll-reveal" aria-label="Featured film clip">
      <figure className="resolve-clip" aria-label="Selected video clip clip-preview.mov">
        <div className="resolve-clip-viewport">
          <video
            ref={videoRef}
            className="resolve-clip-video"
            aria-label="A weathered chair and small flower pot in a softly lit garden"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
          >
            <source src="/video/clip-preview.mp4" type="video/mp4" />
          </video>
        </div>

        <figcaption className="resolve-clip-footer">
          <svg className="resolve-link-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.5 14.5 14.5 9M7.2 17.8l-1 1a3.54 3.54 0 0 1-5-5l3.6-3.6a3.54 3.54 0 0 1 5 0M16.8 6.2l1-1a3.54 3.54 0 0 1 5 5l-3.6 3.6a3.54 3.54 0 0 1-5 0" />
          </svg>
          <span>clip-preview.mov</span>
        </figcaption>
      </figure>
    </section>
  );
};
