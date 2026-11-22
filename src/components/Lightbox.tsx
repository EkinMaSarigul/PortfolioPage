"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ResolvedMedia } from "@/lib/media";

type Props = {
  items: ResolvedMedia[]; // only viewable (non-missing) items
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

/** Full-screen blurred lightbox for photos and videos. ← → to navigate, Esc to close. */
export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const open = index !== null && items[index] !== undefined;
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = items.length;

  useEffect(() => {
    if (!open || index === null) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && count > 1) onIndex((index + 1) % count);
      if (e.key === "ArrowLeft" && count > 1) onIndex((index - 1 + count) % count);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [open, index, count, onClose, onIndex]);

  const item = open ? items[index] : null;

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.caption}
          className="fixed inset-0 z-50 flex flex-col bg-bg/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <span className="tag text-subtle">
              {index + 1} / {count}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="card grid size-10 place-items-center rounded-full! text-snow hover:border-aviation"
            >
              <X className="size-5" />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
            onMouseDown={(e) => e.target === e.currentTarget && onClose()}
          >
            <motion.div
              key={item.key}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="relative h-full max-h-[78vh] w-full max-w-6xl"
            >
              {item.kind === "photo" && (
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="100vw"
                  unoptimized={item.src.startsWith("http")}
                  className="object-contain"
                />
              )}
              {item.kind === "youtube" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="aspect-video max-h-full w-full overflow-hidden rounded-[var(--radius-card)] bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
                      title={item.caption}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="size-full border-0"
                    />
                  </div>
                </div>
              )}
              {item.kind === "video" && (
                <video src={item.src} controls autoPlay playsInline className="absolute inset-0 size-full object-contain" />
              )}
            </motion.div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => onIndex((index - 1 + count) % count)}
                  aria-label="Previous"
                  className="card absolute left-2 grid size-11 place-items-center rounded-full! text-snow hover:border-aviation sm:left-6"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onIndex((index + 1) % count)}
                  aria-label="Next"
                  className="card absolute right-2 grid size-11 place-items-center rounded-full! text-snow hover:border-aviation sm:right-6"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}
          </div>

          <p className="px-4 py-5 text-center text-sm text-mist">{item.caption}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
