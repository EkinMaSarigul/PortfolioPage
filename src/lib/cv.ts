import fs from "node:fs";
import path from "node:path";
import config from "@config";

export type CvDownload = { href: string; filename: string };

/**
 * The CV PDF from `profile.cvFile`, or null if it's not set or the file isn't in /public
 * (so "Download CV" buttons never point at a missing file).
 */
export function getCvDownload(): CvDownload | null {
  const href = config.profile.cvFile.trim();
  if (!href) return null;
  if (!/^https?:\/\//.test(href)) {
    const publicDir = path.join(process.cwd(), "public");
    const abs = path.join(publicDir, href);
    if (!abs.startsWith(publicDir) || !fs.existsSync(abs)) return null;
  }
  return { href, filename: `${config.profile.name.replace(/\s+/g, "-")}-CV.pdf` };
}
