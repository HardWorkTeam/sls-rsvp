import { formatLongDate, formatTime } from "@/lib/utils";
import type { PublicInvitation } from "@/types/invitation";

export function CoverSection({ invitation }: { invitation: PublicInvitation }) {
  const { wedding } = invitation;

  // Multi-day weddings (settings.wedding_days) show one card per day; older
  // invitations fall back to the wedding's single date/time.
  const weddingDays = (invitation.settings?.wedding_days ?? []).filter((d) => d.date);
  const mainDayIdx = typeof invitation.settings?.main_wedding_day_index === "number"
    ? invitation.settings.main_wedding_day_index
    : 0;

  const days = weddingDays.length > 0
    ? weddingDays.map((d, i) => ({
        date: d.date as string,
        time: d.time ?? "",
        venue: d.venue || (i === 0 ? wedding.ceremony_venue : wedding.reception_venue || wedding.ceremony_venue) || "",
      }))
    : wedding.wedding_date
      ? [{
          date: wedding.wedding_date,
          time: wedding.wedding_time ?? "",
          venue: wedding.ceremony_venue ?? "",
        }]
      : [];

  return (
    <section className="relative flex min-h-[88dvh] flex-col items-center justify-center py-20 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-64 w-64 rounded-full bg-emerald-100/60 blur-3xl"
      />
      <p className="relative text-sm uppercase tracking-[0.35em] text-emerald-700">
        {invitation.title ?? "Together with their families"}
      </p>

      <h1 className="relative mt-6 font-[family-name:var(--font-serif)] text-5xl font-semibold leading-tight text-zinc-900 sm:text-6xl">
        {wedding.bride_name}
        <span className="mx-3 block py-2 font-[family-name:var(--font-serif)] text-3xl italic text-emerald-700 sm:inline sm:text-5xl">
          &amp;
        </span>
        {wedding.groom_name}
      </h1>

      <p className="relative mt-6 max-w-md text-zinc-500">
        request the pleasure of your company at the celebration of their wedding
      </p>

      {days.length > 0 ? (
        <div className="relative mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          {days.map((day, i) => {
            const isMain = days.length > 1 && i === mainDayIdx;
            return (
              <div
                key={i}
                className={`inline-flex flex-col items-center gap-1 rounded-2xl border px-8 py-5 shadow-sm backdrop-blur transition-all ${
                  isMain
                    ? "border-amber-400 bg-amber-50/90 ring-2 ring-amber-300/50 shadow-md"
                    : "border-emerald-200 bg-white/80"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {days.length > 1 ? (
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
                      ថ្ងៃទី{i + 1} · Day {i + 1}
                    </p>
                  ) : null}
                  {isMain ? (
                    <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
                      ★ Main Date
                    </span>
                  ) : null}
                </div>
                <p className="font-[family-name:var(--font-serif)] text-xl font-semibold text-emerald-900">
                  {formatLongDate(day.date)}
                </p>
                {day.time ? (
                  <p className="text-sm text-zinc-500">at {formatTime(day.time)}</p>
                ) : null}
                {day.venue ? (
                  <p className="mt-1 text-sm text-zinc-600">{day.venue}</p>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      <a
        href="#rsvp"
        className="relative mt-10 rounded-full bg-gradient-to-b from-[#16b364] to-[#027a48] px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        RSVP Now
      </a>
    </section>
  );
}
