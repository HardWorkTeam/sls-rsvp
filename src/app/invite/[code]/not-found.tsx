import Link from "next/link";

export default function InvitationNotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-emerald-700">Srolanh</p>
      <h1 className="mt-4 font-[family-name:var(--font-serif)] text-3xl font-semibold text-zinc-900">
        Invitation not found
      </h1>
      <p className="mt-3 max-w-md text-zinc-500">
        This invitation link is invalid or hasn&apos;t been published yet. Please
        double-check the code from your card or QR code.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-gradient-to-b from-[#16b364] to-[#027a48] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Enter another code
      </Link>
    </main>
  );
}
