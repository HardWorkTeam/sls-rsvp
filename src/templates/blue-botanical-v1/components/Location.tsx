'use client';

import React from 'react';
import { WeddingEvent } from '@/types/invitation';

interface LocationProps {
  primaryEvent: WeddingEvent;
}

export const Location: React.FC<LocationProps> = ({ primaryEvent }) => {
  return (
    <section className="py-20 px-6" style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#9BB0C8' }}>Location</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#2C3E56', lineHeight: 1.7 }}>ទីកន្លែងប្រព្រឹត្ត</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(106,140,178,0.4), transparent)' }} />
        </div>
        <a
          href={primaryEvent.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-2xl group"
          style={{ border: '1px solid rgba(106,140,178,0.2)', aspectRatio: '16/9', background: '#F8FAFC' }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 transition-all group-hover:opacity-80">
            <span style={{ fontSize: '2.5rem' }}>🗺️</span>
            <p className="font-khmer-body text-sm text-center px-4" style={{ color: '#2C3E56' }}>
              {primaryEvent.locationName}
            </p>
            <p className="font-serif-en text-xs tracking-widest uppercase" style={{ color: '#6A8CB2' }}>
              Tap to open in Maps →
            </p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Location;
