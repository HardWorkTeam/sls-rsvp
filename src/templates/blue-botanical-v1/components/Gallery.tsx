'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryProps { photos: string[]; }

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  return (
    <section className="py-20 px-6" style={{ background: 'transparent' }}>
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="font-serif-en text-xs tracking-[0.4em] uppercase" style={{ color: '#9BB0C8' }}>Photo Gallery</p>
          <h2 className="font-khmer-title text-xl" style={{ color: '#2C3E56', lineHeight: 1.7 }}>អាល់ប៊ុមរូបថត</h2>
          <div className="h-[1px] w-20 mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(106,140,178,0.4), transparent)' }} />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {photos.map((url, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => setLightbox(i)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
              style={{ border: '1px solid rgba(106,140,178,0.2)' }}
            >
              <img src={url} alt={`Photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                style={{ background: 'rgba(44,62,86,0.3)' }}>
                <span style={{ color: '#fff', fontSize: '1.5rem' }}>⊕</span>
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
              style={{ background: 'rgba(44,62,86,0.92)', backdropFilter: 'blur(16px)' }}
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                transition={{ ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-sm w-full rounded-2xl overflow-hidden"
                style={{ border: '2px solid rgba(106,140,178,0.4)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={photos[lightbox]} alt="" className="w-full object-contain" style={{ maxHeight: '75vh' }} />
                <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-serif-en"
                  style={{ background: 'rgba(44,62,86,0.8)', color: '#B8D0E8', border: '1px solid rgba(106,140,178,0.4)' }}>
                  {lightbox + 1} / {photos.length}
                </div>
              </motion.div>
              <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => i !== null ? (i - 1 + photos.length) % photos.length : null); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: 'rgba(106,140,178,0.2)', color: '#B8D0E8', border: '1px solid rgba(106,140,178,0.4)' }}>‹</button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox((i) => i !== null ? (i + 1) % photos.length : null); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xl"
                style={{ background: 'rgba(106,140,178,0.2)', color: '#B8D0E8', border: '1px solid rgba(106,140,178,0.4)' }}>›</button>
              <button onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(44,62,86,0.8)', color: '#B8D0E8', border: '1px solid rgba(106,140,178,0.4)' }}>×</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
export default Gallery;
