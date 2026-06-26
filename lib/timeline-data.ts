import type { Icon } from "@tabler/icons-react";
import { IconBriefcase, IconSchool } from "@tabler/icons-react";

export interface TimelineEntry {
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets: string[];
  icon: Icon;
}

export const careerTimeline: TimelineEntry[] = [
  {
    role: "Frontend Developer",
    org: "DonorSearch by EverTrue",
    period: "Mar 2023 – Jun 2026",
    location: "Remote",
    bullets: [
      'Engineered the greenfield rewrite of "DonorSearch V2" as part of a lean, three-developer team, completely replacing the legacy flagship product with a modern Next.js/Mantine application.',
      "Built complex data tables and real-time filtering for the core search experience, handling large, fast-changing data sets efficiently in React.",
      "Migrated the UI from Chakra UI 2.x to Mantine 7.x mid-project, managing breaking changes and re-tuning component performance along the way.",
      "Worked closely with backend engineers to integrate live, rapidly evolving APIs, keeping frontend and backend in lockstep through active development.",
      "Wrote automated test coverage with Vitest for unit tests and Playwright for end-to-end flows, cutting down regressions during fast-moving feature work.",
      "Reworked UI components to match a full usability redesign once the company brought on a full-time designer, moving the app further from V1's original design patterns.",
      "Implemented the UI side of a cross-company rebrand after DonorSearch's acquisition by EverTrue, often extending the designer's finished components to other screens to keep pace with the timeline, and contributing usability and clarity feedback during design discussions.",
      "Developed hands-on fluency with AI-assisted tooling — Claude Code for planning, debugging, and testing — after the team's early pivot away from Amazon Q.",
      "Made occasional edits to the Laravel backend when needed to unblock frontend work and keep feature delivery moving.",
    ],
    icon: IconBriefcase,
  },
  {
    role: "Sales Development Representative",
    org: "REVGEN NC",
    period: "Jun 2022 – Nov 2022",
    location: "Remote",
    bullets: [
      "Ran high-volume B2B outreach (100-120 dials/day), qualifying prospects and partnering with Account Executives to drive pipeline strategy.",
    ],
    icon: IconBriefcase,
  },
  {
    role: "Tech Consultant",
    org: "Target Corporation",
    period: "Oct 2019 – Jun 2022",
    location: "On-site",
    bullets: [
      "Educated customers on new tech products, resolved hands-on technical issues, and managed electronics inventory, displays, and the sales floor.",
    ],
    icon: IconBriefcase,
  },
  {
    role: "B.S. in Applied Arts and Sciences",
    org: "Rochester Institute of Technology",
    period: "Graduated 2019",
    bullets: [
      "Multidisciplinary track blending technical computing, design/imaging, and liberal arts coursework, with a personal focus on digital narrative and interactive fiction.",
      "Active in student life as Business Coordinator for Anime Club and Supplies Coordinator for Tora-Con, RIT's annual anime convention.",
    ],
    icon: IconSchool,
  },
];
