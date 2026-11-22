/* =============================================================================
 *  PORTFOLIO CONFIG — edit this ONE file to change the whole website.
 * =============================================================================
 *
 *  Sections (search for the number to jump there):
 *    1. COLORS            6. CAD & DESIGN
 *    2. PROFILE           7. MANUFACTURING
 *    3. MENU              8. ELECTRONICS
 *    4. HOME PAGE         9. AWARDS
 *    5. ROBOTICS         10. EDUCATION & EXPERIENCE
 *
 *  ───────────── HOW TO ADD A PHOTO (full guide: MEDIA-GUIDE.md) ─────────────
 *   1. Export it as .jpg or .webp, under 500 KB, max 1600 px wide.
 *   2. Put it in the folder for that page, e.g. public/images/robotics/2025/
 *   3. Add a line to that section's `media: [...]` list (copy the example line).
 *
 *  ───────────── HOW TO ADD A VIDEO ─────────────
 *   Either a YouTube link (upload as "Unlisted"):
 *        { video: "https://youtu.be/AbC123xyz", caption: "..." }
 *   or an .mp4 in public/videos/:
 *        { video: "/videos/manufacturing/my-clip.mp4", caption: "..." }
 *
 *  shape: "wide" 16:9 · "landscape" 4:3 · "square" 1:1 · "tall" 4:5 · "portrait" 3:4
 *
 *  Save the file and the site updates instantly while `npm run dev` is running.
 * ========================================================================== */

import type { PortfolioConfig } from "@/lib/types";

