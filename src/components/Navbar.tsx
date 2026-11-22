"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import config from "@config";
import { navLinks } from "@/data/nav";
import type { CvDownload } from "@/lib/cv";
import DownloadCvButton from "./DownloadCvButton";
import ContactMenu from "./ContactMenu";

const initials = config.profile.name
  .split(" ")
  .map((w) => w[0])
  .join("")
  .slice(0, 3);

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar({ cv }: { cv: CvDownload | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-md bg-cherry font-mono text-[11px] font-bold text-cherry-text">
            {initials}
          </span>
          <span className="hidden text-sm font-bold text-snow sm:block">{config.profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-colors ${
                  active ? "text-snow" : "text-subtle hover:text-snow"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-[13px] h-0.5 bg-aviation"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {cv && <DownloadCvButton cv={cv} className="px-3.5 py-2 text-[13px]" />}
          <ContactMenu
            email={config.profile.email}
            label="Contact"
            align="right"
            className="rounded-md bg-cherry px-4 py-2 text-[13px] font-bold text-cherry-text transition-colors hover:bg-cherry/80"
          />
        </div>

        <button
          type="button"
          className="grid size-9 place-items-center rounded-md border border-line text-mist hover:text-snow lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="border-t border-line bg-bg p-2 lg:hidden"
          >
            <ul>
              {navLinks.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-xl px-4 py-3 text-base ${
                        active ? "bg-white/[0.06] font-bold text-snow" : "text-mist"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
              {cv && (
                <li className="px-2 pt-2 pb-1">
                  <DownloadCvButton cv={cv} onClick={() => setOpen(false)} className="w-full justify-center px-4 py-3 text-base" />
                </li>
              )}
              <li className="px-2 pt-1 pb-1">
                <ContactMenu
                  email={config.profile.email}
                  label="Contact"
                  className="w-full rounded-md bg-cherry px-4 py-3 text-base font-bold text-cherry-text"
                />
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
