'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Couple, WeddingEvent } from '@/types/invitation';
import { PetalRain } from './PetalRain';
import { LotusOrnament, DiamondDivider } from '../../royal-khmer-v1/components/KhmerOrnaments';

interface CoverProps {
  couple: Couple;
  events: WeddingEvent[];
  guestName?: string;
  coverImage?: string;
}

export const Cover: React.FC<CoverProps> = ({ couple, events, guestName, coverImage }) => {
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening-flap' | 'sliding-card' | 'zoom-out' | 'done'>('closed');
  const [opened, setOpened] = useState(false);
  const primaryEvent = events[0];

  const weddingDate = primaryEvent
    ? new Date(primaryEvent.dateSolar).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Prevent scroll when closed
  useEffect(() => {
    if (!opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [opened]);

  const handleOpen = () => {
    setEnvelopeState('opening-flap');

    setTimeout(() => {
      setEnvelopeState('sliding-card');
    }, 450);

    setTimeout(() => {
      setEnvelopeState('zoom-out');
    }, 1250);

    setTimeout(() => {
      setEnvelopeState('done');
      setOpened(true);
    }, 1850);
  };

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-pattern-phanaroth"
      style={{
        minHeight: '100dvh',
      }}
    >
      {/* User cover photo */}
      {coverImage && (
        <>
          <img src={coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ zIndex: 0 }} />
          <div className="absolute inset-0" style={{ background: 'rgba(14,7,4,0.58)', zIndex: 1 }} />
        </>
      )}

      {/* Dynamic rose petal rain */}
      <PetalRain count={38} />

      {/* Frame border lines */}
      <div
        className="absolute inset-4 pointer-events-none z-10"
        style={{ border: '1px solid rgba(232,201,122,0.22)', borderRadius: '6px' }}
      />
      <div
        className="absolute inset-6 pointer-events-none z-10"
        style={{ border: '1px solid rgba(232,201,122,0.08)', borderRadius: '6px' }}
      />

      {/* ─── 3D PHYSICAL ENVELOPE GATE VIEW ─── */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(74,4,4,0.2) 0%, rgba(26,2,2,0.92) 100%)',
            }}
          >
            {/* Header text */}
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-center space-y-1 mb-6 sm:mb-8"
            >
              <p className="font-serif-en text-[9px] sm:text-[10px] tracking-[0.45em] text-[#E8C97A] uppercase">
                Wedding Celebration
              </p>
              <h2 className="font-khmer-title text-sm sm:text-base text-[#FAF6EF]/90 leading-relaxed">
                ពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍
              </h2>
            </motion.div>

            {/* 3D Physical Envelope Structure */}
            <motion.div
              animate={
                envelopeState === 'zoom-out'
                  ? { scale: 1.35, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[90vw] max-w-[420px] aspect-[1.46] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 1. Envelope Back Wall */}
              <div
                className="absolute inset-0 rounded-xl border border-[#E8C97A]/25 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #3d0207 0%, #200104 100%)',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
                }}
              >
                {/* Internal pocket ornament texture */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #E8C97A 0px, #E8C97A 1px, transparent 1px, transparent 12px)',
                  }}
                />
              </div>

              {/* 2. Invitation Letter (slides UP out of envelope back wall) */}
              <motion.div
                animate={
                  envelopeState === 'sliding-card' || envelopeState === 'zoom-out'
                    ? { y: '-46%', scale: 0.98 }
                    : { y: 0, scale: 0.94 }
                }
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  zIndex: envelopeState === 'sliding-card' || envelopeState === 'zoom-out' ? 15 : 5,
                }}
                className="absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-lg shadow-lg p-5 flex flex-col items-center justify-center bg-[#FAF6EF] border border-[#E8C97A]/35"
              >
                {/* Inside card mini layout */}
                <div className="text-center space-y-1.5 text-[#5C030C] flex flex-col items-center justify-center">
                  <div className="opacity-85 scale-75">
                    <LotusOrnament size={25} color="#8B6914" />
                  </div>
                  <p className="font-serif-en text-[7px] tracking-[0.25em] uppercase font-bold text-[#8B6914] opacity-80">
                    Save the Date
                  </p>
                  <div className="w-16 h-[0.5px] bg-[#8B6914]/20 my-1" />
                  <h4 className="font-khmer-title text-[9px] leading-relaxed text-[#5C030C]">
                    {couple.groom.nameKh}
                  </h4>
                  <p className="font-serif-en italic text-[8px] opacity-50 my-0.5">&amp;</p>
                  <h4 className="font-khmer-title text-[9px] leading-relaxed text-[#5C030C]">
                    {couple.bride.nameKh}
                  </h4>
                </div>
              </motion.div>

              {/* 3. Envelope Front Pocket (Left, Right, Bottom triangular panels) */}
              <div
                className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                style={{
                  zIndex: 10,
                }}
              >
                <svg
                  viewBox="0 0 420 288"
                  className="w-full h-full drop-shadow-[0_-8px_20px_rgba(0,0,0,0.45)]"
                >
                  {/* Left Side Flap */}
                  <polygon points="0,0 210,144 0,288" fill="#3d0207" stroke="#E8C97A" strokeWidth="0.5" opacity="0.97" />
                  {/* Right Side Flap */}
                  <polygon points="420,0 210,144 420,288" fill="#3d0207" stroke="#E8C97A" strokeWidth="0.5" opacity="0.97" />
                  {/* Bottom Flap */}
                  <polygon points="0,288 210,132 420,288" fill="#5C030C" stroke="#E8C97A" strokeWidth="0.75" opacity="0.99" />
                  {/* Internal gold pattern stitch lines */}
                  <polygon points="10,278 210,140 410,278" fill="none" stroke="#FAF6EF" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
                </svg>
              </div>

              {/* 4. Guest Name Personalization Tag (pasted on envelope front pocket) */}
              {guestName && (
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center pointer-events-auto shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-[#E8C97A]/50 px-5 py-2.5 rounded-lg max-w-[85%] z-20"
                  style={{
                    background: 'linear-gradient(180deg, #FAF6EF 0%, #F5ECD8 100%)',
                  }}
                >
                  <p className="font-khmer-body text-[9px] tracking-wide font-semibold text-[#8B6914] uppercase opacity-75">
                    សូមគោរពអញ្ជើញ · invited guest
                  </p>
                  <p className="font-khmer-title text-xs mt-0.5 text-[#5C030C] whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                    {guestName}
                  </p>
                </div>
              )}

              {/* 5. Envelope Top Flap (rotates upwards around the top axis) */}
              <motion.div
                animate={{
                  rotateX: envelopeState === 'closed' ? 0 : -175,
                }}
                transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  transformOrigin: 'top',
                  transformStyle: 'preserve-3d',
                  zIndex: envelopeState === 'closed' ? 20 : 2,
                }}
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
              >
                <svg
                  viewBox="0 0 420 144"
                  className="w-full h-full drop-shadow-[0_10px_12px_rgba(0,0,0,0.5)]"
                >
                  <polygon points="0,0 420,0 210,144" fill="#450208" stroke="#E8C97A" strokeWidth="1.5" />
                  {/* Flap gold embroidery borders */}
                  <polygon points="12,6 408,6 210,132" fill="none" stroke="#E8C97A" strokeWidth="0.65" strokeDasharray="4 4" opacity="0.6" />
                </svg>
              </motion.div>

              {/* 6. Gold Wax Seal (Floating Click Trigger Button) */}
              <AnimatePresence>
                {envelopeState === 'closed' && (
                  <motion.div
                    key="wax-seal"
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.35 } }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <button
                      onClick={handleOpen}
                      className="w-18 h-18 rounded-full cursor-pointer flex items-center justify-center relative shadow-[0_10px_25px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-transform duration-300 group"
                      style={{
                        background: 'radial-gradient(circle, #FFE5A3 0%, #C9A84C 70%, #8B6914 100%)',
                        border: '3.5px double #5C030C',
                      }}
                      aria-label="Open invitation"
                    >
                      <div className="absolute inset-1 rounded-full border border-[#8B6914]/25" />
                      <LotusOrnament size={24} color="#8B6914" />
                      <div className="absolute inset-[-6px] rounded-full border border-dashed border-[#FAF6EF]/50 animate-spin opacity-40 group-hover:opacity-100" style={{ animationDuration: '9s' }} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Tap instruction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center space-y-1.5 mt-8 sm:mt-10 animate-pulse"
            >
              <p className="font-khmer-body text-xs text-[#E8C97A]">
                សូមចុចលើត្រាមាសដើម្បីបើកលិខិតអញ្ជើញ
              </p>
              <p className="font-serif-en text-[9px] tracking-widest uppercase text-[#FAF6EF]/60">
                Click the gold seal to open invitation
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── MAIN CARD COVER CONTENT (REVEALED ON OPEN) ─── */}
      <AnimatePresence>
        {opened && (
          <motion.div
            key="invitation-cover-card"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
            style={{ minHeight: '100dvh', paddingTop: '4rem', paddingBottom: '4rem' }}
          >
            {/* Crimson & Gold Royal double-border card wrapper */}
            <div
              className="double-border-gold rounded-3xl p-6 md:p-8 max-w-sm w-full backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.7)] border border-[#E8C97A]/30 space-y-7"
              style={{
                background: 'linear-gradient(135deg, rgba(92, 3, 12, 0.85) 0%, rgba(53, 2, 7, 0.9) 100%)',
              }}
            >
              <div className="animate-subtle-float flex justify-center">
                <LotusOrnament size={65} color="#E8C97A" />
              </div>

              <div className="space-y-1">
                <p className="font-serif-en text-[10px] tracking-[0.45em] text-[#E8C97A] uppercase font-bold">
                  Phanaroth digital template
                </p>
                <div className="w-16 h-[0.5px] bg-[#E8C97A]/20 mx-auto mt-2" />
              </div>

              {/* Guest name badge */}
              {guestName && (
                <div
                  className="mx-auto px-5 py-2.5 rounded-full w-fit border border-[#E8C97A]/25 shadow-md"
                  style={{
                    background: 'rgba(232, 201, 122, 0.08)',
                  }}
                >
                  <p className="font-khmer-body text-[10px] text-[#E8C97A]" style={{ opacity: 0.85 }}>
                    សូមគោរពអញ្ជើញ
                  </p>
                  <p className="font-khmer-title text-sm mt-0.5 text-[#FAF6EF]">
                    {guestName}
                  </p>
                </div>
              )}

              {/* Groom name */}
              <div className="space-y-0.5">
                <span
                  className="gold-shimmer font-khmer-title block"
                  style={{ fontSize: 'clamp(1.6rem, 6vw, 2.3rem)', lineHeight: 1.5 }}
                >
                  {couple.groom.nameKh}
                </span>
                <span
                  className="font-serif-en italic block text-xs text-[#FAF6EF]/60"
                >
                  {couple.groom.nameEn}
                </span>
              </div>

              {/* Gold floral ampersand */}
              <div className="flex justify-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center border"
                  style={{ borderColor: 'rgba(232, 201, 122, 0.35)', background: 'rgba(232, 201, 122, 0.06)' }}
                >
                  <span
                    className="font-serif-en italic text-lg text-[#E8C97A]"
                    style={{ lineHeight: 1 }}
                  >
                    &amp;
                  </span>
                </div>
              </div>

              {/* Bride name */}
              <div className="space-y-0.5">
                <span
                  className="gold-shimmer font-khmer-title block"
                  style={{ fontSize: 'clamp(1.6rem, 6vw, 2.3rem)', lineHeight: 1.5 }}
                >
                  {couple.bride.nameKh}
                </span>
                <span
                  className="font-serif-en italic block text-xs text-[#FAF6EF]/60"
                >
                  {couple.bride.nameEn}
                </span>
              </div>

              <div className="py-1">
                <DiamondDivider color="#E8C97A" />
              </div>

              {/* Schedule summary */}
              {primaryEvent && (
                <div className="space-y-1.5 text-[#FAF6EF]">
                  <p className="font-khmer-body text-xs font-semibold text-[#E8C97A]">
                    {primaryEvent.dateKh}
                  </p>
                  <p className="font-serif-en text-xs tracking-wider font-semibold opacity-85">
                    {weddingDate}
                  </p>
                  <p className="font-khmer-body text-xs opacity-60">
                    📍 {primaryEvent.locationName}
                  </p>
                </div>
              )}
            </div>

            {/* Spacer */}
            <div className="mt-8 opacity-25 flex justify-center">
              <LotusOrnament size={40} color="#E8C97A" />
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="font-serif-en text-[9px] tracking-[0.45em] uppercase text-[#E8C97A] opacity-75">
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-[1px] h-6"
                style={{ background: 'linear-gradient(to bottom, rgba(232,201,122,0.8), transparent)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Cover;
