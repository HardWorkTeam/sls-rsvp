import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { invitationTag } from "@/lib/api";

/**
 * On-demand cache invalidation webhook.
 *
 * The Laravel backend calls this after an invitation is published/edited/
 * deleted so guests see fresh content immediately instead of waiting out the
 * Data Cache TTL. Secured by a shared secret; without a configured secret the
 * endpoint is disabled (the time-based revalidate window still applies).
 */
export async function POST(request: Request): Promise<NextResponse> {
  const secret = process.env.RSVP_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Revalidation disabled" }, { status: 503 });
  }
  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let code: unknown;
  try {
    ({ code } = await request.json());
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof code !== "string" || !code) {
    return NextResponse.json({ message: "Missing invitation code" }, { status: 400 });
  }

  // Use { expire: 0 } to force immediate cache invalidation. This ensures that
  // when the portal/editor saves, the iframe preview will immediately load the
  // fresh data instead of using stale-while-revalidate (which would serve old data once).
  revalidateTag(invitationTag(code), { expire: 0 });
  return NextResponse.json({ revalidated: true, code });
}
