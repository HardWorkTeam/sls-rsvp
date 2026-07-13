import { SectionHeading } from "@/components/sections/story-section";
import type { PublicAlbum } from "@/types/invitation";

export function GallerySection({ albums }: { albums: PublicAlbum[] }) {
  return (
    <section className="py-14 text-center">
      <SectionHeading eyebrow="Gallery" title="Our Moments" />
      <div className="mt-10 space-y-10">
        {albums.map((album) => (
          <div key={album.id}>
            {albums.length > 1 ? (
              <h3 className="mb-4 font-[family-name:var(--font-serif)] text-xl text-zinc-800">
                {album.name}
              </h3>
            ) : null}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {(album.media_items ?? []).map((item) =>
                item.media_type === "video" ? (
                  <video
                    key={item.id}
                    src={item.url}
                    controls
                    preload="metadata"
                    className="aspect-square w-full rounded-xl object-cover shadow-sm"
                  />
                ) : item.media_type === "document" ? (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-zinc-400"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                    <span className="w-full truncate text-center text-xs text-zinc-500">
                      {item.original_name}
                    </span>
                  </a>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={item.id}
                    src={item.thumbnail_url ?? item.url}
                    alt={item.original_name ?? "Wedding photo"}
                    loading="lazy"
                    className="aspect-square w-full rounded-xl object-cover shadow-sm transition-transform hover:scale-[1.02]"
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
