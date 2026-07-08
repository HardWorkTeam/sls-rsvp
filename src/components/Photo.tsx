import Image, { type ImageProps } from "next/image";
import cloudinaryLoader from "@/lib/cloudinaryLoader";

type BaseProps = Omit<ImageProps, "width" | "height" | "loader" | "src"> & {
  src: string;
};

type PhotoProps = BaseProps & {
  /**
   * Fill the (positioned) parent and crop with object-cover — for hero covers
   * and fixed-size portrait boxes. The parent must be `position: relative`.
   * Omit for natural-aspect-ratio images (galleries): the photo renders
   * full-width with height:auto and is never cropped.
   */
  fill?: boolean;
};

/**
 * Wrapper over next/image wired to the Cloudinary loader. Every couple photo on
 * the invitation goes through here so it is served as responsive AVIF/WebP from
 * Cloudinary's edge instead of the full-resolution original.
 */
export function Photo({ fill, sizes, style, ...rest }: PhotoProps) {
  if (fill) {
    return (
      <Image
        loader={cloudinaryLoader}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 800px"}
        style={{ objectFit: "cover", ...style }}
        {...rest}
      />
    );
  }

  // Natural-ratio: width/height 0 + auto lets the browser keep the intrinsic
  // aspect ratio while still receiving a resized srcset.
  return (
    <Image
      loader={cloudinaryLoader}
      width={0}
      height={0}
      sizes={sizes ?? "(max-width: 768px) 50vw, 400px"}
      style={{ width: "100%", height: "auto", ...style }}
      {...rest}
    />
  );
}

export default Photo;
