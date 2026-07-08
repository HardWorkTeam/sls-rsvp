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

  // Next 16 requires a cache profile as the 2nd arg; "max" expires the tag
  // immediately (updateTag is Server-Action-only, so it's not usable here).
  revalidateTag(invitationTag(code), "max");
  return NextResponse.json({ revalidated: true, code });
}
