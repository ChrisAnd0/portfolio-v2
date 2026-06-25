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
      'Heavy involvement in the greenfield rewrite of "DonorSearch V2," transitioning the legacy flagship product into a modern Next.js/Mantine application.',
      "Migrated the UI from Chakra UI to Mantine mid-project, built out Vitest/Playwright test coverage, and grew the team's use of AI tooling (Amazon Q, then Claude Code) along the way.",
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
