import type { PublicInvitation, InvitationData, WeddingEvent, GiftRegistryItem, LoveStoryMilestone, CalendarEvent } from "@/types/invitation";

const DEFAULT_TEMPLATE = "royal-khmer-v1";

// The platform targets Cambodia events; times stored as UTC must be displayed in local Cambodia time.
const DISPLAY_TZ = "Asia/Phnom_Penh";

// Cambodia has a single, fixed offset (+07:00, no DST), so a wall-clock wedding
// time can be converted to a UTC instant by subtracting this. Used to build
// calendar links that land on the right moment regardless of the guest's zone.
const PHNOM_PENH_OFFSET_MIN = 7 * 60;

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

// Events derived from the wedding's own date/time/venue/map fields (the top of the
// editor's "Event Schedule" section). These drive the Cover, Countdown and Location —
// i.e. the general "wedding info", which must NOT come from individual timeline rows.
function buildWeddingEvents(invitation: PublicInvitation): WeddingEvent[] {
  const { wedding } = invitation;

  const weddingDate = wedding.wedding_date ?? "";
  const weddingTime = wedding.wedding_time ?? "";
  const weddingDateSolar = weddingDate
    ? `${weddingDate}T${weddingTime || "00:00:00"}`
    : "";
  // `weddingTime` is a wall-clock time ("16:00:00") with no zone. Parse it as
  // UTC (append "Z") and format in UTC so the displayed clock time matches the
  // input exactly — otherwise the naive string is parsed in the server's local
  // zone and shifted when formatted as UTC (e.g. "16:00" → "9:00 AM" at +07).
  const weddingTimeLabel = weddingTime
    ? new Date(`1970-01-01T${weddingTime}Z`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" })
    : "";

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
  const date = wedding.wedding_date;
  if (!date) return undefined;

  const time = wedding.wedding_time ?? "";
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

  // Timed event: interpret the wall-clock time as Cambodia local, convert to a
  // UTC instant. The event points at the start only (no duration), so the end
  // equals the start.
  const [h = 0, m = 0, s = 0] = time.split(":").map(Number);
  const [y, mo, d] = date.split("-").map(Number);
  const startMs = Date.UTC(y, mo - 1, d, h, m, s) - PHNOM_PENH_OFFSET_MIN * 60_000;
  const start = new Date(startMs);

  return {
    title,
    location,
    description,
    start: start.toISOString(),
    end: start.toISOString(),
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
  const invTextKh = typeof invitation.settings?.invitation_text_kh === "string"
    ? invitation.settings.invitation_text_kh
    : "មានកិត្តិយសសូមគោរពអញ្ជើញ ចូលរួមជាភ្ញៀវកិត្តិយស";
  const invTextEn = typeof invitation.settings?.invitation_text_en === "string"
    ? invitation.settings.invitation_text_en
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
