"use client";

import { useMantineColorScheme } from "@mantine/core";
import { Spotlight, type SpotlightActionData } from "@mantine/spotlight";
import { IconMoonStars } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { navLinks } from "@/lib/nav-links";

export function CommandPalette() {
  const router = useRouter();
  const { toggleColorScheme } = useMantineColorScheme();

  const actions: SpotlightActionData[] = [
    ...navLinks.map((link) => ({
      id: `nav-${link.href}`,
      label: link.label,
      description: `Go to ${link.label}`,
      leftSection: <link.icon size={18} />,
      onClick: () => router.push(link.href),
    })),
    {
      id: "toggle-theme",
      label: "Toggle theme",
      description: "Switch between light and dark mode",
      leftSection: <IconMoonStars size={18} />,
      onClick: () => toggleColorScheme(),
    },
  ];

  return (
    <Spotlight actions={actions} nothingFound="No results" highlightQuery />
  );
}
