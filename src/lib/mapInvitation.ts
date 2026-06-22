import type { PublicInvitation, InvitationData, WeddingEvent, GiftRegistryItem, LoveStoryMilestone } from "@/types/invitation";

const DEFAULT_TEMPLATE = "royal-khmer-v1";

function buildEvents(invitation: PublicInvitation): WeddingEvent[] {
  const { wedding } = invitation;
  const events: WeddingEvent[] = [];

  // Use structured timeline_events if present
  if (wedding.timeline_events.length > 0) {
    wedding.timeline_events.forEach((evt, i) => {
      const date = evt.starts_at ? new Date(evt.starts_at) : null;
      const timeLabel = date
        ? date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
        : "";
      events.push({
        id: String(evt.id),
        title: evt.title,
        dateKh: "",
        dateSolar: evt.starts_at ?? "",
        timeLabel,
        locationName: evt.location ?? wedding.ceremony_venue ?? "",
        googleMapsUrl: wedding.google_map_link ?? "",
        sortOrder: evt.sort_order ?? i,
      });
    });
    return events.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // Fall back to wedding_date + ceremony/reception venue fields
  const baseDate = wedding.wedding_date ?? "";
  const baseTime = wedding.wedding_time ?? "00:00:00";
  const isoDate = baseDate ? `${baseDate}T${baseTime}Z` : "";

  if (wedding.ceremony_venue) {
    events.push({
      id: "evt-ceremony",
      title: "ពិធីកាត់សក់បង្កក់សិរី (Ceremony)",
      dateKh: "",
      dateSolar: isoDate,
      timeLabel: wedding.wedding_time
        ? new Date(`1970-01-01T${wedding.wedding_time}Z`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
        : "",
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
      dateSolar: isoDate,
      timeLabel: "",
      locationName: wedding.reception_venue,
      googleMapsUrl: wedding.google_map_link ?? "",
      sortOrder: 2,
    });
  }

  return events;
}

function buildGiftRegistries(invitation: PublicInvitation): GiftRegistryItem[] {
  const bank = invitation.settings?.bank_account;
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

  return {
    slug: invitation.invitation_code,
    templateId,
    sectionsVisibility,
    couple: {
      groom: {
        nameKh: groomExt.nameKh || wedding.groom_name,
        nameEn: groomExt.nameEn || wedding.groom_name,
        father: groomExt.father ?? "",
        fatherEn: groomExt.fatherEn ?? "",
        mother: groomExt.mother ?? "",
        motherEn: groomExt.motherEn ?? "",
        photo: groomExt.photo || wedding.groom_photo_path ?? "",
      },
      bride: {
        nameKh: brideExt.nameKh || wedding.bride_name,
        nameEn: brideExt.nameEn || wedding.bride_name,
        father: brideExt.father ?? "",
        fatherEn: brideExt.fatherEn ?? "",
        mother: brideExt.mother ?? "",
        motherEn: brideExt.motherEn ?? "",
        photo: brideExt.photo || wedding.bride_photo_path ?? "",
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
      title: `${wedding.bride_name} & ${wedding.groom_name} — Wedding Invitation`,
      description: wedding.story_description?.slice(0, 160) ??
        `Join us to celebrate the wedding of ${wedding.bride_name} and ${wedding.groom_name}.`,
      coverImage: invitation.cover_image_path ?? "",
    },
  };
}
