'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryProps { photos: string[]; }

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <section className="py-20 px-6" style={{ background: 'linear-gradient(180deg, rgba(255, 243, 208, 0.85) 0%, rgba(255, 232, 154, 0.75) 40%, rgba(255, 243, 208, 0.85) 100%)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#B8860B' }}>Photo Gallery</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#5C3A00', lineHeight: 1.7 }}>អាល់ប៊ុមរូបថត</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #D4A020, transparent)' }} />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {photos.map((url, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              onClick={() => setLightbox(i)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
              style={{ border: '2px solid rgba(212,160,32,0.35)' }}
            >
              <img src={url} alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ filter: 'sepia(10%) brightness(0.9) saturate(1.1)' }}
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                style={{ background: 'rgba(92,58,0,0.35)' }}>
                <span style={{ color: '#FFE566', fontSize: '1.5rem' }}>⊕</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              style={{ background: 'rgba(92,58,0,0.92)', backdropFilter: 'blur(16px)' }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-sm w-full rounded-2xl overflow-hidden"
                style={{ border: '2px solid rgba(212,160,32,0.4)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={photos[lightbox]} alt="" className="w-full object-contain" style={{ maxHeight: '75vh' }} />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-serif-en"
                  style={{ background: 'rgba(92,58,0,0.8)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}>
                  {lightbox + 1} / {photos.length}
                </div>
              </motion.div>
              <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => i !== null ? (i - 1 + photos.length) % photos.length : null); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: 'rgba(212,160,32,0.2)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}>‹</button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => i !== null ? (i + 1) % photos.length : null); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: 'rgba(212,160,32,0.2)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}>›</button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(92,58,0,0.8)', color: '#FFE566', border: '1px solid rgba(212,160,32,0.4)' }}>×</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default Gallery;
