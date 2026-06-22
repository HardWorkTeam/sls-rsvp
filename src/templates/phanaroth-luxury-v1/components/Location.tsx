'use client';

import React from 'react';
import { WeddingEvent } from '@/types/invitation';

interface LocationProps {
  primaryEvent: WeddingEvent;
}

export const Location: React.FC<LocationProps> = ({ primaryEvent }) => {
  return (
    <section className="py-20 px-6 relative z-10" style={{ backdropFilter: 'blur(3px)' }}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase text-[#E8C97A]">Location</p>
          <h2 className="font-khmer-title text-xl text-[#FAF6EF]" style={{ lineHeight: 1.7 }}>ទីកន្លែងប្រព្រឹត្ត</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,201,122,0.4), transparent)' }} />
        </div>

        <a
          href={primaryEvent.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-2xl group border border-[#E8C97A]/25"
          style={{
            aspectRatio: '16/9',
            background: 'rgba(92, 3, 12, 0.4)',
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 transition-all group-hover:bg-black/10">
            <span style={{ fontSize: '2.5rem' }}>🗺️</span>
            <p className="font-khmer-body text-sm text-center px-4 text-[#FAF6EF]">
              {primaryEvent.locationName}
            </p>
            <p className="font-serif-en text-xs tracking-widest uppercase text-[#E8C97A]">
              Tap to open in Maps →
            </p>
          </div>
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l" style={{ borderColor: 'rgba(232,201,122,0.5)' }} />
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r" style={{ borderColor: 'rgba(232,201,122,0.5)' }} />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l" style={{ borderColor: 'rgba(232,201,122,0.5)' }} />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r" style={{ borderColor: 'rgba(232,201,122,0.5)' }} />
        </a>
      </div>
    </section>
  );
};

export default Location;
