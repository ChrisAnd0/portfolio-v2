"use client";

import {
  ActionIcon,
  Burger,
  Drawer,
  Group,
  Kbd,
  NavLink,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import { IconCommand } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav-links";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [mobileNavOpened, { toggle: toggleMobileNav, close: closeMobileNav }] =
    useDisclosure(false);

  return (
    <>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap">
        <Text component={Link} href="/" fw={700} size="lg">
          Chris Omahen
        </Text>

        <Group gap="xs" visibleFrom="sm">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              component={Link}
              href={link.href}
              label={link.label}
              leftSection={<link.icon size={16} />}
              active={pathname === link.href}
              variant="subtle"
              w="auto"
            />
          ))}
        </Group>

        <Group gap="xs" wrap="nowrap">
          <Tooltip
            label={
              <>
                Command palette <Kbd size="xs">Ctrl</Kbd> +{" "}
                <Kbd size="xs">K</Kbd>
              </>
            }
          >
            <ActionIcon
              variant="subtle"
              size="lg"
              aria-label="Open command palette"
              onClick={spotlight.open}
            >
              <IconCommand size={18} />
            </ActionIcon>
          </Tooltip>
          <ThemeToggle />
          <Burger
            opened={mobileNavOpened}
            onClick={toggleMobileNav}
            hiddenFrom="sm"
            size="sm"
            aria-label={
              mobileNavOpened ? "Close navigation menu" : "Open navigation menu"
            }
          />
        </Group>
      </Group>

      <Drawer
        opened={mobileNavOpened}
        onClose={closeMobileNav}
        title="Menu"
        hiddenFrom="sm"
        size="xs"
        padding="md"
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.href}
            component={Link}
            href={link.href}
            label={link.label}
            leftSection={<link.icon size={16} />}
            active={pathname === link.href}
            onClick={closeMobileNav}
          />
        ))}
      </Drawer>
    </>
  );
}
