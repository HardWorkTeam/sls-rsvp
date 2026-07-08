'use client';

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Photo } from '@/components/Photo';

interface GalleryProps { photos: string[]; }

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const prevPhoto = () => setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const nextPhoto = () => setLightbox((i) => (i !== null ? (i + 1) % photos.length : null));

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      else if (e.key === 'ArrowLeft') prevPhoto();
      else if (e.key === 'ArrowRight') nextPhoto();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox === null]);

  return (
    <section className="py-20 px-6" style={{ background: 'transparent' }}>
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#9BB0C8' }}>Photo Gallery</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#2C3E56', lineHeight: 1.7 }}>អាល់ប៊ុមរូបថត</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(106,140,178,0.4), transparent)' }} />
        </div>

        {/* Masonry columns: every photo keeps its natural aspect ratio —
            no cropping — while the two columns stay visually balanced. */}
        <div className="columns-2 gap-2.5 [&>*]:mb-2.5">
          {photos.map((url, i) => (
            <m.button
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setLightbox(i)}
              className="relative block w-full break-inside-avoid overflow-hidden rounded-xl group cursor-pointer"
              style={{ border: '1px solid rgba(106,140,178,0.2)' }}
              aria-label={`View photo ${i + 1} of ${photos.length}`}
            >
              <Photo src={url} alt={`Photo ${i + 1}`}
                sizes="(max-width: 768px) 50vw, 240px"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                style={{ background: 'rgba(44,62,86,0.3)' }}>
                <span style={{ color: '#fff', fontSize: '1.5rem' }}>⊕</span>
              </div>
            </m.button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <m.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              style={{ background: 'rgba(44,62,86,0.92)', backdropFilter: 'blur(16px)' }}
              onClick={() => setLightbox(null)}
            >
              <m.div
                initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
                drag={photos.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) nextPhoto();
                  else if (info.offset.x > 60) prevPhoto();
                }}
                className="relative max-w-sm w-full rounded-2xl overflow-hidden touch-pan-y"
                style={{ border: '2px solid rgba(106,140,178,0.4)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Photo src={photos[lightbox]} alt="" sizes="(max-width: 768px) 100vw, 640px" className="object-contain pointer-events-none select-none" style={{ maxHeight: '75vh' }} />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-serif-en"
                  style={{ background: 'rgba(44,62,86,0.8)', color: '#B8D0E8', border: '1px solid rgba(106,140,178,0.4)' }}>
                  {lightbox + 1} / {photos.length}
                </div>
              </m.div>
              {photos.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'rgba(106,140,178,0.2)', color: '#B8D0E8', border: '1px solid rgba(106,140,178,0.4)' }}>‹</button>
                  <button onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: 'rgba(106,140,178,0.2)', color: '#B8D0E8', border: '1px solid rgba(106,140,178,0.4)' }}>›</button>
                </>
              )}
              <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                aria-label="Close photo viewer"
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(44,62,86,0.8)', color: '#B8D0E8', border: '1px solid rgba(106,140,178,0.4)' }}>×</button>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default Gallery;
