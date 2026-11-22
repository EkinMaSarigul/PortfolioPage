import type { ReactNode } from "react";

/** Page title block: small label, title, description. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
      {eyebrow && <p className="font-mono text-xs tracking-wide text-subtle uppercase">{eyebrow}</p>}
      <h1 className="mt-2 text-4xl sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base text-mist sm:text-lg">{description}</p>
      {children}
    </section>
  );
}
