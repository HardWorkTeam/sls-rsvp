import type { PublicInvitation, PublicWeddingDay, InvitationData, WeddingEvent, GiftRegistryItem, LoveStoryMilestone, CalendarEvent } from "@/types/invitation";

const DEFAULT_TEMPLATE = "royal-khmer-v1";

// The platform targets Cambodia events; times stored as UTC must be displayed in local Cambodia time.
const DISPLAY_TZ = "Asia/Phnom_Penh";

function fmtTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: DISPLAY_TZ,
  });
}

// Return the local calendar date string "YYYY-MM-DD" in the display timezone.
function localDateStr(date: Date): string {
  return date.toLocaleDateString("en-CA", { timeZone: DISPLAY_TZ }); // en-CA = YYYY-MM-DD
}

// Wall-clock times ("16:00" / "16:00:00") carry no zone. Parse as UTC (append
// "Z") and format in UTC so the displayed clock time matches the input exactly
// — otherwise the naive string is parsed in the server's local zone and
// shifted when formatted as UTC (e.g. "16:00" → "9:00 AM" at +07).
function wallClockLabel(time: string): string {
  return new Date(`1970-01-01T${time}Z`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
}

// The wedding-day rows saved by the editor (settings.wedding_days) — Khmer
// weddings commonly span 2 days. Only rows with a date are usable.
function parseWeddingDays(invitation: PublicInvitation): PublicWeddingDay[] {
  const days = invitation.settings?.wedding_days;
  if (!Array.isArray(days)) return [];
  return days.filter((d): d is PublicWeddingDay => Boolean(d && typeof d === "object" && d.date));
}

// Events derived from the wedding's own date/time/venue/map fields (the top of the
// editor's "Event Schedule" section). These drive the Cover, Countdown and Location —
// i.e. the general "wedding info", which must NOT come from individual timeline rows.
function buildWeddingEvents(invitation: PublicInvitation): WeddingEvent[] {
  const { wedding } = invitation;

  // Multi-day weddings: one event per day. Day 1 defaults to the ceremony
  // venue, later days to the reception venue (the usual Khmer pattern:
  // traditional ceremony first day, reception party the next).
  const weddingDays = parseWeddingDays(invitation);
  if (weddingDays.length > 0) {
    return weddingDays.map((day, i) => {
      const fallbackVenue = i === 0
        ? wedding.ceremony_venue ?? wedding.reception_venue
        : wedding.reception_venue ?? wedding.ceremony_venue;
      const title = weddingDays.length > 1
        ? (i === 0 ? "ពិធីតាមប្រពៃណី (Traditional Ceremony)" : "ពិធីជប់លៀង (Reception)")
        : "ពិធីមង្គលការ (Wedding Ceremony)";
      return {
        id: `evt-day-${i + 1}`,
        title,
        dateKh: "",
        dateSolar: `${day.date}T${day.time || "00:00:00"}`,
        timeLabel: day.time ? wallClockLabel(day.time) : "",
        locationName: day.venue || fallbackVenue || "",
        googleMapsUrl: wedding.google_map_link ?? "",
        sortOrder: i + 1,
      };
    });
  }

  const weddingDate = wedding.wedding_date ?? "";
  const weddingTime = wedding.wedding_time ?? "";
  const weddingDateSolar = weddingDate
    ? `${weddingDate}T${weddingTime || "00:00:00"}`
    : "";
  const weddingTimeLabel = weddingTime ? wallClockLabel(weddingTime) : "";

  const events: WeddingEvent[] = [];

  if (wedding.ceremony_venue) {
    events.push({
      id: "evt-ceremony",
      title: "ពិធីកាត់សក់បង្កក់សិរី (Ceremony)",
      dateKh: "",
      dateSolar: weddingDateSolar,
      timeLabel: weddingTimeLabel,
      locationName: wedding.ceremony_venue,
      googleMapsUrl: wedding.google_map_link ?? "",
      sortOrder: 1,
    });
  }

  if (wedding.reception_venue && wedding.reception_venue !== wedding.ceremony_venue) {
    events.push({
      id: "evt-reception",
      title: "ពិធីពិសាភោជនាហារ (Reception)",
      dateKh: "",
      dateSolar: weddingDateSolar,
      timeLabel: "",
      locationName: wedding.reception_venue,
      googleMapsUrl: wedding.google_map_link ?? "",
      sortOrder: 2,
    });
  }

  // Last resort: a bare date-only event so Cover/Countdown still have a target date.
  if (events.length === 0 && weddingDateSolar) {
    events.push({
      id: "evt-wedding",
      title: wedding.wedding_name ?? "",
      dateKh: "",
      dateSolar: weddingDateSolar,
      timeLabel: weddingTimeLabel,
      locationName: "",
      googleMapsUrl: wedding.google_map_link ?? "",
      sortOrder: 1,
    });
  }

  return events;
}

// The schedule list itself: the timeline events managed in the editor. Drives EventSchedule.
function buildScheduleEvents(invitation: PublicInvitation): WeddingEvent[] {
  const { wedding } = invitation;

  if (wedding.timeline_events.length === 0) {
    // No timeline rows yet — fall back to the wedding-derived ceremony/reception.
    return buildWeddingEvents(invitation);
  }

  const mapped = wedding.timeline_events.map((evt, i) => {
    const date = evt.starts_at ? new Date(evt.starts_at) : null;
    // dateSolar reflects the LOCAL calendar date so Khmer date labels are correct.
    const dateSolar = date ? `${localDateStr(date)}T${fmtTime(date)}` : "";
    return {
      id: String(evt.id),
      title: evt.title,
      dateKh: "",
      dateSolar,
      timeLabel: date ? fmtTime(date) : "",
      locationName: evt.location ?? wedding.ceremony_venue ?? wedding.reception_venue ?? "",
      googleMapsUrl: evt.google_map_link ?? wedding.google_map_link ?? "",
      sortOrder: evt.sort_order ?? i,
    };
  });
  return mapped.sort((a, b) => a.sortOrder - b.sortOrder);
}

// `events` (used for Cover/Location/Countdown) prefers the wedding fields; only when
// none are set does it fall back to the timeline so those sections aren't empty.
function buildEvents(invitation: PublicInvitation): WeddingEvent[] {
  const weddingEvents = buildWeddingEvents(invitation);
  return weddingEvents.length > 0 ? weddingEvents : buildScheduleEvents(invitation);
}

// Derive the "add to calendar" entry straight from the wedding's own fields
// (not the display-formatted template events, whose time labels are localized
// strings). Returns undefined when there's no date to anchor an event on.
function buildCalendar(
  invitation: PublicInvitation,
  coupleTitle: string,
): CalendarEvent | undefined {
  const { wedding } = invitation;
  const weddingDays = parseWeddingDays(invitation);

  // Multi-day wedding: a single all-day entry spanning every day (DTEND is
  // exclusive, so it's the day after the last day). Dates come sorted from the
  // editor but sort defensively anyway.
  if (weddingDays.length > 1) {
    const dates = weddingDays.map((d) => d.date as string).sort();
    const last = new Date(`${dates[dates.length - 1]}T00:00:00Z`);
    last.setUTCDate(last.getUTCDate() + 1);
    return {
      title: `${coupleTitle} — Wedding`,
      location: wedding.ceremony_venue || wedding.reception_venue || "",
      description: wedding.google_map_link ? `Map: ${wedding.google_map_link}` : "",
      start: dates[0],
      end: last.toISOString().slice(0, 10),
      allDay: true,
    };
  }

  // Single day: prefer the wedding-day row (kept in sync with the wedding
  // fields by the editor, but the row is authoritative when present).
  const date = weddingDays[0]?.date ?? wedding.wedding_date;
  if (!date) return undefined;

  const time = weddingDays[0]?.time ?? wedding.wedding_time ?? "";
  const location = wedding.ceremony_venue || wedding.reception_venue || "";

  // Calendar entry carries only the essentials: couple title, location, map and
  // the date/time taken from the wedding fields. The description holds just the
  // map link (location lives in its own field).
  const description = wedding.google_map_link ? `Map: ${wedding.google_map_link}` : "";

  const title = `${coupleTitle} — Wedding`;

  // No time set → an all-day event anchored on the single wedding date. DTEND
  // for all-day is exclusive, so it's the day after to cover that one day.
  if (!time) {
    const next = new Date(`${date}T00:00:00Z`);
    next.setUTCDate(next.getUTCDate() + 1);
    return {
      title,
      location,
      description,
      start: date,
      end: next.toISOString().slice(0, 10),
      allDay: true,
    };
  }

  // Timed event: emit the wall-clock time as a *floating* local datetime (no "Z"
  // / no UTC conversion) so calendar apps show the same clock time as the
  // invitation (e.g. 7:00 AM) regardless of the guest's timezone. The event
  // points at the start only (no duration), so the end equals the start.
  const [hh = "00", mm = "00", ss = "00"] = time.split(":");
  const pad = (v: string) => v.padStart(2, "0");
  const start = `${date}T${pad(hh)}:${pad(mm)}:${pad(ss)}`;

  return {
    title,
    location,
    description,
    start,
    end: start,
    allDay: false,
  };
}

function buildGiftRegistries(invitation: PublicInvitation): GiftRegistryItem[] {
  const bank = invitation.settings?.bank_account as Record<string, string> | undefined;
  if (!bank || !bank.name) return [];
  return [
    {
      id: "gift-1",
      bankName: bank.bank ?? "",
      accountName: bank.name,
      accountNumber: bank.number ?? "",
      qrCodeUrl: bank.qr_url ?? "",
    },
  ];
}

function buildLoveStory(invitation: PublicInvitation): LoveStoryMilestone[] {
  const desc = invitation.wedding.story_description;
  if (!desc) return [];
  return [
    {
      id: "story-1",
      title: "Our Story",
      dateLabel: "",
      description: desc,
      sortOrder: 1,
    },
  ];
}

function buildGallery(invitation: PublicInvitation): string[] {
  const albumPhotos = invitation.wedding.albums.flatMap(
    (album) => (album.media_items ?? []).filter((m) => m.media_type === "photo").map((m) => m.url),
  );
  const settingsUrls = Array.isArray(invitation.settings?.gallery_urls)
    ? (invitation.settings.gallery_urls as string[]).filter(Boolean)
    : [];
  return [...albumPhotos, ...settingsUrls];
}

export function mapToInvitationData(invitation: PublicInvitation): InvitationData {
  const { wedding } = invitation;
  const templateId = invitation.template?.slug ?? DEFAULT_TEMPLATE;
  const showGift = invitation.settings?.show_gift_section !== false;
  const giftRegistries = buildGiftRegistries(invitation);
  const events = buildEvents(invitation);
  const scheduleEvents = buildScheduleEvents(invitation);
  const gallery = buildGallery(invitation);
  const loveStory = buildLoveStory(invitation);

  const deadlineDate = wedding.wedding_date
    ? `${wedding.wedding_date}T00:00:00Z`
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  // Section visibility: editor saves to settings.sections; data availability gates the rest
  const savedSections = (invitation.settings?.sections ?? {}) as Partial<Record<string, boolean>>;
  const sectionsVisibility = {
    Cover:        savedSections.Cover        ?? true,
    CoupleInfo:   savedSections.CoupleInfo   ?? true,
    LoveStory:    savedSections.LoveStory    ?? loveStory.length > 0,
    Schedule:     savedSections.Schedule     ?? scheduleEvents.length > 0,
    Gallery:      savedSections.Gallery      ?? gallery.length > 0,
    Location:     savedSections.Location     ?? events.length > 0,
    GiftRegistry: savedSections.GiftRegistry ?? (showGift && giftRegistries.length > 0),
    RSVP:         savedSections.RSVP         ?? true,
  };

  // Invitation text: editor saves to settings; fall back to defaults
  const invTextKh = invitation.settings && "invitation_text_kh" in invitation.settings
    ? (typeof invitation.settings.invitation_text_kh === "string" ? invitation.settings.invitation_text_kh : "")
    : "មានកិត្តិយសសូមគោរពអញ្ជើញ ចូលរួមជាភ្ញៀវកិត្តិយស";
  const invTextEn = invitation.settings && "invitation_text_en" in invitation.settings
    ? (typeof invitation.settings.invitation_text_en === "string" ? invitation.settings.invitation_text_en : "")
    : "CORDIALLY REQUEST THE HONOR OF YOUR PRESENCE AT THE CELEBRATION OF THEIR WEDDING";

  const ext = (invitation.settings?.couple_extended ?? {}) as Record<string, Record<string, string>>;
  const groomExt = ext.groom ?? {};
  const brideExt = ext.bride ?? {};

  const groomNameEn = groomExt.nameEn ?? "";
  const brideNameEn = brideExt.nameEn ?? "";

  const coupleTitle = brideNameEn && groomNameEn
    ? `${brideNameEn} & ${groomNameEn}`
    : wedding.wedding_name ?? "Our Wedding";
  const calendar = buildCalendar(invitation, coupleTitle);

  return {
    slug: invitation.invitation_code,
    templateId,
    coverImage: invitation.cover_image_path ?? "",
    sectionsVisibility,
    couple: {
      groom: {
        nameKh:   groomExt.nameKh   ?? "",
        nameEn:   groomExt.nameEn   ?? "",
        father:   groomExt.father   ?? "",
        fatherEn: groomExt.fatherEn ?? "",
        mother:   groomExt.mother   ?? "",
        motherEn: groomExt.motherEn ?? "",
        photo:    groomExt.photo    ?? "",
      },
      bride: {
        nameKh:   brideExt.nameKh   ?? "",
        nameEn:   brideExt.nameEn   ?? "",
        father:   brideExt.father   ?? "",
        fatherEn: brideExt.fatherEn ?? "",
        mother:   brideExt.mother   ?? "",
        motherEn: brideExt.motherEn ?? "",
        photo:    brideExt.photo    ?? "",
      },
    },
    events,
    scheduleEvents,
    loveStory,
    gallery,
    rsvpSettings: {
      deadline: deadlineDate,
      maxGuests: 10,
    },
    calendar,
    giftRegistries,
    invitationTextKh: invTextKh,
    invitationTextEn: invTextEn,
    meta: {
      title: brideNameEn && groomNameEn
        ? `${brideNameEn} & ${groomNameEn} — Wedding Invitation`
        : "Wedding Invitation",
      description: wedding.story_description?.slice(0, 160) ??
        (brideNameEn && groomNameEn
          ? `Join us to celebrate the wedding of ${brideNameEn} and ${groomNameEn}.`
          : "Join us to celebrate our wedding."),
      coverImage: invitation.cover_image_path ?? "",
    },
  };
}
