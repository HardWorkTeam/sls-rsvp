import { cache } from "react";
import type { PublicInvitation } from "@/types/invitation";

/** Base URL used by the browser (RSVP form submission). */
export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

/** Base URL used during server-side rendering. */
const SERVER_API_URL = process.env.API_URL ?? PUBLIC_API_URL;

/**
 * How long (seconds) a fetched invitation stays in Next's Data Cache before it
 * is re-fetched. Published invitations change rarely, so a short window lets a
 * viral link (one couple → hundreds of guests, each opening it several times)
 * collapse to ~one backend hit per window instead of one per page view.
 *
 * Edits made in the editor become visible either after this window OR
 * immediately if the backend calls the revalidation webhook (see below) with
 * the `invitation:<code>` tag on publish/update.
 */
const INVITATION_REVALIDATE_SECONDS = 30;

/** Cache tag for on-demand invalidation from the backend on publish/edit. */
export const invitationTag = (code: string) => `invitation:${code}`;

/**
 * Fetch a published invitation by its public code (server-side).
 * Returns null for unknown or unpublished codes.
 *
 * Wrapped in React `cache()` so that `generateMetadata` and the page component
 * — which both need the invitation — share a single fetch + parse per request
 * instead of doing the work twice.
 */
export const getInvitation = cache(
  async (code: string): Promise<PublicInvitation | null> => {
    try {
      const response = await fetch(
        `${SERVER_API_URL}/public/invitations/${encodeURIComponent(code)}`,
        {
          headers: { Accept: "application/json" },
          next: {
            revalidate: INVITATION_REVALIDATE_SECONDS,
            tags: [invitationTag(code)],
          },
        },
      );

      if (!response.ok) return null;

      const payload = (await response.json()) as { data: PublicInvitation };
      return payload.data;
    } catch {
      return null;
    }
  },
);
