"use client";

import { Photo } from "@/components/Photo";
import { Portal } from "@/components/Portal";
import { AnimatePresence, m } from "framer-motion";
import React, { useEffect, useState } from "react";

interface GalleryProps {
  photos: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Track natural aspect ratios: true = landscape/square, false = portrait
  const [isWideMap, setIsWideMap] = useState<Record<number, boolean>>({});

  // Keyboard navigation for Lightbox
  const isOpen = lightbox !== null;
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowLeft")
        setLightbox((i) =>
          i !== null ? (i - 1 + photos.length) % photos.length : null,
        );
      else if (e.key === "ArrowRight")
        setLightbox((i) => (i !== null ? (i + 1) % photos.length : null));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, photos.length]);

  if (!photos || photos.length === 0) return null;

  const isCurrentWide = isWideMap[currentIndex] ?? true;

  return (
    <section
      className="py-12 sm:py-20 px-4 sm:px-6 min-h-screen flex flex-col justify-center"
      style={{
        background:
          "linear-gradient(180deg, rgba(255, 243, 208, 0.85) 0%, rgba(255, 232, 154, 0.75) 40%, rgba(255, 243, 208, 0.85) 100%)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="max-w-3xl mx-auto w-full space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <p
            className="font-serif-en text-xs tracking-[0.4em] uppercase"
            style={{ color: "#B8860B" }}
          >
            Photo Gallery
          </p>
          <h2
            className="font-khmer-title text-2xl sm:text-3xl"
            style={{ color: "#5C3A00", lineHeight: 1.7 }}
          >
            អាល់ប៊ុមរូបថត
          </h2>
          <div
            className="h-[1px] w-20 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, #D4A020, transparent)",
            }}
          />
        </div>

        {/* Angkor Ornate Frame Card Wrapper */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl p-3 sm:p-6 shadow-2xl relative overflow-hidden"
          style={{
            background: "rgba(92, 58, 0, 0.08)",
            border: "2px solid rgba(212, 160, 32, 0.4)",
          }}
        >
          {/* Dynamically adjust max width based on whether current photo is Portrait or Landscape */}
          <div
            className={`mx-auto transition-all duration-500 ease-out ${isCurrentWide ? "max-w-2xl" : "max-w-md"}`}
          >
            {/* Main Interactive View Container - Dynamically sets aspect ratio based on image shape */}
            <div
              className={`relative w-full rounded-xl overflow-hidden mb-4 group cursor-pointer flex items-center justify-center transition-all duration-500 ease-out ${
                isCurrentWide
                  ? "aspect-[4/3] sm:aspect-[16/10]"
                  : "aspect-[3/4] sm:aspect-[4/5]"
              }`}
              style={{
                border: "2px solid rgba(212, 160, 32, 0.5)",
                background: "rgba(92, 58, 0, 0.3)",
              }}
              onClick={() => setLightbox(currentIndex)}
            >
              <AnimatePresence mode="wait">
                <m.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative flex items-center justify-center"
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
                    alt={`Gallery photo ${currentIndex + 1}`}
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="w-full h-full object-cover p-1"
                    style={{
                      filter: "sepia(10%) brightness(0.95) saturate(1.05)",
                    }}
                    onLoad={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (img.naturalWidth && img.naturalHeight) {
                        setIsWideMap((prev) => ({
                          ...prev,
                          [currentIndex]: img.naturalWidth >= img.naturalHeight,
                        }));
                      }
                    }}
                  />

                  {/* Hover Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none"
                    style={{ background: "rgba(92,58,0,0.35)" }}
                  >
                    <span
                      style={{ color: "#FFE566" }}
                      className="font-serif-en text-xs sm:text-sm px-4 py-2 rounded-full bg-[rgba(92,58,0,0.85)] border border-[rgba(212,160,32,0.4)]"
                    >
                      ⊕ Expand Photo
                    </span>
                  </div>
                </m.div>
              </AnimatePresence>

              {/* Prev / Next Buttons */}
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
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-lg z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-lg"
                    style={{
                      background: "rgba(92,58,0,0.85)",
                      color: "#FFE566",
                      border: "1px solid rgba(212,160,32,0.5)",
                    }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex((i) => (i + 1) % photos.length);
                    }}
                    aria-label="Next photo"
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-lg z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-lg"
                    style={{
                      background: "rgba(92,58,0,0.85)",
                      color: "#FFE566",
                      border: "1px solid rgba(212,160,32,0.5)",
                    }}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Counter */}
              <div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-serif-en z-20 pointer-events-none shadow-md"
                style={{
                  background: "rgba(92,58,0,0.85)",
                  color: "#FFE566",
                  border: "1px solid rgba(212,160,32,0.4)",
                }}
              >
                {currentIndex + 1} / {photos.length}
              </div>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1 scrollbar-thin">
            {photos.map((url, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative aspect-square w-full rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
                  currentIndex === i
                    ? "scale-[1.03]"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  border:
                    currentIndex === i
                      ? "2px solid #D4A020"
                      : "1px solid rgba(212,160,32,0.3)",
                  boxShadow:
                    currentIndex === i
                      ? "0 0 10px rgba(212,160,32,0.5)"
                      : "none",
                }}
                aria-label={`Select photo ${i + 1}`}
              >
                <Photo
                  src={url}
                  alt={`Thumbnail ${i + 1}`}
                  sizes="120px"
                  className="w-full h-full object-cover"
                  style={{ filter: "sepia(10%) brightness(0.9) saturate(1.1)" }}
                  onLoad={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (img.naturalWidth && img.naturalHeight) {
                      setIsWideMap((prev) => ({
                        ...prev,
                        [i]: img.naturalWidth >= img.naturalHeight,
                      }));
                    }
                  }}
                />
              </button>
            ))}
          </div>
        </m.div>

        {/* Lightbox Modal — portalled to <body>: this section sets a
            backdrop-filter, which makes it the containing block for fixed
            children and would otherwise pin the overlay to the section box. */}
        <Portal>
          <AnimatePresence>
            {lightbox !== null && (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
                style={{
                  background: "rgba(20, 12, 0, 0.92)",
                  backdropFilter: "blur(16px)",
                }}
                onClick={() => setLightbox(null)}
              >
                <m.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.3 }}
                  drag={photos.length > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60)
                      setLightbox((i) =>
                        i !== null ? (i + 1) % photos.length : null,
                      );
                    else if (info.offset.x > 60)
                      setLightbox((i) =>
                        i !== null
                          ? (i - 1 + photos.length) % photos.length
                          : null,
                      );
                  }}
                  className="relative w-full h-full max-h-[85vh] flex items-center justify-center p-2 touch-pan-y"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Photo
                    src={photos[lightbox]}
                    alt={`Fullview photo ${lightbox + 1}`}
                    sizes="100vw"
                    className="object-contain pointer-events-none select-none rounded-lg max-w-full max-h-[78vh] w-auto h-auto mx-auto shadow-2xl"
                    style={{ border: "1px solid rgba(212,160,32,0.3)" }}
                  />

                  {/* Counter */}
                  <div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-serif-en z-10 shadow-lg"
                    style={{
                      background: "rgba(92,58,0,0.85)",
                      color: "#FFE566",
                      border: "1px solid rgba(212,160,32,0.4)",
                    }}
                  >
                    {lightbox + 1} / {photos.length}
                  </div>
                </m.div>

                {/* Lightbox Controls */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox((i) =>
                          i !== null
                            ? (i - 1 + photos.length) % photos.length
                            : null,
                        );
                      }}
                      aria-label="Previous photo"
                      className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-lg"
                      style={{
                        background: "rgba(92,58,0,0.85)",
                        color: "#FFE566",
                        border: "1px solid rgba(212,160,32,0.5)",
                      }}
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox((i) =>
                          i !== null ? (i + 1) % photos.length : null,
                        );
                      }}
                      aria-label="Next photo"
                      className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-xl sm:text-2xl z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-lg"
                      style={{
                        background: "rgba(92,58,0,0.85)",
                        color: "#FFE566",
                        border: "1px solid rgba(212,160,32,0.5)",
                      }}
                    >
                      ›
                    </button>
                  </>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox(null);
                  }}
                  aria-label="Close photo viewer"
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95 shadow-lg"
                  style={{
                    background: "rgba(92,58,0,0.85)",
                    color: "#FFE566",
                    border: "1px solid rgba(212,160,32,0.5)",
                  }}
                >
                  ×
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </Portal>
      </div>
    </section>
  );
};

export default Gallery;
