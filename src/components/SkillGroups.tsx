import type { SkillGroup } from "@/lib/types";

/** Cards listing skills as chips, one card per group. */
export default function SkillGroups({ groups }: { groups: SkillGroup[] }) {
  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <div key={g.title} className="card p-5">
          <h2 className="text-base">{g.title}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {g.items.map((i) => (
              <li key={i} className="rounded-md border border-line px-2.5 py-1 text-sm text-mist">
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
