import { MapPin } from "lucide-react";
import { SectionHeading } from "@/components/sections/story-section";
import type { PublicInvitation } from "@/types/invitation";

export function LocationSection({
  wedding,
}: {
  wedding: PublicInvitation["wedding"];
}) {
  if (!wedding.ceremony_venue && !wedding.reception_venue) return null;

  return (
    <section className="py-14 text-center">
      <SectionHeading eyebrow="Location" title="Where to find us" />
      <div className="mx-auto mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
        {wedding.ceremony_venue ? (
          <VenueCard label="Ceremony" venue={wedding.ceremony_venue} />
        ) : null}
        {wedding.reception_venue ? (
          <VenueCard label="Reception" venue={wedding.reception_venue} />
        ) : null}
      </div>
      {wedding.google_map_link ? (
        <a
          href={wedding.google_map_link}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-6 py-2.5 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
        >
          <MapPin className="h-4 w-4" /> Open in Google Maps
        </a>
      ) : null}
    </section>
  );
}

function VenueCard({ label, venue }: { label: string; venue: string }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
      <p className="text-xs uppercase tracking-widest text-emerald-700">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-serif)] text-lg text-zinc-900">
        {venue}
      </p>
    </div>
  );
}
