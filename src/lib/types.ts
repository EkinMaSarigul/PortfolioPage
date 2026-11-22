/**
 * Types for portfolio.config.ts.
 * You don't need to edit this file — it lets your editor autocomplete the config
 * and lets `npm run build` point at typos.
 */

/**
 * "wide" = 16:9 · "landscape" = 4:3 · "square" = 1:1 · "tall" = 4:5 · "portrait" = 3:4 (phone photos/videos)
 */
export type Shape = "wide" | "landscape" | "square" | "tall" | "portrait";

/**
 * A photo or a video.
 *   { photo: "/images/cad/robot.jpg", caption: "..." }
 *   { video: "https://youtu.be/VIDEO_ID", caption: "..." }   ← YouTube link (any format)
 *   { video: "/videos/cnc-timelapse.mp4", caption: "..." }   ← or a local file in /public/videos
 */
export type Media =
  | { photo: string; caption: string; shape?: Shape }
  | { video: string; caption: string; shape?: Shape };

export type Theme = {
  background: string;
  card: string;
  panel: string;
  border: string;
  heading: string;
  text: string;
  subtle: string;
  aviationBlue: string;
  aviationBlueText: string;
  cherryRed: string;
  cherryRedText: string;
};

export type PageIntro = { eyebrow: string; title: string; description: string };

export type Season = {
  year: number;
  game: string;
  role: string;
  summary: string;
  highlights: string[];
  achievements: string[];
  media: Media[];
};

export type SkillGroup = { title: string; items: string[] };

export type Award = { count: string; title: string; detail?: string };

export type CvEntry = { title: string; place: string; period: string; detail?: string };

export type PortfolioConfig = {
  theme: Theme;
  showMissingMediaPlaceholders: boolean;
  profile: {
    name: string;
    shortTitle: string;
    title: string;
    university: string;
    location: string;
    bio: string;
    email: string;
    linkedin: string;
    cvFile: string;
  };
  status: { show: boolean; text: string; shortText: string; linkLabel: string };
  nav: {
    home: string;
    cad: string;
    manufacturing: string;
    electronics: string;
    robotics: string;
    awards: string;
    downloadCv: string;
  };
  home: {
    headings: { work: string; robotics: string; awards: string; background: string };
    featuredAwards: number;
  };
  robotics: PageIntro & {
    team: string;
    teamLink: string;
    aboutFrc: { title: string; text: string };
    seasons: Season[];
  };
  cad: PageIntro & { skills: SkillGroup[]; media: Media[] };
  manufacturing: PageIntro & { skills: SkillGroup[]; media: Media[] };
  electronics: PageIntro & { skills: SkillGroup[]; media: Media[] };
  awards: PageIntro & { sourceLabel: string; items: Award[]; media: Media[] };
  cv: { education: CvEntry[]; experience: CvEntry[] };
};
