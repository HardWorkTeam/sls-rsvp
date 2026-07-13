// ─── Template Types (InvitationData shape used by all templates) ────────────

export type TemplateId =
  | 'royal-khmer-v1'
  | 'angkor-heritage-v1'
  | 'blue-botanical-v1'
  | 'red-rose-luxury-v1'
  | 'butterfly-editorial-v1'
  | 'emerald-elegance-v1'
  | string;

export interface CouplePerson {
  nameKh: string;
  nameEn: string;
  father: string;
  mother: string;
  fatherEn?: string;
  motherEn?: string;
  photo: string;
}

export interface Couple {
  groom: CouplePerson;
  bride: CouplePerson;
}

export interface WeddingEvent {
  id: string;
  title: string;
  dateKh: string;
  dateSolar: string;
  timeLabel: string;
  locationName: string;
  googleMapsUrl: string;
  sortOrder: number;
}

export interface LoveStoryMilestone {
  id: string;
  title: string;
  dateLabel: string;
  description: string;
  photoUrl?: string;
  sortOrder: number;
}

export interface GiftRegistryItem {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  qrCodeUrl: string;
}

export interface RsvpSettings {
  deadline: string;
  maxGuests: number;
}

// A single "add to calendar" entry for the wedding, derived from the wedding's
// own date/time/venue. Timed events carry the Cambodia (Asia/Phnom_Penh)
// wall-clock time as a *floating* local datetime; the calendar builders anchor
// it to the Cambodia timezone so every guest's calendar shows the same clock
// time. When no time is set the event is all-day and `start`/`end` are
// date-only "YYYY-MM-DD".
export interface CalendarEvent {
  title: string;
  location: string;
  description: string;
  start: string; // local "YYYY-MM-DDTHH:MM:SS" (Cambodia time) when timed, "YYYY-MM-DD" when allDay
  end: string;   // same as start when timed, exclusive "YYYY-MM-DD" when allDay
  allDay: boolean;
}

export interface InvitationData {
  slug: string;
  templateId: TemplateId;
  coverImage?: string;
  sectionsVisibility: {
    Cover: boolean;
    CoupleInfo: boolean;
    LoveStory: boolean;
    Schedule: boolean;
    Gallery: boolean;
    Location: boolean;
    GiftRegistry: boolean;
    RSVP: boolean;
  };
  couple: Couple;
  events: WeddingEvent[];
  scheduleEvents: WeddingEvent[];
  loveStory: LoveStoryMilestone[];
  gallery: string[];
  rsvpSettings: RsvpSettings;
  calendar?: CalendarEvent;
  musicUrl?: string;
  giftRegistries: GiftRegistryItem[];
  invitationTextKh?: string;
  invitationTextEn?: string;
  lunarDateText?: string;
  thankYouText?: string;
  meta: {
    title: string;
    description: string;
    coverImage: string;
  };
}

// ─── Backend API Types (PublicInvitation shape from Laravel) ────────────────

// One day of a multi-day wedding (Khmer weddings commonly span 2 days:
// traditional ceremony day + reception day). Saved by the editor into
// invitation settings as `wedding_days`. Display titles are derived from the
// day position (day 1 = traditional ceremony, later days = reception).
export interface PublicWeddingDay {
  date?: string;   // "YYYY-MM-DD"
  time?: string;   // wall-clock "HH:MM" or "HH:MM:SS" (Cambodia time)
  venue?: string;  // optional per-day venue override
}

export interface PublicTimelineEvent {
  id: number;
  category: string;
  title: string;
  description: string | null;
  starts_at: string | null;
  location: string | null;
  google_map_link: string | null;
  sort_order: number;
}

export interface PublicMediaItem {
  id: number;
  media_type: "photo" | "video" | "document";
  url: string;
  thumbnail_url: string | null;
  original_name: string | null;
}

export interface PublicAlbum {
  id: number;
  name: string;
  description: string | null;
  media_items?: PublicMediaItem[];
}

export interface PublicInvitation {
  invitation_code: string;
  title: string | null;
  cover_image_path: string | null;
  settings: {
    show_gift_section?: boolean;
    bank_account?: { bank?: string; name?: string; number?: string };
    wedding_days?: PublicWeddingDay[];
    [key: string]: unknown;
  } | null;
  template?: {
    slug: string;
    name: string;
    config: { primary_color?: string; font?: string; layout?: string } | null;
  } | null;
  wedding: {
    wedding_name: string;
    bride_name: string;
    groom_name: string;
    bride_photo_path: string | null;
    groom_photo_path: string | null;
    wedding_date: string | null;
    wedding_time: string | null;
    ceremony_venue: string | null;
    reception_venue: string | null;
    google_map_link: string | null;
    story_description: string | null;
    timeline_events: PublicTimelineEvent[];
    albums: PublicAlbum[];
  };
}

export interface RsvpSubmission {
  guest_name: string;
  phone?: string;
  number_of_guests: number;
  message?: string;
  status: "accepted" | "declined" | "maybe";
}
