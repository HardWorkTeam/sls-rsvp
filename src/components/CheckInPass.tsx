"use client";

import { useState } from "react";
import { QrCode, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

/**
 * Floating "my check-in QR" pass, rendered once per invitation page so it works
 * across every template. The guest opens it on their phone and shows the QR at
 * the entrance; staff scan it to mark them arrived. The token rides in the
 * personalized link (`?t=`), generated from the couple's guest list.
 */
export function CheckInPass({
  token,
  guestName,
}: {
  token: string;
  guestName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-5 left-5 z-40 print:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-4 py-3 text-sm font-semibold text-zinc-800 shadow-lg backdrop-blur transition-transform hover:scale-[1.03] hover:bg-white"
        >
          <QrCode className="h-5 w-5" />
          <span className="hidden sm:inline">My check-in QR</span>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 print:hidden">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Check-in QR code"
            className="relative z-10 w-full max-w-xs rounded-3xl bg-white p-6 text-center shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">
              Check-in pass
            </p>
            {guestName ? (
              <p className="mt-1 text-lg font-semibold text-zinc-900">{guestName}</p>
            ) : null}

            <div className="mx-auto mt-4 flex h-56 w-56 items-center justify-center rounded-2xl border border-zinc-200 bg-white p-3">
              <QRCodeSVG value={token} className="h-full w-full" />
            </div>

            <p className="mt-4 text-sm text-zinc-500">
              Show this QR code at the entrance on the wedding day.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CheckInPass;
