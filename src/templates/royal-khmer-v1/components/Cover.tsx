'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Couple, WeddingEvent } from '@/types/invitation';
import { GoldParticles } from './GoldParticles';
import { LotusOrnament, DiamondDivider } from './KhmerOrnaments';

interface CoverProps {
  couple: Couple;
  events: WeddingEvent[];
  guestName?: string;
}

export const Cover: React.FC<CoverProps> = ({ couple, events, guestName }) => {
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

  // Block scrolling on body until envelope is fully opened
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
    // 1. Play seal break sound / start transition
    setEnvelopeState('opening-flap');

    // 2. Start card slide-up after flap starts rotating
    setTimeout(() => {
      setEnvelopeState('sliding-card');
    }, 450);

    // 3. Zoom envelope out and fade card in
    setTimeout(() => {
      setEnvelopeState('zoom-out');
    }, 1250);

    // 4. Mark opening animation as complete and unlock scroll
    setTimeout(() => {
      setEnvelopeState('done');
      setOpened(true);
    }, 1850);
  };

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center bg-pattern-royal"
      style={{
        minHeight: '100dvh',
      }}
    >
      {/* Floating gold particles */}
      <GoldParticles count={35} />

      {/* Top and Bottom decorative gold bands */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] z-10"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent)' }}
      />

      {/* Frame border outlines */}
      <div
        className="absolute inset-4 pointer-events-none z-10"
        style={{ border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px' }}
      />
      <div
        className="absolute inset-6 pointer-events-none z-10"
        style={{ border: '1px solid rgba(201,168,76,0.08)', borderRadius: '4px' }}
      />

      {/* ─── UNOPENED ENVELOPE GATE VIEW ─── */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="envelope-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(26,14,8,0.2) 0%, rgba(14,7,4,0.92) 100%)',
            }}
          >
            {/* Header text */}
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-center space-y-1 mb-8"
            >
              <p
                className="font-serif-en tracking-[0.45em] text-[10px] uppercase text-[#E8C97A]"
                style={{ opacity: 0.85 }}
              >
                Wedding Invitation
              </p>
              <h2
                className="font-khmer-title text-base"
                style={{ color: 'var(--rk-gold)', lineHeight: 1.7 }}
              >
                សេចក្តីគោរពអញ្ជើញ
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
                className="absolute inset-0 rounded-xl border border-[#C9A84C]/25 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1f100a 0%, #110804 100%)',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
                }}
              >
                {/* Internal pocket ornament texture */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 12px)',
                  }}
                />
              </div>

              {/* 2. Invitation Letter (slides UP out of envelope back wall) */}
              <motion.div
                animate={
                  envelopeState === 'sliding-card' || envelopeState === 'zoom-out'
                    ? { y: -130, scale: 0.98 }
                    : { y: 0, scale: 0.94 }
                }
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  zIndex: envelopeState === 'sliding-card' || envelopeState === 'zoom-out' ? 15 : 5,
                }}
                className="absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-lg shadow-lg p-5 flex flex-col items-center justify-center bg-[#FAF6EF] border border-[#C9A84C]/35"
              >
                {/* Inside card mini layout */}
                <div className="text-center space-y-1.5 text-[#2C1810] flex flex-col items-center justify-center">
                  <div className="opacity-80 scale-75">
                    <LotusOrnament size={25} color="#8B6914" />
                  </div>
                  <p className="font-serif-en text-[7px] tracking-[0.25em] uppercase font-bold text-[#8B6914] opacity-80">
                    Save the Date
                  </p>
                  <div className="w-16 h-[0.5px] bg-[#8B6914]/20 my-1" />
                  <h4 className="font-khmer-title text-[9px] leading-relaxed text-[#2C1810]">
                    {couple.groom.nameKh}
                  </h4>
                  <p className="font-serif-en italic text-[8px] opacity-50 my-0.5">&amp;</p>
                  <h4 className="font-khmer-title text-[9px] leading-relaxed text-[#2C1810]">
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
                  <polygon points="0,0 210,144 0,288" fill="#20110a" stroke="#8B6914" strokeWidth="0.5" opacity="0.97" />
                  {/* Right Side Flap */}
                  <polygon points="420,0 210,144 420,288" fill="#20110a" stroke="#8B6914" strokeWidth="0.5" opacity="0.97" />
                  {/* Bottom Flap */}
                  <polygon points="0,288 210,132 420,288" fill="#2c1810" stroke="#C9A84C" strokeWidth="0.75" opacity="0.99" />
                  {/* Internal gold pattern stitch lines */}
                  <polygon points="10,278 210,140 410,278" fill="none" stroke="#FAF6EF" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
                </svg>
              </div>

              {/* 4. Guest Name Personalization Tag (pasted on envelope front pocket) */}
              {guestName && (
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center pointer-events-auto shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-[#C9A84C]/50 px-5 py-2.5 rounded-lg max-w-[85%] z-20"
                  style={{
                    background: 'linear-gradient(180deg, #FAF6EF 0%, #F5ECD8 100%)',
                  }}
                >
                  <p className="font-khmer-body text-[9px] tracking-wide font-semibold text-[#8B6914] uppercase opacity-75">
                    សូមគោរពអញ្ជើញ · invited guest
                  </p>
                  <p className="font-khmer-title text-xs mt-0.5 text-[#2C1810] whitespace-nowrap overflow-hidden text-ellipsis">
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
                className="absolute inset-x-0 top-0 h-[144px] pointer-events-none"
              >
                <svg
                  viewBox="0 0 420 144"
                  className="w-full h-full drop-shadow-[0_10px_12px_rgba(0,0,0,0.5)]"
                >
                  <polygon points="0,0 420,0 210,144" fill="#221208" stroke="#C9A84C" strokeWidth="1.5" />
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
                    className="absolute left-1/2 top-[138px] -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <button
                      onClick={handleOpen}
                      className="w-16 h-16 rounded-full cursor-pointer flex items-center justify-center relative shadow-[0_8px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:scale-105 active:scale-95 group"
                      style={{
                        background: 'radial-gradient(circle, #E8C97A 0%, #C9A84C 70%, #8B6914 100%)',
                        border: '2px solid #FAF6EF',
                      }}
                      aria-label="Open invitation"
                    >
                      <div className="absolute inset-1 rounded-full border border-[#8B6914]/30" />
                      <LotusOrnament size={24} color="#8B6914" />

                      {/* Rotating exterior gold dotted ring */}
                      <div
                        className="absolute inset-[-6px] rounded-full border border-dashed border-[#FAF6EF]/50 animate-spin opacity-45 group-hover:opacity-100"
                        style={{ animationDuration: '10s' }}
                      />
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
              className="text-center space-y-1.5 mt-10 animate-pulse"
            >
              <p className="font-khmer-body text-xs text-[#E8C97A]">
                សូមចុចលើត្រាបង្កកមាស ដើម្បីបើកលិខិតអញ្ជើញ
              </p>
              <p className="font-serif-en text-[9px] tracking-widest uppercase text-[#FAF6EF]/60">
                Click the gold seal to open invitation
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── OPENED INVITATION COVER CONTENT VIEW ─── */}
      <AnimatePresence>
        {opened && (
          <motion.div
            key="opened-cover-content"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center px-6 text-center"
            style={{ minHeight: '100dvh', paddingTop: '4rem', paddingBottom: '4rem' }}
          >
            {/* Luxurious double gold border frame wrapping the names */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="double-border-gold rounded-2xl px-6 py-10 max-w-sm w-full bg-[#1c0f08]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-[#C9A84C]/25 space-y-6"
            >
              {/* Animated Lotus */}
              <div className="animate-subtle-float flex justify-center">
                <LotusOrnament size={65} />
              </div>

              {/* Tag line */}
              <p
                className="font-serif-en text-xs tracking-[0.45em] uppercase text-center text-[#C9A84C]"
                style={{ opacity: 0.8 }}
              >
                Royal Khmer Wedding
              </p>

              {/* Personalization (inside opened cover too) */}
              {guestName && (
                <div
                  className="mx-auto px-5 py-2.5 rounded-full w-fit border border-[#C9A84C]/20"
                  style={{
                    background: 'rgba(201,168,76,0.06)',
                  }}
                >
                  <p className="font-khmer-body text-[10px] text-[#C9A84C]" style={{ opacity: 0.9 }}>
                    សូមគោរពអញ្ជើញ
                  </p>
                  <p className="font-khmer-title text-sm mt-0.5 text-[#E8C97A] leading-relaxed">
                    {guestName}
                  </p>
                </div>
              )}

              {/* Groom name */}
              <div className="space-y-0.5">
                <span
                  className="gold-shimmer font-khmer-title block"
                  style={{ fontSize: 'clamp(1.7rem, 6.5vw, 2.4rem)', lineHeight: 1.5 }}
                >
                  {couple.groom.nameKh}
                </span>
                <span
                  className="font-serif-en italic block text-xs"
                  style={{ color: 'var(--rk-ivory)', opacity: 0.55 }}
                >
                  {couple.groom.nameEn}
                </span>
              </div>

              {/* Ampersand divider */}
              <div className="flex justify-center">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center border"
                  style={{ borderColor: 'rgba(201,168,76,0.3)', background: 'rgba(201,168,76,0.05)' }}
                >
                  <span
                    className="font-serif-en italic text-lg text-[#C9A84C]"
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
                  style={{ fontSize: 'clamp(1.7rem, 6.5vw, 2.4rem)', lineHeight: 1.5 }}
                >
                  {couple.bride.nameKh}
                </span>
                <span
                  className="font-serif-en italic block text-xs"
                  style={{ color: 'var(--rk-ivory)', opacity: 0.55 }}
                >
                  {couple.bride.nameEn}
                </span>
              </div>

              <div className="py-1">
                <DiamondDivider />
              </div>

              {/* Date & Location */}
              {primaryEvent && (
                <div className="space-y-1.5">
                  <p
                    className="font-khmer-body text-xs font-semibold text-[#E8C97A]"
                  >
                    {primaryEvent.dateKh}
                  </p>
                  <p
                    className="font-serif-en text-xs tracking-wider font-semibold text-[#FAF6EF]/85"
                  >
                    {weddingDate}
                  </p>
                  <p
                    className="font-khmer-body text-xs mt-1 text-[#FAF6EF]/60"
                  >
                    📍 {primaryEvent.locationName}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Bottom ornament spacer */}
            <div className="mt-8 opacity-25 flex justify-center">
              <LotusOrnament size={40} />
            </div>

            {/* Scroll indicator nudge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span
                className="font-serif-en text-[9px] tracking-[0.45em] uppercase text-[#E8C97A]"
                style={{ opacity: 0.65 }}
              >
                Scroll
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-[1px] h-6"
                style={{ background: 'linear-gradient(to bottom, rgba(232,201,122,0.7), transparent)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Cover;
