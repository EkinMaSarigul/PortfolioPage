import Link from "next/link";
import config from "@config";
import { navLinks } from "@/data/nav";
import { getCvDownload } from "@/lib/cv";
import { LinkedinIcon } from "./BrandIcons";
import CopyEmailButton from "./CopyEmailButton";
import DownloadCvButton from "./DownloadCvButton";

export default function Footer() {
  const { profile } = config;
  const cv = getCvDownload();
  return (
    <footer className="px-4 pt-20 pb-6 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 rounded-[var(--radius-card)] border border-cherry/50 bg-cherry/20 p-6 sm:p-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl">Get in touch</h2>
          <p className="mt-2 text-mist">I&apos;m open to internships and engineering projects. Email is the best way to reach me.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <CopyEmailButton email={profile.email} />
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm text-snow transition-colors hover:border-aviation"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            )}
            {cv && <DownloadCvButton cv={cv} className="px-4 py-2.5 text-sm" />}
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-subtle transition-colors hover:text-snow">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-5 max-w-6xl px-2 text-xs text-subtle">
        © {profile.name} · {profile.location}
      </p>
    </footer>
  );
}
