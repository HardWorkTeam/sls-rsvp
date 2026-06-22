'use client';

import React, { useState } from 'react';
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

        {/* Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {photos.map((url, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => openLightbox(i)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
              }`}
              style={{ border: '1px solid rgba(201,168,76,0.2)' }}
            >
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                className="relative max-w-sm w-full max-h-[85vh] rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(201,168,76,0.3)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={photos[lightboxIndex]}
                  alt={`Photo ${lightboxIndex + 1}`}
                  className="w-full h-full object-contain"
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

              {/* Prev/Next */}
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--rk-gold)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--rk-gold)', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                ›
              </button>

              {/* Close */}
              <button
                onClick={closeLightbox}
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
