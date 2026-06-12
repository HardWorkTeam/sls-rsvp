import type { PublicInvitation } from "@/types/invitation";

export function StorySection({
  wedding,
}: {
  wedding: PublicInvitation["wedding"];
}) {
  return (
    <section className="py-14 text-center">
      <SectionHeading eyebrow="Our Story" title="How it began" />
      <p className="mx-auto mt-6 max-w-xl whitespace-pre-line leading-relaxed text-zinc-600">
        {wedding.story_description}
      </p>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.35em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl font-semibold text-zinc-900">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-px w-16 bg-emerald-300" />
    </div>
  );
}
