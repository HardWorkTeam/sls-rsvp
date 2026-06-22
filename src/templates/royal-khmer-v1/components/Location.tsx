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
    <section
      className="rk-section"
      style={{ background: 'linear-gradient(180deg, rgba(44,24,16,0.3) 0%, rgba(26,14,8,0.75) 100%)', backdropFilter: 'blur(8px)' }}
    >
      <div className="max-w-lg mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.35em] uppercase" style={{ color: 'var(--rk-gold)', opacity: 0.7 }}>
            Location
          </p>
          <h2 className="font-khmer-title text-xl" style={{ color: 'var(--rk-gold-light)', lineHeight: 1.7 }}>
            ទីកន្លែងប្រព្រឹត្ត
          </h2>
        </div>

        {embedUrl ? (
          <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(201,168,76,0.25)', aspectRatio: '4/3', position: 'relative' }}>
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
          <p className="font-khmer-body text-sm text-center" style={{ color: 'var(--rk-ivory)', opacity: 0.8 }}>
            {primaryEvent.locationName}
          </p>
        )}

        {primaryEvent.googleMapsUrl && (
          <div className="text-center">
            <a
              href={primaryEvent.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-widest uppercase transition hover:opacity-80"
              style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.35)', color: 'var(--rk-gold)' }}
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
