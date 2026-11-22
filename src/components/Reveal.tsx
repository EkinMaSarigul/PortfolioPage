import type { ReactNode } from "react";

/** Plain wrapper. (Scroll animations were removed to keep the site calm and fast.) */
export default function Reveal({ children, className }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={className}>{children}</div>;
}
