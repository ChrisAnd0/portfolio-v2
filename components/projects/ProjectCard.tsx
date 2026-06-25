"use client";

import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowRight,
  IconBrandGithub,
  IconDownload,
  type Icon,
} from "@tabler/icons-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import type { LinkIconKey, Project } from "@/lib/projects-data";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const linkIcons: Record<LinkIconKey, Icon> = {
  download: IconDownload,
};

export function ProjectCard({ project }: { project: Project }) {
  const LinkIcon = project.linkIcon
    ? linkIcons[project.linkIcon]
    : IconArrowRight;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={item}
    >
      <Card withBorder padding="lg" radius="md" h="100%">
        {project.thumbnail && (
          <Card.Section>
            <Image
              src={project.thumbnail}
              alt={project.title}
              h={160}
              fit="cover"
            />
          </Card.Section>
        )}
        <Stack
          gap="sm"
          h="100%"
          justify="space-between"
          pt={project.thumbnail ? "sm" : undefined}
        >
          <Stack gap="xs">
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Title order={3} fz="lg" style={{ flex: 1, minWidth: 0 }}>
                {project.title}
              </Title>
              {project.badge && (
                <Badge color="gray" variant="outline" style={{ flexShrink: 0 }}>
                  {project.badge}
                </Badge>
              )}
            </Group>
            <Text size="sm" c="dimmed">
              {project.description}
            </Text>
            {project.tags.length > 0 && (
              <Group gap={6}>
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="light" radius="sm">
                    {tag}
                  </Badge>
                ))}
              </Group>
            )}
          </Stack>

          {(project.href || project.sourceHref) && (
            <Group gap="xs">
              {project.href &&
                (project.external ? (
                  <Button
                    component="a"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="light"
                    size="sm"
                    rightSection={<LinkIcon size={16} />}
                  >
                    {project.linkLabel}
                  </Button>
                ) : (
                  <Button
                    component={Link}
                    href={project.href}
                    variant="light"
                    size="sm"
                    rightSection={<LinkIcon size={16} />}
                  >
                    {project.linkLabel}
                  </Button>
                ))}
              {project.sourceHref && (
                <Button
                  component="a"
                  href={project.sourceHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="subtle"
                  color="gray"
                  size="sm"
                  rightSection={<IconBrandGithub size={16} />}
                >
                  Source
                </Button>
              )}
            </Group>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
}
