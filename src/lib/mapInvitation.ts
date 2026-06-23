import type { PublicInvitation, InvitationData, WeddingEvent, GiftRegistryItem, LoveStoryMilestone } from "@/types/invitation";

const DEFAULT_TEMPLATE = "royal-khmer-v1";

function buildEvents(invitation: PublicInvitation): WeddingEvent[] {
  const { wedding } = invitation;

  // Primary source: timeline_events created in the invitation editor
  if (wedding.timeline_events.length > 0) {
    const mapped = wedding.timeline_events.map((evt, i) => {
      const date = evt.starts_at ? new Date(evt.starts_at) : null;
      return {
        id: String(evt.id),
        title: evt.title,
        dateKh: "",
        dateSolar: evt.starts_at ?? "",
        timeLabel: date
          ? date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
          : "",
        locationName: evt.location ?? wedding.ceremony_venue ?? "",
        googleMapsUrl: wedding.google_map_link ?? "",
        sortOrder: evt.sort_order ?? i,
      };
    });
    return mapped.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // Fallback: derive events from wedding date/venue fields when no timeline events exist
  const events: WeddingEvent[] = [];
  const baseDate = wedding.wedding_date ?? "";
  const baseTime = wedding.wedding_time ?? "00:00:00";
  const dateSolar = baseDate ? `${baseDate}T${baseTime}` : "";
  const timeLabel = wedding.wedding_time
    ? new Date(`1970-01-01T${wedding.wedding_time}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    : "";

  if (wedding.ceremony_venue) {
    events.push({
      id: "evt-ceremony",
      title: "ពិធីកាត់សក់បង្កក់សិរី (Ceremony)",
      dateKh: "",
      dateSolar,
      timeLabel,
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
      dateSolar,
      timeLabel: "",
      locationName: wedding.reception_venue,
      googleMapsUrl: wedding.google_map_link ?? "",
      sortOrder: 2,
    });
  }

  return events;
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
    Schedule:     savedSections.Schedule     ?? events.length > 0,
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
    loveStory,
    gallery,
    rsvpSettings: {
      deadline: deadlineDate,
      maxGuests: 10,
    },
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
