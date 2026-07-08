'use client';

import { m } from 'framer-motion';
import { Photo } from '@/components/Photo';

/**
 * Full-bleed hero cover photo with a slow Ken-Burns drift (gentle 1 → 1.08
 * zoom, alternating) so the cover feels alive instead of a static backdrop.
 * No opacity fade — the photo is the LCP element and must paint immediately.
 * Must render inside <MotionProvider>. The dark readability overlay stays in
 * each template (colors differ per theme).
 */
export function CoverPhoto({ src, zIndex = 0 }: { src: string; zIndex?: number }) {
  return (
    <m.div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex }}
      animate={{ scale: [1, 1.08] }}
      transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
    >
      <Photo src={src} alt="" fill priority sizes="100vw" />
    </m.div>
  );
}

export default CoverPhoto;
