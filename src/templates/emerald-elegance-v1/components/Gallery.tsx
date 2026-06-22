import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Gallery: React.FC<{ photos: string[] }> = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!photos || photos.length === 0) return null;

  return (
    <section className="relative w-full py-20 bg-white/40 backdrop-blur-md border-y border-emerald-gold/20 flex flex-col items-center">
      <div className="w-full max-w-2xl px-4 grid grid-cols-2 gap-4">
        {photos.map((photoUrl, index) => (
          <motion.div
            key={index}
            onClick={() => setLightboxIndex(index)}
            className={`relative group overflow-hidden w-full cursor-pointer ${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'} ${index % 2 !== 0 ? 'mt-8' : ''}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            {/* Outer Gold Border Ring */}
            <div className="absolute inset-0 border border-emerald-gold/50 z-10 transition-colors duration-300 group-hover:border-emerald-gold pointer-events-none"></div>
            
            {/* Image Container with 4px gap */}
            <div className="absolute inset-[4px] overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]">
              <img 
                src={photoUrl} 
                alt="Gallery" 
                className="w-full h-full object-cover"
              />
              
              {/* Vignette Overlay */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)'
              }}></div>

              {/* Shimmer overlay on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" style={{
                background: 'linear-gradient(105deg, transparent 20%, rgba(201, 168, 76, 0.15) 50%, transparent 80%)'
              }}></div>
            </div>
            {/* Hover icon */}
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-[#0A1C16]/20 pointer-events-none">
              <span className="text-emerald-gold text-2xl">⊕</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A1C16]/95 backdrop-blur-md"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-sm w-full max-h-[85vh] rounded-2xl overflow-hidden border border-emerald-gold/30 shadow-[0_0_50px_rgba(201,168,76,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={photos[lightboxIndex]} alt="Expanded" className="w-full h-full object-contain" style={{ maxHeight: '75vh' }} />
              
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-serif-en text-xs bg-[#0A1C16]/80 text-emerald-gold border border-emerald-gold/30">
                {lightboxIndex + 1} / {photos.length}
              </div>
            </motion.div>

            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => i !== null ? (i - 1 + photos.length) % photos.length : null); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 bg-emerald-gold/10 text-emerald-gold border border-emerald-gold/30 text-xl"
            >‹</button>
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => i !== null ? (i + 1) % photos.length : null); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 bg-emerald-gold/10 text-emerald-gold border border-emerald-gold/30 text-xl"
            >›</button>
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer bg-[#0A1C16]/80 text-emerald-gold border border-emerald-gold/30 text-xl"
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
