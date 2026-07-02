'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './KhmerOrnaments';

interface GalleryProps {
  photos: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const nextPhoto = () => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevPhoto();
      else if (e.key === 'ArrowRight') nextPhoto();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex === null]);


  return (
    <section
      className="rk-section"
      style={{ background: 'linear-gradient(180deg, #2C1810 0%, #1a0e08 100%)' }}
    >
      <div className="max-w-lg mx-auto space-y-10">
        <SectionHeading
          en="Photo Gallery"
          kh="អាល់ប៊ុមរូបថត"
          sub="Moments worth remembering"
        />

        {/* Masonry columns: every photo keeps its natural aspect ratio —
            no cropping — while the two columns stay visually balanced. */}
        <div className="columns-2 gap-2.5 [&>*]:mb-2.5">
          {photos.map((url, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => openLightbox(i)}
              className="relative block w-full break-inside-avoid overflow-hidden rounded-xl group cursor-pointer"
              style={{ border: '1px solid rgba(201,168,76,0.2)' }}
              aria-label={`View photo ${i + 1} of ${photos.length}`}
            >
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                style={{ filter: 'sepia(15%) brightness(0.85) contrast(1.05)' }}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center"
                style={{ background: 'rgba(44,24,16,0.5)' }}
              >
                <span style={{ color: 'var(--rk-gold)', fontSize: '1.5rem' }}>⊕</span>
              </div>
              {/* Gold corner accent */}
              <div
                className="absolute top-2 right-2 w-4 h-4 pointer-events-none opacity-50"
                style={{
                  border: '1px solid var(--rk-gold)',
                  borderBottom: 'none',
                  borderLeft: 'none',
                }}
              />
            </motion.button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              style={{ background: 'rgba(26,14,8,0.96)', backdropFilter: 'blur(20px)' }}
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                drag={photos.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) nextPhoto();
                  else if (info.offset.x > 60) prevPhoto();
                }}
                className="relative max-w-sm w-full max-h-[85vh] rounded-2xl overflow-hidden touch-pan-y"
                style={{ border: '1px solid rgba(201,168,76,0.3)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[lightboxIndex]}
                  alt={`Photo ${lightboxIndex + 1}`}
                  className="w-full h-full object-contain pointer-events-none select-none"
                  style={{ maxHeight: '75vh' }}
                />
                {/* Counter */}
                <div
                  className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full font-serif-en text-xs"
                  style={{
                    background: 'rgba(44,24,16,0.8)',
                    color: 'var(--rk-gold)',
                    border: '1px solid rgba(201,168,76,0.3)',
                  }}
                >
                  {lightboxIndex + 1} / {photos.length}
                </div>
              </motion.div>

              {/* Prev/Next — pointless with a single photo */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--rk-gold)', border: '1px solid rgba(201,168,76,0.3)' }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                    style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--rk-gold)', border: '1px solid rgba(201,168,76,0.3)' }}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Close */}
              <button
                onClick={closeLightbox}
                aria-label="Close photo viewer"
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(44,24,16,0.8)', color: 'var(--rk-gold)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
