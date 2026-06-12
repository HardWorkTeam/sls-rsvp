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
