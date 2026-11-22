import type { Metadata } from "next";
import config from "@config";
import SkillsPage from "@/components/SkillsPage";

export const metadata: Metadata = {
  title: config.manufacturing.title,
  description: config.manufacturing.description,
};

export default function Page() {
  return <SkillsPage section="manufacturing" />;
}
