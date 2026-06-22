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
    <section className="py-20 px-6" style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#9BB0C8' }}>Location</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#2C3E56', lineHeight: 1.7 }}>ទីកន្លែងប្រព្រឹត្ត</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(106,140,178,0.4), transparent)' }} />
        </div>

        {embedUrl ? (
          <div className="overflow-hidden rounded-2xl" style={{ border: '1px solid rgba(106,140,178,0.2)', aspectRatio: '4/3', position: 'relative' }}>
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
          <p className="font-khmer-body text-sm text-center" style={{ color: '#2C3E56' }}>
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
              style={{ background: 'rgba(106,140,178,0.1)', border: '1px solid rgba(106,140,178,0.35)', color: '#6A8CB2' }}
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
