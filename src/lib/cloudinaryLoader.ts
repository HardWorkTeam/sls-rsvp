/**
 * Custom next/image loader.
 *
 * Media is served from Cloudinary (MEDIA_DISK=cloudinary) as
 *   https://res.cloudinary.com/<cloud>/image/upload/<path>
 * Cloudinary does format negotiation + resizing at its own edge, so we inject
 * transformations into the URL and let the CDN do the work. Crucially this
 * means image bytes never pass through the Next.js server — the optimizer would
 * otherwise re-fetch and re-encode every couple's photo per size, which does
 * not scale to guest-level traffic.
 *
 * `f_auto` → AVIF/WebP when the browser supports it.
 * `q_auto` → perceptual auto-quality (or an explicit quality when provided).
 * `w_<n>`  → responsive width from next/image's srcset.
 * `c_limit`→ never upscale past the original.
 *
 * Non-Cloudinary URLs (e.g. the local public disk used in dev) are returned
 * untouched; next/image still handles lazy-loading and layout.
 */
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const marker = "/upload/";
  if (src.includes("res.cloudinary.com") && src.includes(marker)) {
    const transforms = `f_auto,q_${quality ?? "auto"},w_${width},c_limit`;
    return src.replace(marker, `${marker}${transforms}/`);
  }
  return src;
}

/**
 * Same Cloudinary transform for raw `<img>` / `motion.img` cases where
 * next/image can't be used (e.g. drag-animated carousel slides). Serves a
 * single edge-resized width — no srcset, but the format/quality/size win still
 * applies. Prefer the <Photo> component when responsive srcset is wanted.
 */
export function cldUrl(src: string, width: number, quality?: number): string {
  return cloudinaryLoader({ src, width, quality });
}
