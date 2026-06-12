"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CheckCircle2, HeartHandshake } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionHeading } from "@/components/sections/story-section";
import { PUBLIC_API_URL } from "@/lib/api";
import { cn } from "@/lib/utils";

const rsvpSchema = z.object({
  guest_name: z.string().min(1, "Please tell us your name"),
  phone: z.string().max(30).optional(),
  number_of_guests: z.number().int().min(1, "At least 1 guest").max(50),
  message: z.string().max(2000).optional(),
  status: z.enum(["accepted", "declined", "maybe"]),
});

type RsvpForm = z.infer<typeof rsvpSchema>;

const STATUS_OPTIONS = [
  { value: "accepted", label: "Joyfully Accept", emoji: "🎉" },
  { value: "maybe", label: "Maybe", emoji: "🤔" },
  { value: "declined", label: "Regretfully Decline", emoji: "💌" },
] as const;

export function RsvpSection({ code }: { code: string }) {
  const [submitted, setSubmitted] = useState<RsvpForm | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RsvpForm>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guest_name: "", phone: "", number_of_guests: 1, message: "", status: "accepted" },
  });
  const status = form.watch("status");

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    try {
      await axios.post(
        `${PUBLIC_API_URL}/public/invitations/${encodeURIComponent(code)}/rsvp`,
        values,
        { headers: { Accept: "application/json" } },
      );
      setSubmitted(values);
    } catch (submitError) {
      if (axios.isAxiosError(submitError)) {
        const data = submitError.response?.data as
          | { message?: string; errors?: Record<string, string[]> }
          | undefined;
        const firstError = data?.errors ? Object.values(data.errors)[0]?.[0] : undefined;
        setError(firstError ?? data?.message ?? "Unable to submit your RSVP right now.");
      } else {
        setError("Unable to submit your RSVP right now.");
      }
    }
  });

  if (submitted) {
    return (
      <section id="rsvp" className="py-14 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-emerald-100 bg-white/90 p-10 shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            {submitted.status === "declined" ? (
              <HeartHandshake className="h-7 w-7" />
            ) : (
              <CheckCircle2 className="h-7 w-7" />
            )}
          </div>
          <h2 className="mt-5 font-[family-name:var(--font-serif)] text-3xl font-semibold text-zinc-900">
            Thank you, {submitted.guest_name.split(" ")[0]}!
          </h2>
          <p className="mt-3 text-zinc-600">
            {submitted.status === "accepted"
              ? `We can't wait to celebrate with you${submitted.number_of_guests > 1 ? ` and your ${submitted.number_of_guests - 1} guest${submitted.number_of_guests > 2 ? "s" : ""}` : ""}!`
              : submitted.status === "maybe"
                ? "We hope you can make it — you can update your response any time using the same name."
                : "We'll miss you, and we're grateful for your warm wishes."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-14">
      <div className="text-center">
        <SectionHeading eyebrow="RSVP" title="Will you join us?" />
        <p className="mx-auto mt-4 max-w-md text-zinc-600">
          Kindly respond so we can prepare a seat for you.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="mx-auto mt-8 max-w-md space-y-4 rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-sm sm:p-8"
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => form.setValue("status", option.value)}
              className={cn(
                "rounded-xl border px-3 py-3 text-center text-xs font-semibold transition-colors",
                status === option.value
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-emerald-200",
              )}
            >
              <span className="block text-xl">{option.emoji}</span>
              <span className="mt-1 block">{option.label}</span>
            </button>
          ))}
        </div>

        <div>
          <label htmlFor="rsvp-name" className="text-sm font-medium text-zinc-700">
            Your name
          </label>
          <input
            id="rsvp-name"
            {...form.register("guest_name")}
            className="mt-1 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            placeholder="Full name as on the invitation"
          />
          {form.formState.errors.guest_name ? (
            <p className="mt-1 text-xs text-red-600">
              {form.formState.errors.guest_name.message}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="rsvp-phone" className="text-sm font-medium text-zinc-700">
              Phone (optional)
            </label>
            <input
              id="rsvp-phone"
              {...form.register("phone")}
              className="mt-1 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              placeholder="+855..."
            />
          </div>
          <div>
            <label htmlFor="rsvp-count" className="text-sm font-medium text-zinc-700">
              Number of guests
            </label>
            <input
              id="rsvp-count"
              type="number"
              min={1}
              max={50}
              {...form.register("number_of_guests", { valueAsNumber: true })}
              className="mt-1 h-11 w-full rounded-xl border border-zinc-200 bg-white px-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
            {form.formState.errors.number_of_guests ? (
              <p className="mt-1 text-xs text-red-600">
                {form.formState.errors.number_of_guests.message}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="rsvp-message" className="text-sm font-medium text-zinc-700">
            Message for the couple (optional)
          </label>
          <textarea
            id="rsvp-message"
            rows={3}
            {...form.register("message")}
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            placeholder="Share your wishes..."
          />
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-12 w-full rounded-full bg-gradient-to-b from-[#16b364] to-[#027a48] text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {form.formState.isSubmitting ? "Sending..." : "Send RSVP"}
        </button>
      </form>
    </section>
  );
}
