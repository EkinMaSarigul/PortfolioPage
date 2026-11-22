import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import config from "@config";
import { resolveMedia } from "@/lib/media";
import MediaGallery from "@/components/MediaGallery";

const seasons = config.robotics.seasons;

export function generateStaticParams() {
  return seasons.map((s) => ({ year: String(s.year) }));
}

export async function generateMetadata(props: PageProps<"/robotics/[year]">): Promise<Metadata> {
  const { year } = await props.params;
  const s = seasons.find((x) => String(x.year) === year);
  return s ? { title: `${s.year} · ${s.game}`, description: s.summary } : {};
}

export default function SeasonPage(props: PageProps<"/robotics/[year]">) {
  // Seasons are prerendered at build time; the fallback only shows for unknown years.
  return (
    <Suspense fallback={<div className="mx-auto h-[60vh] max-w-6xl" />}>
      <Season params={props.params} />
    </Suspense>
  );
}

async function Season({ params }: { params: PageProps<"/robotics/[year]">["params"] }) {
  const { year } = await params;
  const i = seasons.findIndex((x) => String(x.year) === year);
  if (i === -1) notFound();

  const s = seasons[i];
  const newer = seasons[i - 1];
  const older = seasons[i + 1];
  const media = resolveMedia(s.media, `season-${s.year}`);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <Link href="/robotics" className="inline-flex items-center gap-1.5 text-sm text-subtle hover:text-snow">
          <ArrowLeft className="size-4" /> All seasons
        </Link>

        <p className="mt-6 font-mono text-xs tracking-wide text-subtle uppercase">
          {s.game} · {config.robotics.team}
        </p>
        <h1 className="mt-2 text-4xl sm:text-5xl">
          {s.year} <span className="text-aviation-text">· {s.role}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-mist">{s.summary}</p>
      </section>

      <section className="mx-auto mt-10 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <h2 className="text-base">What I did</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-mist marker:text-aviation-text">
              {s.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          {s.achievements.length > 0 && (
            <div className="rounded-[var(--radius-card)] border border-cherry/60 bg-cherry/20 p-5">
              <h2 className="text-base">Team results</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-mist marker:text-cherry">
                {s.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <div>
          {media.length > 0 ? (
            <MediaGallery items={media} columns={2} />
          ) : (
            <p className="text-sm text-subtle">No photos from this season yet.</p>
          )}
        </div>
      </section>

      <nav aria-label="Other seasons" className="mx-auto mt-10 flex max-w-6xl justify-between gap-4 px-4 sm:px-6">
        {older ? (
          <Link href={`/robotics/${older.year}`} className="card card-hover flex items-center gap-3 px-5 py-3 text-sm">
            <ArrowLeft className="size-4 text-aviation-text" /> <span className="text-snow">{older.year}</span>
            <span className="hidden text-subtle sm:inline">{older.game}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link href={`/robotics/${newer.year}`} className="card card-hover flex items-center gap-3 px-5 py-3 text-sm">
            <span className="hidden text-subtle sm:inline">{newer.game}</span>
            <span className="text-snow">{newer.year}</span> <ArrowRight className="size-4 text-aviation-text" />
          </Link>
        )}
      </nav>
    </>
  );
}
