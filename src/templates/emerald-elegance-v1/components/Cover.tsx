'use client';

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Couple } from '@/types/invitation';
import { CoverPhoto } from '@/components/CoverPhoto';
import { TopBotanicalBranch, BottomBotanicalBranch, ThinGoldRule, DiamondSeparator } from './BotanicalAssets';

interface CoverProps {
  couple: Couple;
  dateLabel?: string;
  venueName?: string;
  guestName?: string;
  coverImage?: string;
}

type EnvelopeState = 'closed' | 'opening-flap' | 'sliding-card' | 'zoom-out' | 'done';

export const Cover: React.FC<CoverProps> = ({ couple, dateLabel, venueName, guestName, coverImage }) => {
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>('closed');
  const [opened, setOpened] = useState(false);

  const { scrollY } = useScroll();
  const topY = useTransform(scrollY, [0, 500], [0, 50]);
  const bottomY = useTransform(scrollY, [0, 500], [0, -50]);

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
    }, 1450);

    setTimeout(() => {
      setEnvelopeState('done');
      setOpened(true);
    }, 2100);
  };

  return (
    <section className="relative w-full h-[100svh] bg-transparent overflow-hidden flex flex-col items-center justify-center">

      {/* User cover photo */}
      {coverImage && (
        <>
          <CoverPhoto src={coverImage} />
          <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.55)', zIndex: 1 }} />
        </>
      )}

      {/* ─── 3D PHYSICAL ENVELOPE GATE VIEW ─── */}
      <AnimatePresence>
        {!opened && (
          <m.div
            key="envelope-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6"
            style={{
              background: 'rgba(255, 255, 255, 0.65)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Header text */}
            <m.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-center space-y-2 mb-10"
            >
              <p className="font-emerald-sans text-[10px] tracking-[0.45em] text-emerald-gold uppercase">
                Wedding Invitation
              </p>
              <h2 className="font-emerald-serif text-xl text-emerald-ivory leading-relaxed tracking-wide">
                ពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍
              </h2>
            </m.div>

            {/* 3D Physical Envelope Structure */}
            <m.div
              animate={
                envelopeState === 'zoom-out'
                  ? { scale: 1.35, opacity: 0 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[90vw] max-w-[420px] aspect-[1.46] rounded-xl shadow-[0_20px_40px_rgba(30,69,41,0.15)]"
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 1. Envelope Back Wall (Inside of the envelope) */}
              <div
                className="absolute inset-0 rounded-xl border border-emerald-gold/20 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f8f6f0 0%, #ede8dc 100%)',
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.05)',
                }}
              >
                {/* Internal pocket ornament texture */}
                <div
                  className="absolute inset-0 opacity-[0.1]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, var(--ee-gold) 0px, var(--ee-gold) 1px, transparent 1px, transparent 15px)',
                  }}
                />
              </div>

              {/* 2. Invitation Letter (slides UP out of envelope back wall) */}
              <m.div
                animate={
                  envelopeState === 'sliding-card' || envelopeState === 'zoom-out'
                    ? { y: '-57%', scale: 0.98 }
                    : { y: 0, scale: 0.94 }
                }
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  zIndex: envelopeState === 'sliding-card' || envelopeState === 'zoom-out' ? 15 : 5,
                }}
                className="absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-lg shadow-lg p-5 flex flex-col items-center justify-center bg-white border border-emerald-gold/30"
              >
                {/* Inside card mini layout (Preview of the cover) */}
                <div className="text-center space-y-2 flex flex-col items-center justify-center h-full w-full border border-emerald-gold/10 p-2">
                  <div className="opacity-80 scale-75 w-12 text-emerald-gold">
                    <TopBotanicalBranch />
                  </div>
                  <p className="font-emerald-sans text-[7px] tracking-[0.25em] uppercase font-bold text-emerald-gold opacity-80 mt-2">
                    Save the Date
                  </p>
                  <div className="w-10 h-[0.5px] bg-emerald-gold/30 my-1" />
                  <h4 className="font-emerald-serif italic text-lg text-emerald-gradient">
                    {couple.bride.nameEn.split(' ')[0]}
                  </h4>
                  <p className="font-emerald-script text-[10px] text-emerald-gold my-0.5">&</p>
                  <h4 className="font-emerald-serif italic text-lg text-emerald-gradient">
                    {couple.groom.nameEn.split(' ')[0]}
                  </h4>
                  <div className="w-6 mx-auto mt-2 opacity-50">
                    <DiamondSeparator />
                  </div>
                </div>
              </m.div>

              {/* 3. Envelope Front Pocket (Left, Right, Bottom triangular panels) */}
              <div
                className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                style={{
                  zIndex: 10,
                }}
              >
                <svg
                  viewBox="0 0 420 288"
                  className="w-full h-full drop-shadow-[0_-5px_15px_rgba(0,0,0,0.06)]"
                >
                  {/* Left Side Flap */}
                  <polygon points="0,0 210,144 0,288" fill="#fdfbf7" stroke="var(--ee-gold)" strokeWidth="0.5" opacity="0.98" />
                  {/* Right Side Flap */}
                  <polygon points="420,0 210,144 420,288" fill="#fdfbf7" stroke="var(--ee-gold)" strokeWidth="0.5" opacity="0.98" />
                  {/* Bottom Flap */}
                  <polygon points="0,288 210,132 420,288" fill="#ffffff" stroke="var(--ee-gold)" strokeWidth="0.75" opacity="1" />
                  {/* Internal gold pattern stitch lines */}
                  <polygon points="10,278 210,140 410,278" fill="none" stroke="var(--ee-gold)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
                </svg>
              </div>

              {/* 4. Guest Name Personalization Tag (pasted on envelope front pocket) */}
              {guestName && (
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center pointer-events-auto shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-emerald-gold/40 px-6 py-3 rounded-lg max-w-[85%] z-20"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,246,240,0.95) 100%)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  <p className="font-emerald-sans text-[8px] tracking-[0.2em] font-semibold text-emerald-gold uppercase opacity-80 mb-1">
                    សូមគោរពអញ្ជើញ · Invited Guest
                  </p>
                  <p className="font-emerald-serif text-sm text-emerald-ivory whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                    {guestName}
                  </p>
                </div>
              )}

              {/* 5. Envelope Top Flap (rotates upwards around the top axis) */}
              <m.div
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
                  className="w-full h-full drop-shadow-[0_8px_10px_rgba(0,0,0,0.08)]"
                >
                  <polygon points="0,0 420,0 210,144" fill="#faf8f2" stroke="var(--ee-gold)" strokeWidth="1" />
                  {/* Flap gold embroidery borders */}
                  <polygon points="12,6 408,6 210,132" fill="none" stroke="var(--ee-gold)" strokeWidth="0.65" strokeDasharray="4 4" opacity="0.5" />
                </svg>
              </m.div>

              {/* 6. Gold Wax Seal (Floating Click Trigger Button) */}
              <AnimatePresence>
                {envelopeState === 'closed' && (
                  <m.div
                    key="wax-seal"
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.35 } }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                  >
                    <button
                      onClick={handleOpen}
                      className="w-20 h-20 rounded-full cursor-pointer flex items-center justify-center relative shadow-[0_8px_20px_rgba(201,168,76,0.4)] hover:scale-105 active:scale-95 transition-transform duration-300 group"
                      style={{
                        background: 'linear-gradient(135deg, var(--ee-gold-bright) 0%, var(--ee-gold) 50%, #8a6a1c 100%)',
                        border: '2px solid rgba(255,255,255,0.4)',
                      }}
                      aria-label="Open invitation"
                    >
                      <div className="absolute inset-1 rounded-full border border-white/20" />
                      
                      {/* Monogram */}
                      <span className="font-emerald-script text-2xl text-white drop-shadow-sm opacity-90">
                        {couple.bride.nameEn.charAt(0)}&{couple.groom.nameEn.charAt(0)}
                      </span>

                      {/* Pulsing rings */}
                      <div className="absolute inset-[-8px] rounded-full border border-emerald-gold/40 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                      <div className="absolute inset-[-16px] rounded-full border border-emerald-gold/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] animation-delay-500" />
                    </button>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>

            {/* Tap instruction */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center space-y-1.5 mt-12 animate-pulse"
            >
              <p className="font-emerald-serif text-xs text-emerald-ivory/80">
                សូមចុចលើត្រាមាសដើម្បីបើកលិខិតអញ្ជើញ
              </p>
              <p className="font-emerald-sans text-[9px] tracking-[0.2em] uppercase text-emerald-gold">
                Click the gold seal to open invitation
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ─── MAIN COVER CONTENT (REVEALED UNDERNEATH) ─── */}
      <AnimatePresence>
        {envelopeState !== 'closed' && (
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-between py-12 px-6"
          >
            {/* Top Botanical */}
            <m.div 
              style={{ y: topY }}
              className="w-[85%] max-w-[400px] mt-8 origin-top animate-emerald-breathing"
            >
              <TopBotanicalBranch />
            </m.div>

            {/* Center Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center w-full relative">
              <m.p 
                className="font-emerald-sans text-[10px] tracking-[0.3em] text-emerald-gold uppercase mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                THE WEDDING OF
              </m.p>

              <div className="flex flex-col items-center justify-center w-full my-4">
                <m.h1 
                  className="font-emerald-serif italic text-6xl sm:text-7xl text-emerald-gradient tracking-[-0.02em] leading-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.4 }}
                >
                  {couple.bride.nameEn.split(' ')[0]}
                </m.h1>

                <m.div 
                  className="w-12 h-12 flex items-center justify-center rounded-full border border-emerald-gold/20 bg-white/30 my-4 shadow-sm"
                  initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 1.6, type: 'spring' }}
                >
                  <span className="font-emerald-script text-3xl text-emerald-gold">
                    &
                  </span>
                </m.div>

                <m.h1 
                  className="font-emerald-serif italic text-6xl sm:text-7xl text-emerald-gradient tracking-[-0.02em] leading-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.8 }}
                >
                  {couple.groom.nameEn.split(' ')[0]}
                </m.h1>
              </div>

              <m.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ duration: 0.8, delay: 2.0 }}
                className="h-[1px] bg-emerald-gold opacity-60 my-8 emerald-gold-glow"
              />

              <m.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.2 }}
              >
                <p className="font-emerald-sans text-[11px] tracking-[0.25em] text-emerald-ivory uppercase font-semibold">
                  {dateLabel || "SATURDAY · 15 FEBRUARY 2025"}
                </p>
                <p className="font-emerald-serif italic text-lg text-emerald-gold">
                  {venueName || "GARDEN VILLA RESORT"}
                </p>
              </m.div>
            </div>

            {/* Bottom Botanical */}
            <m.div 
              style={{ y: bottomY }}
              className="w-[85%] max-w-[400px] mb-8 origin-bottom animate-emerald-breathing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.0 }}
            >
              <BottomBotanicalBranch />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};
