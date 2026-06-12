import { Gift } from "lucide-react";
import { SectionHeading } from "@/components/sections/story-section";
import type { PublicInvitation } from "@/types/invitation";

export function GiftSection({
  settings,
}: {
  settings: NonNullable<PublicInvitation["settings"]>;
}) {
  const bank = settings.bank_account;

  return (
    <section className="py-14 text-center">
      <SectionHeading eyebrow="Gifts" title="With love and gratitude" />
      <p className="mx-auto mt-6 max-w-md text-zinc-600">
        Your presence is the greatest gift of all. Should you wish to honor us
        with a gift, a contribution may be made below.
      </p>
      {bank ? (
        <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-sm">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Gift className="h-5 w-5" />
          </div>
          {bank.bank ? (
            <p className="text-sm uppercase tracking-widest text-emerald-700">
              {bank.bank}
            </p>
          ) : null}
          {bank.name ? (
            <p className="mt-1 font-medium text-zinc-900">{bank.name}</p>
          ) : null}
          {bank.number ? (
            <p className="mt-1 font-mono text-lg tracking-wider text-zinc-700">
              {bank.number}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
