import type { CalendarEvent } from "@/types/invitation";

// Builds the actual "add to calendar" destinations from a resolved
// CalendarEvent (see mapInvitation.buildCalendar — times are already UTC). Pure
// string building so it works the same on the server and the client.

// "2026-12-01T09:00:00.000Z" → "20261201T090000Z" (timed), or
// "2026-12-01" → "20261201" (all-day).
function compact(value: string): string {
  return value.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

// Google's `dates` and the ICS DT* fields use the same compact forms.
function range(event: CalendarEvent): { start: string; end: string } {
  return { start: compact(event.start), end: compact(event.end) };
}

/** Google Calendar "create event" link (opens a pre-filled event). */
export function googleCalendarUrl(event: CalendarEvent): string {
  const { start, end } = range(event);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Outlook.com / Office 365 web "compose event" link. */
export function outlookCalendarUrl(event: CalendarEvent): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt: event.start,
    enddt: event.end,
    allday: String(event.allDay),
  });
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}

// RFC 5545 text escaping: backslash, comma, semicolon, and newlines.
function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** A downloadable .ics document (Apple Calendar, Outlook desktop, etc.). */
export function buildIcs(event: CalendarEvent, uid: string): string {
  const { start, end } = range(event);
  const stamp = compact(new Date().toISOString());
  const dtStart = event.allDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART:${start}`;
  const dtEnd = event.allDay ? `DTEND;VALUE=DATE:${end}` : `DTEND:${end}`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Srolanh//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    dtStart,
    dtEnd,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  // ICS requires CRLF line endings.
  return lines.join("\r\n");
}
