'use client';

import React from 'react';
import { WeddingEvent } from '@/types/invitation';
import { buildMapEmbedUrl } from '@/lib/mapUtils';
import { EtherealBorderFrame } from './BotanicalAssets';

interface LocationProps {
  primaryEvent: WeddingEvent;
}

export const Location: React.FC<LocationProps> = ({ primaryEvent }) => {
  const embedUrl = buildMapEmbedUrl(primaryEvent.googleMapsUrl, primaryEvent.locationName);

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

        {embedUrl ? (
          <div className="overflow-hidden rounded-2xl border border-emerald-gold/25" style={{ aspectRatio: '4/3', position: 'relative' }}>
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
          <p className="font-sans text-sm text-center text-[#0A1C16]">
            {primaryEvent.locationName}
          </p>
        )}

        {primaryEvent.googleMapsUrl && (
          <a
            href={primaryEvent.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-widest uppercase transition hover:opacity-80"
            style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', color: '#6B5A1E' }}
          >
            Get Directions ↗
          </a>
        )}
      </EtherealBorderFrame>
    </section>
  );
};

export default Location;
