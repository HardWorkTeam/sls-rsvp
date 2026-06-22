'use client';

import React from 'react';
import { WeddingEvent } from '@/types/invitation';

interface LocationProps {
  primaryEvent: WeddingEvent;
}

export const Location: React.FC<LocationProps> = ({ primaryEvent }) => {
  return (
    <section className="py-20 px-6" style={{ backdropFilter: 'blur(1px)' }}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#ffffff' }}>Location</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#ffffff', lineHeight: 1.7 }}>ទីកន្លែងប្រព្រឹត្ត</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #D4A020, transparent)' }} />
        </div>
        <a
          href={primaryEvent.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-2xl group"
          style={{ border: '2px solid rgba(212,160,32,0.35)', aspectRatio: '16/9', background: 'rgba(255,248,220,0.7)' }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 transition-all group-hover:opacity-80">
            <span style={{ fontSize: '2.5rem' }}>🗺️</span>
            <p className="font-khmer-body text-sm text-center px-4" style={{ color: '#5C3A00' }}>
              {primaryEvent.locationName}
            </p>
            <p className="font-serif-en text-xs tracking-widest uppercase" style={{ color: '#B8860B', opacity: 0.8 }}>
              Tap to open in Maps →
            </p>
          </div>
          {/* Corner accents */}
          {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-5 h-5`}
              style={{
                borderTop: i < 2 ? '2px solid rgba(212,160,32,0.5)' : undefined,
                borderBottom: i >= 2 ? '2px solid rgba(212,160,32,0.5)' : undefined,
                borderLeft: i % 2 === 0 ? '2px solid rgba(212,160,32,0.5)' : undefined,
                borderRight: i % 2 === 1 ? '2px solid rgba(212,160,32,0.5)' : undefined,
              }} />
          ))}
        </a>
      </div>
    </section>
  );
};

export default Location;
