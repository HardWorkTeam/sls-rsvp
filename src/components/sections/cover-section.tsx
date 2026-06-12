import { formatLongDate, formatTime } from "@/lib/utils";
import type { PublicInvitation } from "@/types/invitation";

export function CoverSection({ invitation }: { invitation: PublicInvitation }) {
  const { wedding } = invitation;

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

      {wedding.wedding_date ? (
        <div className="relative mt-10 inline-flex flex-col items-center gap-1 rounded-2xl border border-emerald-200 bg-white/80 px-8 py-5 shadow-sm backdrop-blur">
          <p className="font-[family-name:var(--font-serif)] text-xl font-semibold text-emerald-900">
            {formatLongDate(wedding.wedding_date)}
          </p>
          {wedding.wedding_time ? (
            <p className="text-sm text-zinc-500">at {formatTime(wedding.wedding_time)}</p>
          ) : null}
          {wedding.ceremony_venue ? (
            <p className="mt-1 text-sm text-zinc-600">{wedding.ceremony_venue}</p>
          ) : null}
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
