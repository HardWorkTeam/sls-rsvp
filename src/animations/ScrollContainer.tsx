'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FADE_IN_UP, CINEMATIC_SCALE, FADE_IN } from './presets';

interface ScrollSectionProps {
  children: ReactNode;
  variant?: 'fade-up' | 'scale-in' | 'fade-in' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration,
  className = '',
}) => {
  const getVariants = () => {
    switch (variant) {
      case 'scale-in':
        return CINEMATIC_SCALE;
      case 'fade-in':
        return FADE_IN;
      case 'fade-up':
      default:
        return FADE_IN_UP;
    }
  };

  if (variant === 'none') {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      custom={{ delay, duration }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};
