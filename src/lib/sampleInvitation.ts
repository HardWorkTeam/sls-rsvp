import type { PublicInvitation } from "@/types/invitation";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

// Photos for the preview. Save them into sls-rsvp/public/ with these filenames.
const COVER_PHOTO = "/preview-cover.jpg"; // couple together, Khmer attire
const BRIDE_PHOTO = "/preview-bride.jpg"; // bride, gold traditional dress
const GROOM_PHOTO = "/preview-groom.jpg"; // groom, black suit

/**
 * A fully-populated, self-contained sample invitation used to render a
 * template PREVIEW (no real wedding / backend needed). `slug` picks which
 * template the preview renders with; all other content is fixed demo data so
 * couples can see the full-page design before choosing a package.
 */
export function buildSampleInvitation(slug: string): PublicInvitation {
  return {
    invitation_code: "PREVIEW",
    title: "Veasna & Chanreah — Wedding Invitation",
    cover_image_path: COVER_PHOTO,
    settings: {
      // This is a public template PREVIEW, not a real invitation — there is no
      // wedding to collect responses for, so hide the RSVP section.
      sections: { RSVP: false },
      show_gift_section: true,
      // Typical Khmer wedding: traditional ceremony day + reception day.
      wedding_days: [
        { date: "2026-11-21", time: "07:00", venue: "គេហដ្ឋានខាងកូនក្រមុំ" },
        { date: "2026-11-22", time: "17:00", venue: "មជ្ឈមណ្ឌល ពិភពមង្គល" },
      ],
      bank_account: {
        bank: "ABA Bank",
        name: "Chan Vireakboth",
        number: "500287329",
      },
      gallery_urls: [BRIDE_PHOTO, GROOM_PHOTO],
      couple_extended: {
        groom: {
          nameKh: "វាសនា",
          nameEn: "Veasna",
          father: "វុធថន",
          fatherEn: "Vuthorn",
          mother: "លក្ខិណា",
          motherEn: "Leakhena",
          photo: GROOM_PHOTO,
        },
        bride: {
          nameKh: "ចាន់រះ",
          nameEn: "Chanreah",
          father: "វឌ្ឍនា",
          fatherEn: "Vathana",
          mother: "មុន្នី",
          motherEn: "Mony",
          photo: BRIDE_PHOTO,
        },
      },
    },
    template: { slug, name: slug, config: null },
    wedding: {
      wedding_name: "Veasna & Chanreah",
      bride_name: "Chanreah",
      groom_name: "Veasna",
      bride_photo_path: BRIDE_PHOTO,
      groom_photo_path: GROOM_PHOTO,
      wedding_date: "2026-11-21",
      wedding_time: "17:00:00",
      ceremony_venue: "មជ្ឈមណ្ឌល ពិភពមង្គល",
      reception_venue: null,
      google_map_link: "https://share.google/A4wcVREVh1b523C1h",
      story_description:
        "Introduced by a mutual friend, Veasna and Chanreah began their journey with a simple conversation. What started as friendship soon blossomed into love, leading to a heartfelt engagement. Now, with grateful hearts and the blessings of their families, they are ready to begin their forever together.",
      // Two-day program matching wedding_days above.
      timeline_events: [
        {
          id: 1,
          category: "ceremony",
          title: "Traditional Ceremony",
          description: null,
          // Day 1 — 07:00 Asia/Phnom_Penh (+07) === 00:00 UTC
          starts_at: "2026-11-21T00:00:00Z",
          location: "គេហដ្ឋានខាងកូនក្រមុំ",
          google_map_link: "https://share.google/A4wcVREVh1b523C1h",
          sort_order: 1,
        },
        {
          id: 2,
          category: "reception",
          title: "Reception & Dinner",
          description: null,
          // Day 2 — 17:00 Asia/Phnom_Penh (+07) === 10:00 UTC
          starts_at: "2026-11-22T10:00:00Z",
          location: "មជ្ឈមណ្ឌល ពិភពមង្គល",
          google_map_link: "https://share.google/A4wcVREVh1b523C1h",
          sort_order: 2,
        },
      ],
      albums: [],
    },
  };
}
