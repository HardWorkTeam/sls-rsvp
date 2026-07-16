'use client';

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Photo } from '@/components/Photo';

interface GalleryProps { photos: string[]; }

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Keyboard navigation while the lightbox is open.
  const isOpen = lightbox !== null;
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      else if (e.key === 'ArrowLeft') setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
      else if (e.key === 'ArrowRight') setLightbox((i) => (i !== null ? (i + 1) % photos.length : null));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, photos.length]);

  if (!photos || photos.length === 0) return null;

  return (
    <section className="py-20 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, rgba(255, 243, 208, 0.85) 0%, rgba(255, 232, 154, 0.75) 40%, rgba(255, 243, 208, 0.85) 100%)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#B8860B' }}>Photo Gallery</p>
          <h2 className="font-khmer-title text-2xl" style={{ color: '#5C3A00', lineHeight: 1.7 }}>អាល់ប៊ុមរូបថត</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #D4A020, transparent)' }} />
        </div>

        {/* Angkor Ornate Frame Card Wrapper */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden"
          style={{ background: 'rgba(92, 58, 0, 0.08)', border: '2px solid rgba(212, 160, 32, 0.4)' }}
        >
          {/* Main Featured Interactive View */}
          <div className="relative aspect-[3/4] sm:aspect-[4/3] w-full rounded-xl overflow-hidden mb-4 group cursor-pointer"
               style={{ border: '2px solid rgba(212, 160, 32, 0.5)', background: 'rgba(92, 58, 0, 0.3)' }}
               onClick={() => setLightbox(currentIndex)}>
            <AnimatePresence mode="wait">
              <m.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full relative"
                drag={photos.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) setCurrentIndex((i) => (i + 1) % photos.length);
                  else if (info.offset.x > 50) setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
                }}
              >
                <Photo
                  src={photos[currentIndex]}
                  alt={`Gallery photo ${currentIndex + 1}`}
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="w-full h-full object-contain p-1"
                  style={{ filter: 'sepia(10%) brightness(0.95) saturate(1.05)' }}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  style={{ background: 'rgba(92,58,0,0.35)' }}>
                  <span style={{ color: '#FFE566', fontSize: '1.25rem' }} className="font-serif-en">⊕ Expand Photo</span>
                </div>
              </m.div>
            </AnimatePresence>

            {/* Next / Prev Controls */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i - 1 + photos.length) % photos.length); }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-lg z-20 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  style={{ background: 'rgba(92,58,0,0.75)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i + 1) % photos.length); }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-lg z-20 cursor-pointer transition-transform hover:scale-105 active:scale-95"
                  style={{ background: 'rgba(92,58,0,0.75)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}
                >
                  ›
                </button>
              </>
            )}

            {/* Page indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-serif-en z-20 pointer-events-none"
              style={{ background: 'rgba(92,58,0,0.85)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}>
              {currentIndex + 1} / {photos.length}
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1 scrollbar-thin">
            {photos.map((url, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative aspect-square w-full rounded-xl overflow-hidden transition-all duration-300 cursor-pointer ${
                  currentIndex === i
                    ? 'scale-[1.03]'
                    : 'opacity-65 hover:opacity-100'
                }`}
                style={{
                  border: currentIndex === i ? '2px solid #D4A020' : '1px solid rgba(212,160,32,0.3)',
                  boxShadow: currentIndex === i ? '0 0 10px rgba(212,160,32,0.5)' : 'none'
                }}
                aria-label={`Select photo ${i + 1}`}
              >
                <Photo
                  src={url}
                  alt={`Thumbnail ${i + 1}`}
                  sizes="120px"
                  className="w-full h-full object-cover"
                  style={{ filter: 'sepia(10%) brightness(0.9) saturate(1.1)' }}
                />
              </button>
            ))}
          </div>

        </m.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightbox !== null && (
            <m.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-hidden"
              style={{ background: 'rgba(92,58,0,0.95)', backdropFilter: 'blur(16px)' }}
              onClick={() => setLightbox(null)}
            >
              <m.div
                initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
                drag={photos.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) setLightbox((i) => (i !== null ? (i + 1) % photos.length : null));
                  else if (info.offset.x > 60) setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
                }}
                className="relative max-w-sm w-auto max-h-[80vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden touch-pan-y"
                style={{ border: '2px solid rgba(212,160,32,0.4)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <Photo
                  src={photos[lightbox]}
                  alt=""
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-contain pointer-events-none select-none"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '70vh', display: 'block', margin: '0 auto' }}
                />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-serif-en z-10"
                  style={{ background: 'rgba(92,58,0,0.8)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}>
                  {lightbox + 1} / {photos.length}
                </div>
              </m.div>

              {photos.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)); }}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl z-20 cursor-pointer"
                    style={{ background: 'rgba(212,160,32,0.2)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}>‹</button>
                  <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i !== null ? (i + 1) % photos.length : null)); }}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl z-20 cursor-pointer"
                    style={{ background: 'rgba(212,160,32,0.2)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}>›</button>
                </>
              )}
              <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                aria-label="Close photo viewer"
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-20 cursor-pointer"
                style={{ background: 'rgba(92,58,0,0.8)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}>×</button>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default Gallery;
