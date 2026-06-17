import type { Icon } from "@tabler/icons-react";
import {
  IconArchive,
  IconBriefcase,
  IconHome,
  IconMail,
  IconUser,
} from "@tabler/icons-react";

export interface NavLink {
  label: string;
  href: string;
  icon: Icon;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", icon: IconHome },
  { label: "About", href: "/about", icon: IconUser },
  { label: "Projects", href: "/projects", icon: IconBriefcase },
  { label: "Archive", href: "/archive", icon: IconArchive },
  { label: "Contact", href: "/contact", icon: IconMail },
];
