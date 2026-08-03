"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { submitRsvp } from "@/lib/rsvp";

export type RsvpAttendStatus = "attending" | "declined" | "";

/**
 * Shown when the submission fails for a reason the API did not name.
 * Bilingual, matching the rest of the invitation copy.
 */
export const RSVP_SUBMIT_ERROR =
  "មិនអាចផ្ញើបានទេ សូមព្យាយាមម្តងទៀត / Failed to submit. Please try again.";

/**
 * The RSVP form's behaviour, with no opinion about how it looks.
 *
 * Every invitation template renders a visually distinct RSVP form, but they all
 * drive the same machine: the four form fields, the guest-count dropdown (with
 * its "custom number" mode and tap-outside-to-close handling), the submit call,
 * and the success screen. That machine lived as a verbatim copy inside each of
 * the six templates, so a fix to any of it had to be applied six times.
 *
 * Templates own their markup and keep any state that is genuinely theirs (a
 * wishes wall, a formatted deadline); they take everything below from here.
 *
 * `onSubmitted` runs after the RSVP is accepted and before the success screen
 * appears, and receives what was submitted — the templates with a wishes wall
 * use it to post the guest's message to the board. It does not need to be
 * memoized.
 */
export function useRsvpForm(
  weddingId: string,
  guestName?: string,
  onSubmitted?: (submitted: { name: string; wishes: string }) => void,
) {
  const [name, setName] = useState(guestName ?? "");
  const [status, setStatus] = useState<RsvpAttendStatus>("");
  const [guests, setGuests] = useState<number | string>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCustomGuests, setIsCustomGuests] = useState(false);
  const [wishes, setWishes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Held in a ref so callers can pass an inline callback without having to
  // memoize it, and without re-creating `submit` on every render.
  const onSubmittedRef = useRef(onSubmitted);
  useEffect(() => {
    onSubmittedRef.current = onSubmitted;
  });

  // Close the guest-count dropdown when tapping anywhere outside it.
  useEffect(() => {
    if (!isDropdownOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isDropdownOpen]);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !status) return;
      setSubmitting(true);
      setError(null);
      try {
        await submitRsvp(weddingId, {
          name,
          status,
          guests: Number(guests) || 1,
          wishes,
        });
        onSubmittedRef.current?.({ name, wishes });
        setSuccess(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : RSVP_SUBMIT_ERROR);
      } finally {
        setSubmitting(false);
      }
    },
    [weddingId, name, status, guests, wishes],
  );

  /** Return to a blank form from the success screen ("Submit another response"). */
  const reset = useCallback(() => {
    setSuccess(false);
    setName(guestName ?? "");
    setStatus("");
    setWishes("");
  }, [guestName]);

  return {
    name,
    setName,
    status,
    setStatus,
    guests,
    setGuests,
    isDropdownOpen,
    setIsDropdownOpen,
    isCustomGuests,
    setIsCustomGuests,
    wishes,
    setWishes,
    submitting,
    success,
    setSuccess,
    error,
    dropdownRef,
    submit,
    reset,
  };
}
