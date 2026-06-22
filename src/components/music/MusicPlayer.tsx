'use client';

import React, { useEffect, useRef, useState } from 'react';

interface MusicPlayerProps {
  url: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ url }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlocked, setAudioBlocked] = useState(false);

  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = true;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => { setIsPlaying(true); })
        .catch(() => { setAudioBlocked(true); });
    }

    const unlockAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => { setIsPlaying(true); setAudioBlocked(false); cleanup(); })
          .catch(() => {});
      }
    };
    const cleanup = () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    return () => { audio.pause(); cleanup(); };
  }, [url]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => { setIsPlaying(true); setAudioBlocked(false); })
        .catch(() => {});
    }
  };

  return (
    <>
      {/* Floating music button — styled for Royal Khmer dark theme */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id="rk-music-toggle"
          onClick={togglePlay}
          className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #8B6914, #C9A84C)'
              : 'rgba(44,24,16,0.9)',
            border: '1px solid rgba(201,168,76,0.5)',
            boxShadow: isPlaying
              ? '0 0 24px rgba(201,168,76,0.5)'
              : '0 4px 20px rgba(0,0,0,0.5)',
            color: '#C9A84C',
            animation: isPlaying ? 'pulse-glow 3s ease-in-out infinite' : 'none',
          }}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
      </div>

      {/* "Tap to play" hint badge */}
      {audioBlocked && (
        <div
          className="fixed bottom-20 right-4 text-[10px] px-3 py-1.5 rounded-full z-50 pointer-events-none"
          style={{
            background: 'rgba(44,24,16,0.92)',
            border: '1px solid rgba(201,168,76,0.3)',
            color: 'var(--rk-gold)',
            backdropFilter: 'blur(12px)',
          }}
        >
          ♪ ចុចដើម្បីស្ដាប់
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
