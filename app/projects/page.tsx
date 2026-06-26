import { Card, Container, SimpleGrid, Stack, Title } from "@mantine/core";
import type { Metadata } from "next";
import { GithubActivityFeed } from "@/components/projects/GithubActivityFeed";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/lib/projects-data";

const description =
  "Current projects from Chris Omahen, including this site, plus a live feed of recent GitHub activity.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  openGraph: {
    title: "Projects | Chris Omahen",
    description,
    images: "/opengraph-image",
  },
  twitter: {
    title: "Projects | Chris Omahen",
    description,
    images: "/opengraph-image",
  },
};

export default function ProjectsPage() {
  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <Title order={1}>Projects</Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </SimpleGrid>

        <Stack gap="md">
          <Title order={2}>Recent Activity</Title>
          <Card withBorder padding="lg" radius="md">
            <GithubActivityFeed />
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
}
