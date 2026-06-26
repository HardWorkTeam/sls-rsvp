import type { PublicInvitation } from "@/types/invitation";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/**
 * A fully-populated, self-contained sample invitation used to render a
 * template PREVIEW (no real wedding / backend needed). `slug` picks which
 * template the preview renders with; all other content is fixed demo data so
 * couples can see the full-page design before choosing a package.
 */
export function buildSampleInvitation(slug: string): PublicInvitation {
  return {
    invitation_code: "PREVIEW",
    title: "Sophea & Visal — Wedding Invitation",
    cover_image_path: img("photo-1519741497674-611481863552", 1600),
    settings: {
      show_gift_section: true,
      bank_account: {
        bank: "ABA Bank",
        name: "CHAN SOPHEA",
        number: "000 123 456",
      },
      gallery_urls: [
        img("photo-1606800052052-a08af7148866"),
        img("photo-1583939003579-730e3918a45a"),
        img("photo-1537633552985-df8429e8048b"),
        img("photo-1465495976277-4387d4b0b4c6"),
      ],
      couple_extended: {
        groom: {
          nameKh: "សុខ វិសាល",
          nameEn: "Sok Visal",
          father: "លោក សុខ ច័ន្ទ",
          fatherEn: "Mr. Sok Chan",
          mother: "លោកស្រី ម៉ៅ ស្រីពៅ",
          motherEn: "Mrs. Mao Sreypov",
          photo: img("photo-1507003211169-0a1dd7228f2d", 800),
        },
        bride: {
          nameKh: "ចាន់ សុភា",
          nameEn: "Chan Sophea",
          father: "លោក ចាន់ ដារា",
          fatherEn: "Mr. Chan Dara",
          mother: "លោកស្រី លី ស្រីនិច",
          motherEn: "Mrs. Ly Srey Nich",
          photo: img("photo-1494790108377-be9c29b29330", 800),
        },
      },
    },
    template: { slug, name: slug, config: null },
    wedding: {
      wedding_name: "Sophea & Visal",
      bride_name: "Sophea",
      groom_name: "Visal",
      bride_photo_path: null,
      groom_photo_path: null,
      wedding_date: "2027-12-12",
      wedding_time: "16:00:00",
      ceremony_venue: "Phnom Penh Hotel, Ballroom A",
      reception_venue: "Phnom Penh Hotel, Grand Hall",
      google_map_link: "https://maps.google.com/?q=Phnom+Penh+Hotel",
      story_description:
        "From a chance meeting in Siem Reap to a lifetime together — we can't wait to celebrate this day with the people we love most.",
      timeline_events: [
        {
          id: 1,
          category: "ceremony",
          title: "Traditional Ceremony",
          description: null,
          starts_at: "2027-12-12T02:00:00Z",
          location: "Ballroom A",
          sort_order: 1,
        },
        {
          id: 2,
          category: "reception",
          title: "Reception & Dinner",
          description: null,
          starts_at: "2027-12-12T09:00:00Z",
          location: "Grand Hall",
          sort_order: 2,
        },
      ],
      albums: [],
    },
  };
}
