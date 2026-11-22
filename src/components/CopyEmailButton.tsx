"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex max-w-full items-center gap-2 rounded-md border border-line bg-white/[0.03] px-4 py-2.5 text-sm text-snow transition-colors hover:border-aviation"
      aria-label={`Copy email address ${email}`}
    >
      <Mail className="size-4 shrink-0 text-aviation-text" />
      <span className="truncate">{email}</span>
      <span className="tag flex shrink-0 items-center gap-1 text-[11px]! text-subtle" aria-live="polite">
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
  );
}
