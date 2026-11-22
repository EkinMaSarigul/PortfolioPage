// ✏️ Edit your projects here — no other file needs to change.
//
// These are EXAMPLE engineering projects — replace them with your own.
//
// Fields:
//   title       Project name
//   category    Used for the filter buttons (e.g. "Design", "Simulation", "Prototyping")
//   year        Shown on the card
//   summary     One short line under the title
//   description Longer text shown when the card is clicked. A good structure:
//               Problem → your approach → result (with numbers if you can).
//   tags        Tools / methods used
//   image       Path to an image, e.g. "images/gearbox.jpg" — CAD renders, FEA plots
//               and photos of the real prototype work great. Leave "" for a colour placeholder.
//   color       Placeholder gradient colours when there's no image
//   link        URL to a report, video, GrabCAD model or repo (leave "" to hide the button)

const PROJECTS = [
  {
    title: "Two-Stage Gearbox",
    category: "Design",
    year: "2026",
    summary: "Compact reduction gearbox designed for a small electric vehicle.",
    description: "Designed a 12:1 two-stage helical gearbox to fit a tight packaging envelope. Sized gears and shafts to AGMA standards, selected bearings, and produced full manufacturing drawings with GD&T. [Replace with your result — e.g. 15% lighter than the previous design.]",
    tags: ["SolidWorks", "Gear design", "GD&T", "Bearing selection"],
    image: "",
    color: ["#ff5a36", "#ffb347"],
    link: "",
  },
  {
    title: "Bracket Topology Optimisation",
    category: "Simulation",
    year: "2025",
    summary: "FEA-driven redesign of a load-bearing aluminium bracket.",
    description: "Ran static structural and fatigue analysis on an existing bracket, then used topology optimisation to remove material while keeping the safety factor above 2. Validated the mesh with a convergence study. [Add your numbers — mass saved, stress reduction.]",
    tags: ["ANSYS", "FEA", "Topology optimisation", "Fatigue"],
    image: "",
    color: ["#5b6cff", "#9b7bff"],
    link: "",
  },
  {
    title: "Formula Student Suspension",
    category: "Prototyping",
    year: "2024",
    summary: "Double-wishbone suspension for a student race car.",
    description: "Responsible for suspension geometry and uprights. Modelled kinematics in MATLAB, designed CNC-machined uprights, and supported track testing. [Describe your role and what the team achieved.]",
    tags: ["MATLAB", "Vehicle dynamics", "CNC machining", "Testing"],
    image: "",
    color: ["#11998e", "#38ef7d"],
    link: "",
  },
  {
    title: "Heat Sink CFD Study",
    category: "Simulation",
    year: "2024",
    summary: "Thermal and airflow analysis of a forced-convection heat sink.",
    description: "Compared fin geometries with CFD to minimise junction temperature for a fixed fan. Built a test rig with thermocouples to validate the simulation. [Add how close simulation and test results were.]",
    tags: ["ANSYS Fluent", "CFD", "Heat transfer", "Experimental validation"],
    image: "",
    color: ["#2b2d42", "#8d99ae"],
    link: "",
  },
  {
    title: "3D-Printed Robotic Gripper",
    category: "Prototyping",
    year: "2023",
    summary: "Compliant gripper prototyped and iterated with FDM printing.",
    description: "Designed a servo-driven gripper with compliant fingers, iterated through several printed prototypes, and tested grip force on objects of different shapes. [Add what you learned or a link to a video.]",
    tags: ["Fusion 360", "3D printing", "Mechanisms", "Arduino"],
    image: "",
    color: ["#c94b4b", "#4b134f"],
    link: "",
  },
  {
    title: "Sheet Metal Enclosure",
    category: "Design",
    year: "2023",
    summary: "Low-cost enclosure designed for manufacture and assembly.",
    description: "Designed a bent sheet-metal enclosure with self-locating tabs to reduce fasteners and assembly time. Worked with a local fabricator on bend allowances and tolerances. [Add the cost or time saving.]",
    tags: ["Sheet metal", "DFM / DFA", "Technical drawings"],
    image: "",
    color: ["#f7971e", "#ffd200"],
    link: "",
  },
];
