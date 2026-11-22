import config from "@config";

/** Site navigation — labels come from `nav` in portfolio.config.ts. */
export const navLinks = [
  { href: "/", label: config.nav.home },
  { href: "/cad", label: config.nav.cad },
  { href: "/manufacturing", label: config.nav.manufacturing },
  { href: "/electronics", label: config.nav.electronics },
  { href: "/robotics", label: config.nav.robotics },
  { href: "/awards", label: config.nav.awards },
];
