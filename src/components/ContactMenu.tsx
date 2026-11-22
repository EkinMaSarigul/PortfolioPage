"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, ExternalLink, Mail } from "lucide-react";

/**
 * "Contact" / "Email me" button.
 * A plain mailto: link does nothing when the visitor has no mail app set up,
 * so this opens a small menu: copy the address, or write in Gmail / Outlook / the mail app.
 */
export default function ContactMenu({
  email,
  label,
  className = "",
  align = "left",
}: {
  email: string;
  label: string;
  className?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // older browsers: select-and-copy fallback
      const t = document.createElement("textarea");
      t.value = email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const to = encodeURIComponent(email);
  const options = [
    { label: "Gmail", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}` },
    { label: "Outlook", href: `https://outlook.office.com/mail/deeplink/compose?to=${to}` },
    { label: "Mail app", href: `mailto:${email}` },
  ];

  return (
    <div ref={ref} className="relative">
      <button type="button" aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((o) => !o)} className={className}>
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className={`card absolute top-full z-50 mt-2 w-72 p-2 shadow-2xl shadow-black/50 ${align === "right" ? "right-0" : "left-0"}`}
          >
            <button
              type="button"
              role="menuitem"
              onClick={copy}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm text-snow hover:bg-white/[0.06]"
            >
              <Mail className="size-4 shrink-0 text-aviation-text" />
              <span className="min-w-0 flex-1 truncate">{email}</span>
              <span className="flex shrink-0 items-center gap-1 text-xs text-subtle" aria-live="polite">
                {copied ? (
                  <>
                    <Check className="size-3.5 text-aviation-text" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" /> Copy
                  </>
                )}
              </span>
            </button>
            <div className="my-1 border-t border-line" />
            {options.map((o) => (
              <a
                key={o.label}
                role="menuitem"
                href={o.href}
                target={o.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-mist hover:bg-white/[0.06] hover:text-snow"
              >
                Write in {o.label}
                <ExternalLink className="size-3.5 text-subtle" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
