import React, { useEffect, useRef } from 'react';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startPlay = () => {
          video.play();
          window.removeEventListener('click', startPlay);
          window.removeEventListener('touchstart', startPlay);
          window.removeEventListener('scroll', startPlay);
        };
        window.addEventListener('click', startPlay, { once: true });
        window.addEventListener('touchstart', startPlay, { once: true });
        window.addEventListener('scroll', startPlay, { once: true });
      });
    }
  }, []);

  return (
    <div className="landing-bg-media" aria-hidden="true">
      <video
        ref={videoRef}
        className="landing-bg-video"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/landing_poster.jpg"
        preload="auto"
        disablePictureInPicture
        // @ts-expect-error standard webkit / non-standard attribute
        disableremoteplayback="true"
      >
        <source src="/video/landing_bg.webm" type="video/webm" />
        <source src="/video/landing_bg.mp4" type="video/mp4" />
      </video>
      <div className="landing-bg-overlay" />
    </div>
  );
};
