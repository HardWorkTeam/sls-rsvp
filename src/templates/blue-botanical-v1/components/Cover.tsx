'use client';

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Couple, WeddingEvent } from '@/types/invitation';
import { CoverPhoto } from '@/components/CoverPhoto';
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

  const timeStr = primaryEvent?.timeLabel || '';

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
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{
        minHeight: '100dvh',
        background: 'transparent',
      }}
    >
      {/* User cover photo */}
      {coverImage && (
        <>
          <CoverPhoto src={coverImage} />
          <div className="absolute inset-0" style={{ background: 'rgba(30,60,100,0.52)', zIndex: 1 }} />
        </>
      )}

      {/* ── Soft blue watercolor wash background accents ── */}
      <div
        className="absolute top-0 right-0 w-[240px] h-[240px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 100% 0%, rgba(156,188,228,0.3) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[200px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(156,188,228,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Frame border lines */}
      <div
        className="absolute inset-4 pointer-events-none z-10"
        style={{ border: '1px solid rgba(106,140,178,0.18)', borderRadius: '6px' }}
      />
      <div
        className="absolute inset-6 pointer-events-none z-10"
        style={{ border: '1px solid rgba(106,140,178,0.06)', borderRadius: '6px' }}
      />

      {/* ─── 3D PHYSICAL ENVELOPE GATE VIEW ─── */}
      <AnimatePresence>
        {!opened && (
          <m.div
            key="envelope-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(106,140,178,0.1) 0%, rgba(44,62,86,0.92) 100%)',
            }}
          >
            {/* Header text */}
            <m.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-center space-y-1 mb-8"
            >
              <p className="font-serif-en text-[10px] tracking-[0.45em] text-[#BEA56E] uppercase font-bold">
                Wedding Celebration
              </p>
              <h2 className="font-khmer-title text-base text-[#FAF6EF]/90 leading-relaxed">
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
              className="relative w-[90vw] max-w-[420px] aspect-[1.46] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
              style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* 1. Envelope Back Wall */}
              <div
                className="absolute inset-0 rounded-xl border border-[#BEA56E]/25 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #0e1c30 0%, #070e18 100%)',
                  boxShadow: 'inset 0 0 40px rgba(0,0,0,0.6)',
                }}
              >
                {/* Internal pocket ornament texture */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #BEA56E 0px, #BEA56E 1px, transparent 1px, transparent 12px)',
                  }}
                />
              </div>

              {/* 2. Invitation Letter (slides UP out of envelope back wall) */}
              <m.div
                animate={
                  envelopeState === 'sliding-card' || envelopeState === 'zoom-out'
                    ? { y: '-46%', scale: 0.98 }
                    : { y: 0, scale: 0.94 }
                }
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  zIndex: envelopeState === 'sliding-card' || envelopeState === 'zoom-out' ? 15 : 5,
                }}
                className="absolute inset-x-3.5 top-3.5 bottom-3.5 rounded-lg shadow-lg p-5 flex flex-col items-center justify-center bg-[#FFFFFF] border border-[#BEA56E]/35"
              >
                {/* Inside card mini layout */}
                <div className="text-center space-y-1.5 text-[#2C3E56] flex flex-col items-center justify-center">
                  <div className="opacity-80 scale-75 animate-subtle-float">
                    <LotusOrnament size={25} color="#6A8CB2" />
                  </div>
                  <p className="font-serif-en text-[7px] tracking-[0.25em] uppercase font-bold text-[#6A8CB2] opacity-80">
                    Save the Date
                  </p>
                  <div className="w-16 h-[0.5px] bg-[#6A8CB2]/25 my-1" />
                  <h4 className="font-khmer-title text-[9px] leading-relaxed text-[#2C3E56]">
                    {couple.groom.nameKh}
                  </h4>
                  <p className="font-serif-en italic text-[8px] opacity-50 my-0.5">&amp;</p>
                  <h4 className="font-khmer-title text-[9px] leading-relaxed text-[#2C3E56]">
                    {couple.bride.nameKh}
                  </h4>
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
                  className="w-full h-full drop-shadow-[0_-8px_20px_rgba(0,0,0,0.45)]"
                >
                  {/* Left Side Flap */}
                  <polygon points="0,0 210,144 0,288" fill="#0e1c30" stroke="#BEA56E" strokeWidth="0.5" opacity="0.97" />
                  {/* Right Side Flap */}
                  <polygon points="420,0 210,144 420,288" fill="#0e1c30" stroke="#BEA56E" strokeWidth="0.5" opacity="0.97" />
                  {/* Bottom Flap */}
                  <polygon points="0,288 210,132 420,288" fill="#1c304a" stroke="#BEA56E" strokeWidth="0.75" opacity="0.99" />
                  {/* Internal gold pattern stitch lines */}
                  <polygon points="10,278 210,140 410,278" fill="none" stroke="#FAF6EF" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.15" />
                </svg>
              </div>

              {/* 4. Guest Name Personalization Tag (pasted on envelope front pocket) */}
              {guestName && (
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center pointer-events-auto shadow-[0_5px_15px_rgba(0,0,0,0.3)] border border-[#6A8CB2]/40 px-5 py-2.5 rounded-lg max-w-[85%] z-20"
                  style={{
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F8FC 100%)',
                  }}
                >
                  <p className="font-khmer-body text-[9px] tracking-wide font-semibold text-[#6A8CB2] uppercase opacity-75">
                    សូមគោរពអញ្ជើញ · invited guest
                  </p>
                  <p className="font-khmer-title text-xs mt-0.5 text-[#2C3E56] whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
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
                  className="w-full h-full drop-shadow-[0_10px_12px_rgba(0,0,0,0.5)]"
                >
                  <polygon points="0,0 420,0 210,144" fill="#0d1b2e" stroke="#BEA56E" strokeWidth="1.5" />
                  {/* Flap gold embroidery borders */}
                  <polygon points="12,6 408,6 210,132" fill="none" stroke="#BEA56E" strokeWidth="0.65" strokeDasharray="4 4" opacity="0.6" />
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
                      className="w-16 h-16 rounded-full cursor-pointer flex items-center justify-center relative shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 transition-transform duration-300 group"
                      style={{
                        background: 'radial-gradient(circle, #FFE5A3 0%, #BEA56E 70%, #8B6914 100%)',
                        border: '3.5px double #1c304a',
                      }}
                      aria-label="Open invitation"
                    >
                      <div className="absolute inset-1 rounded-full border border-[#8B6914]/25" />
                      <LotusOrnament size={24} color="#8B6914" />
                      <div className="absolute inset-[-6px] rounded-full border border-dashed border-[#FAF6EF]/50 animate-spin opacity-45 group-hover:opacity-100" style={{ animationDuration: '9s' }} />
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
              className="text-center space-y-1.5 mt-10 animate-pulse"
            >
              <p className="font-khmer-body text-xs text-[#BEA56E]">
                សូមចុចលើត្រាមាសដើម្បីបើកលិខិតអញ្ជើញ
              </p>
              <p className="font-serif-en text-[9px] tracking-widest uppercase text-[#FAF6EF]/60">
                Click the gold seal to open invitation
              </p>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ─── MAIN CARD COVER CONTENT (REVEALED ON OPEN) ─── */}
      <AnimatePresence>
        {opened && (
          <m.div
            key="invitation-cover-card"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center justify-center px-6 text-center"
            style={{ minHeight: '100dvh', paddingTop: '4rem', paddingBottom: '4rem' }}
          >
            {/* Elegant glass card container */}
            <div
              className="glass-card-light rounded-3xl p-6 md:p-8 max-w-sm w-full flex flex-col items-center border border-[#BEA56E]/20 shadow-2xl relative space-y-6"
            >
              {/* Gold ring frame inside the card */}
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 1, type: 'spring', stiffness: 120 }}
                className="relative"
              >
                <div
                  className="w-44 h-44 rounded-full flex flex-col items-center justify-center bg-white/75"
                  style={{
                    border: '1.5px solid rgba(190,165,110,0.5)',
                    boxShadow: '0 0 0 4px rgba(190,165,110,0.06), 0 10px 30px rgba(106,140,178,0.1)',
                  }}
                >
                  <p className="font-serif-en text-[10px] tracking-[0.3em] uppercase mb-1 font-semibold" style={{ color: '#7A8EA8' }}>
                    Save the Date
                  </p>
                  <p className="font-khmer-body text-xs font-semibold" style={{ color: '#5B7A9D' }}>
                    {primaryEvent?.dateKh}
                  </p>
                  <div className="h-[1px] w-12 my-2" style={{ background: 'rgba(190,165,110,0.3)' }} />
                  <p className="font-serif-en text-xs font-semibold" style={{ color: '#2C3E56' }}>
                    {weddingDate}
                  </p>
                  <p className="font-serif-en text-[10px] mt-0.5" style={{ color: '#6A8CB2' }}>
                    {timeStr}
                  </p>
                </div>
              </m.div>

              {/* Guest name */}
              {guestName && (
                <div
                  className="px-4 py-1.5 rounded-full"
                  style={{ background: 'rgba(106,140,178,0.06)', border: '1px solid rgba(106,140,178,0.18)' }}
                >
                  <p className="font-khmer-body text-[10px]" style={{ color: '#5B7A9D' }}>សូមគោរពអញ្ជើញ</p>
                  <p className="font-khmer-title text-xs mt-0.5" style={{ color: '#3A5A7C', lineHeight: 1.5 }}>{guestName}</p>
                </div>
              )}

              {/* Couple names */}
              <div className="space-y-1">
                <h1 className="font-khmer-title" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.1rem)', color: '#2C3E56', lineHeight: 1.4 }}>
                  {couple.groom.nameKh}
                </h1>
                <p className="font-serif-en italic text-xl" style={{ color: '#6A8CB2', lineHeight: 1 }}>&amp;</p>
                <h1 className="font-khmer-title" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.1rem)', color: '#2C3E56', lineHeight: 1.4 }}>
                  {couple.bride.nameKh}
                </h1>
              </div>

              <p
                className="font-serif-en italic text-xs mb-2"
                style={{ color: '#5B7A9D' }}
              >
                {couple.groom.nameEn} &amp; {couple.bride.nameEn}
              </p>
            </div>

            {/* Scroll Indicator */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
              <span className="font-serif-en text-[9px] tracking-[0.45em] uppercase text-[#6A8CB2] opacity-75">
                Scroll
              </span>
              <m.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="w-[1px] h-6"
                style={{ background: 'linear-gradient(to bottom, rgba(106,140,178,0.5), transparent)' }}
              />
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Cover;
