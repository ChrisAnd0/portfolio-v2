import type { Icon } from "@tabler/icons-react";
import {
  IconCode,
  IconPalette,
  IconSparkles,
  IconStack2,
  IconTestPipe,
  IconTool,
} from "@tabler/icons-react";

export interface SkillCategory {
  category: string;
  icon: Icon;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    icon: IconCode,
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "PHP",
      "SQL",
      "HTML5",
      "CSS3",
      "C#",
    ],
  },
  {
    category: "Frameworks & Libraries",
    icon: IconStack2,
    skills: [
      "React",
      "Next.js",
      "Mantine",
      "Chakra UI",
      "TanStack Query/Table",
      "Laravel",
    ],
  },
  {
    category: "AI Tools",
    icon: IconSparkles,
    skills: ["Claude (Code/Chat)", "Gemini", "Amazon Q"],
  },
  {
    category: "Tooling & DevOps",
    icon: IconTool,
    skills: [
      "Node.js",
      "Composer",
      "Vite",
      "ESLint",
      "Prettier",
      "Git",
      "Bitbucket",
      "Jira",
    ],
  },
  {
    category: "Testing",
    icon: IconTestPipe,
    skills: ["Vitest", "Playwright"],
  },
  {
    category: "Design Tools",
    icon: IconPalette,
    skills: ["Photoshop", "Illustrator", "InDesign"],
  },
];
