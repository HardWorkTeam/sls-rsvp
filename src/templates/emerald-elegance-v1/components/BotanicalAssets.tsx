import React from 'react';
import { motion } from 'framer-motion';

export const TopBotanicalBranch: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 400 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Left branch */}
    <motion.path
      d="M20,100 C80,60 160,20 190,10"
      stroke="var(--ee-ivory)"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    <motion.path d="M100,50 Q110,40 120,45" stroke="#c9a84c" strokeWidth="1" fill="none" />
    <motion.path d="M60,75 Q70,60 80,70" stroke="var(--ee-ivory)" strokeWidth="1" fill="none" />
    <motion.path d="M150,25 Q160,15 170,25" stroke="#c9a84c" strokeWidth="1" fill="none" />
    
    {/* Right branch */}
    <motion.path
      d="M380,100 C320,60 240,20 210,10"
      stroke="var(--ee-ivory)"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    <motion.path d="M300,50 Q290,40 280,45" stroke="#c9a84c" strokeWidth="1" fill="none" />
    <motion.path d="M340,75 Q330,60 320,70" stroke="var(--ee-ivory)" strokeWidth="1" fill="none" />
    <motion.path d="M250,25 Q240,15 230,25" stroke="#c9a84c" strokeWidth="1" fill="none" />
  </svg>
);

export const BottomBotanicalBranch: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 400 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Left branch */}
    <motion.path
      d="M20,20 C80,60 160,100 190,110"
      stroke="var(--ee-ivory)"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    <motion.path d="M100,70 Q110,80 120,75" stroke="#c9a84c" strokeWidth="1" fill="none" />
    <motion.path d="M60,45 Q70,60 80,50" stroke="var(--ee-ivory)" strokeWidth="1" fill="none" />
    
    {/* Right branch */}
    <motion.path
      d="M380,20 C320,60 240,100 210,110"
      stroke="var(--ee-ivory)"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    <motion.path d="M300,70 Q290,80 280,75" stroke="#c9a84c" strokeWidth="1" fill="none" />
    <motion.path d="M340,45 Q330,60 320,50" stroke="var(--ee-ivory)" strokeWidth="1" fill="none" />
  </svg>
);

export const CornerOrnament: React.FC<{ className?: string, style?: React.CSSProperties }> = ({ className, style }) => (
  <svg className={className} style={style} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path
      d="M2 38 L2 15 C2 5 5 2 15 2 L38 2"
      stroke="#c9a84c"
      strokeWidth="1"
      strokeLinecap="round"
      initial={{ strokeDasharray: 100, strokeDashoffset: 100 }}
      whileInView={{ strokeDashoffset: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    />
    <circle cx="6" cy="6" r="1.5" fill="#c9a84c" />
  </svg>
);

export const DiamondSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 1 L11 6 L6 11 L1 6 Z" fill="#c9a84c" />
    </svg>
  </div>
);

export const ThinGoldRule: React.FC<{ width?: string, className?: string }> = ({ width = "60px", className = "" }) => (
  <div className={`flex justify-center w-full ${className}`}>
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="h-[1px] bg-[#c9a84c] opacity-60 emerald-gold-glow"
    />
  </div>
);

export const EtherealBorderFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style }) => {
  return (
    <div
      className={`relative p-6 md:p-10 rounded-2xl ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(201, 168, 76, 0.3)',
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
        <motion.rect
          x="4"
          y="4"
          width="calc(100% - 8px)"
          height="calc(100% - 8px)"
          rx="12"
          stroke="var(--ee-gold)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.5 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Inner border rect */}
        <motion.rect
          x="8"
          y="8"
          width="calc(100% - 16px)"
          height="calc(100% - 16px)"
          rx="8"
          stroke="var(--ee-gold)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.25 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* Traditional Corner Accents using CornerOrnament */}
      <div className="absolute top-2 left-2 z-10 opacity-70"><CornerOrnament /></div>
      <div className="absolute top-2 right-2 z-10 opacity-70" style={{ transform: 'scaleX(-1)' }}><CornerOrnament /></div>
      <div className="absolute bottom-2 left-2 z-10 opacity-70" style={{ transform: 'scaleY(-1)' }}><CornerOrnament /></div>
      <div className="absolute bottom-2 right-2 z-10 opacity-70" style={{ transform: 'scale(-1,-1)' }}><CornerOrnament /></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

