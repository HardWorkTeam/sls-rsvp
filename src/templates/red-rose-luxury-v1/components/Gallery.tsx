'use client';

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Photo } from '@/components/Photo';
import { SectionHeading } from '../../royal-khmer-v1/components/KhmerOrnaments';

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
      style={{ background: 'linear-gradient(180deg, #260206 0%, #3D0207 100%)' }}
    >
      <div className="max-w-lg mx-auto space-y-10">
        <SectionHeading
          en="Photo Gallery"
          kh="អាល់ប៊ុមរូបថត"
          sub="Moments worth remembering"
        />

        {/* Masonry columns: every photo keeps its natural aspect ratio —
            no cropping — while the two columns stay visually balanced. */}
        <div className="columns-2 gap-3 [&>*]:mb-3">
          {photos.map((url, i) => (
            <m.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => openLightbox(i)}
              className="relative block w-full break-inside-avoid overflow-hidden rounded-2xl group cursor-pointer border border-[#E8C97A]/20"
              aria-label={`View photo ${i + 1} of ${photos.length}`}
            >
              {/* Ken Burns zoom effect */}
              <Photo
                src={url}
                alt={`Gallery photo ${i + 1}`}
                sizes="(max-width: 768px) 50vw, 240px"
                className="w-full h-auto transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                style={{ filter: 'sepia(10%) brightness(0.85) contrast(1.05)' }}
              />

              {/* Gold glass overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none"
                style={{ background: 'rgba(92,3,12,0.45)' }}
              >
                <span className="text-[#E8C97A]" style={{ fontSize: '1.75rem' }}>⊕</span>
              </div>

              {/* L-shaped gold accents in group-hover */}
              <div
                className="absolute top-3 right-3 w-4 h-4 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderTop: '1px solid #E8C97A',
                  borderRight: '1px solid #E8C97A',
                }}
              />
              <div
                className="absolute bottom-3 left-3 w-4 h-4 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  borderBottom: '1px solid #E8C97A',
                  borderLeft: '1px solid #E8C97A',
                }}
              />
            </m.button>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              style={{ background: 'rgba(20,2,3,0.97)', backdropFilter: 'blur(24px)' }}
              onClick={closeLightbox}
            >
              <m.div
                initial={{ scale: 0.82, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.82, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                drag={photos.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) nextPhoto();
                  else if (info.offset.x > 60) prevPhoto();
                }}
                className="relative max-w-sm w-full max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl touch-pan-y"
                style={{ border: '1px solid rgba(232, 201, 122, 0.35)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Photo
                  src={photos[lightboxIndex]}
                  alt={`Expanded Photo ${lightboxIndex + 1}`}
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-contain pointer-events-none select-none"
                  style={{ maxHeight: '75vh' }}
                />
                {/* Image counter indicator */}
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full font-serif-en text-xs"
                  style={{
                    background: 'rgba(92, 3, 12, 0.85)',
                    color: '#E8C97A',
                    border: '1px solid rgba(232, 201, 122, 0.3)',
                  }}
                >
                  {lightboxIndex + 1} / {photos.length}
                </div>
              </m.div>

              {/* Prev / Next navigation arrows — pointless with a single photo */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
                    style={{ background: 'rgba(232,201,122,0.15)', color: '#E8C97A', border: '1px solid rgba(232,201,122,0.3)' }}
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
                    style={{ background: 'rgba(232,201,122,0.15)', color: '#E8C97A', border: '1px solid rgba(232,201,122,0.3)' }}
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: 'rgba(92, 3, 12, 0.85)', color: '#E8C97A', border: '1px solid rgba(232,201,122,0.3)' }}
                aria-label="Close modal"
              >
                ×
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
