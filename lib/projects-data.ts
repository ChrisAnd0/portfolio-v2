export type LinkIconKey = "download";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  thumbnail?: string;
  badge?: string;
  href?: string;
  linkLabel?: string;
  external?: boolean;
  linkIcon?: LinkIconKey;
  sourceHref?: string;
}

export const projects: Project[] = [
  {
    title: "This Portfolio",
    description:
      "This site, rebuilt from scratch in Next.js and Mantine — including a Ctrl+K command palette and the live GitHub activity feed below.",
    tags: ["Next.js", "TypeScript", "Mantine", "Framer Motion"],
    thumbnail: "/projects/thumbs/this-portfolio.png",
    sourceHref: "https://github.com/ChrisAnd0/portfolio-v2",
  },
  {
    title: "Bullet Hell Easter Egg",
    description:
      "A dodge-only bullet-hell mini-game built with HTML canvas — a React/TypeScript remake of a 2014 Unity project (the original lives in the Archive). Hidden on the Home page; look for the UFO.",
    tags: ["React", "Canvas", "TypeScript"],
    thumbnail: "/projects/thumbs/bullet-hell.png",
    href: "/",
    linkLabel: "Find it on Home",
    sourceHref: "https://github.com/ChrisAnd0/portfolio-v2",
  },
  {
    title: "Loveca Card Database & Deckbuilder",
    description:
      "A card database and deckbuilder for the Love Live! Series Official Card Game (Loveca), featuring English translations and advanced filtering options.",
    tags: [],
    badge: "Coming Soon",
  },
];
