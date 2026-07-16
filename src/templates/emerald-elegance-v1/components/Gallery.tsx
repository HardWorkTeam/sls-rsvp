'use client';

import React, { useEffect, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Photo } from '@/components/Photo';
import { EtherealBorderFrame, ThinGoldRule, DiamondSeparator } from './BotanicalAssets';

export const Gallery: React.FC<{ photos: string[] }> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
      else if (e.key === 'ArrowRight') setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, photos.length]);

  if (!photos || photos.length === 0) return null;

  return (
    <section className="relative w-full py-20 bg-transparent overflow-hidden px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="font-emerald-sans text-[10px] tracking-[0.35em] uppercase text-emerald-gold font-semibold">
            Photo Gallery
          </p>
          <h2 className="font-emerald-serif text-3xl md:text-4xl text-emerald-gradient leading-relaxed">
            អាល់ប៊ុមរូបថត
          </h2>
          <div className="w-24 mx-auto mt-2">
            <ThinGoldRule />
          </div>
        </div>

        {/* Gallery Ethereal Frame Container */}
        <m.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <EtherealBorderFrame className="shadow-[0_8px_30px_rgba(201,168,76,0.1)] p-4 sm:p-8 text-center">
            
            {/* Featured Photo Frame */}
            <div className="relative aspect-[3/4] sm:aspect-[4/3] w-full rounded-xl overflow-hidden border border-emerald-gold/30 bg-[#0A1C16]/40 shadow-inner group mb-5">
              <AnimatePresence mode="wait">
                <m.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative cursor-pointer"
                  onClick={() => setLightboxIndex(currentIndex)}
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
                    alt={`Photo ${currentIndex + 1}`}
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="w-full h-full object-contain p-1"
                  />
                  {/* Hover expand indicator */}
                  <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-[#0A1C16]/30 backdrop-blur-[2px] pointer-events-none">
                    <span className="text-emerald-gold text-2xl font-light">⊕ Expand Photo</span>
                  </div>
                </m.div>
              </AnimatePresence>

              {/* Prev / Next navigation arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i - 1 + photos.length) % photos.length); }}
                    aria-label="Previous photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-[#0A1C16]/70 text-emerald-gold border border-emerald-gold/40 text-lg shadow-md hover:bg-[#0A1C16] hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setCurrentIndex((i) => (i + 1) % photos.length); }}
                    aria-label="Next photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-[#0A1C16]/70 text-emerald-gold border border-emerald-gold/40 text-lg shadow-md hover:bg-[#0A1C16] hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Slide Counter badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-serif-en bg-[#0A1C16]/80 text-emerald-gold border border-emerald-gold/30 z-20 backdrop-blur-sm">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>

            {/* Thumbnail Selection Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1 scrollbar-thin">
              {photos.map((photoUrl, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative aspect-square w-full rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                    currentIndex === index
                      ? 'border-emerald-gold ring-2 ring-emerald-gold/40 scale-[1.03]'
                      : 'border-emerald-gold/20 opacity-60 hover:opacity-100 hover:border-emerald-gold/60'
                  }`}
                  aria-label={`Select photo ${index + 1}`}
                >
                  <Photo
                    src={photoUrl}
                    alt={`Thumbnail ${index + 1}`}
                    sizes="120px"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="w-1/3 mx-auto mt-6">
              <DiamondSeparator />
            </div>

          </EtherealBorderFrame>
        </m.div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-[#0A1C16]/95 backdrop-blur-md overflow-hidden"
            onClick={() => setLightboxIndex(null)}
          >
            <m.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              drag={photos.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
                else if (info.offset.x > 60) setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
              }}
              className="relative max-w-sm w-auto max-h-[80vh] flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-emerald-gold/30 shadow-[0_0_50px_rgba(201,168,76,0.15)] touch-pan-y"
              onClick={(e) => e.stopPropagation()}
            >
              <Photo
                src={photos[lightboxIndex]}
                alt="Expanded Photo"
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-contain pointer-events-none select-none"
                style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '70vh', display: 'block', margin: '0 auto' }}
              />

              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-serif-en text-xs bg-[#0A1C16]/80 text-emerald-gold border border-emerald-gold/30 z-10">
                {lightboxIndex + 1} / {photos.length}
              </div>
            </m.div>

            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)); }}
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 bg-emerald-gold/10 text-emerald-gold border border-emerald-gold/30 text-xl z-20"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null)); }}
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 bg-emerald-gold/10 text-emerald-gold border border-emerald-gold/30 text-xl z-20"
                >
                  ›
                </button>
              </>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              aria-label="Close photo viewer"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer bg-[#0A1C16]/80 text-emerald-gold border border-emerald-gold/30 text-xl z-20"
            >
              ×
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};
