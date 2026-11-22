import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import config from "@config";
import { resolveMedia } from "@/lib/media";
import PageHeader from "@/components/PageHeader";
import MediaTile from "@/components/MediaTile";

const { robotics } = config;

export const metadata: Metadata = { title: robotics.title, description: robotics.description };

export default function RoboticsPage() {
  return (
    <>
      <PageHeader eyebrow={robotics.eyebrow} title={robotics.title} description={robotics.description}>
        <div className="mt-8 max-w-2xl rounded-[var(--radius-card)] border-l-2 border-aviation bg-panel p-4">
          <h2 className="text-base">{robotics.aboutFrc.title}</h2>
          <p className="mt-1.5 text-sm text-mist">{robotics.aboutFrc.text}</p>
          <a
            href={robotics.teamLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm text-aviation-text hover:text-snow"
          >
            Team record on The Blue Alliance <ArrowRight className="size-4" />
          </a>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-6xl space-y-5 px-4 sm:px-6">
        {robotics.seasons.map((s) => {
          const cover = resolveMedia(s.media, `cover-${s.year}`).find((m) => m.kind === "photo");
          return (
            <Link
              key={s.year}
              href={`/robotics/${s.year}`}
              className={`card card-hover group grid overflow-hidden border-l-4 border-l-cherry ${cover ? "sm:grid-cols-[220px_1fr]" : ""}`}
            >
              {cover && (
                <div className="sm:border-r sm:border-line">
                  <MediaTile media={{ ...cover, shape: "square" }} bare sizes="220px" />
                </div>
              )}
              <div className="flex flex-col p-6">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <span className="font-mono text-3xl font-bold text-snow">{s.year}</span>
                  <span className="font-mono text-xs tracking-wide text-subtle uppercase">{s.game}</span>
                </div>
                <h2 className="mt-3 text-lg">{s.role}</h2>
                <p className="mt-1 text-mist">{s.summary}</p>
                {s.achievements.length > 0 && (
                  <ul className="mt-4 space-y-1 text-sm text-subtle">
                    {s.achievements.slice(0, 3).map((a) => (
                      <li key={a} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-cherry" />
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm text-aviation-text group-hover:text-snow">
                  View season <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </>
  );
}
