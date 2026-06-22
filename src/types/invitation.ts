// ─── Template Types (InvitationData shape used by all templates) ────────────

export type TemplateId =
  | 'royal-khmer-v1'
  | 'angkor-heritage-v1'
  | 'blue-botanical-v1'
  | 'phanaroth-luxury-v1'
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
  loveStory: LoveStoryMilestone[];
  gallery: string[];
  rsvpSettings: RsvpSettings;
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

export interface PublicTimelineEvent {
  id: number;
  category: string;
  title: string;
  description: string | null;
  starts_at: string | null;
  location: string | null;
  sort_order: number;
}

export interface PublicMediaItem {
  id: number;
  media_type: "photo" | "video";
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
