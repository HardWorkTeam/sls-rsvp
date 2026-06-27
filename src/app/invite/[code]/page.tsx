import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInvitation } from "@/lib/api";
import { mapToInvitationData } from "@/lib/mapInvitation";
import { TEMPLATE_REGISTRY } from "@/templates/registry";

// Fallback sections used when no matching template is registered
import { CoverSection } from "@/components/sections/cover-section";
import { EventsSection } from "@/components/sections/events-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { GiftSection } from "@/components/sections/gift-section";
import { LocationSection } from "@/components/sections/location-section";
import { RsvpSection } from "@/components/sections/rsvp-section";
import { StorySection } from "@/components/sections/story-section";

interface InvitePageProps {
  params: Promise<{ code: string }>;
  // `?to=<guest name>` personalizes the invitation. The link is generated from
  // the guest list (the "send" action copies it), so the name rides in the URL.
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Normalize the `?to=` search param to a single trimmed guest name (or undefined).
function readGuestName(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  const name = raw?.trim();
  return name ? name : undefined;
}

export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { code } = await params;
  const invitation = await getInvitation(code);

  if (!invitation) {
    return { title: "Invitation not found" };
  }

  const data = mapToInvitationData(invitation);
  return {
    title: data.meta.title,
    description: data.meta.description,
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      type: "website",
      ...(data.meta.coverImage ? { images: [{ url: data.meta.coverImage }] } : {}),
    },
  };
}

export default async function InvitePage({ params, searchParams }: InvitePageProps) {
  const { code } = await params;
  const guestName = readGuestName((await searchParams).to);
  const invitation = await getInvitation(code);

  if (!invitation) {
    notFound();
  }

  const data = mapToInvitationData(invitation);
  const TemplateComponent = TEMPLATE_REGISTRY[data.templateId];

  // Render the matching template when available
  if (TemplateComponent) {
    return <TemplateComponent data={data} guestName={guestName} />;
  }

  // Fallback: plain section-based layout (no template assigned)
  const { wedding } = invitation;
  const publicAlbums = wedding.albums.filter(
    (album) => (album.media_items?.length ?? 0) > 0,
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-24 sm:px-6">
      {guestName ? (
        <p className="pt-6 text-center font-[family-name:var(--font-serif)] text-lg text-emerald-800">
          សូមគោរពអញ្ជើញ · Specially for{" "}
          <span className="font-semibold">{guestName}</span>
        </p>
      ) : null}
      <CoverSection invitation={invitation} />
      {wedding.story_description ? <StorySection wedding={wedding} /> : null}
      {wedding.timeline_events.length > 0 ? (
        <EventsSection events={wedding.timeline_events} />
      ) : null}
      {publicAlbums.length > 0 ? <GallerySection albums={publicAlbums} /> : null}
      <LocationSection wedding={wedding} />
      <RsvpSection code={invitation.invitation_code} guestName={guestName} />
      {invitation.settings?.show_gift_section ? (
        <GiftSection settings={invitation.settings} />
      ) : null}

      <footer className="mt-16 border-t border-emerald-100 pt-8 text-center text-sm text-zinc-400">
        <p className="font-[family-name:var(--font-serif)] text-lg text-emerald-800">
          {wedding.bride_name} & {wedding.groom_name}
        </p>
        <p className="mt-1">With love, powered by Srolanh</p>
      </footer>
    </main>
  );
}
