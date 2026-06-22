'use client';

import React from 'react';
import { WeddingEvent } from '@/types/invitation';

interface LocationProps {
  primaryEvent: WeddingEvent;
}

export const Location: React.FC<LocationProps> = ({ primaryEvent }) => {
  return (
    <section
      className="rk-section"
      style={{ background: 'linear-gradient(180deg, rgba(44,24,16,0.3) 0%, rgba(26,14,8,0.75) 100%)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-lg mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p
            className="font-serif-en text-xs tracking-[0.35em] uppercase"
            style={{ color: 'var(--rk-gold)', opacity: 0.7 }}
          >
            Location
          </p>
          <h2
            className="font-khmer-title text-xl"
            style={{ color: 'var(--rk-gold-light)', lineHeight: 1.7 }}
          >
            ទីកន្លែងប្រព្រឹត្ត
          </h2>
        </div>

        {/* Embedded map placeholder linking out */}
        <a
          href={primaryEvent.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-2xl group"
          style={{
            border: '1px solid rgba(201,168,76,0.25)',
            aspectRatio: '16/9',
            background: 'rgba(250,246,239,0.04)',
          }}
        >
          {/* Static map placeholder */}
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 transition-all group-hover:bg-black/10"
            style={{ background: 'rgba(201,168,76,0.05)' }}
          >
            <span style={{ fontSize: '2.5rem' }}>🗺️</span>
            <p
              className="font-khmer-body text-sm text-center px-4"
              style={{ color: 'var(--rk-ivory)', opacity: 0.8 }}
            >
              {primaryEvent.locationName}
            </p>
            <p
              className="font-serif-en text-xs tracking-widest uppercase"
              style={{ color: 'var(--rk-gold)', opacity: 0.7 }}
            >
              Tap to open in Maps →
            </p>
          </div>
          {/* Corner gold accents */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: 'rgba(201,168,76,0.5)' }} />
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: 'rgba(201,168,76,0.5)' }} />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: 'rgba(201,168,76,0.5)' }} />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: 'rgba(201,168,76,0.5)' }} />
        </a>
      </div>
    </section>
  );
};

export default Location;
