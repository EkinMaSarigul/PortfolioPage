import type { Metadata } from "next";
import config from "@config";
import SkillsPage from "@/components/SkillsPage";

export const metadata: Metadata = {
  title: config.electronics.title,
  description: config.electronics.description,
};

export default function Page() {
  return <SkillsPage section="electronics" />;
}
