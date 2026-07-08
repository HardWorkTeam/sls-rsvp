"use client";

import { LazyMotion, domMax } from "framer-motion";
import type { ReactNode } from "react";

// Loads framer-motion's full DOM feature bundle SYNCHRONOUSLY. We previously
// async-loaded it to trim initial JS, but that delayed every entrance
// animation until the chunk arrived — covers rendered static on slower
// networks. On an invitation the choreography is the product, so the engine
// ships with the template. NOT `strict`, because shared ornament components
// (KhmerOrnaments etc.) still render full `motion` components. domMax (not
// domAnimation) because the galleries use drag/pan gestures.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
