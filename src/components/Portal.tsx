"use client";

import { createPortal } from "react-dom";

/**
 * Renders children into <body> instead of in place.
 *
 * A `position: fixed` element is laid out against the nearest ancestor that has
 * a transform, filter or backdrop-filter — not the viewport. Several template
 * sections carry `backdrop-filter: blur(...)`, which silently traps full-screen
 * overlays inside the section box. Portalling to <body> sidesteps that.
 */
export function Portal({ children }: { children: React.ReactNode }) {
  // There is no <body> to portal into while server-rendering, and the overlays
  // that use this only ever open in response to a click.
  if (typeof document === "undefined") return null;

  return createPortal(children, document.body);
}

export default Portal;
