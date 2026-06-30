"use client";

import { useState } from "react";
import { CalendarPlus, Download, X } from "lucide-react";
import type { CalendarEvent } from "@/types/invitation";
import { buildIcs, googleCalendarUrl, outlookCalendarUrl } from "@/lib/calendar";

/**
 * Floating "add to calendar" control rendered once per invitation page, so it
 * works across every template without each design having to wire it in. Offers
 * Google, Outlook, and a downloadable .ics (Apple Calendar / Outlook desktop).
 */
export function AddToCalendar({ event, slug }: { event: CalendarEvent; slug: string }) {
  const [open, setOpen] = useState(false);

  function downloadIcs() {
    const ics = buildIcs(event, `${slug}@srolanh`);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slug || "wedding"}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 print:hidden">
      {/* Click-away backdrop while the menu is open */}
      {open ? (
        <button
          type="button"
          aria-label="Close"
          className="fixed inset-0 -z-10 cursor-default"
          onClick={() => setOpen(false)}
        />
      ) : null}

      {open ? (
        <div
          role="menu"
          className="mb-3 w-56 overflow-hidden rounded-2xl border border-zinc-200 bg-white/95 shadow-xl backdrop-blur"
        >
          <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Add to calendar
            </span>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="text-zinc-400 hover:text-zinc-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <a
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noreferrer"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Google Calendar
          </a>
          <a
            href={outlookCalendarUrl(event)}
            target="_blank"
            rel="noreferrer"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            Outlook
          </a>
          <button
            type="button"
            role="menuitem"
            onClick={downloadIcs}
            className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <Download className="h-4 w-4" /> Apple / .ics file
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-3 text-sm font-semibold text-zinc-800 shadow-lg backdrop-blur transition-transform hover:scale-[1.03] hover:bg-white"
      >
        <CalendarPlus className="h-5 w-5" />
        <span className="hidden sm:inline">Add to calendar</span>
      </button>
    </div>
  );
}

export default AddToCalendar;
