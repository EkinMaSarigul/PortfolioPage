import type { Metadata } from "next";
import config from "@config";
import SkillsPage from "@/components/SkillsPage";

export const metadata: Metadata = {
  title: config.cad.title,
  description: config.cad.description,
};

export default function Page() {
  return <SkillsPage section="cad" />;
}
