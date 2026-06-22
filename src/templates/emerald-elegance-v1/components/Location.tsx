'use client';

import React from 'react';
import { WeddingEvent } from '@/types/invitation';
import { EtherealBorderFrame } from './BotanicalAssets';

interface LocationProps {
  primaryEvent: WeddingEvent;
}

export const Location: React.FC<LocationProps> = ({ primaryEvent }) => {
  return (
    <section className="py-16 px-6 text-center">
      <EtherealBorderFrame className="max-w-lg mx-auto space-y-8 py-10 px-4 md:px-8 shadow-sm">
        <div className="space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase text-emerald-gold" style={{ opacity: 0.8 }}>
            Location
          </p>
          <h2 className="font-sans font-bold text-xl text-[#0A1C16]" style={{ lineHeight: 1.7 }}>
            ទីកន្លែងប្រព្រឹត្ត
          </h2>
        </div>
        <a
          href={primaryEvent.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-2xl group border border-emerald-gold/25"
          style={{ aspectRatio: '16/9', background: 'rgba(201,168,76,0.05)' }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 transition-all group-hover:bg-black/5">
            <span style={{ fontSize: '2.5rem' }}>🗺️</span>
            <p className="font-sans text-sm text-center px-4 text-[#0A1C16]">
              {primaryEvent.locationName}
            </p>
            <span className="font-serif-en text-[9px] uppercase tracking-widest text-emerald-gold mt-2 group-hover:underline">
              Tap to Open in Maps &rarr;
            </span>
          </div>
        </a>
      </EtherealBorderFrame>
    </section>
  );
};

export default Location;
