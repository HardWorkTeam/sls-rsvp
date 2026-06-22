'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Couple, WeddingEvent } from '@/types/invitation';
import { Butterfly } from './Butterfly';

interface CoverProps {
  couple: Couple;
  events: WeddingEvent[];
  guestName?: string;
  coverImage?: string;
}

export const Cover: React.FC<CoverProps> = ({ couple, events, guestName, coverImage }) => {
  const [phase, setPhase] = useState<'sealed' | 'flap-open' | 'card-rise' | 'card-fullscreen' | 'reveal'>('sealed');
  const primaryEvent = events[0];

  const weddingDate = primaryEvent
    ? new Date(primaryEvent.dateSolar).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  // Lock scroll during envelope sequence
  useEffect(() => {
    if (phase !== 'reveal') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  const handleOpen = () => {
    if (phase !== 'sealed') return;
    setPhase('flap-open');
    setTimeout(() => setPhase('card-rise'), 800);
    setTimeout(() => setPhase('card-fullscreen'), 2200);
    setTimeout(() => setPhase('reveal'), 3400);
  };

  return (
    <section className="relative w-full overflow-hidden flex flex-col items-center justify-center" style={{ minHeight: '100dvh' }}>
      {/* User cover photo */}
      {coverImage && (
        <>
          <img src={coverImage} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ zIndex: 0 }} />
          <div className="absolute inset-0" style={{ background: 'rgba(20,15,10,0.45)', zIndex: 1 }} />
        </>
      )}

      {/* Subtle textured ivory background for revealed state */}
      <div className="absolute inset-0 bg-pattern-editorial" />

      {/* Thin gold page margin frame */}
      <div className="absolute inset-3 pointer-events-none z-10 border border-[#C5A059]/10 rounded-sm" />

      {/* ═══════ ENVELOPE STAGE ═══════ */}
      <AnimatePresence>
        {phase !== 'reveal' && (
          <motion.div
            key="envelope-stage"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
            style={{
              background: 'radial-gradient(ellipse at 50% 40%, rgba(90,18,29,0.2) 0%, rgba(15,3,5,0.97) 100%)',
            }}
          >
            {/* Top label */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-center space-y-2 mb-12"
            >
              <p
                className="text-[10px] tracking-[0.5em] uppercase font-light"
                style={{ color: '#E2CD9F', fontFamily: "'Cormorant Garamond', serif" }}
              >
                Wedding Invitation
              </p>
              <p className="text-xs tracking-[0.2em] uppercase font-light" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Kantumruy Pro', sans-serif" }}>
                សេចក្តីគោរពអញ្ជើញ
              </p>
              <div className="w-10 h-[0.5px] bg-[#C5A059]/30 mx-auto mt-2" />
            </motion.div>

            {/* ─── 3D ENVELOPE ─── */}
            <motion.div
              animate={
                phase === 'card-fullscreen'
                  ? { scale: 1.15, opacity: 0, y: 40 }
                  : { scale: 1, opacity: 1, y: 0 }
              }
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[88vw] max-w-[420px]"
              style={{ perspective: '1200px', aspectRatio: '1.5 / 1' }}
            >
              {/* Envelope back chamber */}
              <div
                className="absolute inset-0 rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #5A121D 0%, #2D0610 100%)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.7), inset 0 0 60px rgba(0,0,0,0.5)',
                }}
              >
                {/* Embossed filigree texture */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Cpath d='M25 5 C30 12 38 20 45 25 C38 30 30 38 25 45 C20 38 12 30 5 25 C12 20 20 12 25 5 Z' fill='none' stroke='%23C5A059' stroke-width='0.4'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Inner card (slides up) */}
              <motion.div
                animate={
                  phase === 'card-rise' || phase === 'card-fullscreen'
                    ? { y: '-52%', scale: 0.97 }
                    : { y: '0%', scale: 0.9 }
                }
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-x-3 top-3 bottom-3 rounded-lg flex flex-col items-center justify-center bg-[#FCFBF9] border border-[#C5A059]/20"
                style={{
                  zIndex: phase === 'card-rise' || phase === 'card-fullscreen' ? 15 : 5,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                }}
              >
                <div className="text-center space-y-3">
                  <div className="scale-[0.5] -my-3">
                    <Butterfly size={44} variant="gold" />
                  </div>
                  <p
                    className="text-[8px] tracking-[0.4em] uppercase font-semibold"
                    style={{ color: '#C5A059', fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Save the Date
                  </p>
                  <div className="w-10 h-[0.5px] bg-[#C5A059]/30 mx-auto" />
                  <p
                    className="text-[10px] font-semibold tracking-wide text-[#2A2A2A]"
                    style={{ fontFamily: "'Kantumruy Pro', sans-serif" }}
                  >
                    {couple.groom.nameKh.split(' ')[0]} &amp; {couple.bride.nameKh.split(' ')[0]}
                  </p>
                  <p
                    className="text-xs italic tracking-wider font-light"
                    style={{ color: '#5A121D', fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {couple.groom.nameEn.split(' ')[0]} &amp; {couple.bride.nameEn.split(' ')[0]}
                  </p>
                </div>
              </motion.div>

              {/* Envelope pocket face (side flaps + bottom) */}
              <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden" style={{ zIndex: 10 }}>
                <svg viewBox="0 0 420 280" className="w-full h-full" style={{ filter: 'drop-shadow(0 -8px 20px rgba(0,0,0,0.5))' }}>
                  <polygon points="0,0 210,140 0,280" fill="#3D0A10" stroke="#C5A059" strokeWidth="0.4" strokeOpacity="0.3" />
                  <polygon points="420,0 210,140 420,280" fill="#3D0A10" stroke="#C5A059" strokeWidth="0.4" strokeOpacity="0.3" />
                  <polygon points="0,280 210,130 420,280" fill="#5A121D" stroke="#C5A059" strokeWidth="0.6" strokeOpacity="0.6" />
                  <polygon points="10,270 210,138 410,270" fill="none" stroke="#E2CD9F" strokeWidth="0.4" strokeDasharray="4 4" strokeOpacity="0.15" />
                </svg>
              </div>

              {/* Guest name tag on envelope */}
              {guestName && (
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center px-5 py-2 rounded bg-[#FCFBF9] border border-[#C5A059]/30 z-20"
                  style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}
                >
                  <p className="text-[7px] tracking-[0.2em] font-medium uppercase" style={{ color: '#C5A059', fontFamily: "'Kantumruy Pro', sans-serif" }}>
                    សូមគោរពអញ្ជើញ
                  </p>
                  <p className="text-sm mt-0.5 font-semibold whitespace-nowrap" style={{ color: '#5A121D', fontFamily: "'Cormorant Garamond', serif" }}>
                    {guestName}
                  </p>
                </div>
              )}

              {/* Top flap (3D flip) */}
              <motion.div
                animate={{ rotateX: phase === 'sealed' ? 0 : -178 }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                  zIndex: phase === 'sealed' ? 20 : 2,
                }}
                className="absolute inset-x-0 top-0 pointer-events-none"
                // Height = roughly half the envelope
              >
                <svg viewBox="0 0 420 140" className="w-full" style={{ filter: 'drop-shadow(0 12px 16px rgba(0,0,0,0.6))' }}>
                  <polygon points="0,0 420,0 210,140" fill="#4A0E17" stroke="#C5A059" strokeWidth="0.8" strokeOpacity="0.5" />
                  <polygon points="8,4 412,4 210,130" fill="none" stroke="#C5A059" strokeWidth="0.4" strokeDasharray="5 5" strokeOpacity="0.3" />
                </svg>
              </motion.div>

              {/* Wax seal button */}
              <AnimatePresence>
                {phase === 'sealed' && (
                  <motion.div
                    key="wax-seal"
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-1/2 -translate-x-1/2 z-30"
                    style={{ top: 'calc(50% - 2px)' }}
                  >
                    <button
                      onClick={handleOpen}
                      className="w-[72px] h-[72px] rounded-full cursor-pointer flex items-center justify-center relative group"
                      style={{
                        background: 'radial-gradient(circle at 40% 35%, #FFEFCB 0%, #C5A059 50%, #8F6F30 100%)',
                        border: '3px double rgba(90, 18, 29, 0.6)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.6), inset 0 1px 3px rgba(255,255,255,0.3)',
                      }}
                      aria-label="Open wedding invitation"
                    >
                      {/* Seal inner ring */}
                      <div className="absolute inset-[5px] rounded-full border border-[#8F6F30]/40" />

                      {/* Butterfly emblem */}
                      <svg viewBox="0 0 28 28" className="w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                        <path
                          d="M14 13 C12.5 10, 8 9, 7 11 C6 13, 9 16 14 17 C19 16, 22 13, 21 11 C20 9, 15.5 10, 14 13 Z"
                          fill="#5A121D"
                          opacity="0.85"
                        />
                        <path
                          d="M14 17 C12 18, 9 19.5, 8 20 C7 20.5, 9 21, 14 18.5 C19 21, 21 20.5, 20 20 C19 19.5, 16 18, 14 17 Z"
                          fill="#5A121D"
                          opacity="0.7"
                        />
                        <line x1="14" y1="10" x2="14" y2="19" stroke="#5A121D" strokeWidth="0.6" />
                      </svg>

                      {/* Pulsing glow ring */}
                      <div
                        className="absolute inset-[-8px] rounded-full border border-dashed border-[#FAF6EF]/40 animate-spin group-hover:opacity-100 opacity-50"
                        style={{ animationDuration: '10s' }}
                      />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Instruction text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'sealed' ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-center space-y-1 mt-14"
            >
              <p className="text-xs font-light tracking-widest" style={{ color: '#E2CD9F', fontFamily: "'Kantumruy Pro', sans-serif" }}>
                សូមចុចត្រាមេអំបៅមាស ដើម្បីបើកលិខិតអញ្ជើញ
              </p>
              <p
                className="text-[9px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Cormorant Garamond', serif" }}
              >
                Tap the butterfly seal to open
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ REVEALED CARD ═══════ */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            key="revealed-card"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center justify-center px-5 w-full"
            style={{ minHeight: '100dvh', paddingTop: '3rem', paddingBottom: '4rem' }}
          >
            {/* Magazine-styled card */}
            <div
              className="rounded-lg p-8 md:p-12 max-w-sm w-full bg-[#FCFBF9] relative overflow-hidden"
              style={{
                boxShadow: '0 30px 60px rgba(90,18,29,0.06), 0 0 0 1px rgba(197,160,89,0.15)',
              }}
            >
              {/* Inner margin frame */}
              <div className="absolute inset-3 border border-[#C5A059]/10 rounded-sm pointer-events-none" />

              {/* Butterfly header */}
              <div className="flex justify-center -mt-2 mb-4">
                <Butterfly size={85} interactive variant="gold" />
              </div>

              {/* Title */}
              <div className="space-y-2 text-center">
                <p
                  className="text-[10px] tracking-[0.45em] uppercase font-semibold"
                  style={{ color: '#C5A059', fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Save The Date
                </p>
                <p
                  className="text-[11px] tracking-[0.2em] uppercase font-light"
                  style={{ color: '#2A2A2A80', fontFamily: "'Cormorant Garamond', serif" }}
                >
                  We Are Getting Married
                </p>
                <div className="w-14 h-[0.5px] bg-[#C5A059]/30 mx-auto mt-3" />
              </div>

              {/* Guest badge */}
              {guestName && (
                <div className="mx-auto px-5 py-2.5 rounded-full w-fit border border-[#C5A059]/15 mt-6" style={{ background: 'rgba(197, 160, 89, 0.04)' }}>
                  <p className="text-[8px] uppercase tracking-wider font-semibold" style={{ color: '#C5A059', fontFamily: "'Kantumruy Pro', sans-serif" }}>
                    សូមគោរពអញ្ជើញ
                  </p>
                  <p className="text-sm mt-0.5 font-medium" style={{ color: '#5A121D', fontFamily: "'Cormorant Garamond', serif" }}>
                    {guestName}
                  </p>
                </div>
              )}

              {/* Couple names with ampersand */}
              <div className="space-y-5 text-center py-8">
                <div>
                  <span
                    className="text-[8px] uppercase tracking-[0.35em] block mb-1.5"
                    style={{ color: '#2A2A2A60', fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Groom
                  </span>
                  <span
                    className="text-sm font-bold tracking-wider block"
                    style={{ color: '#2A2A2A', fontFamily: "'Kantumruy Pro', sans-serif" }}
                  >
                    {couple.groom.nameKh}
                  </span>
                  <span
                    className="block leading-relaxed italic font-medium mt-1"
                    style={{ fontSize: '1.4rem', color: '#5A121D', fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {couple.groom.nameEn}
                  </span>
                </div>

                <div className="flex items-center justify-center relative my-1">
                  <div className="absolute inset-x-8 h-[0.5px] bg-[#C5A059]/12" />
                  <span
                    className="text-5xl font-light italic relative z-10 px-4 bg-[#FCFBF9]"
                    style={{ color: 'rgba(197,160,89,0.35)', fontFamily: 'Georgia, serif', lineHeight: 0.7 }}
                  >
                    &amp;
                  </span>
                </div>

                <div>
                  <span
                    className="text-[8px] uppercase tracking-[0.35em] block mb-1.5"
                    style={{ color: '#2A2A2A60', fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Bride
                  </span>
                  <span
                    className="text-sm font-bold tracking-wider block"
                    style={{ color: '#2A2A2A', fontFamily: "'Kantumruy Pro', sans-serif" }}
                  >
                    {couple.bride.nameKh}
                  </span>
                  <span
                    className="block leading-relaxed italic font-medium mt-1"
                    style={{ fontSize: '1.4rem', color: '#5A121D', fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {couple.bride.nameEn}
                  </span>
                </div>
              </div>

              <div className="w-16 h-[0.5px] bg-[#C5A059]/20 mx-auto mb-5" />

              {/* Date & venue */}
              {primaryEvent && (
                <div className="space-y-2 text-center">
                  <p
                    className="text-xs uppercase tracking-[0.15em] font-bold"
                    style={{ color: '#5A121D', fontFamily: "'Cinzel', serif" }}
                  >
                    {weddingDate}
                  </p>
                  <p
                    className="text-[11px] tracking-wide font-medium"
                    style={{ color: '#C5A059', fontFamily: "'Kantumruy Pro', sans-serif" }}
                  >
                    {primaryEvent.dateKh}
                  </p>
                  <p className="text-[11px] font-light leading-relaxed mt-2" style={{ color: '#2A2A2A99', fontFamily: "'Kantumruy Pro', sans-serif" }}>
                    📍 {primaryEvent.locationName}
                  </p>
                </div>
              )}
            </div>

            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span
                className="text-[9px] tracking-[0.45em] uppercase font-semibold"
                style={{ color: '#5A121D', fontFamily: "'Cormorant Garamond', serif", opacity: 0.8 }}
              >
                Scroll Down
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                className="w-[1px] h-8"
                style={{ background: 'linear-gradient(to bottom, #5A121D, transparent)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Cover;
