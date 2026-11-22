import config from "@config";
import { resolveMedia } from "@/lib/media";
import PageHeader from "./PageHeader";
import SkillGroups from "./SkillGroups";
import MediaGallery from "./MediaGallery";

type Section = "cad" | "manufacturing" | "electronics";

/** Shared layout for CAD / Manufacturing / Electronics: skills on the left, media beside them. */
export default function SkillsPage({ section }: { section: Section }) {
  const s = config[section];
  const media = resolveMedia(s.media, section);

  return (
    <>
      <PageHeader eyebrow={s.eyebrow} title={s.title} description={s.description} />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[320px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <SkillGroups groups={s.skills} />
        </aside>
        <div>
          <MediaGallery items={media} columns={2} />
        </div>
      </section>
    </>
  );
}
