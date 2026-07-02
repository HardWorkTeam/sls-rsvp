"use client";

import { useState } from "react";
import { Check, Copy, QrCode, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

/**
 * Floating "my check-in QR" pass, rendered once per invitation page so it works
 * across every template. The guest opens it on their phone and shows the QR at
 * the entrance; staff scan it to mark them arrived, or type the short code by
 * hand. The short check-in code rides in the personalized link (`?t=`),
 * generated from the couple's guest list, and drives both the QR and the text.
 */
export function CheckInPass({
  token,
  guestName,
}: {
  token: string;
  guestName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may be unavailable (non-secure context) — no-op; the
      // code is still visible for the guest to read out or select manually.
    }
  };

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

            <div className="mt-4 border-t border-zinc-100 pt-4">
              <p className="text-xs text-zinc-500">
                Or give this code to staff to check you in:
              </p>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
                <code className="flex-1 text-center font-mono text-xl font-semibold tracking-widest text-zinc-800">
                  {token}
                </code>
                <button
                  type="button"
                  onClick={copyCode}
                  aria-label="Copy check-in code"
                  className="flex shrink-0 items-center gap-1 rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CheckInPass;
