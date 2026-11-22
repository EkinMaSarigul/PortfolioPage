import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import config from "@config";
import { resolveMedia } from "@/lib/media";
import PageHeader from "@/components/PageHeader";
import MediaGallery from "@/components/MediaGallery";

const { awards, robotics } = config;

export const metadata: Metadata = { title: awards.title, description: awards.description };

export default function AwardsPage() {
  const media = resolveMedia(awards.media, "awards");
  return (
    <>
      <PageHeader eyebrow={awards.eyebrow} title={awards.title} description={awards.description}>
        <a
          href={robotics.teamLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-aviation-text hover:text-snow"
        >
          {awards.sourceLabel} <ArrowRight className="size-4" />
        </a>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <ul className="divide-y divide-line border-y border-line">
          {awards.items.map((a) => (
            <li key={a.title} className="grid grid-cols-[4rem_1fr] gap-4 py-4 sm:grid-cols-[4.5rem_1fr_1fr] sm:items-baseline">
              <span className="w-fit rounded-[var(--radius-card)] bg-cherry px-2 py-0.5 font-mono text-base font-bold text-cherry-text">{a.count}</span>
              <span className="text-snow">{a.title}</span>
              {a.detail && <span className="col-start-2 text-sm text-subtle sm:col-start-3">{a.detail}</span>}
            </li>
          ))}
        </ul>

        {media.length > 0 && (
          <>
            <h2 className="mt-16 mb-6 text-2xl">Photos</h2>
            <MediaGallery items={media} />
          </>
        )}
      </section>
    </>
  );
}
