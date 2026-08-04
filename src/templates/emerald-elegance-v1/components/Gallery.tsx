"use client";

import { Photo } from "@/components/Photo";
import { AnimatePresence, m } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  DiamondSeparator,
  EtherealBorderFrame,
  ThinGoldRule,
} from "./BotanicalAssets";

export const Gallery: React.FC<{ photos: string[] }> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Map to store detected natural orientation: true = landscape/square, false = portrait
  const [isWideMap, setIsWideMap] = useState<Record<number, boolean>>({});

  // Keyboard navigation while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      else if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i !== null ? (i - 1 + photos.length) % photos.length : null,
        );
      else if (e.key === "ArrowRight")
        setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, photos.length]);

  if (!photos || photos.length === 0) return null;

  const isCurrentWide = isWideMap[currentIndex] ?? true;

  return (
    <section className="relative w-full py-12 sm:py-20 bg-transparent overflow-hidden px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
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
          <EtherealBorderFrame className="shadow-[0_8px_30px_rgba(201,168,76,0.1)] p-3 sm:p-8 text-center">
            {/* Dynamic Sizing Outer Wrapper - Morphs max-width smoothly depending on photo orientation */}
            <div
              className={`mx-auto transition-all duration-500 ease-out ${isCurrentWide ? "max-w-2xl" : "max-w-md"}`}
            >
              {/* Featured Photo Frame - Morphs aspect ratio smoothly between portrait and landscape */}
              <div
                className={`relative w-full rounded-xl overflow-hidden border border-emerald-gold/30 bg-[#0A1C16]/40 shadow-inner group mb-5 transition-all duration-500 ease-out ${
                  isCurrentWide
                    ? "aspect-[4/3] sm:aspect-[16/10]"
                    : "aspect-[3/4] sm:aspect-[4/5]"
                }`}
              >
                <AnimatePresence mode="wait">
                  <m.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full relative cursor-pointer"
                    onClick={() => setLightboxIndex(currentIndex)}
                    drag={photos.length > 1 ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -50)
                        setCurrentIndex((i) => (i + 1) % photos.length);
                      else if (info.offset.x > 50)
                        setCurrentIndex(
                          (i) => (i - 1 + photos.length) % photos.length,
                        );
                    }}
                  >
                    <Photo
                      src={photos[currentIndex]}
                      alt={`Photo ${currentIndex + 1}`}
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="w-full h-full object-cover p-1 rounded-xl"
                      onLoad={(e) => {
                        const img = e.currentTarget as HTMLImageElement;
                        if (img.naturalWidth && img.naturalHeight) {
                          setIsWideMap((prev) => ({
                            ...prev,
                            [currentIndex]:
                              img.naturalWidth >= img.naturalHeight,
                          }));
                        }
                      }}
                    />

                    {/* Hover expand indicator */}
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-[#0A1C16]/40 backdrop-blur-[2px] pointer-events-none">
                      <span className="text-emerald-gold text-xs sm:text-sm font-light px-4 py-2 rounded-full bg-[#0A1C16]/85 border border-emerald-gold/40">
                        ⊕ Expand Photo
                      </span>
                    </div>
                  </m.div>
                </AnimatePresence>

                {/* Prev / Next navigation arrows */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex(
                          (i) => (i - 1 + photos.length) % photos.length,
                        );
                      }}
                      aria-label="Previous photo"
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-[#0A1C16]/80 text-emerald-gold border border-emerald-gold/40 text-lg shadow-md hover:bg-[#0A1C16] hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentIndex((i) => (i + 1) % photos.length);
                      }}
                      aria-label="Next photo"
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-[#0A1C16]/80 text-emerald-gold border border-emerald-gold/40 text-lg shadow-md hover:bg-[#0A1C16] hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
                    >
                      ›
                    </button>
                  </>
                )}

                {/* Slide Counter badge */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-serif-en bg-[#0A1C16]/85 text-emerald-gold border border-emerald-gold/30 z-20 backdrop-blur-sm shadow-md">
                  {currentIndex + 1} / {photos.length}
                </div>
              </div>
            </div>

            {/* Thumbnail Selection Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 p-1">
              {photos.map((photoUrl, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative aspect-square w-full rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                    currentIndex === index
                      ? "border-emerald-gold ring-2 ring-emerald-gold/40 scale-[1.03]"
                      : "border-emerald-gold/20 opacity-60 hover:opacity-100 hover:border-emerald-gold/60"
                  }`}
                  aria-label={`Select photo ${index + 1}`}
                >
                  <Photo
                    src={photoUrl}
                    alt={`Thumbnail ${index + 1}`}
                    sizes="120px"
                    className="w-full h-full object-cover"
                    onLoad={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (img.naturalWidth && img.naturalHeight) {
                        setIsWideMap((prev) => ({
                          ...prev,
                          [index]: img.naturalWidth >= img.naturalHeight,
                        }));
                      }
                    }}
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-[#0A1C16]/95 backdrop-blur-md overflow-hidden"
            onClick={() => setLightboxIndex(null)}
          >
            <m.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              drag={photos.length > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60)
                  setLightboxIndex((i) =>
                    i !== null ? (i + 1) % photos.length : null,
                  );
                else if (info.offset.x > 60)
                  setLightboxIndex((i) =>
                    i !== null ? (i - 1 + photos.length) % photos.length : null,
                  );
              }}
              className="relative w-full max-w-5xl h-full max-h-[85vh] flex items-center justify-center p-2 touch-pan-y"
              onClick={(e) => e.stopPropagation()}
            >
              <Photo
                src={photos[lightboxIndex]}
                alt="Expanded Photo"
                sizes="100vw"
                className="object-contain pointer-events-none select-none rounded-xl max-w-full max-h-[78vh] w-auto h-auto mx-auto shadow-[0_0_50px_rgba(201,168,76,0.15)] border border-emerald-gold/30"
              />

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-serif-en text-xs sm:text-sm bg-[#0A1C16]/90 text-emerald-gold border border-emerald-gold/40 z-10 shadow-lg">
                {lightboxIndex + 1} / {photos.length}
              </div>
            </m.div>

            {/* Lightbox Controls */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) =>
                      i !== null
                        ? (i - 1 + photos.length) % photos.length
                        : null,
                    );
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 bg-emerald-gold/10 text-emerald-gold border border-emerald-gold/40 text-xl sm:text-2xl z-20 shadow-lg"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) =>
                      i !== null ? (i + 1) % photos.length : null,
                    );
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 bg-emerald-gold/10 text-emerald-gold border border-emerald-gold/40 text-xl sm:text-2xl z-20 shadow-lg"
                >
                  ›
                </button>
              </>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              aria-label="Close photo viewer"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer bg-[#0A1C16]/90 text-emerald-gold border border-emerald-gold/40 text-xl z-20 shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              ×
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};
