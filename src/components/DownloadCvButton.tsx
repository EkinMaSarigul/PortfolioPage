import { Download } from "lucide-react";
import config from "@config";
import type { CvDownload } from "@/lib/cv";

/** "Download CV" link — downloads the PDF directly (no CV page). */
export default function DownloadCvButton({
  cv,
  className = "",
  onClick,
}: {
  cv: CvDownload;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={cv.href}
      download={cv.filename}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-md border border-aviation/60 font-bold text-snow transition-colors hover:border-aviation hover:bg-aviation/15 ${className}`}
    >
      <Download className="size-4 text-aviation-text" />
      {config.nav.downloadCv}
    </a>
  );
}
