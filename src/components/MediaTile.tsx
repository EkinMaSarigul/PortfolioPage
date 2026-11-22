"use client";

import Image from "next/image";
import { ImagePlus, Maximize2, Play, Video } from "lucide-react";
import type { ResolvedMedia } from "@/lib/media";

export const shapeClass = {
  wide: "aspect-video",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
  portrait: "aspect-[3/4]",
} as const;

type Props = {
  media: ResolvedMedia;
  onOpen?: () => void;
  label?: string; // small category tag on the card
  sizes?: string;
  priority?: boolean;
  bare?: boolean; // media only, no card card / caption
};

/** A photo or video "pin". Missing media renders a placeholder with the exact file to add. */
export default function MediaTile({ media, onOpen, label, sizes, priority, bare }: Props) {
  const missing = media.kind === "missing-photo" || media.kind === "missing-video";
  const visual = (
    <div className={`relative w-full overflow-hidden ${shapeClass[media.shape]} ${bare ? "rounded-[var(--radius-card)]" : ""}`}>
      {missing ? (
        <Placeholder media={media} />
      ) : (
        <>
          <MediaVisual media={media} sizes={sizes} priority={priority} />
          {(media.kind === "youtube" || media.kind === "video") && (
            <span className="absolute inset-0 grid place-items-center bg-black/10">
              <span className="grid size-14 place-items-center rounded-full bg-white text-bg shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-110">
                <Play className="ml-0.5 size-6 fill-current" />
              </span>
            </span>
          )}
          {media.kind === "photo" && (
            <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-black/40 text-snow opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Maximize2 className="size-3.5" />
            </span>
          )}
        </>
      )}
    </div>
  );

  if (bare) {
    return missing || !onOpen ? (
      <div className="group">{visual}</div>
    ) : (
      <button type="button" onClick={onOpen} className="group block w-full text-left" aria-label={`Open: ${media.caption}`}>
        {visual}
      </button>
    );
  }

  const body = (
    <>
      {visual}
      <div className="flex items-start justify-between gap-3 px-4 py-3.5">
        <p className="text-sm leading-snug text-snow">{media.caption}</p>
        {label && <span className="tag mt-0.5 shrink-0 text-[11px]! text-subtle">{label}</span>}
      </div>
    </>
  );

  const card = "card card-hover group block w-full overflow-hidden text-left";
  return missing || !onOpen ? (
    <div className={card}>{body}</div>
  ) : (
    <button type="button" onClick={onOpen} className={card} aria-label={`Open: ${media.caption}`}>
      {body}
    </button>
  );
}

function MediaVisual({ media, sizes, priority }: { media: ResolvedMedia; sizes?: string; priority?: boolean }) {
  const zoom = "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]";
  if (media.kind === "youtube") {
    return (
      <Image
        src={`https://i.ytimg.com/vi/${media.youtubeId}/hqdefault.jpg`}
        alt={media.caption}
        fill
        unoptimized
        sizes={sizes}
        className={zoom}
      />
    );
  }
  if (media.kind === "video") {
    return (
      <video
        src={`${media.src}#t=0.1`}
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 size-full ${zoom}`}
      />
    );
  }
  return (
    <Image
      src={media.src}
      alt={media.caption}
      fill
      sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
      priority={priority}
      unoptimized={media.src.startsWith("http")}
      className={zoom}
    />
  );
}

function Placeholder({ media }: { media: ResolvedMedia }) {
  const isVideo = media.kind === "missing-video";
  const Icon = isVideo ? Video : ImagePlus;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 border-b border-dashed border-line bg-white/[0.02] p-4 text-center">
      <span className="grid size-11 place-items-center rounded-full border border-dashed border-subtle/40 text-subtle">
        <Icon className="size-5" strokeWidth={1.5} />
      </span>
      <span className="tag text-[11px]! text-subtle">{isVideo ? "Add video" : "Add photo"}</span>
      <code className="max-w-full rounded-md bg-black/30 px-2 py-1 text-[11px] break-all text-mist">{media.hint}</code>
    </div>
  );
}
