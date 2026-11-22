import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import config from "@config";
import type { CvEntry } from "@/lib/types";
import { resolveMedia } from "@/lib/media";
import MediaTile from "@/components/MediaTile";
import { LinkedinIcon } from "@/components/BrandIcons";
import DownloadCvButton from "@/components/DownloadCvButton";
import ContactMenu from "@/components/ContactMenu";
import StatusBar from "@/components/StatusBar";
import { getCvDownload } from "@/lib/cv";

const { profile, home, robotics, cad, manufacturing, electronics, awards, cv } = config;

const workAreas = [
  { href: "/cad", key: "cad", section: cad },
  { href: "/manufacturing", key: "manufacturing", section: manufacturing },
  { href: "/electronics", key: "electronics", section: electronics },
] as const;

/** Section heading with an optional link on the right. */
function SectionTitle({ children, href, linkLabel }: { children: ReactNode; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-line pb-3">
      <h2 className="text-2xl">{children}</h2>
      {href && (
        <Link href={href} className="flex shrink-0 items-center gap-1.5 text-sm text-aviation-text hover:text-snow">
          {linkLabel} <ArrowRight className="size-4" />
        </Link>
      )}
    </div>
  );
}

function EntryList({ entries }: { entries: CvEntry[] }) {
  return (
    <ul className="divide-y divide-line">
      {entries.map((e) => (
        <li key={e.title + e.place} className="py-4 first:pt-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h4 className="text-base">{e.title}</h4>
            <span className="font-mono text-xs text-subtle">{e.period}</span>
          </div>
          <p className="text-sm text-mist">{e.place}</p>
          {e.detail && <p className="mt-1 text-sm text-subtle">{e.detail}</p>}
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const cvFile = getCvDownload();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ---------- INTRO ---------- */}
      <section className="pt-16 pb-16 sm:pt-24">
        <StatusBar className="mb-8" />
        <p className="font-mono text-xs tracking-wide text-subtle uppercase">
          {profile.university} · {profile.location}
        </p>
        <h1 className="mt-3 text-5xl sm:text-6xl">{profile.name}</h1>
        <p className="mt-2 text-xl text-aviation-text sm:text-2xl">{profile.title}</p>
        <p className="mt-6 max-w-2xl text-base text-mist sm:text-lg">{profile.bio}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#work" className="btn-primary inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-bold">
            See my work <ArrowRight className="size-4" />
          </a>
          {cvFile && <DownloadCvButton cv={cvFile} className="px-6 py-3 text-sm" />}
          <ContactMenu
            email={profile.email}
            label="Email me"
            className="inline-flex items-center rounded-md border border-line px-6 py-3 text-sm font-bold text-snow transition-colors hover:border-aviation"
          />
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid size-[46px] place-items-center rounded-md border border-line text-snow transition-colors hover:border-aviation"
            >
              <LinkedinIcon className="size-4" />
            </a>
          )}
        </div>
      </section>

      {/* ---------- WORK ---------- */}
      <section id="work" className="scroll-mt-24">
        <SectionTitle>{home.headings.work}</SectionTitle>
        <div className="grid gap-5 md:grid-cols-3">
          {workAreas.map(({ href, key, section }) => {
            const items = resolveMedia(section.media, `home-${key}`);
            const cover = items.find((m) => m.kind === "photo") ?? items.find((m) => m.kind === "video" || m.kind === "youtube");
            return (
              <Link key={href} href={href} className="card card-hover group flex flex-col overflow-hidden">
                {cover && (
                  <div className="border-b border-line">
                    <MediaTile media={{ ...cover, shape: "landscape" }} bare sizes="(min-width: 768px) 33vw, 100vw" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg">{section.title}</h3>
                  <p className="mt-2 text-sm text-mist">{section.description}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm text-aviation-text group-hover:text-snow">
                    View {section.title} <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- ROBOTICS ---------- */}
      <section className="mt-20">
        <SectionTitle href="/robotics" linkLabel="All seasons">
          {home.headings.robotics}
        </SectionTitle>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-mist">
              Between 2023 and 2026 I was part of{" "}
              <a href={robotics.teamLink} target="_blank" rel="noopener noreferrer" className="text-snow underline decoration-line underline-offset-4 hover:decoration-aviation">
                {robotics.team}
              </a>
              . This is where I learned most of what I know about design, machining and wiring.
            </p>
            <div className="mt-5 rounded-[var(--radius-card)] border-l-2 border-aviation bg-panel p-4">
              <h3 className="text-base">{robotics.aboutFrc.title}</h3>
              <p className="mt-1.5 text-sm text-mist">{robotics.aboutFrc.text}</p>
            </div>
          </div>
          <ul className="divide-y divide-line border-y border-line">
            {robotics.seasons.map((s) => (
              <li key={s.year}>
                <Link href={`/robotics/${s.year}`} className="group grid grid-cols-[4rem_1fr_auto] items-baseline gap-4 py-3.5">
                  <span className="font-mono text-base font-bold text-snow">{s.year}</span>
                  <span className="min-w-0">
                    <span className="block text-snow">{s.role}</span>
                    {s.achievements[0] && <span className="block truncate text-sm text-subtle">{s.achievements[0]}</span>}
                  </span>
                  <ArrowRight className="size-4 text-subtle group-hover:text-aviation-text" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- AWARDS ---------- */}
      <section className="mt-20">
        <SectionTitle href="/awards" linkLabel="All awards">
          {home.headings.awards}
        </SectionTitle>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {awards.items.slice(0, home.featuredAwards).map((a) => (
            <li key={a.title} className="rounded-[var(--radius-card)] border-l-4 border-cherry bg-cherry/20 p-4">
              <p className="font-mono text-2xl font-bold text-snow">{a.count}</p>
              <p className="text-snow">{a.title}</p>
              {a.detail && <p className="mt-0.5 text-sm text-subtle">{a.detail}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- EDUCATION & EXPERIENCE ---------- */}
      <section className="mt-20">
        <SectionTitle>{home.headings.background}</SectionTitle>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-sm font-normal text-subtle">Education</h3>
            <EntryList entries={cv.education} />
          </div>
          <div>
            <h3 className="mb-4 text-sm font-normal text-subtle">Experience</h3>
            <EntryList entries={cv.experience} />
          </div>
        </div>
      </section>
    </div>
  );
}
