import React from 'react';
import { motion } from 'framer-motion';
import { Couple } from '@/types/invitation';
import { ThinGoldRule } from './BotanicalAssets';

interface FooterProps {
  couple: Couple;
  dateLabel?: string;
  thankYouText?: string;
}

export const Footer: React.FC<FooterProps> = ({ couple, dateLabel, thankYouText }) => {
  return (
    <section className="relative w-full h-[100svh] bg-white/40 backdrop-blur-md border-t border-emerald-gold/20 overflow-hidden flex flex-col items-center justify-center py-12 px-6">
      {/* Elaborate Botanical */}
      <motion.svg
        className="w-full max-w-[400px] h-auto mb-8 text-emerald-ivory opacity-90"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true, margin: "-20% 0px" }}
      >
        {/* We use an animated group to apply the shimmer sweep */}
        <g className="emerald-shimmer-svg" strokeWidth="1" strokeLinecap="round">
          {/* Central Stem */}
          <path d="M200 300 C200 200 200 100 200 50" stroke="currentColor" />
          
          {/* Left branches */}
          <path d="M200 250 Q150 200 100 150" stroke="currentColor" />
          <path d="M200 180 Q160 140 120 100" stroke="currentColor" />
          <path d="M200 100 Q180 70 150 40" stroke="currentColor" />
          
          {/* Right branches */}
          <path d="M200 250 Q250 200 300 150" stroke="currentColor" />
          <path d="M200 180 Q240 140 280 100" stroke="currentColor" />
          <path d="M200 100 Q220 70 250 40" stroke="currentColor" />

          {/* Leaves/Flowers */}
          <circle cx="100" cy="150" r="15" stroke="currentColor" fill="none" />
          <circle cx="300" cy="150" r="15" stroke="currentColor" fill="none" />
          <circle cx="120" cy="100" r="10" stroke="currentColor" fill="none" />
          <circle cx="280" cy="100" r="10" stroke="currentColor" fill="none" />
          
          {/* Gold tips */}
          <circle cx="100" cy="150" r="5" stroke="#c9a84c" fill="none" />
          <circle cx="300" cy="150" r="5" stroke="#c9a84c" fill="none" />
          <circle cx="200" cy="50" r="8" stroke="#c9a84c" fill="none" />
        </g>
      </motion.svg>

      <div className="flex flex-col items-center z-10 text-center">
        <motion.p 
          className="font-emerald-script text-[38px] text-emerald-gold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {thankYouText || "See you there!"}
        </motion.p>

        <motion.h2 
          className="font-emerald-serif italic text-[28px] text-emerald-gold-bright mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          {couple.bride.nameEn.split(' ')[0]} & {couple.groom.nameEn.split(' ')[0]}
        </motion.h2>

        <motion.p 
          className="font-emerald-sans text-[10px] tracking-[0.3em] text-emerald-gray mb-6 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
        >
          {dateLabel || "February 15, 2025"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center w-full"
        >
          <ThinGoldRule width="60px" className="mb-4" />
          <span className="text-emerald-gold text-lg">♥</span>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer-svg {
          0% { filter: drop-shadow(0 0 0px transparent) brightness(1); }
          50% { filter: drop-shadow(0 0 12px rgba(201, 168, 76, 0.4)) brightness(1.2); }
          100% { filter: drop-shadow(0 0 0px transparent) brightness(1); }
        }
        .emerald-shimmer-svg {
          animation: shimmer-svg 8s ease-in-out infinite;
          animation-delay: 2s; /* start after fade in */
        }
      `}} />
    </section>
  );
};
