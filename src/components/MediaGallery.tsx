"use client";

import { useCallback, useMemo, useState } from "react";
import type { ResolvedMedia } from "@/lib/media";
import MediaTile from "./MediaTile";
import Lightbox from "./Lightbox";

const isViewable = (m: ResolvedMedia) => m.kind === "photo" || m.kind === "youtube" || m.kind === "video";

/** Masonry grid of photos/videos with a lightbox. */
export default function MediaGallery({ items, columns = 3 }: { items: ResolvedMedia[]; columns?: 2 | 3 }) {
  const viewable = useMemo(() => items.filter(isViewable), [items]);
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);

  if (items.length === 0) return null;

  return (
    <>
      <div className={`gap-5 ${columns === 3 ? "columns-1 sm:columns-2 lg:columns-3" : "columns-1 sm:columns-2"}`}>
        {items.map((m) => {
          const vi = viewable.indexOf(m);
          return (
            <div key={m.key} className="mb-5 break-inside-avoid">
              <MediaTile
                media={m}
                onOpen={vi >= 0 ? () => setIndex(vi) : undefined}
                sizes={columns === 3 ? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 40vw, 100vw"}
              />
            </div>
          );
        })}
      </div>
      <Lightbox items={viewable} index={index} onClose={close} onIndex={setIndex} />
    </>
  );
}
