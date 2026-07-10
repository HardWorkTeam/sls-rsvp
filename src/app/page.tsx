"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [code, setCode] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed) {
      router.push(`/invite/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-700">
        Srolanh Weddings
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-serif)] text-4xl font-semibold text-zinc-900 sm:text-5xl">
        You&apos;re Invited
      </h1>
      <p className="mt-3 max-w-md text-zinc-500">
        Enter the invitation code from your card or QR code to view the wedding
        invitation and RSVP.
      </p>

      <form onSubmit={onSubmit} className="mt-8 flex w-full max-w-sm gap-2">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Enter your invitation code"
          aria-label="Invitation code"
          className="h-12 flex-1 rounded-full border border-emerald-200 bg-white px-5 font-mono text-sm uppercase tracking-widest text-zinc-800 outline-none placeholder:normal-case placeholder:font-sans placeholder:tracking-normal placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
        />
        <button
          type="submit"
          className="h-12 rounded-full bg-gradient-to-b from-[#16b364] to-[#027a48] px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Open
        </button>
      </form>
    </main>
  );
}
