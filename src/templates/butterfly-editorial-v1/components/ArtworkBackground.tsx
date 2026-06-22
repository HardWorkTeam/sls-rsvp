'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Golden Leaf Branch Vector (Corner Ornament) ──────────────────────────────
const GoldenBranch: React.FC<{ className?: string; rotate?: number; scaleX?: number }> = ({
  className = '',
  rotate = 0,
  scaleX = 1,
}) => (
  <svg
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-40 md:w-56 h-40 md:h-56 pointer-events-none select-none ${className}`}
    style={{
      transform: `rotate(${rotate}deg) scaleX(${scaleX})`,
      filter: 'drop-shadow(0 4px 12px rgba(197, 160, 89, 0.15))',
    }}
  >
    {/* Main Stem */}
    <path
      d="M10 10 C35 25 70 55 125 125"
      stroke="#C5A059"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.8"
    />
    
    {/* Leaves - Alternating sides with semi-translucent gold fill & metallic gold outline */}
    {/* Leaf 1 */}
    <path
      d="M32 20 C22 12 30 2 38 12 C44 20 38 25 32 20 Z"
      fill="rgba(245, 230, 227, 0.25)"
      stroke="#C5A059"
      strokeWidth="0.8"
    />
    <path d="M32 20 C28 16 32 8 38 12" stroke="#C5A059" strokeWidth="0.4" />

    {/* Leaf 2 */}
    <path
      d="M20 28 C12 20 20 10 26 20 C30 28 25 32 20 28 Z"
      fill="rgba(197, 160, 89, 0.08)"
      stroke="#C5A059"
      strokeWidth="0.8"
    />
    <path d="M20 28 C16 24 20 16 26 20" stroke="#C5A059" strokeWidth="0.4" />

    {/* Leaf 3 */}
    <path
      d="M55 40 C45 30 52 18 62 30 C70 40 63 46 55 40 Z"
      fill="rgba(245, 230, 227, 0.25)"
      stroke="#C5A059"
      strokeWidth="0.8"
    />
    <path d="M55 40 C50 35 55 25 62 30" stroke="#C5A059" strokeWidth="0.4" />

    {/* Leaf 4 */}
    <path
      d="M40 50 C30 42 38 30 45 42 C50 50 46 54 40 50 Z"
      fill="rgba(197, 160, 89, 0.08)"
      stroke="#C5A059"
      strokeWidth="0.8"
    />
    <path d="M40 50 C35 46 40 38 45 42" stroke="#C5A059" strokeWidth="0.4" />

    {/* Leaf 5 */}
    <path
      d="M80 68 C70 56 78 44 88 56 C96 66 90 72 80 68 Z"
      fill="rgba(245, 230, 227, 0.25)"
      stroke="#C5A059"
      strokeWidth="0.8"
    />
    <path d="M80 68 C75 62 80 52 88 56" stroke="#C5A059" strokeWidth="0.4" />

    {/* Leaf 6 */}
    <path
      d="M62 78 C52 70 60 58 68 70 C74 78 70 82 62 78 Z"
      fill="rgba(197, 160, 89, 0.08)"
      stroke="#C5A059"
      strokeWidth="0.8"
    />
    <path d="M62 78 C57 74 62 66 68 70" stroke="#C5A059" strokeWidth="0.4" />

    {/* Leaf 7 (Tip Leaf) */}
    <path
      d="M110 102 C102 92 110 82 116 94 C122 104 118 108 110 102 Z"
      fill="rgba(245, 230, 227, 0.3)"
      stroke="#C5A059"
      strokeWidth="0.8"
    />
    <path d="M110 102 C106 98 110 90 116 94" stroke="#C5A059" strokeWidth="0.4" />

    {/* Leaf 8 */}
    <path
      d="M92 112 C84 104 92 92 98 104 C104 114 100 118 92 112 Z"
      fill="rgba(197, 160, 89, 0.08)"
      stroke="#C5A059"
      strokeWidth="0.8"
    />
    <path d="M92 112 C88 108 92 100 98 104" stroke="#C5A059" strokeWidth="0.4" />
  </svg>
);

export const ArtworkBackground: React.FC = () => {
  const { scrollY } = useScroll();

  // Parallax transforms for different background elements
  const ySplash1 = useTransform(scrollY, [0, 1000], [0, -80]);
  const ySplash2 = useTransform(scrollY, [0, 1000], [0, 60]);
  const yLeafLeft = useTransform(scrollY, [0, 1500], [0, -120]);
  const yLeafRight = useTransform(scrollY, [0, 1500], [0, 100]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none bg-[#FCFBF9]">
      {/* ─── Fine Linen Paper Texture Overlay ─── */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23C5A059' fill-opacity='0.2'%3E%3Crect x='0' y='0' width='1' height='100'/%3E%3Crect x='0' y='0' width='100' height='1'/%3E%3Crect x='25' y='25' width='2' height='2'/%3E%3Crect x='75' y='75' width='2' height='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ─── Dynamic Watercolor Splashes (Parallax Blur Blobs) ─── */}
      <motion.div
        style={{ y: ySplash1 }}
        className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-[#F5E6E3] to-[#FFEFCB] blur-[120px] opacity-45"
      />
      <motion.div
        style={{ y: ySplash2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-bl from-[#FFEFCB] to-[#F5E6E3] blur-[150px] opacity-40"
      />
      <div className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] max-w-[280px] rounded-full bg-[#F5E6E3] blur-[80px] opacity-30" />

      {/* ─── Parallax Gold Leaf Corner Artworks ─── */}
      {/* Top Left Branch */}
      <motion.div 
        style={{ y: yLeafLeft }}
        className="absolute top-0 left-0 origin-top-left"
      >
        <GoldenBranch rotate={-15} />
      </motion.div>

      {/* Top Right Branch */}
      <motion.div 
        style={{ y: yLeafRight }}
        className="absolute top-10 right-0 origin-top-right"
      >
        <GoldenBranch rotate={105} scaleX={-1} />
      </motion.div>

      {/* Center Left Branch */}
      <motion.div 
        style={{ y: yLeafRight }}
        className="absolute top-[45%] left-[-30px] opacity-50"
      >
        <GoldenBranch rotate={30} />
      </motion.div>

      {/* Center Right Branch */}
      <motion.div 
        style={{ y: yLeafLeft }}
        className="absolute top-[60%] right-[-40px] opacity-45"
      >
        <GoldenBranch rotate={120} scaleX={-1} />
      </motion.div>

      {/* Bottom Left Branch */}
      <motion.div 
        style={{ y: yLeafLeft }}
        className="absolute bottom-0 left-0 origin-bottom-left"
      >
        <GoldenBranch rotate={-75} />
      </motion.div>

      {/* Bottom Right Branch */}
      <motion.div 
        style={{ y: yLeafRight }}
        className="absolute bottom-10 right-0 origin-bottom-right"
      >
        <GoldenBranch rotate={165} scaleX={-1} />
      </motion.div>

      {/* ─── Floating Gold Dust particles ─── */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 2 === 0 ? 3 : 2,
              height: i % 2 === 0 ? 3 : 2,
              background: 'radial-gradient(circle, #FFEFCB, #C5A059)',
              boxShadow: '0 0 8px rgba(226, 205, 159, 0.7)',
              left: `${10 + (i * 7.5)}%`,
              top: `${15 + (i % 3 * 25)}%`,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, (i - 6) * 3, 0],
              opacity: [0.15, 0.6, 0.15],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtworkBackground;
