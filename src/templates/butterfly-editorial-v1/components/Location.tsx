'use client';

import React from 'react';
import { WeddingEvent } from '@/types/invitation';
import { buildMapEmbedUrl } from '@/lib/mapUtils';

interface LocationProps {
  primaryEvent: WeddingEvent;
}

export const Location: React.FC<LocationProps> = ({ primaryEvent }) => {
  const embedUrl = buildMapEmbedUrl(primaryEvent.googleMapsUrl, primaryEvent.locationName);

  return (
    <section className="py-16 px-6 text-center bg-transparent">
      <div
        className="max-w-lg mx-auto space-y-8 rounded-2xl p-6 md:p-10 bg-white border border-[#C5A059]/25 relative overflow-hidden"
        style={{ boxShadow: '0 35px 80px rgba(0,0,0,0.03), inset 0 0 50px rgba(255,255,255,0.95)' }}
      >
        <div className="absolute inset-3.5 border border-[#C5A059]/10 rounded-xl pointer-events-none z-0" />

        <div className="space-y-2 relative z-10">
          <p className="font-editorial-serif text-[10px] tracking-[0.45em] uppercase font-bold text-[#C5A059]" style={{ opacity: 0.85 }}>
            Location
          </p>
          <h2 className="font-sans font-bold text-xl text-[#2A2A2A]" style={{ lineHeight: 1.7 }}>
            ទីកន្លែងប្រព្រឹត្ត
          </h2>
        </div>

        {embedUrl ? (
          <div className="overflow-hidden rounded-xl border border-[#C5A059]/30 relative z-10" style={{ aspectRatio: '4/3', position: 'relative' }}>
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={primaryEvent.locationName}
            />
          </div>
        ) : null}

        {primaryEvent.locationName && (
          <p className="font-sans text-sm text-center text-[#2A2A2A] relative z-10">
            {primaryEvent.locationName}
          </p>
        )}

        {primaryEvent.googleMapsUrl && (
          <div className="text-center relative z-10">
            <a
              href={primaryEvent.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-widest uppercase transition hover:opacity-80"
              style={{ background: 'rgba(90,18,29,0.06)', border: '1px solid rgba(90,18,29,0.2)', color: '#5A121D' }}
            >
              Get Directions ↗
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Location;
