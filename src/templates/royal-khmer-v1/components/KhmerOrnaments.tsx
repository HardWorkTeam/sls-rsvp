'use client';

import React from 'react';
import { m } from 'framer-motion';

/** Inline SVG ornaments for the Royal Khmer template.
 *  All paths are hand-crafted to reflect traditional Cambodian decorative motifs:
 *  lotus borders, naga curves, temple pediment shapes, and diamond spacers.
 */

// ─── Lotus Ornament (top/bottom of sections) ─────────────────────────────────
export const LotusOrnament: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = '#C9A84C',
}) => (
  <svg viewBox="0 0 200 80" width={size * 2.5} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Center lotus */}
    <ellipse cx="100" cy="55" rx="14" ry="22" fill={color} opacity="0.9" />
    <ellipse cx="100" cy="55" rx="8"  ry="15" fill="#FAF6EF" opacity="0.3" />
    {/* Left petals */}
    <ellipse cx="74"  cy="58" rx="11" ry="18" fill={color} opacity="0.75" transform="rotate(-20 74 58)" />
    <ellipse cx="52"  cy="62" rx="9"  ry="15" fill={color} opacity="0.55" transform="rotate(-38 52 62)" />
    <ellipse cx="33"  cy="66" rx="7"  ry="12" fill={color} opacity="0.35" transform="rotate(-54 33 66)" />
    {/* Right petals */}
    <ellipse cx="126" cy="58" rx="11" ry="18" fill={color} opacity="0.75" transform="rotate(20 126 58)" />
    <ellipse cx="148" cy="62" rx="9"  ry="15" fill={color} opacity="0.55" transform="rotate(38 148 62)" />
    <ellipse cx="167" cy="66" rx="7"  ry="12" fill={color} opacity="0.35" transform="rotate(54 167 66)" />
    {/* Stem */}
    <rect x="98" y="74" width="4" height="6" rx="2" fill={color} opacity="0.6" />
    {/* Center diamond accent */}
    <polygon points="100,32 104,40 100,48 96,40" fill={color} opacity="0.4" />
  </svg>
);

// ─── Khmer Diamond Divider ────────────────────────────────────────────────────
export const DiamondDivider: React.FC<{ color?: string }> = ({ color = '#C9A84C' }) => (
  <div className="flex items-center justify-center gap-3 w-full my-2">
    <div className="gold-divider flex-1 max-w-[80px]" />
    <svg viewBox="0 0 40 20" width="40" height="20" fill="none">
      <polygon points="20,2 36,10 20,18 4,10" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      <polygon points="20,6 30,10 20,14 10,10" fill={color} opacity="0.35" />
      <circle cx="20" cy="10" r="2" fill={color} opacity="0.8" />
    </svg>
    <div className="gold-divider flex-1 max-w-[80px]" />
  </div>
);

// ─── Naga Corner (traditional serpent border element) ────────────────────────
export const NagaCorner: React.FC<{ flip?: boolean; color?: string; size?: number }> = ({
  flip = false,
  color = '#C9A84C',
  size = 60,
}) => (
  <svg
    viewBox="0 0 80 80"
    width={size}
    height={size}
    fill="none"
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
  >
    <path d="M 5 75 Q 5 5 75 5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d="M 12 75 Q 12 12 75 12" stroke={color} strokeWidth="0.8" fill="none" opacity="0.3" />
    {/* Naga head */}
    <circle cx="72" cy="8" r="4" fill={color} opacity="0.6" />
    <circle cx="72" cy="8" r="2" fill="#FAF6EF" opacity="0.4" />
    {/* Decorative dots along path */}
    <circle cx="25" cy="55" r="1.5" fill={color} opacity="0.4" />
    <circle cx="42" cy="35" r="1.5" fill={color} opacity="0.4" />
    <circle cx="60" cy="20" r="1.5" fill={color} opacity="0.4" />
  </svg>
);

// ─── Full Border Frame (for cards and sections) ───────────────────────────────
export const KhmerBorderFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style }) => (
  <div
    className={`relative ${className}`}
    style={{ padding: '2px', ...style }}
  >
    {/* Outer glow border */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        background: 'linear-gradient(135deg, #C9A84C 0%, #8B6914 25%, #C9A84C 50%, #8B6914 75%, #C9A84C 100%)',
        padding: '1.5px',
        borderRadius: '1rem',
      }}
    >
      <div
        className="w-full h-full rounded-2xl"
        style={{ background: 'var(--rk-brown)', borderRadius: 'calc(1rem - 1.5px)' }}
      />
    </div>

    {/* Corner accents */}
    <div className="absolute top-2 left-2 z-10"><NagaCorner size={32} /></div>
    <div className="absolute top-2 right-2 z-10"><NagaCorner size={32} flip /></div>
    <div className="absolute bottom-2 left-2 z-10" style={{ transform: 'scaleY(-1)' }}><NagaCorner size={32} /></div>
    <div className="absolute bottom-2 right-2 z-10" style={{ transform: 'scale(-1,-1)' }}><NagaCorner size={32} /></div>

    {/* Content */}
    <div className="relative z-[2]">{children}</div>
  </div>
);

// ─── Section heading ornament ─────────────────────────────────────────────────
export const SectionHeading: React.FC<{
  kh: string;
  en: string;
  sub?: string;
}> = ({ kh, en, sub }) => (
  <div className="flex flex-col items-center gap-3 text-center">
    <p className="font-serif-en text-xs tracking-[0.35em] uppercase" style={{ color: 'var(--rk-gold)', opacity: 0.8 }}>
      {en}
    </p>
    <h2 className="font-khmer-title text-2xl leading-relaxed" style={{ color: 'var(--rk-gold-light)' }}>
      {kh}
    </h2>
    {sub && (
      <p className="font-serif-en italic text-sm" style={{ color: 'var(--rk-ivory)', opacity: 0.6 }}>
        {sub}
      </p>
    )}
    <DiamondDivider />
  </div>
);

// ─── Draw Border Frame (scroll-triggered border drawing) ──────────────────────
export const DrawBorderFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style }) => {
  return (
    <div
      className={`relative p-5 rounded-2xl ${className}`}
      style={{
        background: 'rgba(26, 14, 8, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        ...style
      }}
    >
      {/* Scroll-triggered SVG borders */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: '1rem' }}
      >
        {/* Outer border rect */}
        <m.rect
          x="4"
          y="4"
          width="calc(100% - 8px)"
          height="calc(100% - 8px)"
          rx="12"
          stroke="var(--rk-gold)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.55 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Inner border rect */}
        <m.rect
          x="8"
          y="8"
          width="calc(100% - 16px)"
          height="calc(100% - 16px)"
          rx="8"
          stroke="var(--rk-gold-dark)"
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.3 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* Traditional Corner Accents */}
      <div className="absolute top-2 left-2 z-10 opacity-70"><NagaCorner size={28} /></div>
      <div className="absolute top-2 right-2 z-10 opacity-70"><NagaCorner size={28} flip /></div>
      <div className="absolute bottom-2 left-2 z-10 opacity-70" style={{ transform: 'scaleY(-1)' }}><NagaCorner size={28} /></div>
      <div className="absolute bottom-2 right-2 z-10 opacity-70" style={{ transform: 'scale(-1,-1)' }}><NagaCorner size={28} /></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
