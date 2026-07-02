import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Gallery: React.FC<{ photos: string[] }> = ({ photos }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prevPhoto = () => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  const nextPhoto = () => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      else if (e.key === 'ArrowLeft') prevPhoto();
      else if (e.key === 'ArrowRight') nextPhoto();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex === null]);

  if (!photos || photos.length === 0) return null;

  return (
    <section className="relative w-full py-20 bg-white/40 backdrop-blur-md border-y border-emerald-gold/20 flex flex-col items-center">
      {/* Masonry columns: every photo keeps its natural aspect ratio —
          no cropping — and the columns stagger themselves naturally. */}
      <div className="w-full max-w-2xl px-4 columns-2 gap-4 [&>*]:mb-4">
        {photos.map((photoUrl, index) => (
          <motion.div
            key={index}
            onClick={() => setLightboxIndex(index)}
            className="relative group w-full break-inside-avoid cursor-pointer border border-emerald-gold/50 transition-colors duration-300 hover:border-emerald-gold p-[4px]"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            role="button"
            aria-label={`View photo ${index + 1} of ${photos.length}`}
          >
            {/* Image Container inside the 4px gold frame gap */}
            <div className="relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.03]">
              <img
                src={photoUrl}
                alt="Gallery"
                loading="lazy"
                decoding="async"
                className="w-full h-auto"
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
              drag={photos.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) nextPhoto();
                else if (info.offset.x > 60) prevPhoto();
              }}
              className="relative max-w-sm w-full max-h-[85vh] rounded-2xl overflow-hidden border border-emerald-gold/30 shadow-[0_0_50px_rgba(201,168,76,0.15)] touch-pan-y"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={photos[lightboxIndex]} alt="Expanded" className="w-full h-full object-contain pointer-events-none select-none" style={{ maxHeight: '75vh' }} />
              
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-serif-en text-xs bg-[#0A1C16]/80 text-emerald-gold border border-emerald-gold/30">
                {lightboxIndex + 1} / {photos.length}
              </div>
            </motion.div>

            {photos.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 bg-emerald-gold/10 text-emerald-gold border border-emerald-gold/30 text-xl"
                >‹</button>
                <button onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 bg-emerald-gold/10 text-emerald-gold border border-emerald-gold/30 text-xl"
                >›</button>
              </>
            )}
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              aria-label="Close photo viewer"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer bg-[#0A1C16]/80 text-emerald-gold border border-emerald-gold/30 text-xl"
            >×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
