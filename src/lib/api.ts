import type { PublicInvitation } from "@/types/invitation";

/** Base URL used by the browser (RSVP form submission). */
export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

/** Base URL used during server-side rendering. */
const SERVER_API_URL = process.env.API_URL ?? PUBLIC_API_URL;

/**
 * Fetch a published invitation by its public code (server-side).
 * Returns null for unknown or unpublished codes.
 */
export async function getInvitation(code: string): Promise<PublicInvitation | null> {
  try {
    const response = await fetch(
      `${SERVER_API_URL}/public/invitations/${encodeURIComponent(code)}`,
      {
        headers: { Accept: "application/json" },
        // Always render the latest invitation content.
        cache: "no-store",
      },
    );

    if (!response.ok) return null;

    const payload = (await response.json()) as { data: PublicInvitation };
    return payload.data;
  } catch {
    return null;
  }
}
