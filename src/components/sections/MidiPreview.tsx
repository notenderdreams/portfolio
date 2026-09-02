import React, { useEffect, useRef, useState } from 'react';

interface MidiPreviewProps {
  embedded?: boolean;
}

export const MidiPreview: React.FC<MidiPreviewProps> = ({ embedded = false }) => {
  const previewRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationFrameRef = useRef<number>();
  const playbackAttemptRef = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const setRevealProgress = (progress: number) => {
    previewRef.current?.style.setProperty('--midi-progress', `${progress}%`);
  };

  const cancelProgressUpdate = () => {
    if (animationFrameRef.current !== undefined) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  };

  const updateProgress = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      setRevealProgress((audio.currentTime / audio.duration) * 100);
    }

    if (!audio.paused && !audio.ended) {
      animationFrameRef.current = window.requestAnimationFrame(updateProgress);
    }
  };

  const startPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const playbackAttempt = ++playbackAttemptRef.current;
    cancelProgressUpdate();
    audio.currentTime = 0;
    setRevealProgress(0);

    void audio.play().then(() => {
      if (playbackAttempt !== playbackAttemptRef.current || audio.paused) return;

      setIsPlaying(true);
      animationFrameRef.current = window.requestAnimationFrame(updateProgress);
    }).catch(() => {
      setIsPlaying(false);
    });
  };

  const stopPlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    playbackAttemptRef.current += 1;
    cancelProgressUpdate();
    audio.pause();
    audio.currentTime = 0;
    setRevealProgress(0);
    setIsPlaying(false);
  };

  const handleEnded = () => {
    cancelProgressUpdate();
    setRevealProgress(100);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      cancelProgressUpdate();
      audioRef.current?.pause();
    };
  }, []);

  return (
    <section
      className={`midi-preview-section${embedded ? ' is-embedded' : ' scroll-reveal'}`}
      aria-label="Gatekeeper MIDI composition"
    >
      <button
        ref={previewRef}
        className={`midi-preview${isPlaying ? ' is-playing' : ''}`}
        data-cursor="play"
        type="button"
        aria-label="Play Gatekeeper MIDI composition"
        onPointerEnter={startPlayback}
        onPointerLeave={stopPlayback}
        onClick={() => {
          if (!isPlaying) startPlayback();
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            isPlaying ? stopPlayback() : startPlayback();
          }

          if (event.key === 'Escape') stopPlayback();
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== 'mouse') {
            isPlaying ? stopPlayback() : startPlayback();
          }
        }}
      >
        <span className="midi-preview-visual">
          <img
            className="midi-preview-image midi-preview-image-dim"
            src="/images/gatekeeper-midi.png"
            alt="Gatekeeper Main MIDI piano roll"
            draggable={false}
          />
          <img
            className="midi-preview-image midi-preview-image-bright"
            src="/images/gatekeeper-midi.png"
            alt=""
            aria-hidden="true"
            draggable={false}
          />
          <span className="midi-preview-playhead" aria-hidden="true" />
        </span>

        <audio
          ref={audioRef}
          src="/audio/gatekeeper_main.mp3"
          preload="auto"
          onEnded={handleEnded}
        />
      </button>
    </section>
  );
};
