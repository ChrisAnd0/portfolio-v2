"use client";

import { Badge, Button, Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowRight, IconBrandGithub } from "@tabler/icons-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/projects-data";

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={item}
    >
      <Card withBorder padding="lg" radius="md" h="100%">
        <Stack gap="sm" h="100%" justify="space-between">
          <Stack gap="xs">
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Title order={3} fz="lg" style={{ flex: 1, minWidth: 0 }}>
                {project.title}
              </Title>
              {project.comingSoon && (
                <Badge color="gray" variant="outline" style={{ flexShrink: 0 }}>
                  Coming Soon
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

          {project.href &&
            (project.external ? (
              <Button
                component="a"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                size="sm"
                rightSection={<IconBrandGithub size={16} />}
              >
                {project.linkLabel}
              </Button>
            ) : (
              <Button
                component={Link}
                href={project.href}
                variant="light"
                size="sm"
                rightSection={<IconArrowRight size={16} />}
              >
                {project.linkLabel}
              </Button>
            ))}
        </Stack>
      </Card>
    </motion.div>
  );
}
