import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteMetadata } from '../../data/metadata';
import { SectionLabel } from '../common/SectionLabel';

const waveformBars = [30, 40, 36, 52, 64, 57, 72, 88, 100, 94, 96, 92, 90, 94, 96, 98, 100, 100];

const RustCrabVim: React.FC<{ isStoryActive?: boolean }> = ({ isStoryActive = false }) => (
  <span
    className={`about-crab-viewport${isStoryActive ? ' is-story-active' : ''}`}
    role="img"
    aria-label="Official Rust mascot Ferris holding and lifting the Vim logo"
  >
    <svg className="about-crab-svg" viewBox="0 0 1200 800" aria-hidden="true">
      {/* Official Ferris Underbody & Legs */}
      <g className="about-crab-legs">
        <g transform="matrix(1,0,0,1,597.344,637.02)">
          <path d="M0,-279.559C-121.238,-279.559 -231.39,-264.983 -312.939,-241.23L-312.939,-38.329C-231.39,-14.575 -121.238,0 0,0C138.76,0 262.987,-19.092 346.431,-49.186L346.431,-230.37C262.987,-260.465 138.76,-279.559 0,-279.559" fill="#a52b00" />
        </g>
        <g transform="matrix(1,0,0,1,1068.75,575.642)">
          <path d="M0,-53.32L-14.211,-82.761C-14.138,-83.879 -14.08,-84.998 -14.08,-86.121C-14.08,-119.496 -48.786,-150.256 -107.177,-174.883L-107.177,2.643C-79.932,-8.849 -57.829,-21.674 -42.021,-35.482C-46.673,-16.775 -62.585,21.071 -75.271,47.686C-96.121,85.752 -103.671,118.889 -102.703,120.53C-102.086,121.563 -94.973,110.59 -84.484,92.809C-60.074,58.028 -13.82,-8.373 -4.575,-25.287C5.897,-44.461 0,-53.32 0,-53.32" fill="#a52b00" />
        </g>
        <g transform="matrix(1,0,0,1,149.064,591.421)">
          <path d="M0,-99.954C0,-93.526 1.293,-87.194 3.788,-80.985L-4.723,-65.835C-4.723,-65.835 -11.541,-56.989 0.465,-38.327C11.055,-21.872 64.1,42.54 92.097,76.271C104.123,93.564 112.276,104.216 112.99,103.187C114.114,101.554 105.514,69.087 81.631,32.046C70.487,12.151 57.177,-14.206 49.189,-33.675C71.492,-19.559 100.672,-6.755 135.341,4.265L135.341,-204.17C51.797,-177.622 0,-140.737 0,-99.954" fill="#a52b00" />
        </g>
      </g>

      {/* Official Ferris Carapace Body */}
      <g className="about-crab-body-wrap">
        <g transform="matrix(1,0,0,1,1151.27,281.813)">
          <path d="M0,240.343L-93.415,171.532C-94.295,168.468 -95.171,165.405 -96.077,162.37L-65.394,117.919C-62.264,113.397 -61.629,107.521 -63.663,102.364C-65.7,97.234 -70.154,93.554 -75.426,92.654L-127.31,83.849C-129.318,79.747 -131.426,75.707 -133.54,71.699L-111.743,21.796C-109.5,16.709 -109.974,10.801 -112.946,6.188C-115.907,1.552 -120.936,-1.156 -126.295,-0.945L-178.951,0.968C-181.678,-2.582 -184.447,-6.1 -187.272,-9.553L-175.172,-63.043C-173.947,-68.476 -175.494,-74.161 -179.275,-78.107C-183.037,-82.039 -188.504,-83.666 -193.701,-82.39L-244.99,-69.782C-248.311,-72.717 -251.688,-75.615 -255.104,-78.455L-253.256,-133.369C-253.058,-138.928 -255.649,-144.211 -260.1,-147.294C-264.546,-150.398 -270.193,-150.867 -275.056,-148.56L-322.903,-125.813C-326.757,-128.023 -330.631,-130.213 -334.547,-132.33L-343.002,-186.445C-343.859,-191.928 -347.387,-196.584 -352.328,-198.711C-357.251,-200.848 -362.896,-200.158 -367.219,-196.903L-409.878,-164.896C-414.078,-166.291 -418.297,-167.628 -422.57,-168.907L-440.956,-220.223C-442.826,-225.452 -447.137,-229.294 -452.394,-230.374C-457.633,-231.446 -463.024,-229.632 -466.657,-225.572L-502.563,-185.401C-506.906,-185.901 -511.249,-186.357 -515.606,-186.732L-543.33,-233.445C-546.14,-238.177 -551.1,-241.057 -556.446,-241.057C-561.78,-241.057 -566.75,-238.177 -569.536,-233.445L-597.269,-186.732C-601.627,-186.357 -605.991,-185.901 -610.325,-185.401L-646.235,-225.572C-649.871,-229.632 -655.282,-231.446 -660.503,-230.374C-665.758,-229.282 -670.076,-225.452 -671.936,-220.223L-690.338,-168.907C-694.598,-167.628 -698.819,-166.28 -703.029,-164.896L-745.673,-196.903C-750.009,-200.169 -755.653,-200.858 -760.589,-198.711C-765.508,-196.584 -769.05,-191.928 -769.902,-186.445L-778.363,-132.33C-782.277,-130.213 -786.152,-128.036 -790.016,-125.813L-837.858,-148.56C-842.716,-150.876 -848.387,-150.398 -852.812,-147.294C-857.257,-144.211 -859.854,-138.928 -859.652,-133.369L-857.817,-78.455C-861.222,-75.615 -864.591,-72.717 -867.929,-69.782L-919.208,-82.39C-924.418,-83.655 -929.878,-82.039 -933.649,-78.107C-937.444,-74.161 -938.98,-68.476 -937.762,-63.043L-925.683,-9.553C-928.485,-6.086 -931.258,-2.582 -933.976,0.968L-986.631,-0.945C-991.945,-1.102 -997.017,1.552 -999.987,6.188C-1002.96,10.801 -1003.41,16.709 -1001.2,21.796L-979.384,71.699C-981.503,75.707 -983.608,79.747 -985.633,83.849L-1037.52,92.654C-1042.79,93.542 -1047.23,97.22 -1049.28,102.364C-1051.32,107.521 -1050.65,113.397 -1047.55,117.919L-1016.85,162.37C-1017.09,163.154 -1017.31,163.947 -1017.55,164.734L-1104.32,256.904C-1104.32,256.904 -1117.61,267.327 -1098.25,291.82C-1081.18,313.425 -993.526,399.072 -947.232,443.943C-927.678,466.722 -914.284,480.829 -912.883,479.609C-910.675,477.669 -922.27,436.224 -960.785,387.597C-990.47,343.968 -1029,276.864 -1019.96,269.13C-1019.96,269.13 -1009.69,256.085 -989.067,246.695C-988.314,247.298 -989.848,246.097 -989.067,246.695C-989.067,246.695 -553.915,447.427 -150.27,250.091C-104.162,241.818 -76.247,266.521 -76.247,266.521C-66.619,272.101 -91.548,341.099 -112.045,386.775C-139.926,438.638 -144.015,479.107 -141.649,480.511C-140.158,481.4 -130.015,465.966 -115.545,441.402C-79.843,391.654 -12.354,296.816 0,273.782C14.006,247.663 0,240.343 0,240.343" fill="#f74c00" />
        </g>

        {/* Eyes */}
        <g className="about-crab-eyes">
          {/* Eye Sockets and Whites */}
          <g transform="matrix(1,0,0,1,677.392,509.61)">
            <path d="M0,-92.063C0,-92.063 43.486,-139.678 86.974,-92.063C86.974,-92.063 121.144,-28.571 86.974,3.171C86.974,3.171 31.062,47.615 0,3.171C0,3.171 -37.275,-31.75 0,-92.063" fill="#000000" />
          </g>
          <g transform="matrix(1,0,0,1,727.738,435.209)">
            <path d="M0,0.002C0,18.543 -10.93,33.574 -24.408,33.574C-37.885,33.574 -48.814,18.543 -48.814,0.002C-48.814,-18.539 -37.885,-33.572 -24.408,-33.572C-10.93,-33.572 0,-18.539 0,0.002" fill="#ffffff" />
          </g>
          <g transform="matrix(1,0,0,1,483.3,502.984)">
            <path d="M0,-98.439C0,-98.439 74.596,-131.467 94.956,-57.748C94.956,-57.748 116.283,28.178 33.697,33.028C33.697,33.028 -71.613,12.745 0,-98.439" fill="#000000" />
          </g>
          <g transform="matrix(1,0,0,1,520.766,436.428)">
            <path d="M0,0C0,19.119 -11.27,34.627 -25.173,34.627C-39.071,34.627 -50.344,19.119 -50.344,0C-50.344,-19.124 -39.071,-34.627 -25.173,-34.627C-11.27,-34.627 0,-19.124 0,0" fill="#ffffff" />
          </g>

          {/* Pupils */}
          <g className="about-crab-pupil about-crab-pupil-l" transform="matrix(1,0,0,1,450.328,483.629)">
            <path d="M0,167.33C-1.664,165.91 -2.536,165.068 -2.536,165.068L140.006,153.391C23.733,0 -69.418,122.193 -79.333,135.855L-79.333,167.33L0,167.33Z" fill="#000000" />
          </g>
          <g className="about-crab-pupil about-crab-pupil-r" transform="matrix(1,0,0,1,747.12,477.333)">
            <path d="M0,171.974C1.663,170.554 2.536,169.71 2.536,169.71L-134.448,159.687C-18.12,0 69.421,126.835 79.335,140.497L79.335,171.974L0,171.974Z" fill="#000000" />
          </g>
        </g>
      </g>

      {/* Official Vim Logo (Hoisted upwards on hover) */}
      <g className="about-crab-vim-wrap">
        <g className="about-crab-vim-group" transform="translate(600, 520) scale(16)">
          {/* Dark Forest Outer Rim */}
          <rect
            className="about-crab-vim-rim"
            x="-12.8"
            y="-12.8"
            width="25.6"
            height="25.6"
            rx="3"
            transform="rotate(45)"
          />
          {/* Solid White Base Tile (Ensures the 'V' cutout is crisp solid white and never transparent/washed-out) */}
          <rect
            className="about-crab-vim-base"
            x="-12"
            y="-12"
            width="24"
            height="24"
            rx="2.6"
            transform="rotate(45)"
          />
          {/* Official Vim Path in rich deep green */}
          <g transform="translate(-12, -12)">
            <path
              className="about-crab-vim-path"
              d="M24 11.986h-.027l-4.318-4.318 4.303-4.414V1.461l-.649-.648h-8.198l-.66.605v1.045L12.015.027V0L12 .014 11.986 0v.027l-1.29 1.291-.538-.539H2.035l-.638.692v1.885l.616.616h.72v5.31L.027 11.987H0L.014 12 0 12.014h.027l2.706 2.706v6.467l.907.523h2.322l1.857-1.904 4.166 4.166V24l.015-.014.014.014v-.028l2.51-2.509h.485c.111 0 .211-.07.25-.179l.146-.426c.028-.084.012-.172-.037-.239l1.462-1.462-.612 1.962c-.043.141.036.289.177.332.025.008.052.012.078.012h1.824c.106-.001.201-.064.243-.163l.165-.394c.025-.065.024-.138-.004-.203-.027-.065-.08-.116-.146-.142-.029-.012-.062-.019-.097-.02h-.075l.84-2.644h1.232l-1.016 3.221c-.043.141.036.289.176.332.025.008.052.012.079.012h2.002c.11 0 .207-.066.248-.17l.164-.428c.051-.138-.021-.29-.158-.341-.029-.011-.06-.017-.091-.017h-.145l1.131-3.673c.027-.082.012-.173-.039-.24l-.375-.504-.003-.005c-.051-.064-.127-.102-.209-.102h-1.436c-.071 0-.141.03-.19.081l-.4.439h-.624l-.042-.046 4.445-4.445H24L23.986 12l.014-.014zM9.838 21.139l1.579-4.509h-.501l.297-.304h1.659l-1.563 4.555h.623l-.079.258H9.838zm3.695-7.516l.15.151-.269.922-.225.226h-.969l-.181-.181.311-.871.288-.247h.895zM5.59 20.829H3.877l-.262-.15V3.091H2.379l-.1-.1V1.815l.143-.154h7.371l.213.214v1.108l-.142.173H8.785v8.688l8.807-8.688h-2.086l-.175-.188V1.805l.121-.111h7.49l.132.133v1.07L12.979 13.25h-.373c-.015-.001-.028 0-.042.001l-.02.003c-.045.01-.086.03-.119.06l-.343.295-.004.003c-.033.031-.059.069-.073.111l-.296.83-6.119 6.276zm14.768-3.952l.474-.519h1.334l.309.415-1.265 4.107h.493l-.08.209H19.84l1.124-3.564h-2.015l-1.077 3.391h.424l-.073.174h-1.605l1.107-3.548h-2.096l-1.062 3.339h.436l-.072.209H13.27l1.514-4.46H14.198l.091-.271h1.65l.519.537h.906l.491-.554h1.061l.489.535h.953z"
            />
          </g>
        </g>
      </g>

      {/* Official Ferris Left Claw */}
      <g className="about-crab-claw-left">
        <g transform="matrix(1,0,0,1,441.397,687.635)">
          <path d="M0,-25.102C91.833,-36.676 144.904,-37.754 144.904,-37.754C22.037,-199.838 -77.661,-53.098 -77.661,-53.098C-102.643,-62.03 -128.114,-96.711 -147.138,-128.688L-223.375,-151.268C-135.502,-2.127 -70.08,0.146 -70.08,0.146C66.134,174.736 130.663,34.441 130.663,34.441C54.195,25.759 0,-25.102 0,-25.102" fill="#f74c00" />
        </g>
      </g>

      {/* Official Ferris Right Claw */}
      <g className="about-crab-claw-right">
        <g transform="matrix(1,0,0,1,966.094,811.034)">
          <path d="M0,-314.014C0,-314.014 -15.576,-251.973 -112.453,-186.776L-139.619,-180.409C-139.619,-180.409 -227.5,-340.668 -352.002,-160.075C-352.002,-160.075 -313.2,-182.666 -209.18,-155.155C-209.18,-155.155 -257.03,-81.916 -353.422,-84.166C-353.422,-84.166 -261.049,26.654 -120.482,-133.418C-120.482,-133.418 28.113,-190.881 40.164,-314.014L0,-314.014Z" fill="#f74c00" />
        </g>
      </g>
    </svg>
  </span>
);

