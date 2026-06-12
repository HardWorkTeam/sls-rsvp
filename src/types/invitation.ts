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
