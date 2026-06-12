import { SectionHeading } from "@/components/sections/story-section";
import { formatEventDateTime } from "@/lib/utils";
import type { PublicTimelineEvent } from "@/types/invitation";

const CATEGORY_LABELS: Record<string, string> = {
  engagement: "Engagement",
  ceremony: "Ceremony",
  reception: "Reception",
  after_party: "After Party",
  custom: "Event",
};

export function EventsSection({ events }: { events: PublicTimelineEvent[] }) {
  return (
    <section className="py-14 text-center">
      <SectionHeading eyebrow="Schedule" title="Wedding Events" />
      <ol className="relative mx-auto mt-10 max-w-xl space-y-6 border-l-2 border-emerald-100 pl-8 text-left">
        {events.map((event) => (
          <li key={event.id} className="relative">
            <span className="absolute -left-[39px] top-2 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow" />
            <p className="text-xs uppercase tracking-widest text-emerald-700">
              {CATEGORY_LABELS[event.category] ?? event.category}
            </p>
            <h3 className="mt-0.5 font-[family-name:var(--font-serif)] text-xl font-semibold text-zinc-900">
              {event.title}
            </h3>
            <p className="mt-0.5 text-sm text-zinc-500">
              {formatEventDateTime(event.starts_at)}
              {event.location ? ` · ${event.location}` : ""}
            </p>
            {event.description ? (
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">
                {event.description}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
