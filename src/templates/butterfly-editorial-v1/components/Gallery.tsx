'use client';

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { cldUrl } from '@/lib/cloudinaryLoader';

interface GalleryProps {
  photos: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowLeft') setCurrentIndex((p) => (p - 1 + photos.length) % photos.length);
      else if (e.key === 'ArrowRight') setCurrentIndex((p) => (p + 1) % photos.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, photos.length]);

  if (!photos || photos.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section className="relative py-20 px-4 md:px-8 bg-transparent overflow-hidden">
      <div className="max-w-md mx-auto relative z-10">
        <m.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 md:p-10 bg-white border border-[#C5A059]/25 shadow-[0_30px_70px_rgba(90,18,29,0.04)] relative overflow-hidden"
          style={{
            boxShadow: '0 35px 80px rgba(0,0,0,0.03), inset 0 0 50px rgba(255,255,255,0.95)',
          }}
        >
          {/* Inner border margin line */}
          <div className="absolute inset-3.5 border border-[#C5A059]/10 rounded-xl pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {/* Header */}
            <div className="text-center space-y-2">
              <p className="font-editorial-serif text-[10px] tracking-[0.45em] text-[#C5A059] uppercase font-semibold">
                Gallery
              </p>
              <h2 className="font-editorial-title text-2xl text-[#5A121D] font-light leading-tight">
                Sweet Moments
              </h2>
              <div className="h-[0.5px] w-16 bg-[#C5A059]/40 mx-auto mt-3" />
            </div>

            {/* Carousel Frame */}
            <div className="relative aspect-[3/4] rounded-2xl border border-[#C5A059]/15 p-2 bg-white shadow-[0_15px_35px_rgba(90,18,29,0.03)]">
              {/* Inner border line */}
              <div className="absolute inset-3 border border-[#C5A059]/5 rounded-xl pointer-events-none z-20" />

              <div className="relative w-full h-full overflow-hidden rounded-xl bg-stone-100">
                <AnimatePresence mode="wait">
                    <m.img
                      key={currentIndex}
                      src={cldUrl(photos[currentIndex], 800)}
                      alt={`Pre-wedding photo ${currentIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      drag={photos.length > 1 ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.6}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -60) nextSlide();
                        else if (info.offset.x > 60) prevSlide();
                      }}
                      onClick={() => setLightboxOpen(true)}
                      className="w-full h-full object-contain filter sepia-[10%] cursor-pointer touch-pan-y"
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows — pointless with a single photo */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-[#C5A059]/30 flex items-center justify-center text-xs text-[#5A121D] shadow-sm cursor-pointer hover:bg-white transition-colors z-20"
                        aria-label="Previous slide"
                      >
                        ⟨
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-[#C5A059]/30 flex items-center justify-center text-xs text-[#5A121D] shadow-sm cursor-pointer hover:bg-white transition-colors z-20"
                        aria-label="Next slide"
                      >
                        ⟩
                      </button>
                    </>
                  )}

                  {/* Page indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black/45 backdrop-blur-sm text-[9px] font-mono tracking-widest text-[#FCFBF9] z-20 pointer-events-none">
                    {currentIndex + 1} / {photos.length}
                  </div>
                </div>
              </div>

              {/* Thumbnail row */}
              <div className="flex gap-2 justify-center overflow-x-auto py-1">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className="w-12 h-16 rounded overflow-hidden border flex-shrink-0 cursor-pointer transition-all duration-300"
                    style={{
                      borderColor: currentIndex === idx ? '#5A121D' : 'rgba(197, 160, 89, 0.25)',
                      opacity: currentIndex === idx ? 1 : 0.5,
                      transform: currentIndex === idx ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cldUrl(p, 160)} alt={`Thumbnail ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover filter sepia-[10%]" />
                  </button>
                ))}
              </div>
            </div>
          </m.div>
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxOpen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 overflow-hidden"
              style={{ background: 'rgba(252,251,249,0.97)', backdropFilter: 'blur(20px)' }}
              onClick={() => setLightboxOpen(false)}
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
                  if (info.offset.x < -60) nextSlide();
                  else if (info.offset.x > 60) prevSlide();
                }}
                className="relative max-w-sm w-auto max-h-[80vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(90,18,29,0.15)] bg-white border border-[#C5A059]/20 touch-pan-y"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cldUrl(photos[currentIndex], 1080)}
                  alt={`Expanded Photo ${currentIndex + 1}`}
                  className="object-contain p-2 pointer-events-none select-none"
                  style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '70vh', display: 'block', margin: '0 auto' }}
                />
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-editorial-serif text-[10px] uppercase tracking-widest bg-white/90 text-[#5A121D] shadow-sm border border-[#C5A059]/30 z-10"
                >
                  {currentIndex + 1} / {photos.length}
                </div>
              </m.div>

              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    aria-label="Previous photo"
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 bg-white text-[#5A121D] shadow-lg border border-[#C5A059]/30 text-xl"
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    aria-label="Next photo"
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 bg-white text-[#5A121D] shadow-lg border border-[#C5A059]/30 text-xl"
                  >
                    ›
                  </button>
                </>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
                aria-label="Close photo viewer"
                className="absolute top-4 right-4 md:right-8 md:top-8 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 active:scale-95 bg-white text-[#5A121D] shadow-lg border border-[#C5A059]/30 text-xl"
              >
                ×
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </section>
  );
};

export default Gallery;
