'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButterflyProps {
  size?: number;
  className?: string;
  delay?: number;
  interactive?: boolean;
  variant?: 'gold' | 'white' | 'blush';
}

/**
 * Premium 3D Butterfly with realistic CSS perspective-based wing flapping.
 * Uses separate wing containers with CSS 3D transforms for genuine depth.
 */
export const Butterfly: React.FC<ButterflyProps> = ({
  size = 80,
  className = '',
  delay = 0,
  interactive = false,
  variant = 'gold',
}) => {
  const wingColor = {
    gold: {
      outer: 'rgba(197, 160, 89, 0.25)',
      inner: 'rgba(226, 205, 159, 0.4)',
      vein: 'rgba(197, 160, 89, 0.6)',
      border: 'rgba(197, 160, 89, 0.8)',
      spot: 'rgba(143, 111, 48, 0.35)',
      glow: 'rgba(255, 239, 203, 0.6)',
    },
    white: {
      outer: 'rgba(255, 255, 255, 0.35)',
      inner: 'rgba(255, 255, 255, 0.55)',
      vein: 'rgba(197, 160, 89, 0.45)',
      border: 'rgba(255, 255, 255, 0.7)',
      spot: 'rgba(245, 230, 227, 0.5)',
      glow: 'rgba(255, 255, 255, 0.4)',
    },
    blush: {
      outer: 'rgba(245, 230, 227, 0.4)',
      inner: 'rgba(255, 240, 238, 0.6)',
      vein: 'rgba(197, 160, 89, 0.5)',
      border: 'rgba(226, 205, 159, 0.7)',
      spot: 'rgba(90, 18, 29, 0.12)',
      glow: 'rgba(245, 230, 227, 0.5)',
    },
  }[variant];

  return (
    <div
      className={`relative flex flex-col items-center justify-center ${className}`}
      style={{ width: size, height: size * 1.2 }}
    >
      {/* Gold dust sparkle particles */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              background: `radial-gradient(circle, #FFEFCB, #C5A059)`,
              boxShadow: '0 0 6px rgba(226, 205, 159, 0.8)',
              left: `${25 + i * 10}%`,
              top: `${35 + (i % 3) * 12}%`,
            }}
            animate={{
              opacity: [0, 0.9, 0],
              y: [0, 20 + i * 8],
              x: [(i - 3) * 6, (i - 3) * 12],
              scale: [0.3, 1, 0],
            }}
            transition={{
              duration: 2.5 + i * 0.4,
              repeat: Infinity,
              ease: 'easeOut',
              delay: delay + i * 0.6,
            }}
          />
        ))}
      </div>

      {/* 3D Butterfly with CSS perspective transforms */}
      <motion.div
        animate={{
          y: [0, -10, 3, -8, 0],
          x: [0, 4, -3, 2, 0],
          rotateZ: [-2, 3, -1, 2, -2],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay,
        }}
        whileHover={interactive ? { scale: 1.12, transition: { duration: 0.3 } } : undefined}
        className="relative z-10"
        style={{
          width: size,
          height: size,
          perspective: '600px',
        }}
      >
        {/* Wing container with 3D perspective */}
        <div
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* LEFT WING */}
          <motion.div
            animate={{
              rotateY: [15, 65, 5, 55, 15],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
              delay: delay,
            }}
            className="absolute right-1/2 top-[8%] bottom-[15%]"
            style={{
              width: '50%',
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Upper left wing */}
            <svg
              viewBox="0 0 50 55"
              className="absolute inset-0 w-full h-[70%]"
              style={{ filter: `drop-shadow(0 2px 8px ${wingColor.glow})` }}
            >
              <defs>
                <radialGradient id="lwgFill" cx="80%" cy="60%" r="80%">
                  <stop offset="0%" stopColor={wingColor.inner} />
                  <stop offset="60%" stopColor={wingColor.outer} />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </radialGradient>
                <linearGradient id="lwgEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFEFCB" />
                  <stop offset="50%" stopColor="#C5A059" />
                  <stop offset="100%" stopColor="#8F6F30" />
                </linearGradient>
              </defs>
              {/* Main wing shape */}
              <path
                d="M49 30 C45 8, 25 0, 8 5 C0 8, -2 20, 3 32 C8 44, 30 50, 49 42 Z"
                fill="url(#lwgFill)"
                stroke="url(#lwgEdge)"
                strokeWidth="0.8"
              />
              {/* Wing vein patterns */}
              <path d="M49 30 C35 18, 18 12, 8 10" stroke={wingColor.vein} strokeWidth="0.5" fill="none" opacity="0.7" />
              <path d="M49 32 C32 24, 14 22, 5 22" stroke={wingColor.vein} strokeWidth="0.4" fill="none" opacity="0.5" />
              <path d="M49 36 C30 32, 12 34, 6 38" stroke={wingColor.vein} strokeWidth="0.4" fill="none" opacity="0.5" />
              {/* Decorative spots */}
              <circle cx="20" cy="18" r="4" fill={wingColor.spot} />
              <circle cx="12" cy="28" r="3" fill={wingColor.spot} />
              <circle cx="28" cy="14" r="2.5" fill={wingColor.spot} opacity="0.6" />
              {/* Iridescent shimmer edge */}
              <path
                d="M49 30 C45 8, 25 0, 8 5"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="0.6"
                fill="none"
              />
            </svg>

            {/* Lower left wing */}
            <svg
              viewBox="0 0 35 35"
              className="absolute bottom-0 right-0 w-[70%] h-[40%]"
              style={{ filter: `drop-shadow(0 2px 6px ${wingColor.glow})` }}
            >
              <path
                d="M34 5 C28 8, 10 12, 4 22 C0 30, 8 34, 18 30 C28 26, 34 15, 34 5 Z"
                fill="url(#lwgFill)"
                stroke="url(#lwgEdge)"
                strokeWidth="0.7"
              />
              <path d="M34 5 C22 14, 10 22, 6 28" stroke={wingColor.vein} strokeWidth="0.4" fill="none" opacity="0.5" />
              <circle cx="16" cy="20" r="2.5" fill={wingColor.spot} />
            </svg>
          </motion.div>

          {/* RIGHT WING */}
          <motion.div
            animate={{
              rotateY: [-15, -65, -5, -55, -15],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: [0.4, 0, 0.6, 1],
              delay: delay,
            }}
            className="absolute left-1/2 top-[8%] bottom-[15%]"
            style={{
              width: '50%',
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Upper right wing (mirrored) */}
            <svg
              viewBox="0 0 50 55"
              className="absolute inset-0 w-full h-[70%]"
              style={{
                transform: 'scaleX(-1)',
                filter: `drop-shadow(0 2px 8px ${wingColor.glow})`,
              }}
            >
              <path
                d="M49 30 C45 8, 25 0, 8 5 C0 8, -2 20, 3 32 C8 44, 30 50, 49 42 Z"
                fill="url(#lwgFill)"
                stroke="url(#lwgEdge)"
                strokeWidth="0.8"
              />
              <path d="M49 30 C35 18, 18 12, 8 10" stroke={wingColor.vein} strokeWidth="0.5" fill="none" opacity="0.7" />
              <path d="M49 32 C32 24, 14 22, 5 22" stroke={wingColor.vein} strokeWidth="0.4" fill="none" opacity="0.5" />
              <path d="M49 36 C30 32, 12 34, 6 38" stroke={wingColor.vein} strokeWidth="0.4" fill="none" opacity="0.5" />
              <circle cx="20" cy="18" r="4" fill={wingColor.spot} />
              <circle cx="12" cy="28" r="3" fill={wingColor.spot} />
              <circle cx="28" cy="14" r="2.5" fill={wingColor.spot} opacity="0.6" />
              <path d="M49 30 C45 8, 25 0, 8 5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" fill="none" />
            </svg>

            {/* Lower right wing (mirrored) */}
            <svg
              viewBox="0 0 35 35"
              className="absolute bottom-0 left-0 w-[70%] h-[40%]"
              style={{
                transform: 'scaleX(-1)',
                filter: `drop-shadow(0 2px 6px ${wingColor.glow})`,
              }}
            >
              <path
                d="M34 5 C28 8, 10 12, 4 22 C0 30, 8 34, 18 30 C28 26, 34 15, 34 5 Z"
                fill="url(#lwgFill)"
                stroke="url(#lwgEdge)"
                strokeWidth="0.7"
              />
              <path d="M34 5 C22 14, 10 22, 6 28" stroke={wingColor.vein} strokeWidth="0.4" fill="none" opacity="0.5" />
              <circle cx="16" cy="20" r="2.5" fill={wingColor.spot} />
            </svg>
          </motion.div>

          {/* BODY (Central thorax & abdomen) */}
          <div className="absolute left-1/2 top-[10%] -translate-x-1/2 z-20" style={{ width: size * 0.08, height: size * 0.65 }}>
            <svg viewBox="0 0 8 60" className="w-full h-full" style={{ overflow: 'visible' }}>
              {/* Antennae */}
              <path d="M4 8 C3 3, 0 0, -4 -3" stroke="#C5A059" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              <path d="M4 8 C5 3, 8 0, 12 -3" stroke="#C5A059" strokeWidth="0.7" fill="none" strokeLinecap="round" />
              <circle cx="-4.5" cy="-3.5" r="1" fill="#C5A059" />
              <circle cx="12.5" cy="-3.5" r="1" fill="#C5A059" />
              {/* Body */}
              <ellipse cx="4" cy="18" rx="2.5" ry="6" fill="url(#lwgEdge)" />
              <ellipse cx="4" cy="35" rx="2" ry="12" fill="url(#lwgEdge)" />
              {/* Body segments */}
              {[20, 25, 30, 35, 40].map((y, i) => (
                <line key={i} x1="2.5" y1={y} x2="5.5" y2={y} stroke="rgba(255,255,255,0.5)" strokeWidth="0.4" />
              ))}
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Dynamic ground shadow */}
      <motion.div
        animate={{
          scale: [1, 0.7, 1.1, 0.75, 1],
          opacity: [0.15, 0.06, 0.18, 0.08, 0.15],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay,
        }}
        className="absolute rounded-full bg-black/30 blur-lg pointer-events-none"
        style={{
          width: size * 0.7,
          height: size * 0.1,
          bottom: 0,
          left: '15%',
        }}
      />
    </div>
  );
};

export default Butterfly;
