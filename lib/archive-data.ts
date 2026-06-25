import type { Project } from "@/lib/projects-data";

export const archiveItems: Project[] = [
  {
    title: "Bullet Hell",
    badge: "2014",
    description:
      "The original proof-of-concept bullet-hell shooter, built in Unity2D with C# — a controllable player, spawned bullet objects, and collision detection, inspired by Touhou Project. The remade version lives on the Home page.",
    tags: ["Unity2D", "C#"],
    thumbnail: "/archive/thumbs/bullet-hell.png",
    href: "/archive/bullet-hell/BulletHell.zip",
    linkLabel: "Download",
    external: true,
    linkIcon: "download",
    sourceHref: "https://github.com/ChrisAnd0/bullet-hell",
  },
  {
    title: "Gate Zero Card Game Blog",
    badge: "2016",
    description:
      "A blog built for a course at RIT, written as a competitive Japanese TCG player for what I played at the time (Luck & Logic, Weiß Schwarz) — strategy articles, card analysis, and tournament results, preserved exactly as it was originally published.",
    tags: ["HTML", "CSS"],
    thumbnail: "/archive/thumbs/gate-zero.png",
    href: "/archive/gate-zero/index.html",
    linkLabel: "Visit the site",
    external: true,
    sourceHref: "https://github.com/ChrisAnd0/gate-zero",
  },
  {
    title: "RIT Local Interests",
    badge: "2017",
    description:
      "A final project for an RIT web course, built to help prospective and current students find the day-to-day spots around campus that don't usually make it into the tour-guide pitch.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    thumbnail: "/archive/thumbs/rit-interests.png",
    href: "/archive/rit-interests/index.html",
    linkLabel: "Visit the site",
    external: true,
    sourceHref: "https://github.com/ChrisAnd0/rit-poi",
  },
];
