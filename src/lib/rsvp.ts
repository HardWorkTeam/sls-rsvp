import { PUBLIC_API_URL } from "@/lib/api";

export interface RsvpPayload {
  name: string;
  status: "attending" | "declined";
  guests: number;
  wishes: string;
}

export async function submitRsvp(
  invitationCode: string,
  payload: RsvpPayload,
): Promise<void> {
  const body = {
    guest_name: payload.name,
    status: payload.status === "attending" ? "accepted" : "declined",
    number_of_guests: payload.guests,
    message: payload.wishes || undefined,
  };

  const res = await fetch(
    `${PUBLIC_API_URL}/public/invitations/${encodeURIComponent(invitationCode)}/rsvp`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as {
      message?: string;
      errors?: Record<string, string[]>;
    };
    const firstError = data.errors
      ? Object.values(data.errors)[0]?.[0]
      : undefined;
    throw new Error(firstError ?? data.message ?? "Failed to submit RSVP");
  }
}