const MusicPlayButton: React.FC<{ isStoryActive?: boolean }> = ({ isStoryActive = false }) => {
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
      <span className={`about-music-control-wrap${isStoryActive ? ' is-story-active' : ''}`}>
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

const PhotoManipulationStack: React.FC<{ isStoryActive?: boolean }> = ({ isStoryActive = false }) => {
  const stackRef = useRef<HTMLSpanElement>(null);
  const carRef = useRef<HTMLSpanElement>(null);
  const fallingRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const returnTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasStoryActivatedRef = useRef(false);

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

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (isStoryActive) {
      hasStoryActivatedRef.current = true;
      returnTimelineRef.current?.pause();
      timelineRef.current?.restart();
      return;
    }

    if (!hasStoryActivatedRef.current) return;
    timelineRef.current?.pause();
    returnTimelineRef.current?.restart();
  }, [isStoryActive]);

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

const RelightingCube: React.FC<{ isStoryActive?: boolean }> = ({ isStoryActive = false }) => (
  <span className={`about-lighting-cube${isStoryActive ? ' is-story-active' : ''}`} role="img" aria-label="A rotating liquid-metal cube">
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

const ResolveColorWheels: React.FC<{ isStoryActive?: boolean }> = ({ isStoryActive = false }) => (
  <span className={`about-resolve-clip-stack${isStoryActive ? ' is-story-active' : ''}`} role="img" aria-label="Three colour grading wheels with video and audio timeline clips">
    <span className="about-resolve-clip about-resolve-video-clip" aria-hidden="true">
      <img src="/images/resolve-video-clip.png" alt="" />
    </span>
    <span className="about-resolve-clip about-resolve-video-clip-alt" aria-hidden="true">
      <img src="/images/resolve-video-clip-alt.png" alt="" />
    </span>
    <span className="about-resolve-wheels" aria-hidden="true">
      <span className="about-resolve-wheel about-resolve-wheel-shadow" />
      <span className="about-resolve-wheel about-resolve-wheel-mid" />
      <span className="about-resolve-wheel about-resolve-wheel-highlight" />
    </span>
    <span className="about-resolve-clip about-resolve-audio-clip" aria-hidden="true">
      <img src="/images/resolve-audio-clip.png" alt="" />
    </span>
  </span>
);

const UnrealRealtimeViewport: React.FC<{ isStoryActive?: boolean }> = ({ isStoryActive = false }) => (
  <span
    className={`about-unreal-viewport${isStoryActive ? ' is-story-active' : ''}`}
    role="img"
    aria-label="Unreal Engine emblem with 3D coordinate transform gizmo"
  >
    <svg className="about-unreal-logo" viewBox="0 0 531.63 434.57" aria-hidden="true">
      <defs>
        <g id="unreal-engine-mark">
          <path d="M162.83 172.88c1.54-.41 3.14-.6 4.73-.54 8.87.31 15.81 7.75 15.5 16.62v97.6c0 9.94-6.38 12.1-12.27 11.99-4-.28-7.95-1.02-11.78-2.21 24.68 33.4 63.55 53.34 105.08 53.9l35.98-36.19 21.32 23.98c53.12-25.1 69.79-71.45 73.54-89.51-19.43 19.99-40.92 40.11-55.43 26.17 0 0-.79-74.5-.79-105.05 0-41.04 39-71.69 39-71.69-21.43 3.81-47.16 11.41-74.42 38.19-2.47 2.45-4.81 5.02-7.01 7.72-11.73-8.94-26.89-6.28-26.89-6.28 8.19 4.48 16.38 17.6 16.38 28.46v106.73s-17.87 15.72-31.65 15.72c-6.31.06-12.25-2.94-15.95-8.05-1.08-1.43-1.98-2.99-2.66-4.65V144c-4.08 3.36-17.83 6.05-17.83-16.72 0-14.2 10.23-31.13 28.42-41.49-18.41 2.85-42.65 10.13-67.46 31.15-29.41 25.41-46.16 62.48-45.78 101.35 0 0 13.33-41.59 29.98-45.4Z" />
        </g>
        <linearGradient id="unreal-chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#111419" />
          <stop offset="0.16" stopColor="#f7fafc" />
          <stop offset="0.34" stopColor="#626a72" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="0.68" stopColor="#343a41" />
          <stop offset="0.86" stopColor="#d3d9dd" />
          <stop offset="1" stopColor="#15181d" />
        </linearGradient>
        <linearGradient id="unreal-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="unreal-mark-clip">
          <use href="#unreal-engine-mark" />
        </clipPath>
      </defs>

      {/* 3D Coordinate Axes (Rendered behind the logo, radiating outwards) */}
      <g className="about-unreal-gizmo">
        {/* X-Axis (Red / Forward-Left) */}
        <g className="about-unreal-axis about-unreal-axis-x">
          <line className="about-unreal-axis-line" x1="265" y1="218" x2="165" y2="280" />
          <polygon className="about-unreal-axis-cone" points="142,294 155,268 172,292" />
          <text className="about-unreal-axis-label" x="122" y="314">X</text>
        </g>

        {/* Y-Axis (Green / Forward-Right) */}
        <g className="about-unreal-axis about-unreal-axis-y">
          <line className="about-unreal-axis-line" x1="265" y1="218" x2="365" y2="280" />
          <polygon className="about-unreal-axis-cone" points="388,294 375,268 358,292" />
          <text className="about-unreal-axis-label" x="408" y="314">Y</text>
        </g>

        {/* Z-Axis (Blue / Up) */}
        <g className="about-unreal-axis about-unreal-axis-z">
          <line className="about-unreal-axis-line" x1="265" y1="218" x2="265" y2="105" />
          <polygon className="about-unreal-axis-cone" points="265,78 252,105 278,105" />
          <text className="about-unreal-axis-label" x="265" y="58">Z</text>
        </g>
      </g>

      {/* Unreal Chrome Base Emblem (In Front) */}
      <g className="about-unreal-metal">
        <use href="#unreal-engine-mark" fill="url(#unreal-chrome)" />
        <g clipPath="url(#unreal-mark-clip)">
          <rect className="about-unreal-sheen" x="-180" y="-40" width="125" height="520" fill="url(#unreal-sheen)" transform="skewX(-16)" />
        </g>
      </g>
    </svg>
  </span>
);

const StoryText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\s+)/).map((token, tokenIndex) =>
      /^\s+$/.test(token) ? token : (
        <span className="about-story-word" key={`${token}-${tokenIndex}`}>
          {Array.from(token).map((character, characterIndex) => (
            <span className="about-story-character" key={`${character}-${characterIndex}`}>{character}</span>
          ))}
        </span>
      )
    )}
  </>
);

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const storyBackdropRef = useRef<HTMLDivElement>(null);
  const [activeStoryIcon, setActiveStoryIcon] = useState(-1);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const story = storyRef.current;
    const storyBackdrop = storyBackdropRef.current;
    if (!section || !story || !storyBackdrop) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 900px)').matches;
    const characters = Array.from(story.querySelectorAll<HTMLElement>('.about-story-character'));
    const iconMarkers = Array.from(story.querySelectorAll<HTMLElement>('.about-story-icon-marker'));

    if (reducedMotion) {
      story.classList.remove('is-scroll-driven');
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

      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => section.classList.add('is-revealed'),
        onLeaveBack: () => section.classList.remove('is-revealed'),
      });

      gsap.fromTo(
        story,
        { opacity: 0.55, filter: 'blur(10px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'none',
          scrollTrigger: {
            trigger: story,
            start: 'top 88%',
            end: 'top 62%',
            scrub: 0.35,
          },
        }
      );

      gsap.fromTo(
        storyBackdrop,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: story,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 0.5,
          },
        }
      );

      if (!isDesktop) return;

      story.classList.add('is-scroll-driven');

      const iconCharacterOffsets = iconMarkers.map((marker) =>
        characters.filter((character) =>
          Boolean(character.compareDocumentPosition(marker) & Node.DOCUMENT_POSITION_FOLLOWING)
        ).length
      );

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: 'top 62%',
          end: 'top -28%',
          scrub: 0.18,
          onLeaveBack: () => setActiveStoryIcon(-1),
        },
      });

      timeline.eventCallback('onUpdate', () => {
        const timelineProgress = timeline.progress();
        const revealProgress = Math.min(timelineProgress / 0.78, 1);
        const characterOffset = Math.floor(revealProgress * characters.length);
        const nextIcon = timelineProgress >= 0.98
          ? -1
          : iconCharacterOffsets.reduce(
              (activeIcon, iconOffset, index) => (characterOffset >= iconOffset ? index : activeIcon),
              -1
            );
        setActiveStoryIcon((currentIcon) => currentIcon === nextIcon ? currentIcon : nextIcon);
      });

      timeline.to(characters, {
        color: getComputedStyle(story).getPropertyValue('--ink-warm').trim(),
        duration: 0.035,
        stagger: { amount: 0.745 },
        ease: 'none',
      });

      timeline.to({}, { duration: 0.22 });

    }, story);

    return () => {
      story.classList.remove('is-scroll-driven');
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="container about-container">
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
      </div>

      <div className="about-story" ref={storyRef}>
        <div ref={storyBackdropRef} className="about-story-backdrop" aria-hidden="true">
          <video className="about-story-video" autoPlay muted loop playsInline preload="metadata">
            <source src="/video/story-ascii-animation.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="container about-story-content">
          <span className="about-story-label" aria-hidden="true">My story</span>
          <p className="about-origin-story">
            <span className="about-story-beat"><StoryText text="When I was 15, I started learning music " /><span className="about-story-icon-marker"><MusicPlayButton isStoryActive={activeStoryIcon === 0} /></span><StoryText text=". " /></span>
            <span className="about-story-beat"><StoryText text="I wanted to make covers for my tracks, so I learned photo " /><span className="about-story-icon-marker"><PhotoManipulationStack isStoryActive={activeStoryIcon === 1} /></span><StoryText text=" manipulation. " /></span>
            <span className="about-story-beat"><StoryText text="I kept getting stuck trying to relight images " /><span className="about-story-icon-marker"><RelightingCube isStoryActive={activeStoryIcon === 2} /></span><StoryText text=", which is why I picked up Blender. " /></span>
            <span className="about-story-beat"><StoryText text="Then I learned DaVinci Resolve to edit videos and grade them " /><span className="about-story-icon-marker"><ResolveColorWheels isStoryActive={activeStoryIcon === 3} /></span><StoryText text=" properly. " /></span>
            <span className="about-story-beat"><StoryText text="Blender rendered slowly, so I moved into Unreal " /><span className="about-story-icon-marker"><UnrealRealtimeViewport isStoryActive={activeStoryIcon === 4} /></span><StoryText text=". " /></span>
            <span className="about-story-beat"><StoryText text="In Unreal I found things I wanted to fix, and that is how I ended up learning programming " /><span className="about-story-icon-marker"><RustCrabVim isStoryActive={activeStoryIcon === 5} /></span><StoryText text=". " /></span>
            <span className="about-story-beat"><StoryText text="That is pretty much how I got here." /></span>
          </p>
        </div>
      </div>
    </section>
  );
};
