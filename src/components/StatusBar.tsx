import config from "@config";
import ContactMenu from "./ContactMenu";

/** Small rounded "bubble" showing availability, e.g. "● Open to summer 2027 internships · Get in touch →".
 *  Edit `status` in portfolio.config.ts (show: false hides it). */
export default function StatusBar({ className = "" }: { className?: string }) {
  const { status, profile } = config;
  if (!status.show) return null;

  return (
    <div
      role="status"
      className={`inline-flex items-center gap-2.5 rounded-full border border-green-500/30 bg-card py-1.5 pr-1.5 pl-3 text-[13px] text-snow ${className}`}
    >
      <span aria-hidden="true" className="relative flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-70 motion-reduce:hidden" />
        <span className="relative inline-flex size-2 rounded-full bg-green-500" />
      </span>
      <span>{status.shortText}</span>
      <ContactMenu
        email={profile.email}
        label={`${status.linkLabel} →`}
        className="rounded-full bg-cherry px-3 py-1 text-xs font-bold whitespace-nowrap text-cherry-text transition-colors hover:bg-cherry/80"
      />
    </div>
  );
}
