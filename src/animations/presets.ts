import { Variants } from 'framer-motion';

export const FADE_IN_UP: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 120,
      duration: custom.duration ?? 0.8,
      delay: custom.delay ?? 0,
    },
  }),
};

export const CINEMATIC_SCALE: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: custom.duration ?? 1.5,
      delay: custom.delay ?? 0,
    },
  }),
};

export const FADE_IN: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration ?? 0.8,
      delay: custom.delay ?? 0,
    },
  }),
};