const config: PortfolioConfig = {
  /* ───────────────────────────── 1. COLORS ───────────────────────────── */
  // Aviation palette — black and grey surfaces, aviation blue + aviation navy as accents:
  //   ~55%  black / dark grey            → background, cards, dividers
  //   ~20%  aviation blue                → main button, links, icons, lines, active menu line
  //   ~15%  dark cherry                  → Contact button, logo, award blocks, results, footer
  //   ~10%  aviation navy                → "What is FRC?" panel
  //   (earlier try: navy surfaces — background #0B1220, cards #13213A)
  // Earlier palettes:
  //   industrial (saved in backups/industrial-minimalist/): #17171C · #25232B · #51232F · #C04459 · #A9D5E8 · #D7D1D0
  //   burgundy: #0A0908 · #49111C · #F2F4F3   ·   ice blue: #0C0E0B · #D6E7F3 · #D6303A
  //   original (saved in backups/before-new-palette/): #0B0C0E · aviation blue #1F5FA8 · cherry red #C8102E
  theme: {
    background: "#0D0E10", // black — page background
    card: "#1A1C20", // dark grey — cards and surfaces
    panel: "#13294B", // aviation navy — highlighted panels (e.g. "What is FRC?")
    border: "#2C2F35", // grey — card edges and dividers
    heading: "#F3F4F6", // headings
    text: "#C9CDD3", // body text (light grey)
    subtle: "#8B9099", // small labels, dates
    aviationBlue: "#3B7DD8", //     aviation blue — buttons (shaded), lines, hover edges, active menu line
    aviationBlueText: "#8DB8EC", // light aviation blue — links, title, icons
    cherryRed: "#8E2438", //        dark cherry — Contact button, logo, award blocks, results panel, footer
    cherryRedText: "#FFFFFF", //    text on dark cherry
  },

  // true  = show "add photo here" boxes for photos you haven't added yet (handy while building)
  // false = hide empty slots completely (switch to false before you publish)
  showMissingMediaPlaceholders: false,

  /* ───────────────────────────── 2. PROFILE ──────────────────────────── */
  profile: {
    name: "Ekin Mahir Sarigul",
    shortTitle: "Mechanical Engineering Student", // browser tab title
    title: "Mechanical Engineering Student",
    university: "University of Bristol",
    location: "Bristol, UK",
    bio: "I'm a first-year Mechanical Engineering student at the University of Bristol. I enjoy the practical side of engineering: designing parts in CAD, programming and running the machines that make them, and wiring the systems that control them. Most of that experience comes from four seasons building competition robots with Team 8159 Golden Horn in Istanbul.",
    email: "ekin.sarigul.2026@bristol.ac.uk",
    linkedin: "https://www.linkedin.com/in/ekin-mahir-sarıgül/",
    // "Download CV" buttons (menu, home, footer) download this file from /public.
    // To update your CV, just replace public/cv.pdf. Leave "" to hide the buttons.
    cvFile: "/cv.pdf",
  },

  // Small "bubble" above your name on the home page. Set show: false to hide it.
  status: {
    show: true,
    text: "Looking for a summer 2027 internship in mechanical engineering", // (not shown at the moment)
    shortText: "Open to summer 2027 internships", // text in the bubble
    linkLabel: "Get in touch",
  },

  /* ───────────────────────────── 3. MENU ─────────────────────────────── */
  nav: {
    home: "Home",
    cad: "CAD",
    manufacturing: "Manufacturing",
    electronics: "Electronics",
    robotics: "Robotics",
    awards: "Awards",
    downloadCv: "Download CV",
  },

  /* ───────────────────────────── 4. HOME PAGE ────────────────────────── */
  // Order: intro → work (CAD, manufacturing, electronics) → robotics → awards → education & experience.
  // The content of each part comes from its own section below.
  home: {
    headings: {
      work: "Work",
      robotics: "Competition robotics",
      awards: "Selected results",
      background: "Education & experience",
    },
    featuredAwards: 4, // how many awards (from the top of the list in section 9) to show on the home page
  },

  /* ───────────────────────────── 5. ROBOTICS ─────────────────────────── */
  // Each season gets its own page: /robotics/2023, /robotics/2024, ...
  // Media for each season: put photos in public/images/robotics/<year>/
  robotics: {
    eyebrow: "2023 – 2026",
    title: "Robotics",
    description:
      "Four seasons with Team 8159 Golden Horn in the FIRST Robotics Competition, starting as a mechanical member and finishing as Mechanical & Electrical Lead.",
    team: "Team 8159 Golden Horn · Istanbul",
    teamLink: "https://www.thebluealliance.com/team/8159/history",
    // Short explanation of FRC, shown on the home page and the Robotics page.
    aboutFrc: {
      title: "What is FRC?",
      text: "The FIRST Robotics Competition is an international engineering competition for high-school teams. Each January a new game is announced, and teams have about two months to design, build and program a robot of up to 125 lb (57 kg) to play it. Matches are played by alliances of three robots. Students do the engineering themselves, from CAD and machining to wiring and software, with support from mentors.",
    },
    seasons: [
      {
        year: 2026,
        game: "REBUILT",
        role: "Mechanical & Electrical Lead",
        summary: "Led both the mechanical and electrical sub-teams, and was second driver on the drive team.",
        highlights: [
          "Led the mechanical and electrical sub-teams.",
          "Only student on the team with a full understanding of the robot's electrical system.",
          "Taught CAD and FRC electronics sessions for other teams at kickoff events.",
          "Second driver on the drive team.",
        ],
        achievements: [
          "Regional Finalist, Orlando Regional",
          "Autonomous Award at the Orlando and Marmara Regionals",
          "FIRST Championship, Galileo Division",
          "Winner, Istanbul IBB Off-Season",
        ],
        media: [
          { photo: "/images/robotics/2026/robot-electronics.jpg", caption: "Electrical layout on the 2026 robot", shape: "wide" },
          { photo: "/images/robotics/2026/kickoff-mechanical-lesson.jpg", caption: "Teaching a mechanical session at kickoff", shape: "wide" },
          { video: "/videos/robotics/2026/hotel-room-rebuild.mp4", caption: "Rebuilding the robot in the hotel room", shape: "wide" },
          { photo: "/images/cad/2026-robot-cad-1.jpg", caption: "2026 robot CAD model", shape: "landscape" },
          { photo: "/images/cad/2026-intake-prototype-1.jpg", caption: "Intake prototype CAD", shape: "wide" },
          // { photo: "/images/robotics/2026/my-photo.jpg", caption: "...", shape: "portrait" },
        ],
      },
      {
        year: 2025,
        game: "REEFSCAPE",
        role: "Mechanical Lead",
        summary: "Led mechanical design and manufacturing, and drove at two regional wins and the FIRST Championship.",
        highlights: [
          "Led mechanical design and manufacturing.",
          "Ran the manual lathe on my own and turned robot components.",
          "Set up CAM workflows and learned CNC machining.",
          "Helped with electronics and CAD.",
          "Member of the drive team.",
        ],
        achievements: [
          "Winner, Bosphorus Regional",
          "Winner and FIRST Impact Award, Marmara Regional",
          "Innovation in Control Award, Bosphorus Regional",
          "3rd place, Johnson Division, FIRST Championship",
          "Winner, BIST Başakşehir Off-Season",
        ],
        media: [
          { photo: "/images/robotics/2025/me-and-robot-winner.jpg", caption: "With the robot after a regional win", shape: "portrait" },
          { video: "/videos/robotics/2025/robot-at-work.mp4", caption: "The 2025 robot in a practice match", shape: "wide" },
          { photo: "/images/robotics/2025/me-and-robot-v1.jpg", caption: "With the first version of the robot", shape: "portrait" },
          { photo: "/images/robotics/2025/robot-climb.jpg", caption: "Climbing at the end of a match", shape: "portrait" },
          { video: "/videos/robotics/2025/golden-showcase.mp4", caption: "Golden Horn 2025 showcase", shape: "wide" },
          { photo: "/images/robotics/2025/me-and-robot-v2.jpg", caption: "With the second version of the robot", shape: "portrait" },
          { photo: "/images/robotics/2025/robot-v2.jpg", caption: "Robot, version 2", shape: "portrait" },
          // { photo: "/images/robotics/2025/my-photo.jpg", caption: "...", shape: "portrait" },
        ],
      },
      {
        year: 2024,
        game: "CRESCENDO",
        role: "Mechanical Member",
        summary: "Joined the drive team and started machining on the NC mill, alongside CAD and 3D printing.",
        highlights: [
          "Member of the drive team.",
          "Machined parts on the NC mill.",
          "Built up CAD and 3D printing skills.",
          "Worked on mechanical design and fabrication.",
        ],
        achievements: [
          "Engineering Inspiration Award, FIRST Championship (Hopper Division)",
          "Engineering Inspiration Award, Haliç Regional",
          "Team Sustainability Award, Marmara Regional",
        ],
        media: [
          { photo: "/images/robotics/2024/me-and-robot-1.jpg", caption: "With the 2024 robot", shape: "portrait" },
          { video: "/videos/robotics/2024/match-cut.mp4", caption: "2024 match", shape: "wide" },
          { photo: "/images/robotics/2024/me-and-robot-2.jpg", caption: "With the 2024 robot", shape: "portrait" },
          { video: "/videos/robotics/2024/offseason-autonomous.mp4", caption: "Autonomous testing in the off-season", shape: "wide" },
          { photo: "/images/robotics/2024/offseason-robot.jpg", caption: "Off-season robot", shape: "portrait" },
          { photo: "/images/robotics/2024/robot.jpg", caption: "The 2024 robot", shape: "portrait" },
          { photo: "/images/robotics/2024/offseason-after-event.jpg", caption: "After an off-season event", shape: "portrait" },
          // { photo: "/images/robotics/2024/my-photo.jpg", caption: "...", shape: "portrait" },
        ],
      },
      {
        year: 2023,
        game: "CHARGED UP",
        role: "Mechanical Member",
        summary: "First season. Joined the mechanical sub-team, led scouting and match strategy, and won the New York City Regional.",
        highlights: [
          "Led scouting and match strategy.",
          "Joined the mechanical sub-team.",
          "Helped with robot assembly and mechanical development.",
        ],
        achievements: [
          "Winner and Gracious Professionalism Award, New York City Regional",
          "Engineering Inspiration Award, Istanbul Regional",
          "FIRST Championship, Archimedes Division",
          "Off-season event winner",
        ],
        media: [
          // { photo: "/images/robotics/2023/my-photo.jpg", caption: "...", shape: "portrait" },
        ],
      },
    ],
  },

  /* ───────────────────────────── 6. CAD & DESIGN ─────────────────────── */
  // Photos: public/images/cad/  (renders, screenshots, technical drawings)
  cad: {
    eyebrow: "Design",
    title: "CAD",
    description:
      "Part design, assemblies and drawings in Fusion 360 and Onshape, mostly for competition robots that had to be built and running within weeks.",
    skills: [
      { title: "Fusion 360", items: ["Part modelling", "Assemblies", "Technical drawings", "CAM"] },
      { title: "Onshape", items: ["Part modelling", "Assemblies"] },
    ],
    media: [
      { photo: "/images/cad/2026-robot-cad-1.jpg", caption: "2026 robot, full assembly", shape: "landscape" },
      { photo: "/images/cad/2026-robot-cad-2.jpg", caption: "2026 robot, full assembly", shape: "landscape" },
      { photo: "/images/cad/2025-robot-cad-1.jpg", caption: "2025 robot", shape: "square" },
      { photo: "/images/cad/2026-intake-prototype-1.jpg", caption: "2026 intake prototype", shape: "wide" },
      { photo: "/images/cad/2025-robot-cad-2.jpg", caption: "2025 robot, detail", shape: "landscape" },
      { photo: "/images/cad/2026-intake-prototype-2.jpg", caption: "2026 intake prototype, detail", shape: "landscape" },
      // { photo: "/images/cad/my-render.jpg", caption: "...", shape: "landscape" },
    ],
  },

  /* ───────────────────────────── 7. MANUFACTURING ────────────────────── */
  // Photos: public/images/manufacturing/  · Videos: public/videos/manufacturing/
  manufacturing: {
    eyebrow: "Making parts",
    title: "Manufacturing",
    description:
      "Taking parts from CAD to the workshop: CAM programming, CNC routing, NC milling, manual turning and 3D printing, then assembling everything on the robot.",
    skills: [
      {
        title: "Machines & CAM",
        items: [
          "CAM programming in Fusion 360",
          "CNC router: CAM and operation",
          "NC milling",
          "Manual lathe",
          "FDM 3D printing",
        ],
      },
      { title: "Metals", items: ["Aluminium (4xxx, 5xxx, 6xxx, 7xxx)", "Steel"] },
      { title: "Plastics", items: ["PLA", "ABS", "TPU", "Polycarbonate"] },
      {
        title: "Assembly",
        items: ["Mechanical integration", "Hand and workshop tools", "Fitting and finishing parts", "Troubleshooting"],
      },
    ],
    media: [
      { video: "/videos/manufacturing/nc-mill.mp4", caption: "Machining on the NC mill", shape: "portrait" },
      { video: "/videos/manufacturing/cnc-timelapse.mp4", caption: "CNC router cutting a part (timelapse)", shape: "portrait" },
      // { photo: "/images/manufacturing/my-part.jpg", caption: "...", shape: "portrait" },
    ],
  },

  /* ───────────────────────────── 8. ELECTRONICS ──────────────────────── */
  // Photos: public/images/electronics/  (wiring, electrical panel, motor controllers)
  electronics: {
    eyebrow: "Wiring and code",
    title: "Electronics",
    description:
      "Wiring and electrical integration on competition robots, from CAN and PWM to motor controllers and sensors. I also use Python for data analysis.",
    skills: [
      {
        title: "Electrical",
        items: ["CAN and PWM wiring", "Motor controllers", "Sensors", "FRC control system"],
      },
      { title: "Python", items: ["NumPy", "Pandas", "SciPy", "Matplotlib", "Plotly"] },
    ],
    media: [
      { photo: "/images/robotics/2026/robot-electronics.jpg", caption: "Electrical layout on the 2026 robot", shape: "wide" },
      { photo: "/images/electronics/electronics-lesson-1.jpg", caption: "Teaching an FRC electronics session", shape: "landscape" },
      { photo: "/images/electronics/code-review-with-mentor.jpg", caption: "Going through robot code with a mentor", shape: "portrait" },
      { photo: "/images/electronics/electronics-lesson-2.jpg", caption: "Electronics session", shape: "wide" },
      { photo: "/images/electronics/electronics-lesson-3.jpg", caption: "Electronics session", shape: "landscape" },
      // { photo: "/images/electronics/my-wiring.jpg", caption: "...", shape: "portrait" },
    ],
  },

  /* ───────────────────────────── 9. AWARDS ───────────────────────────── */
  // Team results from my seasons (2023–2026). Source: The Blue Alliance.
  // The first `home.featuredAwards` items are also shown on the home page.
  awards: {
    eyebrow: "Team 8159 · 2023 – 2026",
    title: "Awards",
    description: "Team results from my four seasons with Golden Horn.",
    sourceLabel: "Full record on The Blue Alliance",
    items: [
      { count: "3×", title: "Regional Winner", detail: "New York City 2023 · Bosphorus 2025 · Marmara 2025" },
      { count: "4×", title: "FIRST Championship", detail: "2023 · 2024 · 2025 · 2026" },
      { count: "1×", title: "FIRST Impact Award", detail: "Marmara 2025" },
      { count: "3rd", title: "Johnson Division", detail: "FIRST Championship 2025" },
      { count: "3×", title: "Engineering Inspiration Award", detail: "Istanbul 2023 · Haliç 2024 · Championship 2024" },
      { count: "1×", title: "Regional Finalist", detail: "Orlando 2026" },
      { count: "2×", title: "Autonomous Award", detail: "Orlando 2026 · Marmara 2026" },
      { count: "1×", title: "Innovation in Control Award", detail: "Bosphorus 2025" },
      { count: "1×", title: "Gracious Professionalism Award", detail: "New York City 2023" },
      { count: "1×", title: "Team Sustainability Award", detail: "Marmara 2024" },
      { count: "3×", title: "Off-season event winner", detail: "2023 · 2025 · 2026" },
    ],
    media: [
      { photo: "/images/awards/regional-winner-2025.jpg", caption: "After a regional win, 2025", shape: "portrait" },
      // { photo: "/images/awards/my-trophy.jpg", caption: "...", shape: "portrait" },
    ],
  },

  /* ──────────────────── 10. EDUCATION & EXPERIENCE ───────────────────── */
  // Shown at the bottom of the home page.
  // The full CV is the PDF in profile.cvFile (public/cv.pdf).
  cv: {
    education: [
      {
        title: "BEng Mechanical Engineering",
        place: "University of Bristol",
        period: "2026 – present",
        detail: "First year.",
      },
      {
        title: "Summer courses",
        place: "Sabancı University",
        period: "Summer",
        detail: "Quantum Physics · Materials Science & Nanotechnology · Machine Learning & AI · International Business Management",
      },
    ],
    experience: [
      {
        title: "Mechanical & Electrical Lead",
        place: "Team 8159 Golden Horn (FIRST Robotics Competition)",
        period: "2023 – 2026",
        detail: "Scouting & strategy lead (2023), mechanical member (2023–24), Mechanical Lead (2025), Mechanical & Electrical Lead (2026).",
      },
      { title: "Bartender", place: "Mühit No:30", period: "Summers 2025 & 2026" },
      { title: "Waiter", place: "Mahalle Kadıköy", period: "Summer 2024" },
    ],
  },
};

export default config;
