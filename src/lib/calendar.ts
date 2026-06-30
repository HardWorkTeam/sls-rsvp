import type { CalendarEvent } from "@/types/invitation";

// Builds the actual "add to calendar" destinations from a resolved
// CalendarEvent (see mapInvitation.buildCalendar — timed events carry the
// Cambodia wall-clock time as a floating local datetime). Pure string building
// so it works the same on the server and the client.

// The platform's weddings happen in Cambodia, which is a fixed +07:00 offset
// with no DST. Timed events are anchored to this zone so every guest's calendar
// shows the same clock time as the invitation.
const TZID = "Asia/Phnom_Penh";
const TZ_OFFSET = "+07:00";

// "2026-12-01T09:00:00" → "20261201T090000" (timed, floating local), or
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
  // ctz tells Google the floating dates are Cambodia time (ignored for all-day).
  if (!event.allDay) params.set("ctz", TZID);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Outlook.com / Office 365 web "compose event" link. */
export function outlookCalendarUrl(event: CalendarEvent): string {
  // Outlook's deeplink has no timezone field, so pin the local time to Cambodia
  // with an explicit offset; for all-day the date-only value is passed as-is.
  const startdt = event.allDay ? event.start : `${event.start}${TZ_OFFSET}`;
  const enddt = event.allDay ? event.end : `${event.end}${TZ_OFFSET}`;
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    body: event.description,
    location: event.location,
    startdt,
    enddt,
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

// Inline definition of the Cambodia timezone so clients can resolve the TZID on
// timed events. Fixed +07:00 year-round (no DST), so a single STANDARD rule.
const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${TZID}`,
  "BEGIN:STANDARD",
  "DTSTART:19700101T000000",
  "TZOFFSETFROM:+0700",
  "TZOFFSETTO:+0700",
  "TZNAME:+07",
  "END:STANDARD",
  "END:VTIMEZONE",
];

/** A downloadable .ics document (Apple Calendar, Outlook desktop, etc.). */
export function buildIcs(event: CalendarEvent, uid: string): string {
  const { start, end } = range(event);
  const stamp = compact(new Date().toISOString());
  // Timed events are anchored to the Cambodia timezone via TZID; all-day events
  // are date-only and zone-independent.
  const dtStart = event.allDay ? `DTSTART;VALUE=DATE:${start}` : `DTSTART;TZID=${TZID}:${start}`;
  const dtEnd = event.allDay ? `DTEND;VALUE=DATE:${end}` : `DTEND;TZID=${TZID}:${end}`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Srolanh//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    ...(event.allDay ? [] : VTIMEZONE),
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
