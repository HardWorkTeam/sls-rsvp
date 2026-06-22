/**
 * Convert any Google Maps share URL into a maps embed URL.
 * Falls back to a name-based search if no coordinates are found.
 */
export function buildMapEmbedUrl(mapsUrl: string, fallbackName = ""): string {
  if (mapsUrl) {
    // @lat,lng in the URL (most share links include this)
    const coordMatch = mapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed&z=16`;
    }

    // /place/NAME/ segment
    try {
      const placeMatch = decodeURIComponent(mapsUrl).match(/\/place\/([^/@?&]+)/);
      if (placeMatch) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(placeMatch[1].replace(/\+/g, " "))}&output=embed`;
      }
    } catch { /* ignore */ }

    // ?q= param already present
    try {
      const q = new URL(mapsUrl).searchParams.get("q");
      if (q) return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
    } catch { /* ignore */ }
  }

  // Last resort: search by venue name
  if (fallbackName) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(fallbackName)}&output=embed`;
  }

  return "";
}
