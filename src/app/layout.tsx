import type { CSSProperties } from "react";
import type { Metadata } from "next";
import config from "@config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCvDownload } from "@/lib/cv";
import "./globals.css";

const { profile, theme: t } = config;

export const metadata: Metadata = {
  title: {
    default: `${profile.name} — ${profile.shortTitle}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.bio,
};

// theme from portfolio.config.ts → CSS variables used by every class
const themeVars = {
  "--color-bg": t.background,
  "--color-card": t.card,
  "--color-panel": t.panel,
  "--color-line": t.border,
  "--color-snow": t.heading,
  "--color-mist": t.text,
  "--color-subtle": t.subtle,
  "--color-aviation": t.aviationBlue,
  "--color-aviation-text": t.aviationBlueText,
  "--color-cherry": t.cherryRed,
  "--color-cherry-text": t.cherryRedText,
} as CSSProperties;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" style={themeVars} className="h-full antialiased">
      <body className="relative flex min-h-full flex-col font-sans">
        <Navbar cv={getCvDownload()} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
