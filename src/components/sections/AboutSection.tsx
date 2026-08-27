import React from 'react';
import { siteMetadata } from '../../data/metadata';
import { SectionLabel } from '../common/SectionLabel';

const waveformBars = [30, 40, 36, 52, 64, 57, 72, 88, 100, 94, 96, 92, 90, 94, 96, 98, 100, 100];

const MusicPlayButton: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      if (audio.ended) {
        audio.currentTime = 0;
        setProgress(0);
      }
      void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    setProgress(audio.currentTime / audio.duration);
  };

  return (
    <>
      <span className="about-music-control-wrap">
        <button
          className={`about-music-control${isPlaying ? ' is-playing' : ''}`}
          type="button"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          aria-pressed={isPlaying}
          onClick={togglePlayback}
        >
          <span className="about-music-play" aria-hidden="true">
            <svg className="about-music-note" viewBox="0 0 24 24">
              <path d="M9 18.5a2.5 2.5 0 1 1-2.5-2.5A2.5 2.5 0 0 1 9 18.5Zm0 0V6l10-2v11.5a2.5 2.5 0 1 1-2.5-2.5A2.5 2.5 0 0 1 19 15.5" />
            </svg>
            <i />
            <i />
          </span>
          <span className="about-music-waveform" aria-hidden="true">
            {waveformBars.map((height, index) => (
              <i
                key={index}
                className={index / waveformBars.length < progress ? 'is-played' : ''}
                style={{ height: `${height}%` }}
              />
            ))}
          </span>
        </button>
      </span>
      <audio
        ref={audioRef}
        src="/audio/2013.mp3"
        preload="metadata"
        onTimeUpdate={updateProgress}
        onEnded={() => {
          setIsPlaying(false);
          setProgress(1);
        }}
      />
    </>
  );
};

const PhotoManipulationStack: React.FC = () => {
  const stackRef = useRef<HTMLSpanElement>(null);
  const carRef = useRef<HTMLSpanElement>(null);
  const fallingRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const returnTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const stack = stackRef.current;
    const car = carRef.current;
    const falling = fallingRef.current;
    if (!stack || !car || !falling || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.set(car, { x: 0, y: 0, rotation: -5, scale: 1, zIndex: 1, transformOrigin: 'center center' });
      gsap.set(falling, { x: 0, y: 0, rotation: 4, scale: 1, zIndex: 0, transformOrigin: 'center center' });

      timelineRef.current = gsap.timeline({ paused: true })
        .to(car, {
          x: -15,
          y: -8,
          rotation: -8,
          scale: 1.04,
          duration: 0.18,
          ease: 'power2.out',
        }, 0)
        .to(falling, {
          x: 15,
          y: 8,
          rotation: 8,
          scale: 0.96,
          duration: 0.18,
          ease: 'power2.out',
        }, 0)
        .set(car, { zIndex: 0 }, 0.2)
        .set(falling, { zIndex: 2 }, 0.2)
        .to(car, {
          x: 38,
          y: 19,
          rotation: 4,
          scale: 0.97,
          boxShadow: '0 0.3rem 0.75rem rgba(0, 0, 0, 0.22)',
          duration: 0.38,
          ease: 'power3.out',
        }, 0.18)
        .to(falling, {
          x: -27,
          y: -15,
          rotation: -4,
          scale: 1.035,
          boxShadow: '0 0.85rem 1.65rem rgba(0, 0, 0, 0.42)',
          duration: 0.38,
          ease: 'power3.out',
        }, 0.18);

      returnTimelineRef.current = gsap.timeline({ paused: true })
        .to(car, {
          x: 52,
          y: 27,
          rotation: 8,
          scale: 0.95,
          duration: 0.18,
          ease: 'power2.out',
        }, 0)
        .to(falling, {
          x: -40,
          y: -23,
          rotation: -8,
          scale: 1.06,
          duration: 0.18,
          ease: 'power2.out',
        }, 0)
        .set(car, { zIndex: 1 }, 0.2)
        .set(falling, { zIndex: 0 }, 0.2)
        .to(car, {
          x: 0,
          y: 0,
          rotation: -5,
          scale: 1,
          boxShadow: '0 0.55rem 1.1rem rgba(0, 0, 0, 0.3)',
          duration: 0.38,
          ease: 'power3.out',
        }, 0.18)
        .to(falling, {
          x: 0,
          y: 0,
          rotation: 4,
          scale: 1,
          boxShadow: '0 0.55rem 1.1rem rgba(0, 0, 0, 0.3)',
          duration: 0.38,
          ease: 'power3.out',
        }, 0.18);
    }, stack);

    return () => context.revert();
  }, []);

  return (
    <span
      ref={stackRef}
      className="about-inline-photo-stack"
      role="img"
      aria-label="Two photo manipulation artworks"
      onMouseEnter={() => {
        returnTimelineRef.current?.pause();
        timelineRef.current?.restart();
      }}
      onMouseLeave={() => {
        timelineRef.current?.pause();
        returnTimelineRef.current?.restart();
      }}
    >
    <span ref={carRef} className="about-inline-photo-card about-inline-photo-card-car">
      <img src="/images/photo-manipulation-car.jpg" alt="" />
    </span>
    <span ref={fallingRef} className="about-inline-photo-card about-inline-photo-card-falling">
      <img src="/images/photo-manipulation-falling.png" alt="" />
    </span>
    </span>
  );
};

const RelightingCube: React.FC = () => (
  <span className="about-lighting-cube" role="img" aria-label="A rotating liquid-metal cube">
    <span className="about-lighting-cube-object" aria-hidden="true">
      <span className="about-cube-face about-cube-front" />
      <span className="about-cube-face about-cube-back" />
      <span className="about-cube-face about-cube-right" />
      <span className="about-cube-face about-cube-left" />
      <span className="about-cube-face about-cube-top" />
      <span className="about-cube-face about-cube-bottom" />
    </span>
  </span>
);

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
                  low-level software, real-time shaders &amp; electronic music
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
              gravitates toward <b>low-level software</b>, <b>real-time shaders</b>, and{' '}
              <b>electronic music</b>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
