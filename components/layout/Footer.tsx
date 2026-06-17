import { ActionIcon, Group, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export function Footer() {
  return (
    <Group justify="space-between" py="lg" px="md" wrap="wrap-reverse">
      <Text size="sm" c="dimmed">
        © {new Date().getFullYear()} Chris Omahen
      </Text>
      <ActionIcon
        component="a"
        href="https://github.com/ChrisAnd0"
        target="_blank"
        rel="noopener noreferrer"
        variant="subtle"
        size="lg"
        aria-label="GitHub profile"
      >
        <IconBrandGithub size={18} />
      </ActionIcon>
    </Group>
  );
}
