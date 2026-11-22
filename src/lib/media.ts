import fs from "node:fs";
import path from "node:path";
import config from "@config";
import type { Media, Shape } from "./types";

/** Media after checking the file system / parsing links. Safe to pass to client components. */
export type ResolvedMedia = {
  key: string;
  kind: "photo" | "youtube" | "video" | "missing-photo" | "missing-video";
  src: string;
  caption: string;
  shape: Shape;
  youtubeId?: string;
  hint?: string; // instructions shown on a missing-media placeholder
};

const ALT_EXTENSIONS = [".jpg", ".jpeg", ".webp", ".png", ".JPG", ".JPEG", ".WEBP", ".PNG"];

/** Find a file in /public, also accepting the same name with another image extension. */
function findPublicFile(src: string, tryAltExtensions: boolean): string | null {
  const publicDir = path.join(process.cwd(), "public");
  const abs = path.join(publicDir, src);
  if (!abs.startsWith(publicDir)) return null;
  if (fs.existsSync(abs)) return src;
  if (!tryAltExtensions) return null;
  const base = src.slice(0, src.length - path.extname(src).length);
  for (const ext of ALT_EXTENSIONS) {
    if (fs.existsSync(path.join(publicDir, base + ext))) return base + ext;
  }
  return null;
}

export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function resolveOne(m: Media, key: string): ResolvedMedia {
  if ("photo" in m) {
    const shape = m.shape ?? "tall";
    const src = m.photo.trim();
    if (!src) {
      return { key, kind: "missing-photo", src, caption: m.caption, shape, hint: "Add a photo path in portfolio.config.ts" };
    }
    if (/^https?:\/\//.test(src)) return { key, kind: "photo", src, caption: m.caption, shape };
    const found = findPublicFile(src, true);
    return found
      ? { key, kind: "photo", src: found, caption: m.caption, shape }
      : { key, kind: "missing-photo", src, caption: m.caption, shape, hint: `public${src}` };
  }

  const shape = m.shape ?? "wide";
  const src = m.video.trim();
  if (!src) {
    return { key, kind: "missing-video", src, caption: m.caption, shape, hint: "Paste a YouTube link in portfolio.config.ts" };
  }
  const id = youtubeId(src);
  if (id) return { key, kind: "youtube", src, caption: m.caption, shape, youtubeId: id };
  if (/^https?:\/\//.test(src)) return { key, kind: "video", src, caption: m.caption, shape };
  const found = findPublicFile(src, false);
  return found
    ? { key, kind: "video", src: found, caption: m.caption, shape }
    : { key, kind: "missing-video", src, caption: m.caption, shape, hint: `public${src}` };
}

export const isMissing = (m: ResolvedMedia) => m.kind === "missing-photo" || m.kind === "missing-video";

/**
 * Resolve a list of media from the config.
 * Missing items are dropped when `showMissingMediaPlaceholders` is false.
 */
export function resolveMedia(list: Media[], keyPrefix: string): ResolvedMedia[] {
  return list
    .map((m, i) => resolveOne(m, `${keyPrefix}-${i}`))
    .filter((m) => config.showMissingMediaPlaceholders || !isMissing(m));
}
