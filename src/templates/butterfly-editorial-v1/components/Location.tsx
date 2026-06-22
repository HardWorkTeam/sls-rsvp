'use client';

import React from 'react';
import { WeddingEvent } from '@/types/invitation';

interface LocationProps {
  primaryEvent: WeddingEvent;
}

export const Location: React.FC<LocationProps> = ({ primaryEvent }) => {
  return (
    <section className="py-16 px-6 text-center bg-transparent">
      <div 
        className="max-w-lg mx-auto space-y-8 rounded-2xl p-6 md:p-10 bg-white border border-[#C5A059]/25 relative overflow-hidden"
        style={{
          boxShadow: '0 35px 80px rgba(0,0,0,0.03), inset 0 0 50px rgba(255,255,255,0.95)',
        }}
      >
        {/* Inner border margin line */}
        <div className="absolute inset-3.5 border border-[#C5A059]/10 rounded-xl pointer-events-none z-0" />
        
        <div className="space-y-2 relative z-10">
          <p className="font-editorial-serif text-[10px] tracking-[0.45em] uppercase font-bold text-[#C5A059]" style={{ opacity: 0.85 }}>
            Location
          </p>
          <h2 className="font-sans font-bold text-xl text-[#2A2A2A]" style={{ lineHeight: 1.7 }}>
            ទីកន្លែងប្រព្រឹត្ត
          </h2>
        </div>
        <a
          href={primaryEvent.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-xl group border border-[#C5A059]/30 z-10"
          style={{ aspectRatio: '16/9', background: 'rgba(252,251,249,0.5)' }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 transition-all group-hover:bg-[#C5A059]/5">
            <span style={{ fontSize: '2.5rem' }}>🗺️</span>
            <p className="font-sans text-sm text-center px-4 text-[#2A2A2A]">
              {primaryEvent.locationName}
            </p>
            <p className="font-editorial-serif text-[10px] tracking-widest uppercase font-bold text-[#5A121D] mt-2 group-hover:underline">
              Tap to Open in Maps &rarr;
            </p>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Location;
